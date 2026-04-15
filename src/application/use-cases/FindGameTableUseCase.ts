import type { IUserRepository } from '../../domain/irepositories/IUserRepository'
import { User } from '../../domain/entities/User'
import { IGameTableRepository } from '../../domain/irepositories/IGameTableRepository'

export class FindGameTableUseCase {
  constructor(private repo: IGameTableRepository) {}

  async execute(id: string) {
    const gameTable = await this.repo.findById(id)
    return gameTable
  }
}
