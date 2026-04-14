import { GameTable } from '../../domain/entities/GameTable'

export type GameTablePlayer = {
  id: string
  username: string
  email: string
  phone: string
  type: number
}

export type GameTableWithNarrator = {
  id: string
  narratorId: string
  intro: string
  title: string
  narrator: {
    id: string
    userId: string
    name: string
    username: string
    email: string
    phone: string
    type: number
  }
  players: GameTablePlayer[]
}

export interface IGameTableRepository {
  create(gameTable: GameTable): Promise<void>
  findById(id: string): Promise<GameTableWithNarrator | null>
  findAll(): Promise<GameTableWithNarrator[]>
}