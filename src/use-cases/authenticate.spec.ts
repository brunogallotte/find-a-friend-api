import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterUseCase
  let sut: AuthenticateUseCase
  let email: string

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
    sut = new AuthenticateUseCase(usersRepository)
    email = 'john.doe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })
  })

  it('should return success when authenticating an existing user', async () => {
    const { user } = await sut.execute({
      email,
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should return error when authenticating a non-existing user', async () => {
    await expect(
      sut.execute({
        email: 'inexistent-email@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should return error when authenticating a wrong email', async () => {
    await expect(
      sut.execute({
        email: 'wrong-email@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should return error when authenticating a wrong password', async () => {
    await expect(
      sut.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
