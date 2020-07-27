const test = require('ava')
const sinon = require('sinon')

const WishlistService = require('../../../src/services/wishlist')

test('should return 409 when product already exists', async (t) => {
  const WishlistRepositoryMock = {
    findProductInUserWishlist: sinon.stub().usingPromise().resolves({
      price: 100,
      image: 'img-url',
      brand: 'dell',
      product_id: '123',
      title: 'carregador',
      created_at: '2020-07-25'
    })
  }

  const error = await t.throwsAsync(
    async () => {
      const authenticatedUser = await WishlistService.create(
        WishlistRepositoryMock,
        'user-authentication-token',
        {}
      )
    })

    t.is(error.statusCode, 409)
    t.deepEqual(error.details, ['Resource already exists'])
})

test('should return 404 when product not exists at external provider', async (t) => {
  const productMock = {
    price: 33.53,
    id: 'c5af1ede-b5e2-44a6-a9b5-fim-inexistente',
    title: 'Vinho 1 Peça'
  }

  const WishlistRepositoryMock = {
    findProductInUserWishlist: sinon.stub().usingPromise().resolves(undefined),
    create: sinon.stub().usingPromise().resolves(productMock)
  }

  const error = await t.throwsAsync(
    async () => {
      const authenticatedUser = await WishlistService.create(
        WishlistRepositoryMock,
        'user-authentication-token',
        productMock
      )
    })
    t.is(error.statusCode, 404)
    t.deepEqual(error.details, ['Resource not exists'])
})
