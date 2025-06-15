module.exports = (sequelize, DataTypes) => {
  const ItemCarrinho = sequelize.define('ItemCarrinho', {
    carrinhoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'itens_carrinho',
    timestamps: false
  });

  ItemCarrinho.associate = (models) => {
    ItemCarrinho.belongsTo(models.Carrinho, { foreignKey: 'carrinhoId' });
    ItemCarrinho.belongsTo(models.Produto, { foreignKey: 'produtoId' });
  };

  return ItemCarrinho;
};
