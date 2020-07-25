const jwt = require('jsonwebtoken')

const { ErrorHandler } = require('../error-handler')

module.exports = (req, res, next) => {
  console.log('>>>>111')
  let token = req.headers['x-access-token'] || req.headers['authorization']
  const secret = process.env.JWT_SECRET
  console.log('>>>>222')
  if (token) {
      console.log('>>>>333: ',token)
    if (token.startsWith('Bearer ')) {
        console.log('>>>>444', typeof(token))
      token = token.slice(7, token.length)
      console.log('>>>token:', token)
    }

    jwt.verify(token, secret, (err, decoded) => {
      console.log('tokkk')
      console.log('secret')

      if (err) {
        throw new ErrorHandler(401, ['Invalid authorization token'])
        // return res.status(401).send({message: 'Invalid authorization token'})
      } else {
        console.log('>>>decoded:', decoded)
        req.userId = decoded.userId
        next()
      }
    })
  } else {
    throw new ErrorHandler(401, ['Auth token is not supplied'])
    // return res.status(401).send({message: 'Auth token is not supplied'})
  }
}
