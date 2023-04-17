const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Banner = conn.define('banner', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  slogan: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});

module.exports = Banner;
