const router = require('express').Router()
const {Product} = require('../db/models')
const _ = require('lodash')
const {cyan} = require('chalk')
const {handle404, checkAdmin} = require('../../util/server')
module.exports = router

// retrieve all items
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// add a new product to the database
router.post('/', checkAdmin, async (req, res, next) => {
  try {
    // ensure that nothing sinister is being injected into db
    const props = [
      'name',
      'description',
      'price',
      'quantity',
      'imageUrl',
      'category'
    ]
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
    handle404(product)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// update a product
router.put('/:productId', checkAdmin, async (req, res, next) => {
  try {
    const props = [
      'name',
      'description',
      'price',
      'quantity',
      'imageUrl',
      'categoryId'
    ]
    const [nRows, [product]] = await Product.update(_.pick(req.body, props), {
      where: {
        id: req.params.productId
      },
      returning: true
    })
    handle404(nRows)
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
})

// delete product by id
router.delete('/:productId', checkAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
