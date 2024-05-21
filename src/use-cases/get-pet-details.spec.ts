import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from './add-pet'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Get pet details Use Case', async () => {
  it('should must be possible to return pet if exists', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const addPetUseCase = new AddPetUseCase(petsRepository, usersRepository)
    const sut = new GetPetDetailsUseCase(petsRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456789',
      zip_code: '25940220',
      address: 'Rua 1',
      phone: '123456789',
      city: 'SP',
    })

    await addPetUseCase.execute({
      name: 'John Doe',
      age: 'BABY',
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'INDOOR',
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
