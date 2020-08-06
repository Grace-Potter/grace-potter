const router = require('express').Router()
const {Order, Product, OrderItem} = require('../db/models')
module.exports = router

// will use to get history of all orders made by this user Id
//incl. one in progresss
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    }) // || localStorage.cart

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// will use to get the current cart Id

router.get('/:userId/currentCart/:cartId', async (req, res, next) => {
  try {
    //current cart (i.e. order in progress)
    const order = await Order.findAll({
      where: {
        id: req.params.userId,
        status: 'InProgress'
      }
    })

    //a list of Product IDs in the current cart, joined with
    //their product price, description, etc.
    const orderList = await OrderItem.findAll({
      include: {
        model: Product,
        where: {
          orderId: order.id
        }
      }
    }) // || localStorage.cart

    res.json(orderList)
  } catch (err) {
    next(err)
  }
})
