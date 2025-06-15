const db = require('../models');

exports.listar = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await db.Usuario.create({ nome, email, senha });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.json({ sucesso: false, mensagem: 'E-mail ou senha inválidos!' });
    }
    const bcrypt = require('bcryptjs');
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (senhaValida) {
      res.json({ sucesso: true, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } else {
      res.json({ sucesso: false, mensagem: 'E-mail ou senha inválidos!' });
    }
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
  }
};


