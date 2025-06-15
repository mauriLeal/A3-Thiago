module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    codigo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    taxaFrete: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('CRIADO', 'CONFIRMADO', 'ENTREGUE', 'CANCELADO'),
      defaultValue: 'CRIADO',
      allowNull: false
    },
    dataConfirmacao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dataEntrega: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dataCancelamento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'pedidos',
    timestamps: true
  });

  Pedido.associate = (models) => {
    // Relação com o usuário que fez o pedido
    Pedido.belongsTo(models.Usuario, { foreignKey: 'clienteId', as: 'cliente' });
    
    // Relação com o restaurante que recebeu o pedido
    Pedido.belongsTo(models.Restaurante, { foreignKey: 'restauranteId' });

    // Relação com a forma de pagamento utilizada
    Pedido.belongsTo(models.FormaPagamento, { foreignKey: 'formaPagamentoId' });

    // Relação com os itens do pedido
    Pedido.hasMany(models.ItemPedido, { foreignKey: 'pedidoId', as: 'itens' });
  };

  return Pedido;
};