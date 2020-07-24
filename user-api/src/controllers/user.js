const { applySpec, always, prop } = require('ramda')

const UserService = require('../services/user')

const responseFormat = applySpec({
  data: {
    type: always('user'),
    id: prop('id'),
    company_id: prop('company_id'),
    providers: prop('providers'),
    created_at: prop('created_at'),
  },
})

exports.create = async (req, res, next) => {
  try {
    const { body: userReq } = req
    const createdUser = await UserService.create(userReq)

    return res.status(200).json(responseFormat(createdUser))
  } catch (error) {
    next(error)
  }
}

exports.find = async (req, res, next) => {
  try {
    const { company_id } = req.params
    const foundUser = await UserService.find(company_id)

    return res.status(200).json(responseFormat(foundUser))
  } catch (error) {
    next(error)
  }
}
