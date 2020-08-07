const router = require('express').Router()
const {Product} = require('../db/models')
const _ = require('lodash')
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

// add a new product to the database
router.post('/', async (req, res, next) => {
  try {
    // ensure that nothing sinister is being injected into db
    const props = ['name', 'description', 'price', 'quantity', 'imageUrl']
    const obj = req.body
    const product = await Product.create(_.pick(obj, props))
    res.status(200).json(product)
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

// delete product by id
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
