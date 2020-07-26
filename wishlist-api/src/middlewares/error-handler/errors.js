const isNotFound = response =>
  response.code === 404
    ? true
    : false

module.exports = {
  isNotFound,
}
