// models/Avaliacao.js

module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define('Avaliacao', {
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    }
    // As colunas 'usuarioId' e 'restauranteId' serão criadas pelas associações
  }, {
    tableName: 'avaliacoes',
    timestamps: true
  });

  // Bloco que define as associações
  Avaliacao.associate = (models) => {
    // Uma Avaliação PERTENCE A UM Usuário
    Avaliacao.belongsTo(models.Usuario, { // Verifique se o nome do modelo é 'Usuario'
      foreignKey: 'usuarioId'
    });

    // Uma Avaliação PERTENCE A UM Restaurante
    Avaliacao.belongsTo(models.Restaurante, {
      foreignKey: 'restauranteId'
    });
  };

  return Avaliacao;
};