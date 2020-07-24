const routes = require('express').Router()

const UserController = require('./controllers/user')

const {
  userValidationsMiddleware,
} = require('./middlewares/validations/user')

routes.post(
  '/users',
  userValidationsMiddleware,
  UserController.create
)

routes.get(
  '/users/:company_id',
  UserController.find
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
