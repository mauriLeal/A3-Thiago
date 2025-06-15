// 1. Importa a aplicação Express totalmente configurada do arquivo app.js
const app = require('./app');

// 2. Define a porta em que o servidor irá escutar.
// Ele tenta pegar a porta de uma variável de ambiente (útil para produção/deploy)
// ou usa a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// 3. Inicia o servidor.
// O método .listen() "liga" o servidor e o faz esperar por conexões na porta definida.
app.listen(PORT, () => {
  // Esta função de callback é executada assim que o servidor está no ar com sucesso.
  // Ela serve para nos dar um feedback visual no console.
  console.log(`Servidor rodando na porta ${PORT}. Acesse em http://localhost:${PORT} 🚀`);
});