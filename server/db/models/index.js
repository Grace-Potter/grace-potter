const User = require('./user')
const Product = require('./Product')
const Order = require('./Order')
const OrderItem = require('./orderItem')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
