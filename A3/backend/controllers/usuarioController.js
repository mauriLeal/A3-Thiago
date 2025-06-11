const db = require('../models/usuario');

exports.listar = (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

exports.criar = (req, res) => {
  const { nome, email, senha } = req.body;
  db.run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, nome, email });
    }
  );
};

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const db = require('../models/usuario');
  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
    if (row) {
      res.json({ sucesso: true, usuario: { id: row.id, nome: row.nome, email: row.email } });
    } else {
      res.json({ sucesso: false, mensagem: 'E-mail ou senha inválidos!' });
    }
  });
};


