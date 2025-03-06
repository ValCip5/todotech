const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const ProductRecommendation = sequelize.define('ProductRecommendation', {
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  freezeTableName: true,
});

module.exports = ProductRecommendation;