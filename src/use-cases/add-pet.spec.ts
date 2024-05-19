import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from './add-pet'

describe('Add Pet Use Case', async () => {
  it('should must be possible to register a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new AddPetUseCase(petsRepository)

    const { pet } = await sut.execute({
      name: 'John Doe',
      age: 'puppy',
      size: 'small',
      energy_level: 'low',
      independence_level: 'low',
      environment: 'indoors',
      bio: 'test',
      user_id: 'user-01',
      pictures: ['url_test'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
