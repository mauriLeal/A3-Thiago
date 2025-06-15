// models/usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ O nome aqui deve ser 'Usuario', com 'U' maiúsculo.
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante que não haja e-mails duplicados
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true, // ou false, dependendo da sua preferência
});

// Define as associações (mesmo que não tenha nenhuma por enquanto)
Usuario.associate = (models) => {
  // Exemplo: Um usuário pode ter muitos pedidos
  // Usuario.hasMany(models.Pedido, { foreignKey: 'clienteId' });
  Usuario.hasMany(models.Restaurante, { foreignKey: 'donoId' })
};

// ✅ A exportação no final deve estar correta
return Usuario;