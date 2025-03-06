const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, add, update } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', list)
  .post('/', authMiddleware, add)
  .put('/:id', authMiddleware, update);

module.exports = router;