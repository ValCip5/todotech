const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, list)
  .delete('/:id', authMiddleware, deleteUser)

module.exports = router;