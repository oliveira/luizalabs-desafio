const mongoose = require('mongoose')
require('dotenv').config()

const mongooseConnect = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = mongooseConnect
