const cuid = require('cuid')
const moment = require('moment')
const { isNil } = require('ramda')
const Affiliation = require('../models/affiliation')

const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async ({ name, email }) => {
  const affiliation = new Affiliation({
    id: cuid(),
    name,
    email,
    created_at: moment().toISOString(),
  })

  console.log('>>>affiliation', affiliation)

  try {
    const result = await affiliation.save()
    console.log('>>>', result)
  } catch (e) {
    console.log('>>>error:', e.code)
    if (e.code === 11000) {
      console.log('entrou')
      throw new ErrorHandler(400, ['Email already in use'])
    }
  }
  return result
}
