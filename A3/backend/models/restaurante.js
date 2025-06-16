// models/restaurante.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// ✅ O nome aqui deve ser 'Restaurante', com 'R' maiúsculo.
const Restaurante = sequelize.define('Restaurante', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taxaFrete: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Você precisará de uma coluna para o endereço e para a cozinha
  // O Sequelize adiciona 'cozinhaId' e 'enderecoId' automaticamente por causa das associações.
  // Você também precisará de uma coluna para o dono.
  donoId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Supondo que todo restaurante tem um dono
  }
}, {
  tableName: 'restaurantes',
  timestamps: true,
});

// Define as associações deste modelo
Restaurante.associate = (models) => {
  Restaurante.belongsTo(models.Cozinha, { foreignKey: 'cozinhaId' });
  Restaurante.hasMany(models.Produto, { foreignKey: 'restauranteId' });
  Restaurante.hasMany(models.Pedido, { foreignKey: 'restauranteId' });
  Restaurante.belongsTo(models.Usuario, { as: 'dono', foreignKey: 'donoId' });
  // Adicione outras associações aqui...
};

// ✅ A exportação no final deve estar correta
return Restaurante;