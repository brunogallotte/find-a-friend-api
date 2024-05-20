import { Pets, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pets[] = []

  async findById(id: string): Promise<Pets | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByState(query: string): Promise<Pets[] | null> {
    const pets = this.items.filter((item) => item.state === query)

    if (!pets) {
      return null
    }

    return pets
  }

  async create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets> {
    const pet = {
      id: 'pet-01',
      name: data.name,
      bio: data.bio,
      state: data.state,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      pictures: data.pictures as string[],
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
