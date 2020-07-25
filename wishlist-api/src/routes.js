const routes = require('express').Router()

const WishlistController = require('./controllers/wishlist')

routes.post(
  '/wishlists',
  WishlistController.create
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
