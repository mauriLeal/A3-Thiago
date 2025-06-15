// controllers/restauranteController.js

const db = require('../models');

/**
 * @description Listar todos os restaurantes
 * @route GET /api/restaurantes
 */
exports.listar = async (req, res) => {
  try {
    const restaurantes = await db.Restaurante.findAll({
      // Inclui a cozinha para mostrar o nome no resultado
      include: [{
        model: db.Cozinha,
        attributes: ['nome']
      }]
    });
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error("Erro ao listar restaurantes:", error);
    res.status(500).json({ error: 'Erro ao buscar restaurantes.' });
  }
};

/**
 * @description Criar um novo restaurante
 * @route POST /api/restaurantes
 * @access Admin
 */
exports.criar = async (req, res) => {
  try {
    // A lógica para criar um restaurante viria aqui...
    const { nome, taxaFrete, cozinhaId, donoId } = req.body;

    const novoRestaurante = await db.Restaurante.create({
      nome,
      taxaFrete,
      cozinhaId,
      donoId, // Supondo que você associe um restaurante a um dono
    });

    res.status(201).json(novoRestaurante);

  } catch (error) {
    console.error("Erro ao criar restaurante:", error);
    res.status(500).json({ error: 'Erro ao criar restaurante.' });
  }
};