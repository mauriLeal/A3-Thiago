// backend/seedProdutos.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.sqlite');

// Substitua os IDs conforme o resultado do passo 1
const produtos = [
  // Hamburguer do Chefe (id: 1)
  { nome: 'Hambúrguer Artesanal Duplo Bacon', preco: 23.90, descricao: 'Hambúrguer artesanal, bacon, cheddar, pão brioche.', restaurante_id: 1 },
  { nome: 'Smash Burguer Artesanal Bacon', preco: 28.90, descricao: 'Smash burger artesanal, bacon, cheddar.', restaurante_id: 1 },
  { nome: 'Combo Smash Triplo', preco: 43.90, descricao: 'Três smash burgers, cheddar, cebola caramelizada.', restaurante_id: 1 },
  { nome: 'Hamburguer Artesanal e Fritas', preco: 40.00, descricao: 'Hambúrguer artesanal com fritas.', restaurante_id: 1 },

  // Pizzaria do Seu Zé (id: 2)
  { nome: 'Calabresa do Seu Zé', preco: 31.00, descricao: 'Pizza de calabresa, muçarela, cebola.', restaurante_id: 2 },
  { nome: 'Brócolis com Alho Crocante', preco: 34.90, descricao: 'Pizza de brócolis, alho, muçarela.', restaurante_id: 2 },
  { nome: 'Pizza 4 queijos do Seu Zé', preco: 72.90, descricao: 'Pizza quatro queijos: muçarela, parmesão, gorgonzola, catupiry.', restaurante_id: 2 },
  { nome: 'Pizza Marguerita', preco: 45.00, descricao: 'Pizza marguerita: tomate, muçarela, manjericão.', restaurante_id: 2 },

  // Marmita Saudavel (id: 3)
  { nome: 'Marmita Fitness Frango Grelhado', preco: 24.90, descricao: 'Frango grelhado, arroz integral, legumes.', restaurante_id: 3 },
  { nome: 'Marmita Low Carb', preco: 24.90, descricao: 'Carne/frango acebolado, couve-flor, abobrinha, brócolis.', restaurante_id: 3 },
  { nome: 'Shake Proteico de Chocolate', preco: 15.90, descricao: 'Whey protein, banana, pasta de amendoim.', restaurante_id: 3 },
  { nome: 'Salada com Pedaços Frango', preco: 22.90, descricao: 'Salada com frango grelhado e molho especial.', restaurante_id: 3 }
];

produtos.forEach(produto => {
  db.run(
    'INSERT INTO produtos (nome, preco, descricao, restaurante_id) VALUES (?, ?, ?, ?)',
    [produto.nome, produto.preco, produto.descricao, produto.restaurante_id],
    function (err) {
      if (err) {
        console.error('Erro ao inserir produto:', produto.nome, err.message);
      } else {
        console.log('Produto inserido:', produto.nome);
      }
    }
  );
});

db.close();