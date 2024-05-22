import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { addPet } from './controllers/add-pet'
import { verifyJWT } from './middlewares/verify-jwt'
import { refresh } from './controllers/refresh'
import { getPetDetails } from './controllers/get-pet-details'
import { searchPets } from './controllers/search-pets'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authorized **/
  app.post('/pets', { onRequest: [verifyJWT] }, addPet)
  app.get('/pets/:id', { onRequest: [verifyJWT] }, getPetDetails)
  app.get('/pets', { onRequest: [verifyJWT] }, searchPets)
}
