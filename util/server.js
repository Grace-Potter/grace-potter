const {green} = require('chalk')

const handle404 = (trueFalse, message, status) => {
  if (!trueFalse) {
    const err = new Error(message || 'Not Found')
    err.status = status || 404
    throw err
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

module.exports = {
  handle404,
  checkAdmin
}
