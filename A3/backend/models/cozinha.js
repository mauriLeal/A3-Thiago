const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cozinha = sequelize.define('Cozinha', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'cozinhas',
    timestamps: false,
  });

  return Cozinha;
};
