// models/Cozinha.js

// O 'DataTypes' também é passado como argumento pela função, então não precisa do require.
const { DataTypes } = require('sequelize');

// A estrutura correta é exportar UMA função que recebe sequelize e DataTypes
module.exports = (sequelize, DataTypes) => { 
   const Cozinha = sequelize.define('Cozinha', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false
},
  }, {
    tableName: 'cozinhas',
    timestamps: false,
 });

  // Bloco para definir as associações do modelo Cozinha
  Cozinha.associate = (models) => {
    // Exemplo: Uma Cozinha TEM MUITOS Restaurantes
    Cozinha.hasMany(models.Restaurante, {
      foreignKey: 'cozinhaId',
      as: 'restaurantes'
    });
  };

  // A função precisa RETORNAR o modelo definid
  return Cozinha; 
};

// REMOVA a linha "module.exports = Cozinha;" daqui de baixo.