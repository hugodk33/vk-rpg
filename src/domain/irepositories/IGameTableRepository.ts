import { GameTable } from '../../domain/entities/GameTable'

export type GameTablePlayer = {
  id: string
  username: string
  email: string
  phone: string
  type: number
}

type GameTableCharacterSheet = {
  id: string
  name: string
  bio: string
  backstory: string
  points: number
  hp: number
  st: number
  dx: number
  iq: number
  ht: number
  fatigue: number
  encumbrance: string
}

type GameTableDamage = {
  id: string
  name: string
  description: string
  type: string
  value: string
  range: string
  itemId: string | null
  skillId: string | null
  advantageId: string | null
}

type GameTableItem = {
  id: string
  name: string
  type: number
  category: string
  weight: number
  dimensions: string
  description: string
  quality: string
  condition: string
  holderId: string | null
  ownerId: string | null
  skillUserId: string | null
  skillLevel: string
}

type GameTableAdvantage = {
  id: string
  name: string
  costPoints: number
  effect: string
}

type GameTableSkill = {
  id: string
  skillId: string
  costPoints: number
  effect: string
}

type GameTablePeculiarity = {
  id: string
  name: string
  costPoints: number
  effect: string
}

type GameTableCharacter = {
  id: string
  userId: string
  name: string
  sheet: GameTableCharacterSheet | null
  damages: GameTableDamage[]
  items: GameTableItem[]
  advantages: GameTableAdvantage[]
  skills: GameTableSkill[]
  peculiarities: GameTablePeculiarity[]
}

export type GameTablePlayerWithCharacter = {
  character: GameTableCharacter
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
  players: GameTablePlayerWithCharacter[]
}

export interface IGameTableRepository {
  create(gameTable: GameTable): Promise<void>
  findById(id: string): Promise<GameTableWithNarrator | null>
  findAll(): Promise<GameTableWithNarrator[]>
}