import type { IUserRepository } from '../../domain/irepositories/IUserRepository'
import type { INarratorRepository } from '../../domain/irepositories/INarratorRepository'
import { User } from '../../domain/entities/User'
import { Narrator } from '../../domain/entities/Narrator'
import crypto from 'crypto'

export class CreateUserUseCase {
  constructor(
    private repo: IUserRepository,
    private narratorRepo?: INarratorRepository
  ) {}

  async execute(data: any) {
    if (data.type !== 0 && data.type !== 1) {
      throw new Error('Invalid user type. Use 0 for narrator or 1 for normal user.')
    }

    const user = new User(
      crypto.randomUUID(),
      data.type,
      data.username,
      data.password,
      data.phone,
      data.email
    )

    await this.repo.create(user)

    if (data.type === 0) {
      if (!this.narratorRepo) {
        throw new Error('Narrator repository not provided for narrator registration.')
      }

      const narrator = new Narrator(
        crypto.randomUUID(),
        user.id,
        data.name ?? user.username
      )

      await this.narratorRepo.create(narrator)
    }

    return user
  }
}
