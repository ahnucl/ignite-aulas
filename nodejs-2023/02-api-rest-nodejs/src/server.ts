import { knex } from './database'
import fastify from 'fastify'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/hello', async () => {
  const test = await knex('sqlite_schema').select('*')

  return test

  return 'Backend online 🚀'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running! 🚀')
  })
