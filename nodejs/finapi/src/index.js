const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" })
  }

  request.customer = customer

  return next()
}

function getBalance(statement) {
  return statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount
    } else if (operation.type === 'debit') {
      return acc - operation.amount
    }
  }, 0)
}


/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
app.post('/account', (request, response) => {
  const { cpf, name }= request.body

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  })

  return response.status(201).send()
})

app.use(verifyIfExistsAccountCPF)

app.get('/statement', (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

app.post('/deposit', (request, response) => {
  const { customer } = request
  const { description, amount } = request.body // sem validação do amount

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.post('/withdraw', (request, response) => {
  const { amount } = request.body // sem validação
  const { customer } = request

  const balance = getBalance(customer.statement)  
  
  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient funds"})
  }

  const statementOperation = {
    description: "Saque",
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.get('/statement/date', (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + " 00:00") // hack

  const statementByDate = customer.statement.filter(statement =>
    statement.created_at.toDateString() === new Date(dateFormat).toDateString())

  return response.json(statementByDate)
})

app.put('/account', (request, response) => {
  const { name } = request.body
  const { customer } = request
  
  customer.name = name

  return response.status(201).send()
})

app.get('/account', (request, response) => {
  const { customer } = request
  
  return response.json(customer)
})

app.delete('/account', (request, response) => {
  const { customer } = request

  // splice - não sabia que dava pra usar assim
  customers.splice(customer, 1)

  return response.status(200).json(customers)
})

app.get('/balance', (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement)

  return response.json(balance)
})

app.listen(3333)
