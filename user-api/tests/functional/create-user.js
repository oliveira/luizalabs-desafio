const test = require('ava')
const fetch = require('node-fetch')

const randomEmail = () => Date.now().toString().substring(8)

test('should create a account', async (t) => {
  const body = {
    name: 'Lucas Oliveira',
    email: `${randomEmail()}@hello.com`,
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

  const { data } = await response.json()

  t.is(data.id.length, 24)
  t.is(data.type, 'user')
  t.is(data.name, body.name)
  t.is(data.email, body.email)
})

test('should return error when creating a account without email', async (t) => {
  const body = {
    name: 'Lucas Oliveira',
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

  t.is(response.status, 400)
  t.is(response.statusText, 'Bad Request')
})
