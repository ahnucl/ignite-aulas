/* eslint-disable import/no-extraneous-dependencies */
import { createServer, Factory, Model } from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      }),
    },

    seeds(a) {
      a.createList('user', 200)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/users')
      this.post('/users')

      this.namespace = '' // volta o namespace para não conflitar com as api do next
      this.passthrough() // também necessári para compatibilidade com o next
    },
  })

  return server
}
