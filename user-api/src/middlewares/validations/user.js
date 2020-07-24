const Joi = require('@hapi/joi')
const { map, omit } = require('ramda')

const { ErrorHandler } = require('../error-handler')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
})

const validations = (body) => {
  const result = schema.validate(body, {
    convert: false,
    abortEarly: false,
  })

  return result
}

const removeUnusedProperties = map(omit(['type', 'context']))

const userValidationsMiddleware = (req, res, next) => {
  try {
    const { body } = req
    const { error } = validations(body)

    if (error) {
      const details = removeUnusedProperties(error.details)
      throw new ErrorHandler(400, details)
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validations,
  userValidationsMiddleware,
}
