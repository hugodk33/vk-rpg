import { db } from '../../infra/database/database'
import type { IGameTableRepository, GameTableWithNarrator, GameTablePlayer } from '../irepositories/IGameTableRepository'
import { GameTable } from '../entities/GameTable'

type GameTableWithPlayers = GameTableWithNarrator & {
  players: GameTablePlayer[]
}

export class GameTableRepository implements IGameTableRepository {
  async create(gameTable: GameTable): Promise<void> {
    db.prepare(`
      INSERT INTO game_tables (id, narrator_id, intro)
      VALUES (?, ?, ?)
    `).run(
      gameTable.id,
      gameTable.narratorId,
      gameTable.intro
    )
  }

  async findAll(): Promise<GameTableWithNarrator[]> {
    const rows = db.prepare(`
      SELECT
        g.id AS table_id,
        g.narrator_id AS table_narrator_id,
        g.intro AS table_intro,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        pu.username AS player_username,
        pu.email AS player_email,
        pu.phone AS player_phone,
        pu.type AS player_type
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN users pu ON pu.id = p.user_id
    `).all() as any[]

    if (!rows?.length) {
      return []
    }

    const tables = new Map<string, GameTableWithPlayers>()

    for (const row of rows) {
      let table = tables.get(row.table_id)

      if (!table) {
        table = {
          id: row.table_id,
          narratorId: row.table_narrator_id,
          intro: row.table_intro,
          narrator: {
            id: row.narrator_id,
            userId: row.narrator_user_id,
            name: row.narrator_name,
            username: row.user_username,
            email: row.user_email,
            phone: row.user_phone,
            type: row.user_type
          },
          players: []
        }

        tables.set(row.table_id, table)
      }

      if (row.player_user_id) {
        table.players.push({
          id: row.player_user_id,
          username: row.player_username,
          email: row.player_email,
          phone: row.player_phone,
          type: row.player_type
        })
      }
    }

    return Array.from(tables.values())
  }

  async findById(id: string): Promise<GameTableWithNarrator | null> {
    const rows = db.prepare(`
      SELECT
        g.id AS table_id,
        g.narrator_id AS table_narrator_id,
        g.intro AS table_intro,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        pu.username AS player_username,
        pu.email AS player_email,
        pu.phone AS player_phone,
        pu.type AS player_type
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN users pu ON pu.id = p.user_id
      WHERE g.id = ?
    `).all(id) as any[]

    if (!rows?.length) return null

    const first = rows[0]

    const result: GameTableWithPlayers = {
      id: first.table_id,
      narratorId: first.table_narrator_id,
      intro: first.table_intro,
      narrator: {
        id: first.narrator_id,
        userId: first.narrator_user_id,
        name: first.narrator_name,
        username: first.user_username,
        email: first.user_email,
        phone: first.user_phone,
        type: first.user_type
      },
      players: []
    }

    for (const row of rows) {
      if (row.player_user_id) {
        result.players.push({
          id: row.player_user_id,
          username: row.player_username,
          email: row.player_email,
          phone: row.player_phone,
          type: row.player_type
        })
      }
    }

    return result
  }
}