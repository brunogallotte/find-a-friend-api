import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Pets } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AddPetUseCaseParamsRequest {
  name: string
  bio: string
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  energy_level: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  independence_level: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'SPACIOUS' | 'OUTDOOR' | 'INDOOR'
  user_id: string
  pictures: string[]
}

interface AddPetUseCaseResponse {
  pet: Pets
}

export class AddPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private usersRepository: UsersRepository,
  ) {}

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
    const petOwonerUser = await this.usersRepository.findById(user_id)

    if (!petOwonerUser) {
      throw new InvalidCredentialsError()
    }

    const pet = await this.petsRepository.create({
      name,
      bio,
      state: petOwonerUser?.state,
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
