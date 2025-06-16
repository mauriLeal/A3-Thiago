// routes/restauranteRoutes.js

const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

// Importamos nossos "seguranças" que criamos
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// --- ROTAS PÚBLICAS ---
// Qualquer pessoa, logada ou não, pode ver a lista de restaurantes.
router.get('/', restauranteController.listar);


// --- ROTAS PROTEGIDAS ---
// Para criar um restaurante, o usuário precisa passar por duas verificações:
// 1. Estar autenticado (authMiddleware).
// 2. Ter o cargo de 'ADMIN' (checkRole).
router.post(
  '/',
  authMiddleware,                 // 1º Segurança: Verifica se tem um crachá válido.
  checkRole(['ADMIN']),           // 2º Segurança: Verifica se o crachá é de 'ADMIN'.
  restauranteController.criar     // Se passar pelos dois, pode criar o restaurante.
);

// Exemplo para o futuro:
// Para editar um restaurante, o usuário precisaria ser ADMIN ou o DONO do restaurante.
// router.put(
//   '/:id',
//   authMiddleware,
//   checkRole(['ADMIN', 'DONO_RESTAURANTE']),
//   restauranteController.atualizar
// );

module.exports = router;