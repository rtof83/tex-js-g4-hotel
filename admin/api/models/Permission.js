const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const User = require('./User');

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

Permission.belongsTo(User, {
    constraint: true,
    foreignKey: 'permissionId'
});

module.exports = Permission;
