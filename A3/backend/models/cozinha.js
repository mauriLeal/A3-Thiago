// models/cozinha.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ O nome aqui deve ser 'Cozinha', com 'C' maiúsculo.
const Cozinha = sequelize.define('Cozinha', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'cozinhas',
  timestamps: false, // Geralmente tabelas de domínio simples não precisam de timestamps
});

// Define a associação inversa (boa prática)
Cozinha.associate = (models) => {
  // Uma Cozinha pode ter vários Restaurantes
  Cozinha.hasMany(models.Restaurante, { foreignKey: 'cozinhaId' });
};

// ✅ A exportação no final deve estar correta
return Cozinha;