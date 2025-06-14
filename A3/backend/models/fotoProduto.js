// models/FotoProduto.js

// A função é envolvida em 'module.exports' e recebe 'sequelize' e 'DataTypes'
module.exports = (sequelize, DataTypes) => {
  
  // 1. O modelo é definido aqui dentro
  const FotoProduto = sequelize.define('FotoProduto', {
    nomeArquivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tamanho: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // A coluna 'produtoId' foi removida daqui, pois será criada pela associação
  }, {
    tableName: 'fotos_produto',
    timestamps: true
  });

  // 2. O bloco de associação é adicionado
  FotoProduto.associate = (models) => {
    // Isto cria a coluna 'produtoId' e define a relação com o modelo 'Produto'
    FotoProduto.belongsTo(models.Produto, {
      foreignKey: 'produtoId'
    });
  };

  // 3. A função retorna o modelo
  return FotoProduto;
};