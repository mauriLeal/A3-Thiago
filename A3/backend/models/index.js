// models/index.js

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Usando nossa configuração manual para SQLite
const basename = path.basename(__filename);
const db = {};

// Lê todos os arquivos da pasta 'models' dinamicamente
fs
  .readdirSync(__dirname)
  .filter(file => {
    // A condição de filtro garante que pegamos apenas os arquivos de modelo .js
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    // Importa cada modelo e o adiciona ao nosso objeto 'db'
    // Esta linha é diferente da sua, pois nossos modelos não usam o padrão do CLI
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

// Percorre todos os modelos carregados e executa a função 'associate' se ela existir
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona a instância do sequelize e a classe Sequelize ao objeto 'db'
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto 'db' com todos os modelos e a conexão
module.exports = db;