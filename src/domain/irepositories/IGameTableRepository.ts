import { GameTable } from '../../domain/entities/GameTable'

export interface IGameTableRepository {
  create(gameTable: GameTable): Promise<void>
}