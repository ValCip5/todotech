const Product = require('../models/Product');
const Comment = require('../models/Comment');

const list = async (req, res) => {
  const products = (await Product.findAll({include: ['category', 'user']})).map(product => product.toJSON());
  res.json(products);
}

const find = async (req, res) => {
  const product = (await Product.findByPk(req.params.id, {include: [
    'user', {
    model: Comment,
    as: 'comments',
    include: ['user']
  }]})).toJSON();
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

const like = async (req, res) => {
  let recommendation = {
    like: true // fijarse el req
  };

  const product = await Product.findByPk(req.params.id);
  res.json(product.toJSON());

  product.update({
    likes: recommendation.like ? product.likes + 1 : product.likes,
    dislikes: recommendation.like ? product.likes : product.dislikes,
  })

  res.json(product.toJSON());
}

module.exports = { list, find, add, update, like };