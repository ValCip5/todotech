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
  }
}, {
  freezeTableName: true,
});

module.exports = Product;