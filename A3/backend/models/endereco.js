// models/Endereco.js

module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // As colunas 'cidadeId', 'restauranteId' e 'pedidoId'
    // serão criadas automaticamente pelas associações abaixo.
  }, {
    tableName: 'enderecos',
    timestamps: false
  });

  // Define todas as associações deste modelo aqui
  Endereco.associate = (models) => {
    
    // Associação com Restaurante
    Endereco.belongsTo(models.Restaurante, {
      foreignKey: 'restauranteId'
    });

    // Associação com Cidade
    Endereco.belongsTo(models.Cidade, { // Verifique se o nome do modelo é 'Cidade'
      foreignKey: 'cidadeId'
    });

    // Associação com Pedido
    Endereco.belongsTo(models.Pedido, { // Verifique se o nome do modelo é 'Pedido'
      foreignKey: 'pedidoId'
    });
  };

  return Endereco;
};