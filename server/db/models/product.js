const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
    // allowNull: false,
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
    // allowNull: false,
    // validate: {
    //   isEmpty: false,
    // },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product

/*
Order Class Methods
1. checking if there is an inProgress cart, if not create a new cart with status inProgress
2. When new cart is created add to order_items table

Order Item Class
order_id
product_id
quantity
total price

Products Class Methods
1. Add product to current inProgress cart(order). - Checking for newest order_id.
2. Pass along quantity and price. calculate total price.
3. After a cart (order) status is changed to complete, create a new cart and set status to inProgress
*/
