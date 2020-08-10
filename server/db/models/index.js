const User = require('./user')
const Product = require('./Product')
const Order = require('./Order')
const OrderItem = require('./orderItem')
const Category = require('./category')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  Category
}
