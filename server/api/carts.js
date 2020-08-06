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

router.get('/:userId/currentCart/', async (req, res, next) => {
  try {
    //current cart (i.e. order in progress)
    const order = await Order.findAll({
      include: {all: true},
      where: {
        id: req.params.userId,
        status: 'InProgress'
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/currentCart/:productId', async (req, res, next) => {
  try {
    //current cart in progress
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'InProgress'
      }
    })

    const addToCart = await OrderItem.create({
      productId: req.params.productId,
      orderId: order[0].id
    })
    res.json(addToCart)
  } catch (err) {
    next(err)
  }
})
