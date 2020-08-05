const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//JA: Currently retrieves all items even if the item is out of stock. Will have to decide if this is expected.""
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
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
