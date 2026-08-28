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
          system: row.table_system || undefined,
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

      if (!row.player_user_id) {
        continue
      }

      let player = table.players.find((entry) => entry.userId === row.player_user_id)

      if (!player) {
        player = {
          userId: row.player_user_id,
          username: row.player_username ?? null,
          character: null
        }

        table.players.push(player)
      }

      if (row.character_id && !player.character) {
        player.character = {
          id: row.character_id,
          userId: row.character_user_id,
          name: row.sheet_name ?? '',
          sheet: row.sheet_id
            ? {
                id: row.sheet_id,
                name: row.sheet_name ?? undefined,
                points: row.sheet_points ?? undefined,
                hp: row.sheet_hp ?? undefined,
                current_hp: row.sheet_hp ?? undefined,
                modifiers: []
              }
            : null,
          armors: [],
          equipment: [],
          items: [],
          advantages: [],
          disadvantages: [],
          skills: [],
          peculiarities: []
        }
      }

      const sheet = player.character?.sheet

      if (sheet && row.modifier_id && !sheet.modifiers!.some((mod) => mod.id === row.modifier_id)) {
        sheet.modifiers!.push({
          id: row.modifier_id,
          name: row.modifier_name ?? undefined,
          description: row.modifier_description ?? undefined,
          mod_hp: row.modifier_mod_hp ?? undefined,
          mod_st: row.modifier_mod_st ?? undefined,
          mod_dx: row.modifier_mod_dx ?? undefined,
          mod_iq: row.modifier_mod_iq ?? undefined,
          mod_ht: row.modifier_mod_ht ?? undefined,
          mod_fatigue: row.modifier_mod_fatigue ?? undefined
        })
      }
    }

    const result = Array.from(tables.values())

    for (const table of result) {
      for (const player of table.players) {
        const sheet = player.character?.sheet
        if (!sheet) continue
        const totalMod = (sheet.modifiers ?? []).reduce((acc, mod) => acc + (mod.mod_hp ?? 0), 0)
        sheet.current_hp = (sheet.hp ?? 0) + totalMod
      }
    }

    return result
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
      if (!row.player_user_id) {
        continue
      }

      let player = result.players.find((entry) => entry.userId === row.player_user_id)

      if (!player) {
        player = {
          userId: row.player_user_id,
          username: row.player_username ?? null,
          character: null
        }

        result.players.push(player)
      }

      if (!row.character_id || player.character) {
        continue
      }

      player.character = {
        id: row.character_id,
        userId: row.character_user_id,
        name: row.character_name ?? '',
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
        armors: [],
        equipment: [],
        items: [],
        advantages: [],
        disadvantages: [],
        skills: [],
        peculiarities: []
      }

      const character = player.character

      if (row.item_id && !character.items.some((item) => item.id === row.item_id)) {
        character.items.push({
          id: row.item_id,
          name: row.item_name,
          kind: row.item_kind,
          category: row.item_category,
          weight: row.item_weight,
          cost: row.item_cost,
          description: row.item_description,
          quality: row.item_quality,
          condition: row.item_condition,
          weaponId: row.weapon_id,
          armorId: row.armor_id,
          equipment: {
            id: row.item_equipment_id,
            quantity: row.item_equipment_quantity,
            status: row.item_equipment_status,
            location: row.item_equipment_location,
            renderedSt: row.item_equipment_rendered_st
          }
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
              queue: number
              result: string
              description: string
              dice_roll: string
              character: { id: string; name: string; userId: string; username: string } | null
              modifier: any
            }>
            characters: Map<
              string,
              {
                id: string
                name: string
                userId: string
                username: string
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
        const modifier = row.modifier_id
          ? {
              id: row.modifier_id,
              name: row.modifier_name,
              description: row.modifier_description,
              hp: row.modifier_hp,
              st: row.modifier_st,
              dx: row.modifier_dx,
              iq: row.modifier_iq,
              ht: row.modifier_ht,
              fatigue: row.modifier_fatigue,
              mod_hp: row.modifier_mod_hp,
              mod_st: row.modifier_mod_st,
              mod_dx: row.modifier_mod_dx,
              mod_iq: row.modifier_mod_iq,
              mod_ht: row.modifier_mod_ht,
              mod_fatigue: row.modifier_mod_fatigue,
              damage_value: row.modifier_damage_value,
              skill_value: row.modifier_skill_value,
              item_quantity: row.modifier_item_quantity,
              item_weight: row.modifier_item_weight
            }
          : null

        narration.actions.push({
          id: row.action_id,
          queue: row.action_queue,
          result: row.action_result,
          description: row.action_description,
          dice_roll: row.action_dice_roll,
          character: row.action_character_id
            ? {
              id: row.action_character_id,
              name: row.action_character_name,
              userId: row.action_character_user_id,
              username: row.action_character_username
            }
            : null,
          modifier
        })
      }

      // CHARACTERS (narration_characters) sem duplicar
      if (
        row.narration_character_id &&
        !narration.characters.has(row.narration_character_id)
      ) {
        narration.characters.set(row.narration_character_id, {
          id: row.narration_character_ref_id,
          name: row.narration_character_name,
          userId: row.narration_character_user_id,
          username: row.narration_character_username
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

  async createScene(data: any): Promise<void> {
    db.prepare(GameTableDBStrings.SceneCreate as string).run(
      data.id,
      data.table_id,
      data.title,
      data.chapter,
      data.moment
    )
  }

  async createNarration(data: any): Promise<void> {
    db.prepare(GameTableDBStrings.NarrationCreate as string).run(
      data.id,
      data.table_id,
      data.scene_id,
      data.title,
      data.narration,
      data.moment ?? 0
    )
  }

  async createNarrationAction(data: any): Promise<void> {
    db.prepare(GameTableDBStrings.NarrationActionCreate as string).run(
      data.id,
      data.narrations_id,
      data.queue ?? 0,
      data.result ?? null,
      data.dice_roll ?? null,
      data.modificator ?? null,
      data.target ?? null,
      data.multitarget ? 1 : 0,
      data.description ?? null,
      data.character_id ?? null
    )
  }
}
