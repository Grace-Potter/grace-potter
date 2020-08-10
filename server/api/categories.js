const router = require('express').Router()
const {Category} = require('../db/models')
const {handle404, checkAdmin} = require('../../util/server')
module.exports = router

// retrieve all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

//retrieve one category
router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findAll({
      include: {all: true},
      where: {
        id: req.params.categoryId
      }
    })
    res.json(category)
  } catch (err) {
    next(err)
  }
})

// add a new category to the database
router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json(category)
  } catch (err) {
    next(err)
  }
})

// update a category
router.put('/:categoryId', checkAdmin, async (req, res, next) => {
  try {
    const [numRowsUpdated, [category]] = await Category.update(req.body, {
      where: {
        id: req.params.categoryId
      },
      returning: true
    })
    handle404(numRowsUpdated)
    res.status(200).json(category)
  } catch (err) {
    next(err)
  }
})

// delete category by id
router.delete('/:categoryId', checkAdmin, async (req, res, next) => {
  try {
    await Category.destroy({where: {id: req.params.categoryId}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
