const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  // 2. Verifica se o token existe
  if (!authHeader) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  // O token vem no formato "Bearer <token>". Precisamos separar as duas partes.
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado.' });
  }

  // 3. Valida o token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }

    // 4. Se o token for válido, anexa o ID do usuário à requisição
    req.userId = decoded.id; // O 'id' que colocamos no payload do token
    return next(); // Permite que a requisição continue para o controller
  });
};