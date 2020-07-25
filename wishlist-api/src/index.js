const express = require('express')

const routes = require('./routes')
const { handleError } = require('./middlewares/error-handler')

const app = express()

app.use(express.json())
app.use(routes)
app.use(handleError)

app.listen(4000)
