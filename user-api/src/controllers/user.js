const { applySpec, always, prop } = require('ramda')

const UserRepository = require('../repositories/user')
const UserService = require('../services/user')
const AuthService = require('../services/auth')

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

exports.auth = async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log('email, password:', email, password)
    const authenticatedUser = await AuthService.authenticate(
      UserRepository,
      email,
      password
    )

    return res.status(200).json(responseFormat(authenticatedUser))
  } catch (error) {
    console.log('>>>error', error)
    next(error)
  }
}

exports.create = async (req, res, next) => {
  try {
    const { body: userReq } = req

    const createdUser = await UserService.create(
      UserRepository,
      userReq
    )

    return res.status(200).json(responseFormat(createdUser))
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { body: userReq } = req
    const { id } = req.params
    const authUserId = req.userId

    const updatedUser = await UserService.update(
      UserRepository,
      authUserId,
      id,
      userReq
    )

    return res.status(200).json(responseFormat(updatedUser))
  } catch (error) {
    next(error)
  }
}

exports.find = async (req, res, next) => {
  try {
    const { id } = req.params
    const authUserId = req.userId

    const foundUser = await UserService.findById(
      UserRepository,
      authUserId,
      id
    )

    return res.status(200).json(responseFormat(foundUser))
  } catch (error) {
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    const authUserId = req.userId

    await UserService.delete(
      UserRepository,
      authUserId,
      id
    )

    return res.status(200).json({ message: 'Resource deleted successfully' })
  } catch (error) {
    next(error)
  }
}
