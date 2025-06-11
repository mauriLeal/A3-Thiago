const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('pedido', {
  codigo: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true },
  subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  taxaFrete: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('CRIADO', 'CONFIRMADO', 'ENTREGUE', 'CANCELADO'), defaultValue: 'CRIADO', allowNull: false },
  dataConfirmacao: { type: DataTypes.DATE, allowNull: true },
  dataEntrega: { type: DataTypes.DATE, allowNull: true },
  dataCancelamento: { type: DataTypes.DATE, allowNull: true },
  enderecoCep: { type: DataTypes.STRING, allowNull: false },
  enderecoLogradouro: { type: DataTypes.STRING, allowNull: false },
  enderecoNumero: { type: DataTypes.STRING, allowNull: false },
  enderecoComplemento: { type: DataTypes.STRING, allowNull: true },
  enderecoBairro: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'pedidos', timestamps: true });

module.exports = Pedido;