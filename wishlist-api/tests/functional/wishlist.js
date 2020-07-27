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

test('should create a product', async (t) => {
  const { email, password } = t.context
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
  const userId = data.id
  const token = data.token

  const bodyUpdate = {
    price: 26.63,
    image: 'http://challenge-api.luizalabs.com/images/3a1f4bbf-999d-955c-af95-04506b9c7bb9.jpg',
    brand: 'ruvolo',
    id: '3a1f4bbf-999d-955c-af95-04506b9c7bb9',
    title: 'Ta\u00e7a para Cerveja 1 Pe\u00e7a'
  }

  const responseUpdate = await fetch(`http://localhost:4000/wishlists`, {
    method: 'POST',
    body: JSON.stringify(bodyUpdate),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  t.is(responseUpdate.status, 200)
  t.is(responseUpdate.statusText, 'OK')
})
