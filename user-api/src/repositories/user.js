const cuid = require('cuid')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const { isNil } = require('ramda')

const User = require('../models/user')

const { ErrorHandler } = require('../middlewares/error-handler')
const { isEmailUsed } = require('../middlewares/error-handler/errors')

exports.create = async ({ name, email, password }) => {
  let hashPassword = bcrypt.hashSync(password, 2)

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

exports.update = async (id, userData) => {
  const user = await User.findOne(
    { _id: id },
    { email: 1, name: 1}
  )

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  user.email = userData.email
  user.name = userData.name
  user.save()

  return user
}

exports.findById = async (id) => {
  const user = await User.findOne(
    { _id: id, enabled: true }
  )

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  return user
}

exports.findByEmail = async (email) => {
  const user = await User.findOne(
    { email: email, enabled: true }
  )

  if (user === null) {
    throw new ErrorHandler(404, ['Resource not found'])
  }

  return user
}

exports.delete = async (id) => {
    const user = await User.findOne({ _id: id })

    if (user === null) {
      throw new ErrorHandler(404, ['Resource not found'])
    }

    user.enabled = false
    user.save()

    return
}
