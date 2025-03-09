const Product = require('../models/Product');
const Comment = require('../models/Comment');
const Purchase = require('../models/Purchase');
const ProductRecommendation = require('../models/ProductRecommendation');

const list = async (req, res) => {
  const products = (await Product.findAll({include: ['category']})).map(product => product.toJSON());
  res.json(products);
}

const find = async (req, res) => {
  const product = (await Product.findByPk(req.params.id, {include: [
    'category',
    {
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
  }

  product = await Product.create(product);
  res.json(product.toJSON());
}

const update = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Modificación de producto no autorizada' });
  } else {
    await product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId
    });
  
    res.json(product.toJSON());
  }
}

const like = async (req, res) => {

  const [recommendation, created] = await ProductRecommendation.findOrCreate({
    where: { userId: req.user.id, productId: req.params.id },
    defaults: {
      like: true,
      userId: req.user.id,
      productId: req.params.id
    },
  });

  const product = await Product.findByPk(req.params.id);

  let newLikeCount = null;
  let newDislikeCount = null;

  if (!created) {
    if (!recommendation.like) {
      newLikeCount = product.likeCount + 1;
      newDislikeCount = product.dislikeCount - 1;
    }
  } else {
    newLikeCount = product.likeCount + 1;
    newDislikeCount = product.dislikeCount;
  }

  await recommendation.update({
    like: true
  })

  await product.update({
    likeCount: newLikeCount,
    dislikeCount: newDislikeCount
  })

  res.json({
    product: product.toJSON(),
    recommendation: recommendation.toJSON()
  });
}

const dislike = async (req, res) => {

  const [recommendation, created] = await ProductRecommendation.findOrCreate({
    where: { userId: req.user.id, productId: req.params.id },
    defaults: {
      like: false,
      userId: req.user.id,
      productId: req.params.id
    },
  });

  const product = await Product.findByPk(req.params.id);

  let newLikeCount = null;
  let newDislikeCount = null;

  if (!created) {
    if (recommendation.like) {
      newLikeCount = product.likeCount - 1;
      newDislikeCount = product.dislikeCount + 1;
    }
  } else {
    newLikeCount = product.likeCount;
    newDislikeCount = product.dislikeCount + 1;
  }

  await recommendation.update({
    like: false
  })

  await product.update({
    likeCount: newLikeCount,
    dislikeCount: newDislikeCount
  })

  res.json(recommendation.toJSON());
}

const purchase = async (req, res) => {
  const purchase = await Purchase.create({
    productId: req.params.id,
    userId: req.user.id
  })

  res.json(purchase.toJSON());
}

const comment = async (req, res) => {
  const comment = await Comment.create({
    productId: req.params.id,
    userId: req.user.id,
    text: req.body.text
  });

  res.json({ ...comment.toJSON(), user: req.user });
}

const findLoggedUserRecommendation = async (req, res) => {
  const recommendation = await ProductRecommendation.findOne({
    where: { userId: req.user.id, productId: req.params.id },
  });
  res.json(recommendation ? recommendation.toJSON() : null);
}

module.exports = { list, find, add, update, like, dislike, purchase, comment, findLoggedUserRecommendation };