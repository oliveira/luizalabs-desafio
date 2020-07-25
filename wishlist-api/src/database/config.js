require('dotenv').config()

module.exports = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  dialect: 'postgres',
  logging: (process.env.DEBUG === true) ? console.debug : false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
