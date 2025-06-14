module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define('ItemPedido', {
    quantidade: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    precoUnitario: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    precoTotal: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    observacao: { 
      type: DataTypes.STRING, 
      allowNull: true 
    }
  }, {
    tableName: 'itens_pedido',
    timestamps: false
  });

  ItemPedido.associate = (models) => {
    ItemPedido.belongsTo(models.Pedido, { foreignKey: 'pedidoId' });
    ItemPedido.belongsTo(models.Produto, { foreignKey: 'produtoId' });
  };

  return ItemPedido;
};