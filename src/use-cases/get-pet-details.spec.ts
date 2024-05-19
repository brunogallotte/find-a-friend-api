import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from './add-pet'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'

describe('Get pet details Use Case', async () => {
  it('should must be possible to return pet if exists', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const addPetUseCase = new AddPetUseCase(petsRepository)
    const sut = new GetPetDetailsUseCase(petsRepository)

    await addPetUseCase.execute({
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

    const pet = await sut.execute('pet-01')

    expect(pet?.id).toEqual('pet-01')
  })

  it('should be return error if the pet does not exist', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new GetPetDetailsUseCase(petsRepository)

    expect(async () => await sut.execute('pet-01')).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
