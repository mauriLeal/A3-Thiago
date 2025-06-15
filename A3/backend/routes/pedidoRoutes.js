const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas de pedido exigem autenticação.
// Podemos aplicar o middleware a todas as rotas de uma vez assim:
router.use(authMiddleware);

// Rota para criar um novo pedido
router.post('/', pedidoController.create);

// Rota para listar os pedidos do usuário logado
router.get('/', pedidoController.listMyOrders);

// Rota para ver os detalhes de um pedido específico
router.get('/:id', pedidoController.getOrderDetails);

// Rota para atualizar o status de um pedido
router.patch('/:id/status', pedidoController.updateStatus);

module.exports = router;