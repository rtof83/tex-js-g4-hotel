const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Accommodation = conn.define('accommodation', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
     allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Accommodation;
