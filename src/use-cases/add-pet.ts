import { PetsRepository } from '@/repositories/pets-repository'
import { Pets } from '@prisma/client'

interface AddPetUseCaseParamsRequest {
  name: string
  bio: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  user_id: string
  pictures: string[]
}

interface AddPetUseCaseResponse {
  pet: Pets
}

export class AddPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    bio,
    energy_level,
    environment,
    name,
    pictures,
    size,
    independence_level,
    user_id,
  }: AddPetUseCaseParamsRequest): Promise<AddPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      bio,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      pictures,
      user_id,
    })

    return {
      pet,
    }
  }
}
