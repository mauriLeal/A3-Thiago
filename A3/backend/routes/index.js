// routes/index.js

const express = require('express');
const router = express.Router();

// Atualize os nomes dos arquivos aqui
const authRoutes = require('./authRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const produtoRoutes = require('./produtoRoutes'); // <-- Atualizado
const restauranteRoutes = require('./restauranteRoutes'); // <-- Atualizado
const usuarioRoutes = require('./usuarioRoutes'); // <-- Atualizado

// Associa cada grupo de rotas a um prefixo de URL
router.use('/auth', authRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/produtos', produtoRoutes);
router.use('/restaurantes', restauranteRoutes);
router.use('/usuarios', usuarioRoutes);

module.exports = router;