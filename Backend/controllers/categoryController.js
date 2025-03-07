const Category = require('../models/Category');

const list = async (req, res) => {
  const categories = (await Category.findAll()).map(category => category.toJSON());
  res.json(categories);
}

const add = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Las categorías sólo pueden crearse por un administrador' });
  } else {
    let category = {
      name: req.body.name,
      description: req.body.description
    }
    
    category = await Category.create(category);
    res.json(category.toJSON());
  }
}

const update = async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Las categorías sólo pueden modificarse por un administrador' });
  } else {
    category.update({
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId
    });
  
    res.json(category.toJSON());
  }
}

const deleteCategory = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Las categorías sólo pueden eliminarse por un administrador' });
  } else {
    const category = await Category.findByPk(req.params.id);
    await category.destroy();
  
    res.json(category .toJSON());
  }
}

module.exports = { list, add, update, deleteCategory };