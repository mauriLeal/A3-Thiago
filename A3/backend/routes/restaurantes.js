const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

router.get('/', restauranteController.listar);
router.post('/', restauranteController.criar);

module.exports = router;