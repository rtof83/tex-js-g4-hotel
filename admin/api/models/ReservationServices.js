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
