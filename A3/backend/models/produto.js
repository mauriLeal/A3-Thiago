// models/produto.js

module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // A coluna 'restauranteId' será criada automaticamente pela associação abaixo.
  }, {
    tableName: 'produtos',
    timestamps: false,
  });

  Produto.associate = (models) => {
    // Define que um Produto PERTENCE A UM Restaurante.
    Produto.belongsTo(models.Restaurante, {
      foreignKey: 'restauranteId',
      as: 'restaurante'
    });

    // Define que um Produto PODE TER MUITOS Itens de Pedido.
    Produto.hasMany(models.ItemPedido, {
      foreignKey: 'produtoId',
      as: 'itensPedido'
    });

    // Define que um Produto PODE TER UMA Foto.
    Produto.hasOne(models.FotoProduto, {
        foreignKey: 'produtoId',
        as: 'foto'
    });
  };

  return Produto;
};