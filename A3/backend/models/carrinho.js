module.exports = (sequelize, DataTypes) => {
  const Carrinho = sequelize.define('Carrinho', {
    // O carrinho pode ser associado a um usuário (cliente)
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ABERTO', 'FINALIZADO'),
      defaultValue: 'ABERTO',
      allowNull: false
    }
  }, {
    tableName: 'carrinhos',
    timestamps: true
  });

  Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Usuario, { foreignKey: 'clienteId', as: 'cliente' });
    Carrinho.hasMany(models.ItemCarrinho, { foreignKey: 'carrinhoId', as: 'itens' });
  };

  return Carrinho;
};
