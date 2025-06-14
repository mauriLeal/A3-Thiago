// models/FormaPagamento.js

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

  // Adicione este bloco para manter o padrão
  FormaPagamento.associate = (models) => {
    // Exemplo de associação: Uma forma de pagamento pode ser usada
    // por vários restaurantes, e vice-versa (relação N:M).
    FormaPagamento.belongsToMany(models.Restaurante, {
      through: 'restaurante_forma_pagamento', // Nome da tabela de junção
      foreignKey: 'formaPagamentoId',
      as: 'restaurantes'
    });
  };

  return FormaPagamento;
};