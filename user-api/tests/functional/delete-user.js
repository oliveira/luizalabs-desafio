const test = require('ava')
const fetch = require('node-fetch')

const randomEmail = () => Date.now().toString().substring(8)

test.before(async (t) => {
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

  t.context.email = body.email
  t.context.password = body.password
})

test('should delete user', async (t) => {
  const { email, password } = t.context
  const body = {
    email,
    password,
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
  const userId = data.id
  const token = data.token

  const responseUpdate = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  t.is(responseUpdate.status, 200)
  t.is(responseUpdate.statusText, 'OK')
})

test('should return a 401 for not providing token authentication', async (t) => {
  const bodyCreating = {
    name: 'Lucas Oliveira',
    email: `${randomEmail()}@hello.com`,
    password: '123'
  }

  const responseCreating = await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(bodyCreating),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const bodyAuth = {
    email: bodyCreating.email,
    password: bodyCreating.password,
  }

  const responseAuth = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(bodyAuth),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const { data: dataAuth } = await responseAuth.json()
  const userId = dataAuth.id

  const responseUpdate = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  t.is(responseUpdate.status, 401)
  t.is(responseUpdate.statusText, 'Unauthorized')
})

test('should return a 403 when trying to delete another user account', async (t) => {
  const bodyCreating = {
    name: 'Lucas Oliveira',
    email: `${randomEmail()}@hello.com`,
    password: '123'
  }

  const responseCreating = await fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify(bodyCreating),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const bodyAuth = {
    email: bodyCreating.email,
    password: bodyCreating.password,
  }

  const responseAuth = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(bodyAuth),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const { data: dataAuth } = await responseAuth.json()
  const userId = dataAuth.id
  const token = dataAuth.token

  const responseDelete = await fetch('http://localhost:3000/users/8888888', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  t.is(responseDelete.status, 403)
  t.is(responseDelete.statusText, 'Forbidden')
})
