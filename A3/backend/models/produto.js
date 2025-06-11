const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const produto = sequelize.define('Produto', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'produtos',
  timestamps: true
});

module.exports = produto;