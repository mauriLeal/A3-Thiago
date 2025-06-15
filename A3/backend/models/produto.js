// models/produto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ O nome aqui deve ser 'Produto', com 'P' maiúsculo.
const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT, // TEXT é melhor para descrições longas
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // O Sequelize adiciona a chave estrangeira 'restauranteId' automaticamente
  // por causa da associação definida abaixo.
}, {
  tableName: 'produtos',
  timestamps: true,
});

// Define a associação deste modelo
Produto.associate = (models) => {
  // Um Produto pertence a um Restaurante
  Produto.belongsTo(models.Restaurante, { foreignKey: 'restauranteId' });
};

// ✅ A exportação no final deve estar correta
return Produto;