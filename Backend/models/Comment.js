const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
});

module.exports = Comment;