const {
  always,
  applySpec,
  map,
  multiply,
  pipe,
  prop,
} = require('ramda')

const ProductService = require('../services/wishlist')

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
    const createdProduct = await ProductService.create(authUserId, userReq)

    return res.status(200).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

exports.findByUserId = async (req, res, next) => {
  try {
    const authUserId = req.userId
    const foundProducts = await ProductService.findByUserId(authUserId)

    return res.status(200).json(responseBuilder(foundProducts))
  } catch (error) {
    next(error)
  }
}
