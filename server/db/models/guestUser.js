const Sequelize = require('sequelize')
const db = require('../db')

const GuestUser = db.define('guestUser', {
  guestUserId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = GuestUser
