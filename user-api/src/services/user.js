const UserRepository = require('../repositories/user')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (user) => {
    const createdUser = await UserRepository.create(user)

    return createdUser
}

exports.find = async (companyId) => {
  try {
    const user = await UserRepository.find(companyId)

    return user
  } catch (err) {
    throw new ErrorHandler(404, [
      {
        message: 'Resource not found',
      },
    ])
  }
}
