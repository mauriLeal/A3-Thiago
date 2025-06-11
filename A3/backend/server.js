const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuarios');
const restaurantesRoutes = require('./routes/restaurantes');
const produtosRoutes = require('./routes/produtos');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/usuarios', usuariosRoutes);
app.use('/restaurantes', restaurantesRoutes);
app.use('/produtos', produtosRoutes);

app.listen(3001, () => {
  console.log('Servidor backend rodando em http://localhost:3001');
});