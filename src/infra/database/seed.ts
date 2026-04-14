// src/infra/database/seed.ts
import { db } from './database'
import crypto from 'crypto'

// limpa dados (opcional, mas útil em dev)
db.exec(`
DELETE FROM users;
`)

const users = [
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'admin',
    password: '123456',
    phone: '85999999999',
    email: 'admin@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 2,
    username: 'player1',
    password: '123456',
    phone: '85888888888',
    email: 'player1@email.com'
  }
]

// insert
const stmt = db.prepare(`
  INSERT INTO users (id, type, username, password, phone, email)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const user of users) {
  stmt.run(
    user.id,
    user.type,
    user.username,
    user.password,
    user.phone,
    user.email
  )
}

console.log('🌱 Seed executed successfully!')