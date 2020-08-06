const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'InProgress'
  }
})

module.exports = Order

/*
Order Class Methods
1. checking if there is an inProgress cart, if not create a new cart with status inProgress
2. When new cart is created add to order_items table

*/
