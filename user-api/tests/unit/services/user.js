const test = require('ava')
const sinon = require('sinon')

const UserService = require('../../../src/services/user')

test('should throw a error when updating user and token not provided', async (t) => {
  const UserRepositoryMock = {}

  const error = await t.throwsAsync(
    async () => {
      const updatedUser = await UserService.update(
        UserRepositoryMock,
        {
          name: 'Lucas Oliveira',
          email: 'hello@lucasoliveira.me',
        }
      )
    })

    t.is(error.statusCode, 403)
    t.deepEqual(error.details, ['Forbidden'])
})

test('should throw a error when finding by user id and token not provided', async (t) => {
  const UserRepositoryMock = {}

  const error = await t.throwsAsync(
    async () => {
      const updatedUser = await UserService.findById(UserRepositoryMock, 123)
    })

    t.is(error.statusCode, 403)
    t.deepEqual(error.details, ['Forbidden'])
})

test('should throw a error when deleting user and token not provided', async (t) => {
  const UserRepositoryMock = {}

  const error = await t.throwsAsync(
    async () => {
      const updatedUser = await UserService.delete(
        UserRepositoryMock,
        undefined,
        'user-id-123'
      )
    })

    t.is(error.statusCode, 403)
    t.deepEqual(error.details, ['Forbidden'])
})

test('should throw a error when trying to delete user and db failed', async (t) => {
  const UserRepositoryMock = {
    delete: sinon.stub().usingPromise().resolves({
      enabled: true
    })
  }

  const error = await t.throwsAsync(
    async () => {
      const updatedUser = await UserService.delete(
        UserRepositoryMock,
        'user-id-123',
        'user-id-123'
      )
    })

    t.is(error.statusCode, 500)
    t.deepEqual(error.details, ['Failed to delete resource'])
})
