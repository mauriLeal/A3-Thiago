// É uma boa prática instalar o bcryptjs: npm install bcryptjs
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    timestamps: true,
    hooks: {
      // Hook para criptografar a senha antes de criar um novo usuário
      beforeCreate: async (usuario) => {
        if (usuario.senha) {
          usuario.senha = await bcrypt.hash(usuario.senha, 8);
        }
      },
      // Hook para criptografar a senha antes de atualizar um usuário
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          usuario.senha = await bcrypt.hash(usuario.senha, 8);
        }
      }
    }
  });

  Usuario.associate = (models) => {
    // Relação com Pedidos (Um-para-Muitos)
    // Um usuário (cliente) pode fazer vários pedidos.
    Usuario.hasMany(models.Pedido, {
      foreignKey: 'clienteId',
      as: 'pedidos'
    });

    // Relação com Avaliações (Um-para-Muitos)
    // Um usuário pode fazer várias avaliações.
    Usuario.hasMany(models.Avaliacao, {
      foreignKey: 'usuarioId',
      as: 'avaliacoes'
    });

    // Relação com Grupos (Muitos-para-Muitos)
    // Um usuário pode pertencer a vários grupos de permissão.
    Usuario.belongsToMany(models.Grupo, {
      through: 'usuario_grupo', // Tabela de junção
      foreignKey: 'usuarioId',
      as: 'grupos'
    });
  };

  return Usuario;
};