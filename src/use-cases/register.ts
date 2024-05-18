import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParamsRequest {
  name: string
  email: string
  password: string
  zipCode: string
  address: string
  phone: string
}

export async function registerUseCase({
  name,
  email,
  password,
  zipCode,
  address,
  phone,
}: RegisterUseCaseParamsRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
    zip_code: zipCode,
    address,
    phone,
  })
}
