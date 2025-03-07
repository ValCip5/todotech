const User = require('../models/User');
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

module.exports = { list };