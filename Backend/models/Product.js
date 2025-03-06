const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dislikeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  freezeTableName: true,
});

module.exports = Product;