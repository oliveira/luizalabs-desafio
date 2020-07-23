const routes = require('express').Router()

const AffiliationController = require('./controllers/affiliation')

const {
  affiliationValidationsMiddleware,
} = require('./middlewares/validations/affiliation')

routes.post(
  '/affiliations',
  affiliationValidationsMiddleware,
  AffiliationController.create
)

routes.get(
  '/affiliations/:company_id',
  AffiliationController.find
)

routes.get('/_health_check', (req, res) => res.send('ok'))

module.exports = routes
