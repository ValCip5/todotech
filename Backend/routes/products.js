const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, find, add, update, like, purchase } = require('../controllers/productController');

const router = express.Router();

router.get('/', list)
  .get('/:id', find)
  .post('/', authMiddleware, add)
  .put('/:id', authMiddleware, update)
  .post(':id/recommendations', authMiddleware, like)
  .post(':id/purchases', authMiddleware, like, purchase);

module.exports = router;