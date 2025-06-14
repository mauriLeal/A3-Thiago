const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para o cadastro de um novo usuário
// Quando uma requisição POST chegar em /auth/register, ela será
// direcionada para a função 'cadastrar' do nosso authController.
router.post('/registrar', authController.cadastrar);

// Futuramente, a rota de login também virá aqui.
router.post('/login', authController.login);
// Rota para o logout do usuário

module.exports = router;