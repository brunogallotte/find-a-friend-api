import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      password: '12345678',
      email: 'johndoe@example.com',
      zipCode: '25940220',
      address: 'Rua das Flores, 123',
      phone: '119999999999',
    })

    const response = await request(app.server).post('/sessions').send({
      password: '12345678',
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toEqual(200)
  })
})
