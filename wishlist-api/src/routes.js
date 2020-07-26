const routes = require('express').Router()

const WishlistController = require('./controllers/wishlist')
const {
  authenticateResource,
} = require('./middlewares')

routes.post(
  '/wishlists',
  authenticateResource,
  WishlistController.create
)

routes.get(
  '/wishlists/',
  authenticateResource,
  WishlistController.findByUserId
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
