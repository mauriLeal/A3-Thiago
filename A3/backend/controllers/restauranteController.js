const db = require('../models/restaurante');

exports.listar = (req, res) => {
  db.all('SELECT * FROM restaurantes', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

exports.criar = (req, res) => {
  const { nome, descricao, categoria } = req.body;
  db.run(
    'INSERT INTO restaurantes (nome, descricao, categoria) VALUES (?, ?, ?)',
    [nome, descricao, categoria],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, nome, descricao, categoria });
    }
  );
};