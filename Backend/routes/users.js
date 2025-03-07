const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list } = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, list)

module.exports = router;