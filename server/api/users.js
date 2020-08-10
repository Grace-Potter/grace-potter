const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
const {handle404, checkAdmin} = require('../../util/server')
module.exports = router

router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get single user including associated orders
router.get('/:userId', checkAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: {
        model: Order
      }
    })
    handle404(user)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})
