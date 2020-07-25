const { applySpec, always, prop } = require('ramda')

const ProductService = require('../services/wishlist')

const responseFormat = applySpec({
  data: {
    type: always('user'),
    id: prop('id'),
    name: prop('name'),
    email: prop('email'),
    token: prop('token'),
    created_at: prop('created_at'),
  },
})

exports.create = async (req, res, next) => {
  try {

    console.log('111')
    const { body: userReq } = req
    const createdProduct = await ProductService.create(userReq)

    console.log('1111')
    return res.status(200).json(createdProduct)
  } catch (error) {
    next(error)
  }
}
