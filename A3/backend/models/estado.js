// models/Estado.js

module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define('Estado', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'estados',
    timestamps: false
  });

  // Um Estado pode ter várias cidades associadas a ele.
  Estado.associate = (models) => {
    Estado.hasMany(models.Cidade, {
      foreignKey: 'estadoId',
      as: 'cidades'
    });
  };

  return Estado;
};