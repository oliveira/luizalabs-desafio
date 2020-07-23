const { applySpec, always, prop } = require('ramda')

const AffiliationService = require('../services/affiliation')

const responseFormat = applySpec({
  data: {
    type: always('affiliation'),
    id: prop('id'),
    company_id: prop('company_id'),
    providers: prop('providers'),
    created_at: prop('created_at'),
  },
})

exports.create = async (req, res, next) => {
  try {
    const { body: affiliationReq } = req
    const createdAffiliation = await AffiliationService.create(affiliationReq)

    return res.status(200).json(responseFormat(createdAffiliation))
  } catch (error) {
    next(error)
  }
}

exports.find = async (req, res, next) => {
  try {
    const { company_id } = req.params
    const foundAffiliation = await AffiliationService.find(company_id)

    return res.status(200).json(responseFormat(foundAffiliation))
  } catch (error) {
    next(error)
  }
}
