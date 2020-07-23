const cuid = require('cuid')

class ErrorHandler extends Error {
 constructor(statusCode, details) {
   super()
   this.statusCode = statusCode
   this.details = details
 }
}

const handleError = (err, req, res, next) => {
 const { statusCode, details } = err

 res.status(statusCode).json({
   errors: {
     id: cuid(),
     details,
   },
 })
}

module.exports = {
 ErrorHandler,
 handleError,
}
