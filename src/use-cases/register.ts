import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { fetchWithZod } from '@/utils/fetchWithZod'
import { z } from 'zod'

interface RegisterUseCaseParamsRequest {
  name: string
  email: string
  password: string
  zipCode: string
  address: string
  phone: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    zipCode,
    address,
    phone,
  }: RegisterUseCaseParamsRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const zipCodeRequestSchema = z.object({
      cep: z.string(),
      logradouro: z.string(),
      complemento: z.string(),
      bairro: z.string(),
      localidade: z.string(),
      uf: z.string(),
      ibge: z.string(),
      gia: z.string(),
      ddd: z.string(),
      siafi: z.string(),
    })

    const { localidade } = await fetchWithZod(
      `https://viacep.com.br/ws/${zipCode}/json/`,
      {
        schema: zipCodeRequestSchema,
      },
    )

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      zip_code: zipCode,
      city: localidade,
      address,
      phone,
    })

    return { user }
  }
}
