const jwt = require('jsonwebtoken')

const { ErrorHandler } = require('../error-handler')

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  const secret = process.env.JWT_SECRET

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new ErrorHandler(401, ['Invalid authorization token'])
      } else {
        req.userId = decoded.id
        next()
      }
    })
  } else {
    throw new ErrorHandler(401, ['Auth token is not supplied'])
  }
}
