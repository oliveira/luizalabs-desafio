const isEmailUsed = (err) => err.code === 11000 ? true : false

module.exports = {
  isEmailUsed,
}
