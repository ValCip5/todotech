const express = require('express');
const { register, login, verify } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register)
  .post('/login', login)
  .post('/verify', authMiddleware, verify);

module.exports = router;