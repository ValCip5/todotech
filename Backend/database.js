const { Sequelize} = require('sequelize');

const sequelize = new Sequelize("todotech_supperhot", "todotech_supperhot", "5671f10100fd47f54fb2c05b522ff2ed7ce6eab3", {
  host: "z2d7a.h.filess.io",
  dialect: "mysql", 
  port: 3307
});

module.exports = sequelize;