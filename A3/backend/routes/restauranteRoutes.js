const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');


router.post('/', restauranteController.criar);

router.get('/', restauranteController.listarTodos);

router.get('/:id', restauranteController.buscarPorId);

router.put('/:id', restauranteController.atualizar);

router.delete('/:id', restauranteController.deletar);

router.post('/:restauranteId/formas-pagamento', restauranteController.adicionarFormaPagamento);

router.delete('/:restauranteId/formas-pagamento/:formaPagamentoId', restauranteController.removerFormaPagamento);


module.exports = router;