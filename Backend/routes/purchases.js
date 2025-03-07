const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const { purchaseProducts, listForLoggedUser } = require('../controllers/purchaseController');

const router = express.Router();

router.post('/', authMiddleware, purchaseProducts)
  .get('/myPurchases', authMiddleware, listForLoggedUser);

module.exports = router;