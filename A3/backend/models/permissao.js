const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permissao = sequelize.define('Permissao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'permissoes',
  timestamps: false
});

module.exports = Permissao;
