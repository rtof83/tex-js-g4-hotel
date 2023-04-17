const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Service = conn.define('service', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(80),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  detail: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  }
});

module.exports = Service;
