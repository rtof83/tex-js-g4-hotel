const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Accommodation = require('./Accommodation');
const Coupon = require('./Coupon');
const User = require('./User');

const Reservation = conn.define('reservation', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  checkin: {
    type: Sequelize.DATE,
    allowNull: false
  },
  checkout: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dateConfirm: {
    type: Sequelize.DATE
  },
  subTotal: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  }
});

Reservation.belongsTo(Accommodation, {
    constraint: true,
    foreignKey: 'accommodationId'
});

Reservation.belongsTo(User, {
    constraint: true,
    foreignKey: 'userId'
});

Reservation.belongsTo(Coupon, {
    constraint: true,
    foreignKey: 'couponId'
});

module.exports = Reservation;
