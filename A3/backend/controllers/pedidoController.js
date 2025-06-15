const db = require('../models');

// --- (C) CREATE: Criar um novo pedido ---
// Esta é a operação mais complexa
exports.create = async (req, res) => {
  // Usamos uma transação para garantir que todas as operações sejam bem-sucedidas.
  // Se algo der errado, tudo é desfeito (rollback).
  const transaction = await db.sequelize.transaction();

  try {
    // 1. Obter os dados do corpo da requisição e o ID do cliente do token
    const { restauranteId, enderecoId, formaPagamentoId, itens } = req.body;
    const clienteId = req.userId; // Injetado pelo middleware de autenticação

    // Validação básica
    if (!restauranteId || !enderecoId || !formaPagamentoId || !itens || itens.length === 0) {
      return res.status(400).json({ error: 'Dados do pedido incompletos.' });
    }

    // 2. Calcular o valor total do pedido no backend (nunca confie no preço vindo do frontend)
    let valorTotal = 0;
    const itensParaCriar = [];

    for (const item of itens) {
      const produto = await db.Produto.findByPk(item.produtoId);
      if (!produto) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
      }
      const precoItem = produto.preco * item.quantidade;
      valorTotal += precoItem;

      // Prepara os dados para a criação dos ItensPedido
      itensParaCriar.push({
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
        precoTotal: precoItem,
        produtoId: item.produtoId,
      });
    }

    // 3. Criar o Pedido no banco de dados
    const pedido = await db.Pedido.create({
      clienteId,
      restauranteId,
      enderecoId,
      formaPagamentoId,
      valorTotal,
      status: 'CRIADO', // Status inicial
    }, { transaction });

    // 4. Associar os itens ao pedido recém-criado
    const itensDoPedido = itensParaCriar.map(item => ({ ...item, pedidoId: pedido.id }));
    await db.ItemPedido.bulkCreate(itensDoPedido, { transaction }); // bulkCreate é mais eficiente

    // 5. Se tudo correu bem, confirma a transação
    await transaction.commit();

    // 6. Carrega os dados completos do pedido para retornar ao cliente
    const pedidoCompleto = await db.Pedido.findByPk(pedido.id, {
      include: [
        { model: db.Restaurante, attributes: ['nome'] },
        { model: db.ItemPedido, as: 'itens', include: [{ model: db.Produto, attributes: ['nome'] }] }
      ]
    });

    res.status(201).json(pedidoCompleto);

  } catch (error) {
    // Se deu erro, desfaz a transação
    await transaction.rollback();
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: 'Não foi possível criar o pedido.' });
  }
};


// --- (R) READ: Listar os pedidos do usuário logado ---
exports.listMyOrders = async (req, res) => {
  try {
    const clienteId = req.userId;
    const pedidos = await db.Pedido.findAll({
      where: { clienteId },
      include: [ // Inclui dados de tabelas relacionadas para um response mais rico
        { model: db.Restaurante, attributes: ['id', 'nome'] },
        { model: db.FormaPagamento, attributes: ['descricao'] }
      ],
      order: [['createdAt', 'DESC']] // Ordena pelos mais recentes
    });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: 'Não foi possível buscar os pedidos.' });
  }
};


// --- (R) READ: Obter detalhes de um pedido específico ---
exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteId = req.userId;

    const pedido = await db.Pedido.findOne({
      where: { id, clienteId }, // Garante que o usuário só pode ver seus próprios pedidos
      include: [
        { model: db.Usuario, as: 'cliente', attributes: ['nome', 'email'] },
        { model: db.Restaurante, attributes: ['nome'] },
        { model: db.Endereco },
        { model: db.FormaPagamento },
        { model: db.ItemPedido, as: 'itens', include: [{ model: db.Produto, attributes: ['nome', 'descricao'] }] }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error("Erro ao buscar detalhes do pedido:", error);
    res.status(500).json({ error: 'Não foi possível buscar os detalhes do pedido.' });
  }
};

// --- (U) UPDATE: Atualizar o status de um pedido (ex: confirmar, cancelar) ---
// Em uma aplicação real, você teria regras de quem pode alterar o status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    
    // Lógica de permissão (ex: apenas o restaurante pode mudar para 'CONFIRMADO')
    // Por simplicidade, vamos permitir a mudança por enquanto.

    pedido.status = status;
    await pedido.save();

    res.status(200).json(pedido);

  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    res.status(500).json({ error: 'Não foi possível atualizar o status do pedido.' });
  }
};