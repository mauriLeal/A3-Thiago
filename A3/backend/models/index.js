const sequelize = require('../config/database');


const Usuario = require('./usuario');
const Restaurante = require('./restaurante');
const Cozinha = require('./cozinha');
const Produto = require('./produto');
const Pedido = require('./pedido');
const ItemPedido = require('./itemPedido');
const Avaliacao = require('./avaliacao');
const Estado = require('./estado');
const Cidade = require('./cidade');
const Grupo = require('./grupo');
const Permissao = require('./permissao');
const FormaPagamento = require('./formaPagamento');


Restaurante.belongsTo(Cozinha);
Cozinha.hasMany(Restaurante);

Restaurante.hasMany(Produto);
Produto.belongsTo(Restaurante);

Pedido.belongsTo(Usuario, { as: 'cliente' });
Usuario.hasMany(Pedido, { as: 'pedidos', foreignKey: 'clienteId' });

Pedido.belongsTo(Restaurante);
Restaurante.hasMany(Pedido);

Pedido.belongsTo(FormaPagamento);
FormaPagamento.hasMany(Pedido);

Pedido.hasMany(ItemPedido, { as: 'itens' });
ItemPedido.belongsTo(Pedido);

ItemPedido.belongsTo(Produto);

Avaliacao.belongsTo(Usuario);
Avaliacao.belongsTo(Restaurante);
Restaurante.hasMany(Avaliacao);

Cidade.belongsTo(Estado);
Estado.hasMany(Cidade);

Restaurante.belongsTo(Cidade, { as: 'enderecoCidade', foreignKey: 'enderecoCidadeId' });
Pedido.belongsTo(Cidade, { as: 'enderecoEntregaCidade', foreignKey: 'enderecoEntregaCidadeId' });

Restaurante.belongsToMany(FormaPagamento, { through: 'restaurante_formas_pagamento' });
FormaPagamento.belongsToMany(Restaurante, { through: 'restaurante_formas_pagamento' });

Usuario.belongsToMany(Grupo, { through: 'usuario_grupos' });
Grupo.belongsToMany(Usuario, { through: 'usuario_grupos' });

Grupo.belongsToMany(Permissao, { through: 'grupo_permissoes' });
Permissao.belongsToMany(Grupo, { through: 'grupo_permissoes' });

const db = {
  sequelize,
  Usuario,
  Restaurante,
  Cozinha,
  Produto,
  Pedido,
  ItemPedido,
  Avaliacao,
  Estado,
  Cidade,
  Grupo,
  Permissao,
  FormaPagamento
};

module.exports = db;                                                                        