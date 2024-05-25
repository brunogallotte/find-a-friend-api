import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to filter pets by characteristics', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      password: '12345678',
      email: 'johndoe@example.com',
      zipCode: '25940220',
      address: 'Rua das Flores, 123',
      phone: '119999999999',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Fred',
        age: 'BABY',
        bio: 'the sausage',
        size: 'SMALL',
        energy_level: 'HIGH',
        independence_level: 'MEDIUM',
        environment: 'INDOOR',
        pictures: ['picture1', 'picture2'],
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Fred',
        age: 'BABY',
        bio: 'the sausage',
        size: 'SMALL',
        energy_level: 'HIGH',
        independence_level: 'MEDIUM',
        environment: 'INDOOR',
        pictures: ['picture1', 'picture2'],
      })

    const searchResponse = await request(app.server)
      .get(`/pets?city=Guapimirim&size=SMALL`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(searchResponse.statusCode).toEqual(200)
  })
})
