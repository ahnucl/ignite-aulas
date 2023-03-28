import request from 'supertest'
import { afterAll, beforeAll, test, describe, it } from 'vitest'
import { app } from '../src/app'

describe('Transactions route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // test('user can create a new transaction', async () => {
  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })
})