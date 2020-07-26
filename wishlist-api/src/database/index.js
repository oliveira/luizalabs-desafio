const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const db = {}
const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD, {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
  }
)

fs.readdirSync(path.join(__dirname, '../models'))
  .forEach((file) => {
    const model = require(path.join(__dirname, '../models', file))(sequelize, Sequelize)
    sequelize[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
