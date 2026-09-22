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
    title: 'Sombras do Antigo Reino',
    system: 'GURPS',
    intro: 'Nas ruas em ruínas da capital do reino, uma sombra se abate sobre a cidade. As antigas casas nobres sussurram sobre desaparecimentos durante a noite, e o grupo precisa navegar por intrigas, ruínas proibidas e magia sombria para descobrir a verdade antes que o reino caia no caos.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Expedição à Selva',
    system: 'GURPS',
    intro: 'Um jogo de exploração para dois jogadores com desafios de sobrevivência.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Caixa de Teste do Admin',
    system: 'GURPS',
    intro: 'Uma mesa de teste para cenas de admin.'
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
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[5].id }
]
