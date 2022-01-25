import React from 'react'
import ReactDOM from 'react-dom'
import { createServer, Model } from "miragejs";
import { App } from './App'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-01-12 11:00:00'),
        },
        {
          id: 2,
          title: 'Almoço',
          type: 'withdraw',
          category: 'Comida',
          amount: 20,
          createdAt: new Date('2022-01-14 11:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transaction'))

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
