const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Reservation = require('./Reservation');
const Service = require('./Service');

const ReservationServices = conn.define('reservationServices', {
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
    type: Sequelize.DATE,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dateConfirm: {
    type: Sequelize.DATETIME,
    allowNull: false
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

ReservationServices.belongsTo(Reservation, {
    constraint: true,
    foreignKey: 'reservationId'
});

ReservationServices.belongsTo(Service, {
  constraint: true,
  foreignKey: 'serviceId'
});

module.exports = ReservationServices;
