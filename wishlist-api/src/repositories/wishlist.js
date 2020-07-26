const db = require('../database')

exports.create = async (userAuthId, product) => {
  const { price, image, brand, title, id } = product
  const priceInteger = price * 100

  const createdProduct = await db.sequelize.wishlist.create({
    product_id: id,
    user_id: userAuthId,
    price: priceInteger,
    image,
    brand,
    title,
    created_at: Date.now(),
  })

  return createdProduct
}

exports.findByUserId = async (userAuthId) => {
  const foundProducts = await db.sequelize.wishlist.findAll({
    where: {
      user_id: userAuthId,
    }
  })

  return foundProducts
}

exports.findProductInUserWishlist = async (userAuthId, product) => {
  const { id } = product
  console.log('>>>db:', db.sequelize)
  const foundProduct = await db.sequelize.wishlist.findOne({
    where: {
      user_id: userAuthId,
      product_id: id,
    }
  })

  return foundProduct
}
