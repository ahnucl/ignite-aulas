import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym (Far)',
        description: 'Some description ',
        phone: '6191111111',
        latitude: -15.829549085160197,
        longitude: -47.950941497841754,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym (Near)',
        description: 'Some description ',
        phone: '6191111112',
        latitude: -15.8289563,
        longitude: -48.0505933,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -15.8289563,
        longitude: -48.0505933,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym (Near)',
      }),
    ])
  })
})
