import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterUseCase
  let authenticateUseCase: AuthenticateUseCase
  let email: string

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
    email = 'john.doe@example.com'
  })

  it('should return success when authenticating an existing user', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    const { user } = await authenticateUseCase.execute({
      email,
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should return error when authenticating a non-existing user', async () => {
    await expect(
      authenticateUseCase.execute({
        email,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should return error when authenticating a wrong email', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    await expect(
      authenticateUseCase.execute({
        email: 'wrong-email@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should return error when authenticating a wrong password', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    await expect(
      authenticateUseCase.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
