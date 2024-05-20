import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from './add-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Add Pet Use Case', async () => {
  it('should must be possible to register a pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AddPetUseCase(petsRepository, usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456789',
      zip_code: '25940220',
      address: 'Rua 1',
      phone: '123456789',
      state: 'SP',
    })

    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
