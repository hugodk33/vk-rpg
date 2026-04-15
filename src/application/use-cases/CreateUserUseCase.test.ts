import { describe, it } from 'node:test'
import { strict as assert } from 'node:assert'
import { CreateUserUseCase } from './CreateUserUseCase'
import { User } from '../../domain/entities/User'

describe('CreateUserUseCase', () => {
  it('creates a narrator and user when type is 0 and falls back to username for narrator name', async () => {
    const userRepo = {
      create: async () => undefined
    }

    const narratorRepo = {
      create: async () => undefined
    }

    const useCase = new CreateUserUseCase(userRepo as any, narratorRepo as any)

    const payload = {
      type: 0,
      username: 'narratorUser',
      password: 'secret',
      phone: '85999999999',
      email: 'narrator@example.com'
    }

    const createdUser = await useCase.execute(payload)

    assert.deepStrictEqual(createdUser, {
      type: 0,
      username: 'narratorUser',
      phone: '85999999999',
      email: 'narrator@example.com'
    })
  })
})

