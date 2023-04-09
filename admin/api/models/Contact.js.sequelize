const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Contact = conn.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(80),
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING(9),
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Contact;
