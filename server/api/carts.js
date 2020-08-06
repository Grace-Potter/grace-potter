const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

//JA: Currently retrieves all items even if the item is out of stock. Will have to decide if this is expected.""
router.get('/:userId', async (req, res, next) => {
  try {
    const products = await Order.findAll({
      where: {
        status: 'InProgress'
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
