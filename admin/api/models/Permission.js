const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Permission = conn.define('permission', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
});

module.exports = Permission;
