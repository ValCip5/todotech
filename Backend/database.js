const { Sequelize} = require('sequelize');

const sequelize = new Sequelize("todotech", "todotech", "t0d0t3ch", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;