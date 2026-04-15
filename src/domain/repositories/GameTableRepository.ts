import { db } from '../../infra/database/database'
import type {
  IGameTableRepository,
  GameTableWithNarrator,
  GameTablePlayerWithCharacter
} from '../irepositories/IGameTableRepository'
import { GameTable } from '../entities/GameTable'

type GameTableWithPlayers = GameTableWithNarrator & {
  players: GameTablePlayerWithCharacter[]
}

export class GameTableRepository implements IGameTableRepository {
  async create(gameTable: GameTable): Promise<void> {
    db.prepare(`
      INSERT INTO game_tables (id, narrator_id, title, intro)
      VALUES (?, ?, ?, ?)
    `).run(
      gameTable.id,
      gameTable.narratorId,
      gameTable.title,
      gameTable.intro
    )
  }

  async findAll(): Promise<GameTableWithNarrator[]> {
    const rows = db.prepare(`
      SELECT
        g.id AS table_id,
        g.narrator_id AS table_narrator_id,
        g.intro AS table_intro,
        g.title AS table_title,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        c.id AS character_id,
        c.user_id AS character_user_id,
        c.name AS character_name,
        cs.id AS sheet_id,
        cs.name AS sheet_name,
        cs.bio AS sheet_bio,
        cs.backstory AS sheet_backstory,
        cs.points AS sheet_points,
        cs.hp AS sheet_hp,
        cs.st AS sheet_st,
        cs.dx AS sheet_dx,
        cs.iq AS sheet_iq,
        cs.ht AS sheet_ht,
        cs.fatigue AS sheet_fatigue,
        cs.encumbrance AS sheet_encumbrance,
        d.id AS damage_id,
        d.name AS damage_name,
        d.description AS damage_description,
        d.type AS damage_type,
        d.value AS damage_value,
        d.range AS damage_range,
        d.item_id AS damage_item_id,
        d.skill_id AS damage_skill_id,
        d.advantage_id AS damage_advantage_id,
        i.id AS item_id,
        i.name AS item_name,
        i.type AS item_type,
        i.category AS item_category,
        i.weight AS item_weight,
        i.dimensions AS item_dimensions,
        i.description AS item_description,
        i.quality AS item_quality,
        i.condition AS item_condition,
        i.holder_id AS item_holder_id,
        i.owner_id AS item_owner_id,
        i.skill_user_id AS item_skill_user_id,
        i.skill_level AS item_skill_level,
        a.id AS advantage_id,
        a.name AS advantage_name,
        a.cost_points AS advantage_cost_points,
        a.effect AS advantage_effect,
        csk.id AS character_skill_id,
        csk.skill_id AS character_skill_skill_id,
        csk.cost_points AS character_skill_cost_points,
        csk.effect AS character_skill_effect,
        pec.id AS peculiarity_id,
        pec.name AS peculiarity_name,
        pec.cost_points AS peculiarity_cost_points,
        pec.effect AS peculiarity_effect
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN characters c ON c.table_id = g.id AND c.user_id = p.user_id
      LEFT JOIN character_sheets cs ON cs.character_id = c.id
      LEFT JOIN damages d ON d.character_id = c.id
      LEFT JOIN items i ON i.holder_id = p.user_id
      LEFT JOIN advantages a ON a.character_id = c.id
      LEFT JOIN character_skills csk ON csk.character_id = c.id
      LEFT JOIN peculiarities pec ON pec.character_id = c.id
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
          title: row.table_title,
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

      if (!row.character_id) {
        continue
      }

      let player = table.players.find((entry) => entry.character.id === row.character_id)

      if (!player) {
        player = {
          character: {
            id: row.character_id,
            userId: row.character_user_id,
            name: row.character_name,
            sheet: row.sheet_id
              ? {
                  id: row.sheet_id,
                  name: row.sheet_name,
                  bio: row.sheet_bio,
                  backstory: row.sheet_backstory,
                  points: row.sheet_points,
                  hp: row.sheet_hp,
                  st: row.sheet_st,
                  dx: row.sheet_dx,
                  iq: row.sheet_iq,
                  ht: row.sheet_ht,
                  fatigue: row.sheet_fatigue,
                  encumbrance: row.sheet_encumbrance
                }
              : null,
            damages: [],
            items: [],
            advantages: [],
            skills: [],
            peculiarities: []
          }
        }

        table.players.push(player)
      }

      const character = player.character

      if (row.damage_id && !character.damages.some((item) => item.id === row.damage_id)) {
        character.damages.push({
          id: row.damage_id,
          name: row.damage_name,
          description: row.damage_description,
          type: row.damage_type,
          value: row.damage_value,
          range: row.damage_range,
          itemId: row.damage_item_id,
          skillId: row.damage_skill_id,
          advantageId: row.damage_advantage_id
        })
      }

      if (row.item_id && !character.items.some((item) => item.id === row.item_id)) {
        character.items.push({
          id: row.item_id,
          name: row.item_name,
          type: row.item_type,
          category: row.item_category,
          weight: row.item_weight,
          dimensions: row.item_dimensions,
          description: row.item_description,
          quality: row.item_quality,
          condition: row.item_condition,
          holderId: row.item_holder_id,
          ownerId: row.item_owner_id,
          skillUserId: row.item_skill_user_id,
          skillLevel: row.item_skill_level
        })
      }

      if (row.advantage_id && !character.advantages.some((adv) => adv.id === row.advantage_id)) {
        character.advantages.push({
          id: row.advantage_id,
          name: row.advantage_name,
          costPoints: row.advantage_cost_points,
          effect: row.advantage_effect
        })
      }

      if (row.character_skill_id && !character.skills.some((skill) => skill.id === row.character_skill_id)) {
        character.skills.push({
          id: row.character_skill_id,
          skillId: row.character_skill_skill_id,
          costPoints: row.character_skill_cost_points,
          effect: row.character_skill_effect
        })
      }

      if (row.peculiarity_id && !character.peculiarities.some((item) => item.id === row.peculiarity_id)) {
        character.peculiarities.push({
          id: row.peculiarity_id,
          name: row.peculiarity_name,
          costPoints: row.peculiarity_cost_points,
          effect: row.peculiarity_effect
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
        g.title AS table_title,
        n.id AS narrator_id,
        n.user_id AS narrator_user_id,
        n.name AS narrator_name,
        u.username AS user_username,
        u.email AS user_email,
        u.phone AS user_phone,
        u.type AS user_type,
        p.user_id AS player_user_id,
        c.id AS character_id,
        c.user_id AS character_user_id,
        c.name AS character_name,
        cs.id AS sheet_id,
        cs.name AS sheet_name,
        cs.bio AS sheet_bio,
        cs.backstory AS sheet_backstory,
        cs.points AS sheet_points,
        cs.hp AS sheet_hp,
        cs.st AS sheet_st,
        cs.dx AS sheet_dx,
        cs.iq AS sheet_iq,
        cs.ht AS sheet_ht,
        cs.fatigue AS sheet_fatigue,
        cs.encumbrance AS sheet_encumbrance,
        d.id AS damage_id,
        d.name AS damage_name,
        d.description AS damage_description,
        d.type AS damage_type,
        d.value AS damage_value,
        d.range AS damage_range,
        d.item_id AS damage_item_id,
        d.skill_id AS damage_skill_id,
        d.advantage_id AS damage_advantage_id,
        i.id AS item_id,
        i.name AS item_name,
        i.type AS item_type,
        i.category AS item_category,
        i.weight AS item_weight,
        i.dimensions AS item_dimensions,
        i.description AS item_description,
        i.quality AS item_quality,
        i.condition AS item_condition,
        i.holder_id AS item_holder_id,
        i.owner_id AS item_owner_id,
        i.skill_user_id AS item_skill_user_id,
        i.skill_level AS item_skill_level,
        a.id AS advantage_id,
        a.name AS advantage_name,
        a.cost_points AS advantage_cost_points,
        a.effect AS advantage_effect,
        csk.id AS character_skill_id,
        csk.skill_id AS character_skill_skill_id,
        csk.cost_points AS character_skill_cost_points,
        csk.effect AS character_skill_effect,
        pec.id AS peculiarity_id,
        pec.name AS peculiarity_name,
        pec.cost_points AS peculiarity_cost_points,
        pec.effect AS peculiarity_effect
      FROM game_tables g
      JOIN narrators n ON g.narrator_id = n.id
      JOIN users u ON n.user_id = u.id
      LEFT JOIN game_table_players p ON p.table_id = g.id
      LEFT JOIN characters c ON c.table_id = g.id AND c.user_id = p.user_id
      LEFT JOIN character_sheets cs ON cs.character_id = c.id
      LEFT JOIN damages d ON d.character_id = c.id
      LEFT JOIN items i ON i.holder_id = p.user_id
      LEFT JOIN advantages a ON a.character_id = c.id
      LEFT JOIN character_skills csk ON csk.character_id = c.id
      LEFT JOIN peculiarities pec ON pec.character_id = c.id
      WHERE g.id = ?
    `).all(id) as any[]

    if (!rows?.length) return null

    const first = rows[0]

    const result: GameTableWithPlayers = {
      id: first.table_id,
      narratorId: first.table_narrator_id,
      intro: first.table_intro,
      title: first.table_title,
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
      if (!row.character_id) {
        continue
      }

      let player = result.players.find((entry) => entry.character.id === row.character_id)

      if (!player) {
        player = {
          character: {
            id: row.character_id,
            userId: row.character_user_id,
            name: row.character_name,
            sheet: row.sheet_id
              ? {
                  id: row.sheet_id,
                  name: row.sheet_name,
                  bio: row.sheet_bio,
                  backstory: row.sheet_backstory,
                  points: row.sheet_points,
                  hp: row.sheet_hp,
                  st: row.sheet_st,
                  dx: row.sheet_dx,
                  iq: row.sheet_iq,
                  ht: row.sheet_ht,
                  fatigue: row.sheet_fatigue,
                  encumbrance: row.sheet_encumbrance
                }
              : null,
            damages: [],
            items: [],
            advantages: [],
            skills: [],
            peculiarities: []
          }
        }

        result.players.push(player)
      }

      const character = player.character

      if (row.damage_id && !character.damages.some((item) => item.id === row.damage_id)) {
        character.damages.push({
          id: row.damage_id,
          name: row.damage_name,
          description: row.damage_description,
          type: row.damage_type,
          value: row.damage_value,
          range: row.damage_range,
          itemId: row.damage_item_id,
          skillId: row.damage_skill_id,
          advantageId: row.damage_advantage_id
        })
      }

      if (row.item_id && !character.items.some((item) => item.id === row.item_id)) {
        character.items.push({
          id: row.item_id,
          name: row.item_name,
          type: row.item_type,
          category: row.item_category,
          weight: row.item_weight,
          dimensions: row.item_dimensions,
          description: row.item_description,
          quality: row.item_quality,
          condition: row.item_condition,
          holderId: row.item_holder_id,
          ownerId: row.item_owner_id,
          skillUserId: row.item_skill_user_id,
          skillLevel: row.item_skill_level
        })
      }

      if (row.advantage_id && !character.advantages.some((adv) => adv.id === row.advantage_id)) {
        character.advantages.push({
          id: row.advantage_id,
          name: row.advantage_name,
          costPoints: row.advantage_cost_points,
          effect: row.advantage_effect
        })
      }

      if (row.character_skill_id && !character.skills.some((skill) => skill.id === row.character_skill_id)) {
        character.skills.push({
          id: row.character_skill_id,
          skillId: row.character_skill_skill_id,
          costPoints: row.character_skill_cost_points,
          effect: row.character_skill_effect
        })
      }

      if (row.peculiarity_id && !character.peculiarities.some((item) => item.id === row.peculiarity_id)) {
        character.peculiarities.push({
          id: row.peculiarity_id,
          name: row.peculiarity_name,
          costPoints: row.peculiarity_cost_points,
          effect: row.peculiarity_effect
        })
      }
    }

    return result
  }
}