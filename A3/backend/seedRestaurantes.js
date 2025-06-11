const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.sqlite');

const restaurantes = [
  { nome: 'Hamburguer do Chefe', descricao: 'Hambúrguer artesanal, smash, combos e fritas.', categoria: 'Hamburgueria' },
  { nome: 'Pizzaria do Seu Zé', descricao: 'Pizzas artesanais, sabores tradicionais e especiais.', categoria: 'Pizzaria' },
  { nome: 'Marmita Saudavel', descricao: 'Marmitas fitness, low carb, saladas e shakes.', categoria: 'Marmitaria' }
];

restaurantes.forEach(restaurante => {
  db.run(
    'INSERT INTO restaurantes (nome, descricao, categoria) VALUES (?, ?, ?)',
    [restaurante.nome, restaurante.descricao, restaurante.categoria],
    function (err) {
      if (err) {
        console.error('Erro ao inserir restaurante:', restaurante.nome, err.message);
      } else {
        console.log('Restaurante inserido:', restaurante.nome);
      }
    }
  );
});

db.close();