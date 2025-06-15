// src/app.js

const express = require('express');
const db = require('../models');

// --- AQUI ESTÁ A CORREÇÃO ---
// 1. Importamos o ROTEADOR PRINCIPAL, e não mais rotas individuais.
const routes = require('../routes'); // O Node.js entende que isso aponta para 'routes/index.js'

const app = express();

// 2. Configuração de Middlewares (continua igual)
app.use(express.json());

// --- E AQUI ---
// 3. Conexão do Roteador Principal com um prefixo /api
// Esta única linha conecta TODAS as suas rotas (auth, usuarios, pedidos, etc.)
app.use('/api', routes);

// Rota principal para um teste rápido de saúde da API
app.get('/', (req, res) => {
    res.send('API de Delivery de Comida está no ar! 🚀');
});


// Sincroniza o banco de dados ao iniciar
db.sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados. Tabelas prontas! 🔄');
});


// 4. Exportação (continua igual)
module.exports = app;