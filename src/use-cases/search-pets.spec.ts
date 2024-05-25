import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AddPetUseCase } from './add-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { SearchPetsUseCase } from './search-pets'
import { CityIsRequiredError } from './errors/city-is-required-error'

const usersRepository = new InMemoryUsersRepository()
const petsRepository = new InMemoryPetsRepository()
const addPetUseCase = new AddPetUseCase(petsRepository, usersRepository)
const sut = new SearchPetsUseCase(petsRepository)

describe('Get All Pets Use Case', async () => {
  beforeEach(async () => {
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
      city: 'SP',
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'INDOOR',
      bio: 'test',
      user_id: 'user-01',
      pictures: ['url_test'],
    })

    await addPetUseCase.execute({
      name: 'John Doe',
      age: 'BABY',
      city: 'SP',
      size: 'SMALL',
      energy_level: 'LOW',
      independence_level: 'LOW',
      environment: 'INDOOR',
      bio: 'test',
      user_id: 'user-01',
      pictures: ['url_test'],
    })
  })

  afterEach(() => {
    petsRepository.items = []
  })

  it('should return an error if the city is not informed', async () => {
    await expect(
      sut.execute({
        city: '',
        age: 'BABY',
      }),
    ).rejects.toBeInstanceOf(CityIsRequiredError)
  })

  it('should must be possible to return all pets in the same city', async () => {
    const allPets = await sut.execute({
      city: 'SP',
    })

    expect(allPets).toHaveLength(2)
  })

  it('It must be possible to return pets filtering by city and size', async () => {
    const allPets = await sut.execute({
      city: 'SP',
      size: 'SMALL',
    })

    expect(allPets).toHaveLength(2)
  })

  it('It must be possible to return pets filtering by city and age', async () => {
    const allPets = await sut.execute({
      city: 'SP',
      age: 'BABY',
    })

    expect(allPets).toHaveLength(2)
  })

  it('It must be possible to return pets filtering by city and energy_level', async () => {
    const allPets = await sut.execute({
      city: 'SP',
      energy_level: 'LOW',
    })

    expect(allPets).toHaveLength(2)
  })

  it('It must be possible to return pets filtering by city and independence_level', async () => {
    const allPets = await sut.execute({
      city: 'SP',
      independence_level: 'LOW',
    })

    expect(allPets).toHaveLength(2)
  })

  it('It must be possible to return pets filtering by city and environment', async () => {
    const allPets = await sut.execute({
      city: 'SP',
      environment: 'INDOOR',
    })

    expect(allPets).toHaveLength(2)
  })
})
