const Product = require('../models/Product');

const list = async (req, res) => {
  const products = (await Product.findAll({include: ['category', 'user']})).map(product => product.toJSON());
  res.json(products);
}

const find = async (req, res) => {
  const product = (await Product.findByPk(req.params.id, {include: ['comments']})).toJSON();
  res.json(product);
}

const add = async (req, res) => {
  let product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
    userId: req.user.id
  }

  product = await Product.create(product);
  res.json(product.toJSON());
}

const update = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (product.userId !== req.user.id) {
    res.status(401).json({ error: 'Modificación de producto no autorizada' });
  } else {
    product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId
    });
  
    res.json(product.toJSON());
  }
}

module.exports = { list, find, add, update };