
const contador = document.getElementById('contador-carrinho');
const carrinhoSidebar = document.getElementById('carrinhoAba');
const lista = document.getElementById('itensCarrinho');
const usuario = JSON.parse(localStorage.getItem('usuario'));



  if (usuario && usuario.nome) {
    document.getElementById('nome-usuario').textContent = `Olá, ${usuario.nome}`;
    document.querySelector('.btn.login').style.display = 'none';
    document.querySelector('.btn.cadastro').style.display = 'none';
     document.getElementById('btn-logout').style.display = 'inline-block';
  }
   document.getElementById('btn-logout').onclick = function() {
    localStorage.removeItem('usuario');
    // Opcional: Limpar carrinho do usuário logado
    // localStorage.removeItem(`carrinho_${usuario.id}`);
    window.location.href = 'formularios/login.html';
  };

// Eventos de abrir/fechar carrinho
document.getElementById('fecharCarrinho').onclick = () => {
  carrinhoSidebar.classList.remove('aberto');
};

function carregarCarrinho() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario) {
    return JSON.parse(localStorage.getItem(`carrinho_${usuario.id}`)) || [];
  }
  return [];
}

function salvarCarrinho(carrinho) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario) {
    localStorage.setItem(`carrinho_${usuario.id}`, JSON.stringify(carrinho));
  }
}

let carrinho = carregarCarrinho();

function abrirCarrinho() {
  carrinhoSidebar.classList.add('aberto');
}

// Função para adicionar item ao carrinho
window.adicionarAoCarrinho = function(nome, preco) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    // Redireciona para login se não estiver logado
    window.location.href = 'formularios/login.html';
    return;
  }
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }
  atualizarCarrinho();
  salvarCarrinho(carrinho);
}

// Função para remover item do carrinho
function removerItem(nome) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.qtd -= 1;
    if (item.qtd <= 0) {
      carrinho = carrinho.filter(i => i.nome !== nome);
    }
  }
  atualizarCarrinho();
  salvarCarrinho(carrinho);
}

function atualizarCarrinho() {
  lista.innerHTML = '';
  let subtotal = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.qtd}x ${item.nome} - R$ ${(item.qtd * item.preco).toFixed(2)}
      <button onclick="removerItem('${item.nome}')">❌</button>
    `;
    lista.appendChild(li);
    subtotal += item.qtd * item.preco;
  });

  contador.textContent = carrinho.reduce((sum, item) => sum + item.qtd, 0);

  const desconto = 0; // ou calcule com base em cupom, se quiser
  const entrega = 5;  // valor fixo ou condicional

  const total = Math.max(0, subtotal - desconto + entrega); // evita total negativo

  const totalSpan = document.getElementById('totalCarrinho');
  if (totalSpan) {
    totalSpan.textContent = total.toFixed(2);
  }
}

atualizarCarrinho();
