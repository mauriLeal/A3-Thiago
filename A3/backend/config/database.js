// config/database.js

const { Sequelize } = require('sequelize');
const path = require('path'); // Importa o módulo 'path', essencial para manipular caminhos

// --- AQUI ESTÁ A MÁGICA ---
// Nós vamos construir o caminho completo e absoluto para o arquivo do banco de dados
const storagePath = path.join(
  __dirname,              // Pega o caminho absoluto da pasta atual (que é a pasta 'config')
  '..',                   // Volta um nível de pasta (para a pasta 'backend')
  'database',             // Entra na pasta 'database'
  'database.sqlite'       // Aponta para o nome do arquivo
);

// Cria a instância do Sequelize para SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,  // ✅ Usa o caminho absoluto que acabamos de construir
  logging: false,        // Desativa os logs de SQL no console para não poluir
});

// Exporta a instância para ser usada em outros lugares
module.exports = sequelize;