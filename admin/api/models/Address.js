const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const User = require('./User');

const Address = conn.define('address', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  streetName: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  streetNumber: {
    type: Sequelize.INTEGER,
  },
  neighborhood: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  city: {
    type: Sequelize.STRING(80),
    allowNull: false
  },
  state: {
    type: Sequelize.STRING(2),
    allowNull: false
  },
  postCode: {
    type: Sequelize.STRING(8),
    allowNull: false
  }
});

Address.belongsTo(User, {
    constraint: true,
    foreignKey: 'userId'
});

module.exports = Address;
