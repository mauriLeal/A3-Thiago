// models/Restaurante.js

module.exports = (sequelize, DataTypes) => {
  const Restaurante = sequelize.define('Restaurante', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxaFrete: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    aberto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    // As colunas 'cozinhaId' e outras chaves estrangeiras
    // serão criadas automaticamente pelas associações.
  }, {
    tableName: 'restaurantes',
    timestamps: true
  });

  Restaurante.associate = (models) => {
    // Relação com Endereco (Um-para-Um)
    Restaurante.hasOne(models.Endereco, {
      foreignKey: 'restauranteId',
      as: 'endereco'
    });
    
    // Relação com Cozinha (Muitos-para-Um)
    // Um restaurante pertence a uma única cozinha.
    Restaurante.belongsTo(models.Cozinha, {
      foreignKey: 'cozinhaId',
      as: 'cozinha'
    });

    // Relação com Produtos (Um-para-Muitos)
    // Um restaurante pode ter vários produtos.
    Restaurante.hasMany(models.Produto, {
      foreignKey: 'restauranteId',
      as: 'produtos'
    });

    // Relação com Pedidos (Um-para-Muitos)
    // Um restaurante pode receber vários pedidos.
    Restaurante.hasMany(models.Pedido, {
        foreignKey: 'restauranteId',
        as: 'pedidos'
    });

    // Relação com Avaliacoes (Um-para-Muitos)
    // Um restaurante pode ter várias avaliações.
    Restaurante.hasMany(models.Avaliacao, {
        foreignKey: 'restauranteId',
        as: 'avaliacoes'
    });

    // Relação com Formas de Pagamento (Muitos-para-Muitos)
    // Um restaurante pode aceitar várias formas de pagamento.
    Restaurante.belongsToMany(models.FormaPagamento, {
        through: 'restaurante_forma_pagamento', // Tabela de junção
        foreignKey: 'restauranteId',
        as: 'formasPagamento'
    });
  };

  return Restaurante;
};