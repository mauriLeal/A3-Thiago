// models/formaPagamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormaPagamento = sequelize.define('FormaPagamento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descricao: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  tableName: 'formas_pagamento',
  timestamps: false,
});

FormaPagamento.associate = (models) => {
  // Uma forma de pagamento pode ser usada em muitos pedidos
  FormaPagamento.hasMany(models.Pedido, { foreignKey: 'formaPagamentoId' });
};

return FormaPagamento;