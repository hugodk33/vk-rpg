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
  // findBySceneId(sceneId: string): Promise<GameTableScene >
  findByAllScenes(tableId: string): Promise<GameTableWithScenes>
}
