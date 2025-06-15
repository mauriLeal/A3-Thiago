// models/estado.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ Nome do modelo com 'E' maiúsculo
const Estado = sequelize.define('Estado', {
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
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'estados',
  timestamps: false,
});

// Define as associações deste modelo
Estado.associate = (models) => {
  // Um Estado pode ter muitas Cidades
  Estado.hasMany(models.Cidade, { foreignKey: 'estadoId' });
};

// ✅ Exportação correta no final
return Estado;