const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Permission = require('./Permission');

const User = conn.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(26),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  lastLogin: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
});

User.belongsTo(Permission, {
    constraint: true,
    foreignKey: 'permissionId'
});

module.exports = User;
