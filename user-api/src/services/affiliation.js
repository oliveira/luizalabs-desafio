const AffiliationRepository = require('../repositories/affiliation')
const { ErrorHandler } = require('../middlewares/error-handler')

exports.create = async (affiliation) => {
    const createdAffiliation = await AffiliationRepository.create(affiliation)
    
    return createdAffiliation
}

exports.find = async (companyId) => {
  try {
    const affiliation = await AffiliationRepository.find(companyId)

    return affiliation
  } catch (err) {
    throw new ErrorHandler(404, [
      {
        message: 'Resource not found',
      },
    ])
  }
}
