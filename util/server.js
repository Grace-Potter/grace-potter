const {green} = require('chalk')

const handle404 = (trueFalse, message, status) => {
  if (!trueFalse) {
    const err = new Error(message || 'Not Found')
    err.status = status || 404
    throw err
  }
}

const checkUser = (req, res, next) => {
  const user = req.user
  const reqId = req.params.userId
  if (user && user.id === reqId) {
    next()
  } else {
    const err = new Error('Access Denied')
    err.status = 401
    next(err)
  }
}

const checkAdmin = (req, res, next) => {
  const user = req.user
  if (user && user.isAdmin) {
    next()
  } else {
    const err = new Error('Access Denied')
    err.status = 401
    next(err)
  }
}

const userOrAdmin = (req, res, next) => {
  const user = req.user
  const reqId = req.params.userId
  if (user && (user.id === reqId || user.isAdmin)) {
    next()
  } else {
    const err = new Error('Access Denied')
    err.status = 401
    next(err)
  }
}

module.exports = {
  handle404,
  checkAdmin,
  checkUser,
  userOrAdmin
}
