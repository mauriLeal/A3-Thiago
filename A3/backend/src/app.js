const express = require('express');
const db = require('../models');
const usuarioRoutes = require('../routes/usuarios');
// 1. Importação das rotas que vamos usar
const authRoutes = require('../routes/authRoutes');
const pedidoRoutes = require('../routes/pedidos');
const carrinhoRoutes = require('../routes/carrinhos');

const app = express();

// 2. Configuração de Middlewares
// Este middleware é essencial para que sua API consiga entender o formato JSON
// que será enviado no corpo das requisições POST, PUT, etc.
app.use(express.json());

// 3. Conexão das Rotas
// Aqui dizemos ao Express: "Toda requisição que começar com '/auth', 
// deve ser gerenciada pelo nosso 'authRoutes'".
app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/carrinhos', carrinhoRoutes);
app.use('/usuarios', usuarioRoutes);
// Rota principal para um teste rápido de saúde da API
app.get('/', (req, res) => {
    res.send('API de Delivery de Comida está no ar! 🚀');
});


// Sincroniza o banco de dados ao iniciar
db.sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados. Tabelas prontas! 🔄');
});


// 4. Exportação
// Exportamos a aplicação configurada para que o server.js possa usá-la.
module.exports = app;