// models/endereco.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Endereco = sequelize.define('Endereco', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cep: { type: DataTypes.STRING, allowNull: false },
  logradouro: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.STRING, allowNull: true },
  complemento: { type: DataTypes.STRING, allowNull: true },
  bairro: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'enderecos',
  timestamps: true,
});

Endereco.associate = (models) => {
  Endereco.belongsTo(models.Cidade, { foreignKey: 'cidadeId' });
  // Um endereço pode estar em muitos pedidos
  Endereco.hasMany(models.Pedido, { as: 'enderecoEntrega', foreignKey: 'enderecoId' });
};

return Endereco;