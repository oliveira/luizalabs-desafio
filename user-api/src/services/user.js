const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (UserRepository, user) => {
  const createdUser = await UserRepository.create(user)
  return createdUser
}

exports.update = async (UserRepository, userAuthId, id, user) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const updatedUser = await UserRepository.update(id, user)

  return updatedUser
}

exports.findById = async (UserRepository, userAuthId, id) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const foundUser = await UserRepository.findById(id)

  return foundUser
}

exports.delete = async (UserRepository, userAuthId, id) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const deletedUser = await UserRepository.delete(id)

  if (deletedUser.enabled) {
    throw new ErrorHandler(500, ['Failed to delete resource'])
  }

  return deletedUser
}
