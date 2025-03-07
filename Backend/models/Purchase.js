const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Purchase = sequelize.define('Purchase', {}, {
  freezeTableName: true,
});

module.exports = Purchase;