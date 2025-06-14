// models/Cidade.js

module.exports = (sequelize, DataTypes) => {
  const Cidade = sequelize.define('Cidade', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // A coluna 'estadoId' será criada pela associação abaixo
  }, {
    tableName: 'cidades',
    timestamps: false
  });

  // AQUI DEFINIMOS AS RELAÇÕES DO MODELO CIDADE
  Cidade.associate = (models) => {
    
    // Relação 1: Uma Cidade PERTENCE A UM Estado.
    // Isso cria a coluna 'estadoId'.
    Cidade.belongsTo(models.Estado, { // ATENÇÃO: O nome do modelo deve ser 'Estado'
      foreignKey: 'estadoId'
    });

    // Relação 2: Uma Cidade TEM MUITOS Endereços.
    // Isso cria a chave estrangeira em 'Endereco'.
    Cidade.hasMany(models.Endereco, {
      foreignKey: 'cidadeId',
      as: 'enderecos'
    });
  };

  return Cidade;
};