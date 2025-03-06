require('dotenv').config();

// Sequelize
const initDatabase = require('./initDatabase');
initDatabase(); // Comentar si no se quiere reiniciar la BD al iniciar el server

// Express
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const authRoutes = require('./routes/auth'); // Rutas de autenticación
const productRoutes = require('./routes/products'); // Rutas de productos
const categoryRoutes = require('./routes/categories'); // Rutas de categorías

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})