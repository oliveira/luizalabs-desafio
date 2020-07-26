const test = require('ava')

const { validations } = require('../../../src/middlewares/validations/user-create')

test('should return error when missing password', (t) => {
  const { error } = validations({ email: 'hello@lucasoliveira.me', name: 'Lucas' })

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
  const { error } = validations({ name: 'Lucas', password: '#####' })

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

test('should return error when missing name', (t) => {
  const { error } = validations({ email: 'hello@lucasoliveira.me', password: '#####' })

  const expectedError = [
    {
      message: '"name" is required',
      path: ['name'],
      type: 'any.required',
      context: { label: 'name', key: 'name' },
    }
  ]

  t.deepEqual(error.details, expectedError)
})

test('should return error when email has invalid value', (t) => {
  const { error } = validations({
    email: 'hellolucasoliveira.me',
    name: 'Lucas',
    password: '###$$$'
  })

  const expectedError = [
    {
      message: '"email" must be a valid email',
      path: ['email'],
      type: 'string.email',
      context: {
        label: 'email',
        key: 'email',
        value: 'hellolucasoliveira.me',
        invalids: [ 'hellolucasoliveira.me' ]
      },
    }
  ]

  t.deepEqual(error.details, expectedError)
})
