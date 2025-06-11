const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Restaurante = sequelize.define('Restaurante', {
  nome: { type: DataTypes.STRING, allowNull: false },
  taxaFrete: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  aberto: { type: DataTypes.BOOLEAN, defaultValue: false },
  ativo: {type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'restaurantes', timestamps: true });

module.exports = Restaurante;


