import { Pets, Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsParams } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pets[] = []

  async findById(id: string): Promise<Pets | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(params: SearchPetsParams): Promise<Pets[] | null> {
    const pets = this.items
      .filter((item) => item.city === params.city)
      .filter((item) => item.age === params.age)
      .filter((item) => item.size === params.size)
      .filter((item) => item.energy_level === params.energy_level)
      .filter((item) => item.independence_level === params.independence_level)
      .filter((item) => item.environment === params.environment)

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
      city: data.city,
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
