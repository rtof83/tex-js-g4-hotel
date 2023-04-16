const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Review = conn.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deletedAt: {
    type: Sequelize.DATE
  }
});

module.exports = Review;
