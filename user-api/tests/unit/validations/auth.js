const test = require('ava')

const { validations } = require('../../../src/middlewares/validations/auth')

test('should return error when missing password', (t) => {
  const { error } = validations({ email: 'hello@lucasoliveira.me' })

  const expectedError = [
    {
      message: '"password" is required',
      path: ['password'],
      type: 'any.required',
      context: { label: 'password', key: 'password' },
    },
  ]

  t.deepEqual(error.details, expectedError)
})

test('should return error when missing email', (t) => {
  const { error } = validations({ password: '#####' })

  const expectedError = [
    {
      message: '"email" is required',
      path: ['email'],
      type: 'any.required',
      context: { label: 'email', key: 'email' },
    }
  ]

  t.deepEqual(error.details, expectedError)
})

test('should return error when user not provided any data', (t) => {
  const { error } = validations({})

  const expectedError = [
    {
      message: '"email" is required',
      path: ['email'],
      type: 'any.required',
      context: { label: 'email', key: 'email' },
    },
    {
      message: '"password" is required',
      path: ['password'],
      type: 'any.required',
      context: { label: 'password', key: 'password' },
    }
  ]

  t.deepEqual(error.details, expectedError)
})
