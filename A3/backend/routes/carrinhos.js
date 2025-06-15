const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', carrinhoController.criar);
router.get('/', carrinhoController.listar);
router.post('/item', carrinhoController.adicionarItem);
router.delete('/item/:itemId', carrinhoController.removerItem);
router.delete('/:carrinhoId', carrinhoController.deletar);

module.exports = router;
