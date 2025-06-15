// models/pedido.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ O nome aqui deve ser 'Pedido', com 'P' maiúsculo.
const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'CRIADO', // Exemplo de status inicial
  },
  // As chaves estrangeiras (clienteId, restauranteId, etc.)
  // serão adicionadas automaticamente pelas associações abaixo.
}, {
  tableName: 'pedidos',
  timestamps: true,
});

// Define as associações deste modelo
Pedido.associate = (models) => {
  // Um Pedido pertence a um Cliente (Usuário)
  Pedido.belongsTo(models.Usuario, { as: 'cliente', foreignKey: 'clienteId' });

  // Um Pedido pertence a um Restaurante
  Pedido.belongsTo(models.Restaurante, { foreignKey: 'restauranteId' });
  
  // Um Pedido tem um Endereço de Entrega
  Pedido.belongsTo(models.Endereco, { as: 'enderecoEntrega', foreignKey: 'enderecoId' });

  // Um Pedido tem uma Forma de Pagamento
  Pedido.belongsTo(models.FormaPagamento, { foreignKey: 'formaPagamentoId' });

  // Um Pedido tem muitos Itens de Pedido
  Pedido.hasMany(models.ItemPedido, { as: 'itens', foreignKey: 'pedidoId' });
};

// ✅ A exportação no final deve estar correta
return Pedido;