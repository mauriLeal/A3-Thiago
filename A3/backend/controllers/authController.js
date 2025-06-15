// Importa o nosso objeto 'db' que contém a instância do sequelize
const db = require('../models'); 
const bcrypt = require('bcryptjs');

// Função para o caso de uso: "Cadastro do usuário"
exports.cadastrar = async (req, res) => {
  try {
    // 1. Extrair dados do corpo da requisição (o JSON enviado pelo cliente)
    const { nome, email, senha } = req.body;

    // 2. Validar se os dados essenciais foram recebidos
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        error: 'Requisição inválida. Por favor, forneça nome, email e senha.' 
      });
    }

    // 3. Verificar se o e-mail já existe no banco para evitar duplicados
    const sqlSelect = 'SELECT id FROM usuarios WHERE email = ? LIMIT 1';
    const [usuariosExistentes] = await db.sequelize.query(sqlSelect, {
      replacements: [email],
      type: db.sequelize.QueryTypes.SELECT
    });

    if (usuariosExistentes) {
      // Usamos o status 409 Conflict para indicar que o recurso já existe
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    // 4. Criptografar a senha antes de salvar (NUNCA salve senhas em texto puro)
    // O '10' é o "custo" do hash, um bom valor padrão de segurança.
    const senhaHash = await bcrypt.hash(senha, 10);
    const now = new Date(); // Para os campos createdAt e updatedAt

    // 5. Inserir o novo usuário no banco de dados usando SQL puro
    const sqlInsert = `
      INSERT INTO usuarios (nome, email, senha, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?)
    `;

    // A query de INSERT retorna um array [id, numeroDeLinhasAfetadas]
    const [userId] = await db.sequelize.query(sqlInsert, {
      replacements: [nome, email, senhaHash, now, now],
      type: db.sequelize.QueryTypes.INSERT
    });

    // 6. Enviar a resposta de sucesso
    // Retornamos o status 201 Created, que é o correto para criação de recursos.
    // Enviamos de volta os dados do usuário criado (sem a senha, claro).
    res.status(201).json({
      id: userId,
      nome: nome,
      email: email
    });

  } catch (error) {
    // Em caso de qualquer outro erro, enviamos uma resposta genérica de erro do servidor
    console.error('Erro no cadastro de usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro inesperado no servidor.' });
  }
};