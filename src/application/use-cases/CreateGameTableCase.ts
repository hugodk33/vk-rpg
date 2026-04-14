import type { IGameTableRepository } from '../../domain/irepositories/IGameTableRepository'
import crypto from 'crypto'
import { GameTable } from '../../domain/entities/GameTable'

export class CreateGameTableUseCase {
  constructor(
    private repo: IGameTableRepository
  ) {}

  async execute(data: any) {

  const gameTable = new GameTable(
    crypto.randomUUID(),
    data.title,
    data.userId,
    data.name
  )

  await this.repo.create(gameTable)
    return gameTable
  }
}
