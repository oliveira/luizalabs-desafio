const {
  always,
  applySpec,
  map,
  multiply,
  pipe,
  prop,
} = require('ramda')

const WishlistService = require('../services/wishlist')
const WishlistRepository = require('../repositories/wishlist')

const responseFormat = applySpec({
  type: always('product'),
  price: pipe(prop('price'), multiply(100)),
  image: prop('image'),
  brand: prop('brand'),
  title: prop('title'),
  product_id: prop('product_id'),
  created_at: prop('created_at'),
})

const responseBuilder = map(responseFormat)

exports.create = async (req, res, next) => {
  try {
    const { body: userReq } = req
    const authUserId = req.userId
    const createdProduct = await WishlistService.create(WishlistRepository, authUserId, userReq)

    return res.status(200).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

exports.findByUserId = async (req, res, next) => {
  try {
    const authUserId = req.userId
    const foundProducts = await WishlistService.findByUserId(WishlistRepository, authUserId)

    return res.status(200).json(responseBuilder(foundProducts))
  } catch (error) {
    next(error)
  }
}
