const test = require('ava')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')

const AuthService = require('../../../src/services/auth')

test('should return valid authentication', async (t) => {
  const UserRepositoryMock = {
    findByEmail: sinon.stub().usingPromise().resolves({
      email: 'hello@lucasoliveira.me',
      password: bcrypt.hashSync('123', 10),
      _id: '123456789'
    })
  }

  const authenticatedUser = await AuthService.authenticate(
    UserRepositoryMock,
    'hello@lucasoliveira.me',
    '123'
  )

  const expectedKeys = ['_id', 'email', 'password', 'token']
  const resultKeys = Object.keys(authenticatedUser)

  const hasExpectedKeyInList = () => listKeys.includes(expectedKeys)
  t.truthy(hasExpectedKeyInList)
})

test('should throw a error when autentication failed', async (t) => {
  const UserRepositoryMock = {
    findByEmail: sinon.stub().usingPromise().resolves({
      email: 'hello@lucasoliveira.me',
      password: bcrypt.hashSync('1223', 10),
      _id: '123456789'
    })
  }

  const error = await t.throwsAsync(
    async () => {
      const authenticatedUser = await AuthService.authenticate(
        UserRepositoryMock,
        'hello@lucasoliveira.me',
        '123'
      )
    })

    t.is(error.statusCode, 401)
    t.deepEqual(error.details, ['Authentication failed'])
})
