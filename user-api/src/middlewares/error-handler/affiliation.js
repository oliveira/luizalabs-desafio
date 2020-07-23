const Joi = require('@hapi/joi')
const { map, omit } = require('ramda')

const { ErrorHandler } = require('../error-handler')

const provider = Joi.object().keys({
  name: Joi.string().required(),
  key: Joi.string().required(),
})

const schema = Joi.object({
  company_id: Joi.string().required(),
  providers: Joi.array().min(1).required().items(provider),
})

const validations = (body) => {
  const result = schema.validate(body, {
    convert: false,
    abortEarly: false,
  })

  return result
}

const removeUnusedProperties = map(omit(['type', 'context']))

const affiliationValidationsMiddleware = (req, res, next) => {
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
  affiliationValidationsMiddleware,
}
