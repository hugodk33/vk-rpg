import { db } from '../../infra/database/database'
import type { IGameTableRepository } from '../irepositories/IGameTableRepository'
import { GameTable } from '../entities/GameTable'

export class GameTableRepository implements IGameTableRepository {
  async create(GameTable: GameTable): Promise<void> {
    db.prepare(`
      INSERT INTO game_tables (id, user_id, name)
      VALUES (?, ?, ?)
    `).run(
      GameTable.id,
      GameTable.narratorId,
      GameTable.intro
    )
  }

  async findAll(): Promise<GameTable[]> {
    const rows = db.prepare(`SELECT * FROM game_tables`).all() as any[]

    return rows.map((row) =>
      new GameTable(row.id, row.user_id, row.name)
    )
  }

  // async findByEmail(email: string): Promise<User | null> {
  //   const row = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as any

  //   if (!row) return null

  //   return new User(
  //     row.id,
  //     row.type,
  //     row.username,
  //     row.password,
  //     row.phone,
  //     row.email
  //   )
  // }
}