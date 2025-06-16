// models/cidade.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ Nome do modelo com 'C' maiúsculo
const Cidade = sequelize.define('Cidade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // A chave estrangeira 'estadoId' será adicionada pela associação
}, {
  tableName: 'cidades',
  timestamps: false,
});

// Define as associações deste modelo
Cidade.associate = (models) => {
  // Uma Cidade pertence a um Estado
  Cidade.belongsTo(models.Estado, { foreignKey: 'estadoId' });
  // Uma Cidade pode ter muitos Endereços
  Cidade.hasMany(models.Endereco, { foreignKey: 'cidadeId' });
};

// ✅ Exportação correta no final
return Cidade;