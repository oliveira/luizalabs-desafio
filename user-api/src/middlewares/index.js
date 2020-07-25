const {
  userValidationsMiddleware,
} = require('./validations/user')
const {
  authValidationsMiddleware,
} = require('./validations/auth')

const authenticateResource = require('./authentication/verify-token')

module.exports = {
  userValidationsMiddleware,
  authValidationsMiddleware,
  authenticateResource,
}
