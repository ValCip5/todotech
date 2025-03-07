const User = require('../models/User');
const Comment = require('../models/Comment');
const { Op } = require('sequelize');

const list = async (req, res) => {
  const where = !req.query.username ? {} : {
    where: {
      username: {
        [Op.like]: `%${req.query.username}%`,
      }
    }
  };

  const users = (await User.findAll(where)).map(category => category.toJSON());
  res.json(users);
}

const find = async (req, res) => {
  const user = (await User.findByPk(req.params.id, {include: [
    {
    model: Comment,
    as: 'comments',
    include: ['product']
  }]})).toJSON();
  res.json(user);
}

const deleteUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Las usuarios sólo pueden eliminarse por un administrador' });
  } else {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
  
    res.json(user.toJSON());
  }
}

module.exports = { list, deleteUser, find };