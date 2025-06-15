const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

// --- Rota Pública ---
// Rota para criar um usuário (o registro não precisa de token).
// Nota: Se você já tem essa rota em authRoutes.js, pode remover daqui.
router.post('/', usuarioController.criarUsuario);

// --- Rotas Protegidas ---
// O middleware de autenticação será aplicado a todas as rotas abaixo dele.
// Qualquer requisição a partir daqui precisa de um token JWT válido.
router.use(authMiddleware);

// Rota para listar todos os usuários (geralmente para admins).
router.get('/', usuarioController.listarTodos);

// --- A ORDEM AQUI É CRUCIAL ---
// A rota específica '/me' deve vir ANTES da rota genérica '/:id'.
router.get('/me', usuarioController.buscarMeuPerfil);

// Rota para buscar um usuário específico pelo ID.
router.get('/:id', usuarioController.buscarPorId);
// ---------------------------------

// Rota para o usuário logado atualizar seu próprio perfil.
router.put('/me', usuarioController.atualizarMeuPerfil);

// Rota para o usuário logado deletar seu próprio perfil.
router.delete('/me', usuarioController.deletarMeuPerfil);

module.exports = router;