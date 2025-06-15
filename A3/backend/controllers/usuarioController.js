// controllers/usuarioController.js

const db = require('../models');
const bcrypt = require('bcryptjs');

/**
 * @description Criar um novo usuário (geralmente por um admin)
 * @route POST /api/usuarios
 */
exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    novoUsuario.senha = undefined; // Nunca retorne a senha
    res.status(201).json(novoUsuario);

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
  }
};


/**
 * @description Listar todos os usuários do sistema
 * @route GET /api/usuarios
 * @access Admin
 */
exports.listarTodos = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll({
      // IMPORTANTE: Nunca retorne a senha dos usuários!
      attributes: { exclude: ['senha'] }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

/**
 * @description Buscar os dados do próprio usuário logado
 * @route GET /api/usuarios/me
 */
exports.buscarMeuPerfil = async (req, res) => {
    try {
      // O ID do usuário vem do token JWT, injetado pelo authMiddleware
      const usuario = await db.Usuario.findByPk(req.userId, {
        attributes: { exclude: ['senha'] }
      });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
    }
  };

/**
 * @description Buscar um usuário específico pelo ID
 * @route GET /api/usuarios/:id
 */
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await db.Usuario.findByPk(id, {
      attributes: { exclude: ['senha'] }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

/**
 * @description Atualizar os dados do próprio usuário logado
 * @route PUT /api/usuarios/me
 */
exports.atualizarMeuPerfil = async (req, res) => {
  try {
    const id = req.userId; // Garante que o usuário só pode editar seu próprio perfil
    const { nome, email, senha } = req.body;

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Atualiza os campos se eles forem fornecidos
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) { // Se uma nova senha for fornecida, crie um novo hash
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.save(); // Salva as alterações no banco

    usuario.senha = undefined; // Remove a senha antes de enviar a resposta
    res.status(200).json({ message: 'Perfil atualizado com sucesso!', usuario });

  } catch (error) {
     // Tratamento de erro (ex: email duplicado)
     if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Este e-mail já está em uso.' });
      }
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

/**
 * @description Deletar o próprio usuário logado
 * @route DELETE /api/usuarios/me
 */
exports.deletarMeuPerfil = async (req, res) => {
  try {
    const id = req.userId; // Garante que o usuário só pode deletar seu próprio perfil

    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.destroy(); // Deleta o usuário do banco

    res.status(204).json({ message: 'Usuário deletado com sucesso.' }); // 204 significa "No Content" (sem conteúdo)

  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};