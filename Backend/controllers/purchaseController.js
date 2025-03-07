const Purchase = require('../models/Purchase');

const purchaseProducts = async (req, res) => {
  let purchases = req.body.map(product => ({
    productId: product.id,
    userId: req.user.id
  }));

  purchases = await Purchase.bulkCreate(purchases);
  res.json(purchases.map(purchase => purchase.toJSON()));
}

const listForLoggedUser =  async (req, res) => {
  let purchases = await Purchase.findAll({
    where: {
      userId: req.user.id
    },
    include: 'product'});

  res.json(purchases.map(purchase => purchase.toJSON()));  
}

module.exports = { purchaseProducts, listForLoggedUser };