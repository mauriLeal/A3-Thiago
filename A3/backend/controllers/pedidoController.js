const db = require('../models');

exports.listar = async (req, res) => {
  try {
    const categoria = req.query.categoria;
    let where = {};
    if (categoria) {
      where.categoria = categoria;
    }
    const pedidos = await db.Pedido.findAll({ where });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { codigo, subtotal, taxaFrete, valorTotal, status, categoria } = req.body;
    const pedido = await db.Pedido.create({ codigo, subtotal, taxaFrete, valorTotal, status, categoria });
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
