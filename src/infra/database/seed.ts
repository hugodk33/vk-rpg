// src/infra/database/seed.ts
import { db } from './database'
import crypto from 'crypto'

// limpa dados (opcional, mas útil em dev)
db.exec(`
DELETE FROM game_table_players;
DELETE FROM game_tables;
DELETE FROM narrators;
DELETE FROM users;
`)

const adminId = crypto.randomUUID()

type SeedUser = {
  id: string
  type: number
  username: string
  password: string
  phone: string
  email: string
}

const users: [
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser
] = [
  {
    id: adminId,
    type: 0,
    username: 'admin',
    password: '123456',
    phone: '85999999999',
    email: 'admin@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player1',
    password: '123456',
    phone: '85888888888',
    email: 'player1@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player2',
    password: '123456',
    phone: '85777777777',
    email: 'player2@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player3',
    password: '123456',
    phone: '85666666666',
    email: 'player3@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player4',
    password: '123456',
    phone: '85555555555',
    email: 'player4@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player5',
    password: '123456',
    phone: '85444444444',
    email: 'player5@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'player6',
    password: '123456',
    phone: '85333333333',
    email: 'player6@email.com'
  }
]

type SeedNarrator = {
  id: string
  userId: string
  name: string
}

const narrators: SeedNarrator[] = [
  {
    id: crypto.randomUUID(),
    userId: adminId,
    name: 'admin'
  }
]

const narratorId = narrators[0]!.id

type SeedGameTable = {
  id: string
  narratorId: string
  intro: string
}

const gameTables: [SeedGameTable, SeedGameTable, SeedGameTable] = [
  {
    id: crypto.randomUUID(),
    narratorId,
    intro: 'Table 1 - three players'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    intro: 'Table 2 - two players'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    intro: 'Table 3 - admin only'
  }
]

type SeedGameTablePlayer = {
  id: string
  tableId: string
  userId: string
}

const gameTablePlayers: SeedGameTablePlayer[] = [
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[1].id },
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[2].id },
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[3].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[5].id }
]

// insert users
const userStmt = db.prepare(`
  INSERT INTO users (id, type, username, password, phone, email)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const user of users) {
  userStmt.run(
    user.id,
    user.type,
    user.username,
    user.password,
    user.phone,
    user.email
  )
}

// insert narrators
const narratorStmt = db.prepare(`
  INSERT INTO narrators (id, user_id, name)
  VALUES (?, ?, ?)
`)

for (const narrator of narrators) {
  narratorStmt.run(narrator.id, narrator.userId, narrator.name)
}

// insert game tables
const gameTableStmt = db.prepare(`
  INSERT INTO game_tables (id, narrator_id, intro)
  VALUES (?, ?, ?)
`)

for (const table of gameTables) {
  gameTableStmt.run(table.id, table.narratorId, table.intro)
}

// insert game table players
const gameTablePlayerStmt = db.prepare(`
  INSERT INTO game_table_players (id, table_id, user_id)
  VALUES (?, ?, ?)
`)

for (const entry of gameTablePlayers) {
  gameTablePlayerStmt.run(entry.id, entry.tableId, entry.userId)
}

console.log('🌱 Seed executed successfully!')