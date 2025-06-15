const db = require('../models');


exports.criar = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { nome, taxaFrete, cozinhaId, responsavelId, endereco } = req.body;

    if (!nome || !taxaFrete || !cozinhaId || !responsavelId || !endereco) {
      return res.status(400).json({ error: 'Dados incompletos para criar o restaurante.' });
    }

 
    const sqlGrupo = `SELECT id FROM grupos WHERE nome = 'DONO_RESTAURANTE' LIMIT 1`;
    const [grupoResult] = await db.sequelize.query(sqlGrupo, { transaction: t });
    if (!grupoResult || grupoResult.length === 0) {
      return res.status(500).json({ error: "Grupo 'DONO_RESTAURANTE' não configurado no sistema." });
    }
    const grupoDonoId = grupoResult[0].id;
    
    const sqlVerificaDono = `SELECT usuarioId FROM usuario_grupos WHERE usuarioId = ? AND grupoId = ?`;
    const [donoResult] = await db.sequelize.query(sqlVerificaDono, { replacements: [responsavelId, grupoDonoId], transaction: t });
    if (!donoResult || donoResult.length === 0) {
      return res.status(403).json({ error: 'O usuário informado não tem permissão para ser dono de um restaurante.' });
    }


    const sqlRestaurante = `INSERT INTO restaurantes (nome, taxaFrete, cozinhaId, responsavelId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
    const now = new Date();
    const [restauranteId] = await db.sequelize.query(sqlRestaurante, {
      replacements: [nome, taxaFrete, cozinhaId, responsavelId, now, now],
      transaction: t,
      type: db.sequelize.QueryTypes.INSERT
    });


    const { cep, logradouro, numero, bairro, cidadeId } = endereco;
    const sqlEndereco = `INSERT INTO enderecos (cep, logradouro, numero, bairro, cidadeId, restauranteId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.sequelize.query(sqlEndereco, {
      replacements: [cep, logradouro, numero, bairro, cidadeId, restauranteId, now, now],
      transaction: t,
      type: db.sequelize.QueryTypes.INSERT
    });

    await t.commit();
    res.status(201).json({ id: restauranteId, nome, taxaFrete, cozinhaId, responsavelId, endereco });

  } catch (error) {
    await t.rollback();
    console.error('Erro ao criar restaurante:', error);
    res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
  }
};


exports.listarTodos = async (req, res) => {
  try {
    const sql = `SELECT r.id, r.nome, r.taxaFrete, r.aberto, c.nome as cozinhaNome FROM restaurantes r LEFT JOIN cozinhas c ON r.cozinhaId = c.id`;
    const [restaurantes] = await db.sequelize.query(sql);
    res.status(200).json(restaurantes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar restaurantes.' });
  }
};


exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT
        r.id, r.nome, r.taxaFrete, r.aberto,
        c.nome as cozinhaNome,
        e.cep as enderecoCep, e.logradouro as enderecoLogradouro,
        e.numero as enderecoNumero, e.bairro as enderecoBairro,
        ci.nome as cidadeNome, es.nome as estadoNome,
        u.nome as responsavelNome, u.email as responsavelEmail
      FROM restaurantes r
      LEFT JOIN cozinhas c ON r.cozinhaId = c.id
      LEFT JOIN enderecos e ON r.id = e.restauranteId
      LEFT JOIN cidades ci ON e.cidadeId = ci.id
      LEFT JOIN estados es ON ci.estadoId = es.id
      LEFT JOIN usuarios u ON r.responsavelId = u.id
      WHERE r.id = ?
    `;
    const [results] = await db.sequelize.query(sql, { replacements: [id] });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Restaurante não encontrado.' });
    }

    const r = results[0];
    const resultadoFormatado = {
      id: r.id, nome: r.nome, taxaFrete: r.taxaFrete, aberto: r.aberto,
      cozinha: { nome: r.cozinhaNome },
      endereco: { cep: r.enderecoCep, logradouro: r.enderecoLogradouro, numero: r.enderecoNumero, bairro: r.enderecoBairro, cidade: r.cidadeNome, estado: r.estadoNome },
      responsavel: { nome: r.responsavelNome, email: r.responsavelEmail }
    };
    
    res.status(200).json(resultadoFormatado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar restaurante.' });
  }
};


exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, taxaFrete, aberto, endereco } = req.body;
  const t = await db.sequelize.transaction();
  try {
    if (nome || taxaFrete || (aberto !== undefined)) {
      const sqlRestaurante = `UPDATE restaurantes SET nome = ?, taxaFrete = ?, aberto = ?, updatedAt = ? WHERE id = ?`;
      const [restaurantesAtuais] = await db.sequelize.query(`SELECT * FROM restaurantes WHERE id = ?`, { replacements: [id] });
      if (restaurantesAtuais.length === 0) throw new Error('Restaurante não encontrado');
      const rAtual = restaurantesAtuais[0];
      await db.sequelize.query(sqlRestaurante, {
        replacements: [nome || rAtual.nome, taxaFrete || rAtual.taxaFrete, aberto !== undefined ? aberto : rAtual.aberto, new Date(), id],
        transaction: t
      });
    }

    if (endereco && typeof endereco === 'object') {
      const { cep, logradouro, numero, bairro, cidadeId } = endereco;
      const sqlEndereco = `UPDATE enderecos SET cep = ?, logradouro = ?, numero = ?, bairro = ?, cidadeId = ?, updatedAt = ? WHERE restauranteId = ?`;
      const [enderecosAtuais] = await db.sequelize.query(`SELECT * FROM enderecos WHERE restauranteId = ?`, { replacements: [id] });
      const eAtual = enderecosAtuais[0] || {};
      await db.sequelize.query(sqlEndereco, {
        replacements: [cep || eAtual.cep, logradouro || eAtual.logradouro, numero || eAtual.numero, bairro || eAtual.bairro, cidadeId || eAtual.cidadeId, new Date(), id],
        transaction: t
      });
    }
    await t.commit();
    res.status(200).json({ message: 'Restaurante atualizado com sucesso.' });
  } catch (error) {
    await t.rollback();
    if (error.message === 'Restaurante não encontrado') return res.status(404).json({ error: error.message });
    res.status(500).json({ error: 'Ocorreu um erro inesperado ao atualizar o restaurante.' });
  }
};


exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM restaurantes WHERE id = ?`;
    await db.sequelize.query(sql, { replacements: [id] });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar restaurante.' });
  }
};


exports.adicionarFormaPagamento = async (req, res) => {
    try {
        const { restauranteId } = req.params;
        const { formaPagamentoId } = req.body;
        const sql = `INSERT INTO restaurante_formas_pagamento (restauranteId, formaPagamentoId, createdAt, updatedAt) VALUES (?, ?, ?, ?)`;
        await db.sequelize.query(sql, { replacements: [restauranteId, formaPagamentoId, new Date(), new Date()] });
        res.status(201).json({ message: 'Forma de pagamento associada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao associar forma de pagamento.' });
    }
};

/**
 * Remove a associação de uma forma de pagamento.
 */
exports.removerFormaPagamento = async (req, res) => {
    try {
        const { restauranteId, formaPagamentoId } = req.params;
        const sql = `DELETE FROM restaurante_formas_pagamento WHERE restauranteId = ? AND formaPagamentoId = ?`;
        await db.sequelize.query(sql, { replacements: [restauranteId, formaPagamentoId] });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover associação.' });
    }
};