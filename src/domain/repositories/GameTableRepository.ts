import { db } from '../../infra/database/database'

import type {
  GameTableWithNarrator,
  GameTablePlayerWithCharacter,
  GameTableScenes,
  GameTableWithScenes
} from '../types/GameTableTypes'

import type { IGameTableRepository } from '../irepositories/IGameTableRepository'

import { GameTable } from '../entities/GameTable'
import { GameTableDBStrings } from './queryStrings/GameTableDBStrings'

type GameTableWithPlayers = GameTableWithNarrator & {
  players: GameTablePlayerWithCharacter[]
}

export class GameTableRepository implements IGameTableRepository {
  async create(gameTable: GameTable): Promise<void> {
    db.prepare(GameTableDBStrings.GameTableCreateNew as string).run(
      gameTable.id,
      gameTable.narratorId,
      gameTable.title,
      gameTable.system,
      gameTable.intro
    )
  }

  async findAll(): Promise<GameTableWithNarrator[]> {
    const rows = db.prepare(GameTableDBStrings.GameTableFindAll as string).all() as any[]

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
    const rows = db.prepare(GameTableDBStrings.GameTableFindById).all(id) as any[]

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
    const rows = db.prepare(GameTableDBStrings.GameTableFindBySceneId as string).all(sceneId) as any[]

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
    const rows = db.prepare(GameTableDBStrings.GameTableWithScenesAndNarrations as string).all(tableId) as any[]

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
    const row = db.prepare(GameTableDBStrings.GameTableFindTableById as string).get(tableId) as any

    if (!row) return null

    return {
      id: row.id,
      narratorId: row.narrator_id,
      title: row.title,
      system: row.table_system, 
      intro: row.intro
    }
  }

  async edit(gameTable: GameTable): Promise<void> {
    db.prepare(GameTableDBStrings.GameTableEdit as string).run(
      gameTable.title,
      gameTable.intro,
      gameTable.system,
      gameTable.id
    ) 
  }
}
