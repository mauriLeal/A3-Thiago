// models/itemPedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemPedido = sequelize.define('ItemPedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  precoUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  precoTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  tableName: 'itens_pedido',
  timestamps: false,
});

ItemPedido.associate = (models) => {
  // Um item de pedido pertence a um Pedido
  ItemPedido.belongsTo(models.Pedido, { foreignKey: 'pedidoId' });
  // Um item de pedido se refere a um Produto
  ItemPedido.belongsTo(models.Produto, { foreignKey: 'produtoId' });
};

return ItemPedido;