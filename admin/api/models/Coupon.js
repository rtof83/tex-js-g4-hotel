const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Coupon = conn.define('coupon', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  expired: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  discount: {
    type: Sequelize.DECIMAL(5,2),
    allowNull: false
  },
  deletedAt: {
    type: Sequelize.DATE
  }
});

module.exports = Coupon;
