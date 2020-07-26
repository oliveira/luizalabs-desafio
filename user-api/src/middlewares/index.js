const {
  userValidationsMiddleware,
} = require('./validations/user-create')
const {
  authValidationsMiddleware,
} = require('./validations/auth')

const authenticateResource = require('./authentication/verify-token')

module.exports = {
  userValidationsMiddleware,
  authValidationsMiddleware,
  authenticateResource,
}
