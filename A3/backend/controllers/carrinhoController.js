const db = require('../models');

exports.criar = async (req, res) => {
  try {
    const { clienteId } = req.body;
    const carrinho = await db.Carrinho.create({ clienteId });
    res.status(201).json(carrinho);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const carrinhos = await db.Carrinho.findAll({ include: ['itens'] });
    res.json(carrinhos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.adicionarItem = async (req, res) => {
  try {
    const { carrinhoId, produtoId, quantidade } = req.body;
    const item = await db.ItemCarrinho.create({ carrinhoId, produtoId, quantidade });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.removerItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    await db.ItemCarrinho.destroy({ where: { id: itemId } });
    res.json({ mensagem: 'Item removido do carrinho.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { carrinhoId } = req.params;
    await db.Carrinho.destroy({ where: { id: carrinhoId } });
    res.json({ mensagem: 'Carrinho deletado.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
