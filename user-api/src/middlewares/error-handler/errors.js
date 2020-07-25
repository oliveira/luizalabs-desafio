const alreadyInUseCode = 11000

const isEmailUsed = err =>
  err.code === alreadyInUseCode
    ? true
    : false

module.exports = {
  isEmailUsed,
}
