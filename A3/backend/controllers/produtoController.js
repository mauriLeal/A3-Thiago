const db = require('../models/produto');

exports.listar = (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

exports.criar = (req, res) => {
  const { nome, preco, descricao, restaurante_id } = req.body;
  db.run(
    'INSERT INTO produtos (nome, preco, descricao, restaurante_id) VALUES (?, ?, ?, ?)',
    [nome, preco, descricao, restaurante_id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, nome, preco, descricao, restaurante_id });
    }
  );
};
