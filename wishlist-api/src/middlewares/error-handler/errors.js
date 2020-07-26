const isNotFound = response =>
  response.status === 404
    ? true
    : false

module.exports = {
  isNotFound,
}
