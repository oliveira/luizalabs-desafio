const { applySpec, always, prop } = require('ramda')

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
    const createdUser = await AuthService.authenticate(email, password)

    return res.status(200).json(responseFormat(createdUser))
  } catch (error) {
    next(error)
  }
}

exports.create = async (req, res, next) => {
  try {
    const { body: userReq } = req
    const createdUser = await UserService.create(userReq)

    return res.status(200).json(responseFormat(createdUser))
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { body: userReq } = req
    const { id } = req.params

    const updatedUser = await UserService.update(id, userReq)

    return res.status(200).json(responseFormat(updatedUser))
  } catch (error) {
    next(error)
  }
}

exports.find = async (req, res, next) => {
  try {
    const { id } = req.params
    const foundUser = await UserService.findById(id)

    return res.status(200).json(responseFormat(foundUser))
  } catch (error) {
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await UserService.delete(id)

    return res.status(200).json({message: `User deleted`})
  } catch (error) {
    next(error)
  }
}
