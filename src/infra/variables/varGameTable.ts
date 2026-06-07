import crypto from 'crypto'

import { mainGameTableId , adminId } from './MainUUIDIds/uuidGeral'

import { users } from './varUsers'


type SeedNarrator = {
  id: string
  userId: string
  name: string
}

export const  narrators: SeedNarrator[] = [
  {
    id: crypto.randomUUID(),
    userId: adminId,
    name: 'admin'
  }
]

const  narratorId = narrators[0]!.id

type SeedGameTable = {
  id: string
  title: string
  system: string
  narratorId: string
  intro: string
}

export const  gameTables: [SeedGameTable, SeedGameTable, SeedGameTable] = [
  {
    id: mainGameTableId,
    narratorId,
    title: 'Shadows at Fortress City',
    system: 'GURPS',
    intro: 'A adventure set in a sprawling medieval, where players navigate political intrigue, guilds , and supernatural mysteries to uncover hidden secrets and survive the dangers lurking in the shadows.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Jungle Expedition',
    system: 'GURPS',
    intro: 'A two-player exploration game with survival challenges.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Admin Sandbox',
    system: 'GURPS',
    intro: 'A test table for admin scenes.'
  }
]

type SeedGameTablePlayer = {
  id: string
  tableId: string
  userId: string
}

export const  gameTablePlayers: SeedGameTablePlayer[] = [
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[1].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[2].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[3].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[5].id }
]