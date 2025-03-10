require('dotenv').config();

// Sequelize
const initDatabase = require('./initDatabase');
initDatabase(true); // Poner en false si no se quiere reiniciar la BD al iniciar el server

// Express
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const authRoutes = require('./routes/auth'); // Rutas de autenticación
const productRoutes = require('./routes/products'); // Rutas de productos
const purchaseRoutes = require('./routes/purchases'); // Rutas de compras
const categoryRoutes = require('./routes/categories'); // Rutas de categorías
const userRoutes = require('./routes/users'); // Rutas de usuarios
const commentRoutes = require('./routes/comments') // Rutas de comentarios

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})