import {
  PetsRepository,
  SearchPetsParams,
} from '@/repositories/pets-repository'

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(params: SearchPetsParams) {
    const allPetsInQueryCity = await this.petsRepository.searchMany(params)

    return allPetsInQueryCity
  }
}
