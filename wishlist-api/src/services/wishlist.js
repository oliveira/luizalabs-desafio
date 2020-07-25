const WishlistRepository = require('../repositories/wishlist')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (user) => {
  console.log('222')
  const createdWishlist = await WishlistRepository.create(user)
  console.log('2222')
  return createdWishlist
}

// exports.findById = async (userAuthId, id) => {
//   if (userAuthId !== id) {
//     throw new ErrorHandler(403, ['Forbidden'])
//   }
//
//   const foundUser = await UserRepository.findById(id)
//
//   return foundUser
// }

// exports.delete = async (userAuthId, id) => {
//   if (userAuthId !== id) {
//     throw new ErrorHandler(403, ['Forbidden'])
//   }
//
//   const deletedUser = await UserRepository.delete(id)
//   console.log('>>>>service delete:', deletedUser)
//
//   if (deletedUser.enabled) {
//     throw new ErrorHandler(500, ['Failed to delete resource'])
//   }
//
//   return deletedUser
// }
