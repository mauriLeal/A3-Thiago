const { Sequelize } = require('sequelize');

// 1. Cria uma nova instância do Sequelize, configurada para usar o SQLite.
const sequelize = new Sequelize({
  // O 'dialect' especifica qual banco de dados estamos usando.
  dialect: 'sqlite',

  // O 'storage' é o caminho para o arquivo onde o banco de dados será salvo.
  // './database.sqlite' significa que ele será criado na raiz do seu projeto.
  storage: './database.sqlite',

  // Opcional: Desabilita os logs de cada operação no console.
  // Para depurar a criação das tabelas, você pode mudar para: logging: console.log
  logging: false
});

// 2. Exporta a instância configurada para ser usada em outras partes do projeto,
// principalmente no /src/models/index.js.
module.exports = sequelize;