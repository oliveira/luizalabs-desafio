const fetch = require('node-fetch')

const WishlistRepository = require('../repositories/wishlist')
const { ErrorHandler } = require('../middlewares/error-handler')
const { isNotFound } = require('../middlewares/error-handler/errors')

const fetchProductData = id => fetch(`http://challenge-api.luizalabs.com/api/product/${id}`)

exports.create = async (WishlistRepository, userAuthId, product) => {
  console.log('>>>>WishlistRepository:', WishlistRepository)
  const productAtDatabase = await WishlistRepository.findProductInUserWishlist(userAuthId, product)

  if (productAtDatabase) {
    throw new ErrorHandler(409, ['Resource already exists'])
  }

  const response = await fetchProductData(product.id)

  if (isNotFound(response)) {
    throw new ErrorHandler(404, ['Resource not exists'])
  }

  const createdWishlist = await WishlistRepository.create(userAuthId, product)

  return createdWishlist
}

exports.findByUserId = async (WishlistRepository, userAuthId) => {
  const foundProducts = await WishlistRepository.findByUserId(userAuthId)
  return foundProducts
}
