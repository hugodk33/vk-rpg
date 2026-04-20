import { db } from '../../infra/database/database'

import type {
  GameTableWithNarrator,
  GameTablePlayerWithCharacter,
  GameTableScenes,
  GameTableWithScenes
} from '../types/GameTableTypes'

import type { IGameTableRepository } from '../irepositories/IGameTableRepository'

import { GameTable } from '../entities/GameTable'
import { title } from 'node:process'

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
      LEFT JOIN character_advantages a ON a.character_id = c.id
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
      LEFT JOIN character_advantages a ON a.character_id = c.id
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

  async findBySceneId(sceneId: string): Promise<GameTableScenes> {
    const rows = db.prepare(`
      SELECT
        s.id AS scene_id,
        s.table_id AS scene_table_id,
        n.id AS narration_id,
        n.scene_id AS narration_scene_id,
        n.table_id AS narration_table_id,
        n.narration AS narration_text,
        n.moment AS narration_moment,
        a.id AS action_id,
        a.name AS action_name,
        a.description AS action_description,
        a.user_id AS action_user_id,
        c.id AS character_id,
        c.name AS character_name
      FROM scenes s
      LEFT JOIN narrations n ON n.scene_id = s.id
      LEFT JOIN actions a ON a.scene_id = s.id
      LEFT JOIN characters c ON c.user_id = a.user_id AND c.table_id = s.table_id
      WHERE s.id = ?
      ORDER BY n.moment ASC, a.id ASC
    `).all(sceneId) as any[]

    if (!rows.length) {
      return {
        id: sceneId,
        title: '',
        narrations: []
      }
    }

    return this.mapSceneRows(rows)[0]!
  }

  async findByAllScenes(tableId: string): Promise<GameTableWithScenes> {
    const rows = db.prepare(`
      SELECT
      -- SCENE
      s.id AS scene_id,
      s.chapter AS scene_chapter,
      s.title AS scene_title,
      s.moment AS scene_moment,
      s.table_id AS scene_table_id,

      -- NARRATION
      n.id AS narration_id,
      n.scene_id AS narration_scene_id,
      n.table_id AS narration_table_id,
      n.title AS narration_title,
      n.narration AS narration_text,
      n.moment AS narration_moment,

      -- ACTION
      na.id AS action_id,
      na.test AS action_test,
      na.character_id AS action_character_id,

      -- CHARACTER (via action)
      ca.id AS action_character_ref_id,
      ca.name AS action_character_name,

      -- CHARACTER (narration_characters)
      nc.id AS narration_character_link_id,
      nc.character_id AS narration_character_id,

      cn.id AS narration_character_ref_id,
      cn.name AS narration_character_name,

      -- NPC
      nn.id AS narration_npc_link_id,
      npc.id AS narration_npc_id,
      npc.character_id AS narration_npc_character_id,
      npc.status AS narration_npc_status,

      c_npc.id AS narration_npc_ref_id,
      c_npc.name AS narration_npc_name,

      -- LOCATION
      nl.id AS narration_location_link_id,
      tl.id AS location_id,
      tl.name AS location_name,
      tl.region AS location_region,
      tl.sub_region AS location_sub_region,
      tl.address AS location_address,
      tl.is_indoor AS location_is_indoor,
      tl.country AS location_country,
      tl.area AS location_area,
      tl.dimensions AS location_dimensions,
      tl.description AS location_description,
      tl.other AS location_other

    FROM scenes s

    LEFT JOIN narrations n 
      ON n.scene_id = s.id

    LEFT JOIN narration_actions na 
      ON na.narrations_id = n.id

    LEFT JOIN characters ca 
      ON ca.id = na.character_id

    LEFT JOIN narration_characters nc 
      ON nc.narrations_id = n.id

    LEFT JOIN characters cn 
      ON cn.id = nc.character_id

    LEFT JOIN narration_npcs nn
      ON nn.narration_id = n.id

    LEFT JOIN npcs npc
      ON npc.id = nn.npc_id

    LEFT JOIN characters c_npc 
      ON c_npc.id = npc.character_id

    -- LOCATION
    LEFT JOIN narration_locations nl
      ON nl.narrations_id = n.id

    LEFT JOIN table_locations tl
      ON tl.id = nl.location_id

    WHERE s.table_id = ?
      ORDER BY s.chapter ASC, s.moment ASC, n.moment ASC, na.id ASC
    `).all(tableId) as any[]

    const table = await this.findTableById(tableId)

    if (!rows.length) {
      return {
        table,
        scenes: []
      }
    }

    return {
      table,
      scenes: this.mapSceneRows(rows)
    }
  }

  private mapSceneRows(rows: any[]): GameTableScenes[] {
    const scenesMap = new Map<
      string,
      {
        id: string
        chapter: number
        moment: number
        title: string
        narrations: Map<
          string,
          {
            id: string
            sceneId: string
            title: string
            narration: string
            moment: number
            actions: Array<{
              id: string
              name: string
              description: string
              userId: string
              character: { id: string; name: string } | null
            }>
            characters: Map<
              string,
              {
                id: string
                name: string
              }
            >
            npcs: Map<
              string,
              {
                id: string
                characterId: string
                name: string
                status: string
              }
            >,
            location: {
              id: string
              name: string
              region: string
              subRegion: string
              address: string
              isIndoor: boolean
              country: string
              area: string
              dimensions: string
              description: string
              other: string
            } | null
          }
        >
      }
    >()

    for (const row of rows) {
      // SCENE
      if (!scenesMap.has(row.scene_id)) {
        scenesMap.set(row.scene_id, {
          id: row.scene_id,
          title: row.scene_title,
          chapter: row.scene_chapter,
          moment: row.scene_moment,
          narrations: new Map()
        })
      }

      const scene = scenesMap.get(row.scene_id)!

      // sem narration, ignora
      if (!row.narration_id) continue

      // NARRATION
      if (!scene.narrations.has(row.narration_id)) {
        scene.narrations.set(row.narration_id, {
          id: row.narration_id,
          sceneId: row.narration_scene_id,
          title: row.narration_title,
          narration: row.narration_text,
          moment: row.narration_moment,
          actions: [],
          characters: new Map(),
          npcs: new Map(),
          location:  null
        })
      }

      const narration = scene.narrations.get(row.narration_id)!

      // ACTIONS (sem duplicar)
      if (
        row.action_id &&
        !narration.actions.some((action) => action.id === row.action_id)
      ) {
        narration.actions.push({
          id: row.action_id,
          name: row.action_name,
          description: row.action_description,
          userId: row.action_user_id,
          character: row.character_id
            ? {
              id: row.character_id,
              name: row.character_name
            }
            : null
        })
      }

      // CHARACTERS (narration_characters) sem duplicar
      if (
        row.narration_character_id &&
        !narration.characters.has(row.narration_character_id)
      ) {
        narration.characters.set(row.narration_character_id, {
          id: row.narration_character_ref_id,
          name: row.narration_character_name
        })
      }

      if (
        row.narration_npc_link_id &&
        !narration.npcs.has(row.narration_npc_link_id)
      ) {
        narration.npcs.set(row.narration_npc_link_id, {
          id: row.narration_npc_id,
          characterId: row.narration_npc_character_id,
          name: row.narration_npc_name,
          status: row.narration_npc_status
        })
      }

      if (
        row.location_id &&
        !narration.location
      ) {
        narration.location = {
          id: row.location_id,
          name: row.location_name,
          region: row.location_region,
          subRegion: row.location_sub_region,
          address: row.location_address,
          isIndoor: !!row.location_is_indoor,
          country: row.location_country,
          area: row.location_area,
          dimensions: row.location_dimensions,
          description: row.location_description,
          other: row.location_other
        }
      }
    }

    return Array.from(scenesMap.values()).map((scene) => ({
      id: scene.id,
      chapter: scene.chapter,
      moment: scene.moment,
      title: scene.title,
      narrations: Array.from(scene.narrations.values())
        .sort((a, b) => (a.moment ?? 0) - (b.moment ?? 0)) // ✅ ordenação aqui
        .map((narration) => ({
          id: narration.id,
          sceneId: narration.sceneId,
          title: narration.title,
          narration: narration.narration,
          moment: narration.moment,
          actions: narration.actions,
          characters: Array.from(narration.characters.values()) as any,
          npcs: Array.from(narration.npcs.values()) as any,
          location: narration.location
        }))
    }))
  }

  async findTableById(tableId: string): Promise<GameTable | null> {
    const row = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(tableId) as any

    if (!row) return null

    return {
      id: row.id,
      narratorId: row.narrator_id,
      intro: row.intro,
      title: row.title
    }
  }

}
