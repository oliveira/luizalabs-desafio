const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (user) => {
  console.log('>>>chegou')
  const createdUser = await UserRepository.create(user)
  return createdUser
}

exports.update = async (id, user) => {
  const updatedUser = await UserRepository.update(id, user)
  return updatedUser
}

exports.findById = async (companyId) => {
  const user = await UserRepository.findById(companyId)
  return user
}

exports.delete = async (id) => {
  const deletedUser = await UserRepository.delete(id)
  return deletedUser
}
