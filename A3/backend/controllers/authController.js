// controllers/authController.js

const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- FUNÇÃO DE CADASTRO (com 'exports.') ---
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Requisição inválida. Por favor, forneça nome, email e senha.' });
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

    novoUsuario.senha = undefined;
    res.status(201).json(novoUsuario);

  } catch (error) {
    console.error('Erro no cadastro de usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro inesperado no servidor.' });
  }
};


// --- FUNÇÃO DE LOGIN (com 'exports.') ---
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = { id: usuario.id, email: usuario.email };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Ocorreu um erro inesperado no servidor.' });
  }
};