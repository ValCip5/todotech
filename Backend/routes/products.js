const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { list, find, add, update, like, purchase, comment, findLoggedUserRecommendation } = require('../controllers/productController');

const router = express.Router();

router.get('/', list)
  .get('/:id', find)
  .post('/', authMiddleware, add)
  .put('/:id', authMiddleware, update)
  .post('/:id/like', authMiddleware, like)
  .post('/:id/purchases', authMiddleware, purchase)
  .post('/:id/comment', authMiddleware, comment)
  .get('/:id/recommendation', authMiddleware, findLoggedUserRecommendation);

module.exports = router;