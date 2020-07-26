const test = require('ava')
const fetch = require('node-fetch')

test.before(async (t) => {
  const body = {
    name: 'Lucas Oliveira',
    email: 'lucas@oliveira.com',
    password: '123'
  }

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
})

test('should authenticate with provided data', async (t) => {
  const body = {
    email: 'lucas@oliveira.com',
    password: '123'
  }

  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const { data } = await response.json()

  t.is(data.id.length, 24)
  t.is(data.type, 'user')
  t.truthy(data.token)
})

test('should response a error when password is wrong', async (t) => {
  const body = {
    email: 'lucas@oliveira.com',
    password: '1234'
  }

  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  t.is(response.status, 401)
  t.is(response.statusText, 'Unauthorized')
})


test('should response a error when email is not found in database', async (t) => {
  const body = {
    email: 'jose@gmail.com',
    password: '123'
  }

  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  t.is(response.status, 401)
  t.is(response.statusText, 'Unauthorized')
})

test('should response 400 when email is not provided', async (t) => {
  const body = {
    password: '123'
  }

  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  t.is(response.status, 400)
  t.is(response.statusText, 'Bad Request')
})
