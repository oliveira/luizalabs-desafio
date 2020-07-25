const db = require('../database')

exports.create = async (product) => {
  console.log('333')
    const createdProduct = await db.sequelize.Wishlist.create({
      user_id: '111111',
      price: 10000,
      image: 'http://challenge-api.luizalabs.com/images/9896cdf5-4e97-d245-8fa4-d7c9e4c773df.jpg',
      brand: 'adidas',
      product_id: '9896cdf5-4e97-d245-8fa4-d7c9e4c773df',
      title: 'Pão de forma',
      review_score: '5',
      created_at: Date.now()
    })

  return createdProduct
}
