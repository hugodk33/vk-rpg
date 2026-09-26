import { GameTable } from '../../domain/entities/GameTable'

import type {
  GameTableWithNarrator,
  GameTableWithScenes
} from '../types/GameTableTypes'
export interface IGameTableRepository {
  create(gameTable: GameTable): Promise<void>
  edit(gameTable: GameTable): Promise<void>
  findById(id: string): Promise<GameTableWithNarrator | null>
  findAll(): Promise<GameTableWithNarrator[]>
  findByAllScenes(tableId: string): Promise<GameTableWithScenes>
  createScene(data: any): Promise<void>
  createNarration(data: any): Promise<void>
  createNarrationAction(data: any): Promise<void>
  editNarrationAction(id: string, data: any): Promise<any>
  deleteNarrationAction(id: string): Promise<any>
  duplicateNarrationAction(id: string): Promise<any>
  getNarrationTableId(narrationsId: string): Promise<string | null>
  readNarrationAction(id: string): Promise<any>
}
