const bcrypt = require('bcryptjs')
const cuid = require('cuid')
const moment = require('moment')

const User = require('../models/user')
const { ErrorHandler } = require('../middlewares/error-handler')
const { isEmailUsed } = require('../middlewares/error-handler/errors')

exports.create = async ({ name, email, password }) => {
  const hashPassword = bcrypt.hashSync(password, 10)

  try {
    const user = new User({
      id: cuid(),
      name,
      email,
      password: hashPassword,
      created_at: moment().toISOString(),
    })

    return await user.save()
  } catch (err) {
    if (isEmailUsed(err)) {
      throw new ErrorHandler(400, ['Email already in use'])
    }
  }
}

exports.update = async (_id, userData) => {
  const user = await User.findOne(
    { _id },
    { email: 1, name: 1 }
  )

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  if (userData.email) {
    user.email = userData.email
  }

  if (userData.name) {
    user.name = userData.name
  }

  user.save()

  return user
}

exports.findById = async (_id) => {
  const user = await User.findOne({ _id, enabled: true })

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  return user
}

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email, enabled: true })

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  return user
}

exports.delete = async (_id) => {
  const user = await User.findOne({ _id })

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  user.enabled = false
  user.save()

  return user
}
