const sequelize = require('../database');

const ProductLike = sequelize.define('ProductLike', {}, {
  freezeTableName: true,
});

module.exports = ProductLike;