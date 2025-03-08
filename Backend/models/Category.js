const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
});

module.exports = Category;