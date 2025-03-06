const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, find, add, update } = require('../controllers/productController');

const router = express.Router();

router.get('/', list)
  .get('/:id', find)
  .post('/', authMiddleware, add)
  .put('/:id', authMiddleware, update);

module.exports = router;