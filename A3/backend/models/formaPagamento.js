const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FormaPagamento = sequelize.define('FormaPagamento', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'formas_pagamento',
    timestamps: false,
  });

  return FormaPagamento;
};
