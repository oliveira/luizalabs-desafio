const express = require('express')

const routes = require('./routes')
const database = require('./database/mongo')
const { handleError } = require('./middlewares/error-handler')

const app = express()

app.use(express.json())
app.use(routes)
app.use(handleError)

database()

app.listen(3000)
