const cuid = require('cuid')
const moment = require('moment')
const { isNil } = require('ramda')
const User = require('../models/user')

const { ErrorHandler } = require('../middlewares/error-handler')
const { isEmailUsed } = require('../middlewares/error-handler/errors')

exports.create = async ({ name, email }) => {
  try {
    const user = new User({
      id: cuid(),
      name,
      email,
      created_at: moment().toISOString(),
    })

    return await user.save()
  } catch (err) {
    if (isEmailUsed(err)) {
      throw new ErrorHandler(400, ['Email already in use'])
    }
  }
}
