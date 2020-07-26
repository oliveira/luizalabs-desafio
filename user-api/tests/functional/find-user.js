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
  t.context.id = body.id
})

test('should find user', async (t) => {
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

  const { data: authData } = await response.json()
  const userId = authData.id
  const token = authData.token

  const responseUpdate = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  const { data: dataUpdate } = await responseUpdate.json()

  t.is(dataUpdate.email, authData.email)
  t.is(dataUpdate.id, authData.id)
  t.is(dataUpdate.name, authData.name)
  t.is(dataUpdate.type, authData.type)
})


test('should return a 401 for not providing token authentication', async (t) => {
  const { id } = t.context

  const responseUpdate = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  t.is(responseUpdate.status, 401)
  t.is(responseUpdate.statusText, 'Unauthorized')
})

test('should return a 403 when trying to update another user data', async (t) => {
  const { email, password, id } = t.context
  const body = {
    email,
    password
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
  const token = data.token

  const responseUpdate = await fetch('http://localhost:3000/users/999999', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  t.is(responseUpdate.status, 403)
  t.is(responseUpdate.statusText, 'Forbidden')
})
