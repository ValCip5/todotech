const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
  comment: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
});

module.exports = Comment;