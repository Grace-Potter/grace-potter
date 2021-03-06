const router = require('express').Router()
const {Order, Product, OrderItem, GuestUser} = require('../db/models')
const {userOrAdmin} = require('../../util/server')
module.exports = router

// get history of all carts
router.get('/:userId', userOrAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// create cart for new user
router.post('/:userId/newCart/', userOrAdmin, async (req, res, next) => {
  try {
    await Order.create({
      userId: req.params.userId
    })
  } catch (err) {
    next(err)
  }
})

// get current *guest* cart
router.get('/guestCart/:userId/currentCart/', async (req, res, next) => {
  try {
    const guestUser = await GuestUser.findOrCreate({
      where: {
        guestUserId: req.params.userId
      }
    })

    const order = await Order.findOrCreate({
      include: {all: true},
      where: {
        guestUserId: guestUser[0].dataValues.id,
        status: 'InProgress'
      }
    })

    const cart = await Order.findAll({
      include: {all: true},
      where: {
        guestUserId: guestUser[0].dataValues.id,
        status: 'InProgress'
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// get current cart
router.get('/:userId/currentCart/', userOrAdmin, async (req, res, next) => {
  try {
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

// check if all items about to be checked out are in stock
router.get(
  '/:userId/currentCart/checkout',
  userOrAdmin,
  async (req, res, next) => {
    try {
      const order = await Order.findAll({
        include: {
          all: true
        },
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      // return a list of all out of stock items
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
  }
)

// complete checkout
router.put(
  '/:userId/currentCart/checkout',
  userOrAdmin,
  async (req, res, next) => {
    try {
      const order = await Order.findAll({
        include: {
          all: true
        },
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      //update all inventory items
      order[0].dataValues.products.forEach(async item => {
        await Product.update(
          {
            quantity: item.quantity - item.orderItem.quantity
          },
          {
            where: {
              id: item.orderItem.productId
            }
          }
        )
      })

      // changes cart status to Complete
      await Order.update(
        {
          status: 'Complete'
        },
        {
          where: {
            id: order[0].id
          }
        }
      )

      // create a new cart whose status is InProgress
      await Order.create({
        userId: req.params.userId
      })

      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
)

// check if all *guest* items about to be checked out are in stock
router.get(
  '/guestCart/:userId/currentCart/checkout',
  async (req, res, next) => {
    try {
      const guestUser = await GuestUser.findAll({
        where: {
          guestUserId: req.params.userId
        }
      })

      const order = await Order.findAll({
        include: {
          all: true
        },
        where: {
          guestUserId: guestUser[0].dataValues.id,
          status: 'InProgress'
        }
      })

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
  }
)

// complete *guest* checkout
router.put(
  '/guestCart/:userId/currentCart/checkout',
  async (req, res, next) => {
    try {
      const guestUser = await GuestUser.findAll({
        where: {
          guestUserId: req.params.userId
        }
      })

      const order = await Order.findAll({
        include: {
          all: true
        },
        where: {
          guestUserId: guestUser[0].dataValues.id,
          status: 'InProgress'
        }
      })

      //update all inventory items
      order[0].dataValues.products.forEach(async item => {
        await Product.update(
          {
            quantity: item.quantity - item.orderItem.quantity
          },
          {
            where: {
              id: item.orderItem.productId
            }
          }
        )
      })

      // changes cart status to Complete
      await Order.update(
        {
          status: 'Complete'
        },
        {
          where: {
            guestUserId: guestUser[0].dataValues.id
          }
        }
      )

      // create a new cart whose status is InProgress
      await Order.create({
        guestUserId: guestUser[0].dataValues.id
      })

      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
)

// add item to cart
router.post(
  '/:userId/currentCart/product/:productId',
  userOrAdmin,
  async (req, res, next) => {
    try {
      const order = await Order.findAll({
        where: {
          userId: req.params.userId,
          status: 'InProgress'
        }
      })

      await OrderItem.findOrCreate({
        where: {
          productId: req.params.productId,
          orderId: order[0].id
        }
      })

      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
)

// add item to *guest* cart
router.post(
  '/guestCart/:userId/currentCart/product/:productId',
  async (req, res, next) => {
    try {
      const guestUser = await GuestUser.findOrCreate({
        where: {
          guestUserId: req.params.userId
        }
      })

      const order = await Order.findOrCreate({
        include: {all: true},
        where: {
          guestUserId: guestUser[0].dataValues.id,
          status: 'InProgress'
        }
      })

      await OrderItem.findOrCreate({
        where: {
          productId: req.params.productId,
          orderId: order[0].id
        }
      })

      res.sendStatus(201)
    } catch (err) {
      next(err)
    }
  }
)

// update quantity of specific product in cart
router.put(
  '/:userId/currentCart/product/:productId/quantity/:quantity',
  userOrAdmin,
  async (req, res, next) => {
    try {
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

//update quantity of specific product in *guest* cart
router.put(
  '/guestCart/:userId/currentCart/product/:productId/quantity/:quantity',
  async (req, res, next) => {
    try {
      const guestUser = await GuestUser.findAll({
        where: {
          guestUserId: req.params.userId
        }
      })

      const order = await Order.findAll({
        where: {
          guestUserId: guestUser[0].dataValues.id,
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

// delete item from cart
router.delete(
  '/:userId/currentCart/product/:productId',
  userOrAdmin,
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

// delete item from *guest* cart
router.delete(
  '/guestCart/:userId/currentCart/product/:productId',
  async (req, res, next) => {
    try {
      const guestUser = await GuestUser.findAll({
        where: {
          guestUserId: req.params.userId
        }
      })

      const order = await Order.findAll({
        where: {
          guestUserId: guestUser[0].dataValues.id,
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
