import crypto from 'crypto'
import { adminId , playerOneId } from './MainUUIDIds/uuidGeral'

type SeedUser = {
  id: string
  type: number
  username: string
  password: string
  phone: string
  email: string
}

export const  users: [
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
    id: playerOneId,
    type: 1,
    username: 'John Doe',
    password: '123456',
    phone: '85888888888',
    email: 'john.doe@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Garry S Mod',
    password: '123456',
    phone: '85777777777',
    email: 'garrys.mod@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Rafael Silva',
    password: '123456',
    phone: '85666666666',
    email: 'rafael.silva@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Daniela Homenick',
    password: '123456',
    phone: '85555555555',
    email: 'daniela.homenick@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Denzel Kihn',
    password: '123456',
    phone: '85444444444',
    email: 'denzel.kihn@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Dan Smith',
    password: '123456',
    phone: '85333333333',
    email: 'dan.smith@email.com'
  }
]