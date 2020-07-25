const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (user) => {
  const createdUser = await UserRepository.create(user)
  return createdUser
}

exports.update = async (userAuthId, id, user) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const updatedUser = await UserRepository.update(id, user)

  return updatedUser
}

exports.findById = async (userAuthId, id) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const foundUser = await UserRepository.findById(id)

  return foundUser
}

exports.delete = async (userAuthId, id) => {
  if (userAuthId !== id) {
    throw new ErrorHandler(403, ['Forbidden'])
  }

  const deletedUser = await UserRepository.delete(id)

  return deletedUser
}
