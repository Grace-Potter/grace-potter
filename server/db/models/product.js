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
User Class Methods
1. Check user cookie to see if user is logged in.
2. If user is logged in use oauth credentials if not then check if there is a guestId X
3. If there is not guesdtId then generate id. If guestId exists then use guestId. X
4. When a user logs in, remove guestId and use userId. X We don't remove it, we just refer to the action.user instead of local storage
THINGS TO CONSIDER:
  - make sure to always generate a unique guestId
  - where would we build this logic? (thinking front end)
  - should we have a separate guest table?

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
