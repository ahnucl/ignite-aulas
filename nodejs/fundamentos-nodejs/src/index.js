const express = require('express')

const app = express()

app.use(express.json())

/**
 * Route Params => Identificar um recurso editar/deletar/buscar
 *    request.params
 * Query Params => Paginação / Filtro
 *    request.query
 * Body Params => Os objetos inserção/alteração (JSON)
 */


app.get('/courses', (request, response) => {
  const { query } = request
  console.log(query)
  return response.json(['Curso 1', 'Curso 2', 'Curso 3'])
})

app.post('/courses', (request, response) => {
  console.log('yet to implement')
  const {body} = request
  console.log(body)
  return response.status(302).send('ok')
})

app.put('/courses/:id', (request, response) => {
  console.log('yet to implement')
  const {params} = request
  console.log(params)
  return response.status(302).send('ok')
})

app.patch('/courses/:id', (request, response) => {
  console.log('yet to implement')
  return response.status(302).send('ok')
})

app.delete('/courses/:id', (request, response) => {
  console.log('yet to implement')
  return response.status(302).send('ok')
})

app.listen(3333)
