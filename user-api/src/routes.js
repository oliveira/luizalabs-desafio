const routes = require('express').Router()

const UserController = require('./controllers/user')

const {
  userValidationsMiddleware,
} = require('./middlewares/validations/user')
const {
  authValidationsMiddleware,
} = require('./middlewares/validations/auth')


routes.post(
  '/auth',
  authValidationsMiddleware,
  UserController.auth
)

routes.post(
  '/users',
  userValidationsMiddleware,
  UserController.create
)

routes.patch(
  '/users/:id',
  userValidationsMiddleware,
  UserController.update
)

routes.get(
  '/users/:id',
  UserController.find
)

routes.delete(
  '/users/:id',
  UserController.delete
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
