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
        userId: req.params.userId,
        status: 'InProgress'
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/currentCart/checkout', async (req, res, next) => {
  try {
    //current cart in progress
    const order = await Order.findAll({
      include: {
        all: true
      },
      where: {
        userId: req.params.userId,
        status: 'InProgress'
      }
    })

    //make sure that you're not trying to check out more than what we have in inventory
    let outOfStockItems = []

    order[0].dataValues.products.forEach(item => {
      if (item.quantity < item.orderItem.quantity) {
        outOfStockItems.push(item)
      }
    })

    res.json(outOfStockItems)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/currentCart/checkout', async (req, res, next) => {
  try {
    //current cart in progress
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'InProgress'
      }
    })

    //create array of all items to be checked out
    const checkoutItems = Array.from(
      await OrderItem.findAll({
        where: {
          orderId: order[0].id
        }
      })
    )

    //update all inventory items
    checkoutItems.forEach(async item => {
      let product = await Product.findAll({
        where: {
          id: item.productId
        }
      })

      await Product.update(
        {
          quantity: product[0].quantity - item.quantity
        },
        {
          where: {
            id: item.productId
          }
        }
      )
    })

    //changes cart status to Complete
    // await Order.update(
    //   {
    //     status: 'Complete',
    //   },
    //   {
    //     where: {
    //       id: order[0].id,
    //     },
    //   }
    // )

    //create a new cart that's status InProgress
    // await Order.create({
    //   userId: req.params.userId,
    // })

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.post(
  '/:userId/currentCart/product/:productId',
  async (req, res, next) => {
    try {
      //current cart in progress
      const order = await Order.findAll({
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      await OrderItem.create({
        productId: req.params.productId,
        orderId: order[0].id
      })
      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:userId/currentCart/product/:productId/quantity/:quantity',
  async (req, res, next) => {
    try {
      //current cart in progress
      const order = await Order.findAll({
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      await OrderItem.update(
        {
          quantity: req.params.quantity
        },
        {
          where: {
            orderId: order[0].id,
            productId: req.params.productId
          }
        }
      )
      res.sendStatus(202)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  '/:userId/currentCart/product/:productId',
  async (req, res, next) => {
    try {
      const order = await Order.findAll({
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      await OrderItem.destroy({
        where: {
          orderId: order[0].id,
          productId: req.params.productId
        }
      })

      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  }
)
