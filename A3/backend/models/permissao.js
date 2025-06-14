module.exports = (sequelize, DataTypes) => {
  const Permissao = sequelize.define('Permissao', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'permissoes',
    timestamps: false
  });

  Permissao.associate = (models) => {
    // Exemplo de associação comum: Uma permissão pode pertencer a vários grupos,
    // e um grupo pode ter várias permissões (relação N:M).
    Permissao.belongsToMany(models.Grupo, {
      through: 'grupo_permissao', // Nome da tabela de junção
      foreignKey: 'permissaoId',
      as: 'grupos'
    });
  };

  return Permissao;
};