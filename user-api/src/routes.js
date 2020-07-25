const routes = require('express').Router()

const UserController = require('./controllers/user')

const {
  userValidationsMiddleware,
  authValidationsMiddleware,
  authenticateResource,
} = require('./middlewares')

routes.post(
  '/auth',
  UserController.auth
)

routes.post(
  '/users',
  userValidationsMiddleware,
  UserController.create
)

routes.patch(
  '/users/:id',
  authenticateResource,
  authValidationsMiddleware,
  UserController.update
)

routes.get(
  '/users/:id',
  authenticateResource,
  UserController.find
)

routes.delete(
  '/users/:id',
  authenticateResource,
  UserController.delete
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
