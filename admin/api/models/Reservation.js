const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

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
    type: Sequelize.DATE,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
     allowNull: false
  }
});

// Accommodation.belongsTo(Tag, {
//     constraint: true,
//     foreignKey: 'tagId'
// });

module.exports = Reservation;
