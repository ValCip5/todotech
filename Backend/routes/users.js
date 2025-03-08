const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, find, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, list)
  .get('/:id', authMiddleware, find)
  .delete('/:id', authMiddleware, deleteUser)

module.exports = router;