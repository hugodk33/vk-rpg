import type { IUserRepository } from '../../domain/irepositories/IUserRepository'
import { User } from '../../domain/entities/User'

export class FindAllUsersUseCase {
  constructor(private repo: IUserRepository) {}

  async execute() {
    const users = await this.repo.findAll()
    return users
  }
}
