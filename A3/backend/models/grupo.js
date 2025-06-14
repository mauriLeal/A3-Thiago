module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'grupos',
    timestamps: false
  });

  Grupo.associate = (models) => {
    // Exemplo de associação: Um grupo pode ter muitos usuários.
    Grupo.belongsToMany(models.Usuario, {
      through: 'usuario_grupo',
      foreignKey: 'grupoId',
      as: 'usuarios'
    });
  };

  return Grupo;
};