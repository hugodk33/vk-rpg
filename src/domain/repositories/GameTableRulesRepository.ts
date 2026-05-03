import { db } from '../../infra/database/database'
import crypto from 'crypto'
import { IGameTableRulesRepository } from '../irepositories/IGameTableRulesRepository'
import  {Skill} from '../entities/GURPS/Skill_GURPS'

export class GameTableRulesRepository implements IGameTableRulesRepository {
  /* =============== */
  /*      SKILLS     */
  /* =============== */
  async createGameTableSkills(skill: Skill): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_skills (id, name , predefinition_value , predefinition_type)
      VALUES (?, ? , ?, ?)
    `).run(
      crypto.randomUUID(),
      skill.name,
      skill.predefinition_value,
      skill.predefinition_type
    ) 
  }

  async editGameTableSkills(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_skills
      SET name = ?, predefinition_value = ?, predefinition_type = ?
      WHERE id = ?
    `).run(     
      data.name,
      data.predefinition_value,
      data.predefinition_type,
      data.id
    )
  }

  async findGameTableSkill(id: any): Promise<void> {
    const gameTableSkill = db.prepare(`
      SELECT 
      * FROM 
      game_table_skills WHERE id = ?
    `).get(id) as any
    return gameTableSkill
  }

  async findAllGameTableSkills(id:any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTableSkills = db.prepare(`
      SELECT 
      * FROM 
      game_table_skills WHERE table_id = ?
    `).all(id) as any[]
    
    return {
      table: table,
      skill: gameTableSkills
    }
  }

  /* =============== */
  /*    ADVANTAGES   */
  /* =============== */
  
  async createGameAdvantages(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_advantages (id, table_id, name, cost_points, effect, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.table_id,
      data.name,
      data.cost_points,
      data.effect,
      data.description
    )
  }

  async editGameAdvantages(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_advantages
      SET name = ?, cost_points = ?, effect = ?, description = ?
      WHERE id = ?
    `).run(
      data.name,
      data.cost_points,
      data.effect,
      data.description,
      data.id
    )
  }
 
  async findGameAdvantages(id: any): Promise<any> {
    const gameTableAdvantage = db.prepare(`
      SELECT *
      FROM game_table_advantages
      WHERE id = ?
    `).get(id) as any
    return gameTableAdvantage
  }

  async findAllGameAdvantages(id: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTablesAdvantages = db.prepare(`
      SELECT 
      * FROM 
      game_table_advantages WHERE table_id = ?
    `).all(id) as any[]
    return ({
      table: table,
      advantages: gameTablesAdvantages
    })
  }

  /* =============== */
  /*   PECULIARITES  */
  /* =============== */

  async createGamePeculiarites(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_peculiarities (id, table_id, name, cost_points, effect, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.table_id,
      data.name,
      data.cost_points,
      data.effect,
      data.description
    )
  }
  async editGamePeculiarites(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_peculiarities
      SET name = ?, cost_points = ?, effect = ?, description = ?
      WHERE id = ?
    `).run(
      data.name,
      data.cost_points,
      data.effect,
      data.description,
      data.id
    )
  }
  async findGamePeculiarites(id: any): Promise<any> {
    const gameTablePeculiarity = db.prepare(`
      SELECT *
      FROM game_table_peculiarities
      WHERE id = ?
    `).get(id) as any
    return gameTablePeculiarity
  }
  async findAllGamePeculiarites(id: any): Promise<any> {
    
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTablesPeculiarites = db.prepare(`
      SELECT 
      * FROM 
      game_table_peculiarites WHERE table_id = ?
    `).all(id) as any[]
    return ({
      table: table,
      peculiarites: gameTablesPeculiarites
    })
  }

  /* =============== */
  /*      ITEMS      */
  /* =============== */
  
  async createGameItems(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_items (id, table_id, name, type, category, weight, dimensions, description, quality, condition, holder_id, owner_id, skill_user_id, skill_level)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.table_id,
      data.name,
      data.type,
      data.category,
      data.weight,
      data.dimensions,
      data.description,
      data.quality,
      data.condition,
      data.holder_id,
      data.owner_id,
      data.skill_user_id,
      data.skill_level
    )
  }
  async editGameItems(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_items
      SET name = ?, type = ?, category = ?, weight = ?, dimensions = ?, description = ?, quality = ?, condition = ?, holder_id = ?, owner_id = ?, skill_user_id = ?, skill_level = ?
      WHERE id = ?
    `).run(
      data.name,
      data.type,
      data.category,
      data.weight,
      data.dimensions,
      data.description,
      data.quality,
      data.condition,
      data.holder_id,
      data.owner_id,
      data.skill_user_id,
      data.skill_level,
      data.id
    )
  }
  async findGameItems(id: any): Promise<any> {
    const gameTableItem = db.prepare(`
      SELECT *
      FROM game_table_items
      WHERE id = ?
    `).get(id) as any
    return gameTableItem
  }
  async findAllGameItems(id: any): Promise<any> {
    
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTablesItems = db.prepare(`
      SELECT 
      * FROM 
      game_table_items WHERE table_id = ?
    `).all(id) as any[]

    return ({
      table: table,
      items: gameTablesItems
    })
  }
  
  /* =============== */
  /*       NPCS      */
  /* =============== */

  async createGameNPC(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_npcs (id, character_id, status)
      VALUES (?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.character_id,
      data.status
    )
  }
  async editGameNPC(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_npcs
      SET character_id = ?, status = ?
      WHERE id = ?
    `).run(
      data.character_id,
      data.status,
      data.id
    )
  }
  async findGameNPC(id: any): Promise<any> {
    const npcData = db.prepare(`
      SELECT
        npc.id as npc_id,
        npc.status,
        npc.character_id,
        c.table_id,
        c.name as character_name,
        c.user_id,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.bio,
        cs.backstory,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        cs.fatigue,
        cs.encumbrance,
        u.username,
        u.email,
        u.phone,
        g.title as table_title,
        g.intro as table_intro,
        g.system as table_system
      FROM game_table_npcs npc
      LEFT JOIN characters c ON c.id = npc.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      WHERE npc.id = ?
    `).get(id) as any

    if (!npcData) return null

    const characterId = npcData.character_id
    const tableId = npcData.table_id
    const userId = npcData.user_id

    const advantages = db.prepare(`
      SELECT * FROM game_table_character_advantages
      WHERE character_id = ?
    `).all(characterId) as any[]

    const skills = db.prepare(`
      SELECT
        csk.id,
        csk.skill_id,
        csk.cost_points,
        csk.effect,
        s.name as skill_name,
        s.predefinition_type,
        s.predefinition_difficulty
      FROM game_table_character_skills csk
      LEFT JOIN game_table_skills s ON s.id = csk.skill_id
      WHERE csk.character_id = ?
    `).all(characterId) as any[]

    const items = db.prepare(`
      SELECT * FROM game_table_items
      WHERE holder_id = ? OR owner_id = ?
    `).all(userId, userId) as any[]

    const peculiarities = db.prepare(`
      SELECT * FROM game_table_peculiarities
      WHERE table_id = ?
    `).all(tableId) as any[]

    const damages = db.prepare(`
      SELECT * FROM game_table_damages
      WHERE character_id = ?
    `).all(characterId) as any[]

    return {
      npc: {
        id: npcData.npc_id,
        status: npcData.status
      },
      character: {
        id: npcData.character_id,
        name: npcData.character_name,
        user: {
          id: npcData.user_id,
          username: npcData.username,
          email: npcData.email,
          phone: npcData.phone
        },
        sheet: npcData.sheet_id ? {
          id: npcData.sheet_id,
          name: npcData.sheet_name,
          bio: npcData.bio,
          backstory: npcData.backstory,
          points: npcData.points,
          hp: npcData.hp,
          st: npcData.st,
          dx: npcData.dx,
          iq: npcData.iq,
          ht: npcData.ht,
          fatigue: npcData.fatigue,
          encumbrance: npcData.encumbrance
        } : null,
        advantages,
        skills,
        items,
        damages
      },
      table: {
        id: npcData.table_id,
        title: npcData.table_title,
        intro: npcData.table_intro,
        system: npcData.table_system
      },
      peculiarities
    }
  }
  async findAllGameNPCS(tableId: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(tableId as string)

    const gameTablesNPCS = db.prepare(`
      SELECT 
        npc.id as npc_id,
        npc.status,
        npc.character_id,
        c.name as character_name,
        cs.name as sheet_name,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht
      FROM game_table_npcs npc
      LEFT JOIN characters c ON c.id = npc.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      WHERE c.table_id = ?
    `).all(tableId) as any[]
    
    return ({
        'table': table,
        'npcs': gameTablesNPCS
    })
  }
  
  /* =============== */
  /* NPCS VISIBILITY */
  /* =============== */

  async createGameNPCVisibility(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO narration_npcs (id, narration_id, npc_id)
      VALUES (?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.narration_id,
      data.npc_id
    )
  }
  async editGameNPCVisibility(data: any): Promise<void> {
    db.prepare(`
      UPDATE narration_npcs
      SET narration_id = ?, npc_id = ?
      WHERE id = ?
    `).run(
      data.narration_id,
      data.npc_id,
      data.id
    )
  }
  async findGameNPCVisibility(id: any): Promise<any> {
    const npcVisibility = db.prepare(`
      SELECT *
      FROM narration_npcs
      WHERE id = ?
    `).get(id) as any
    return npcVisibility
  }
  async findAllGameNPCVisibility(id: any): Promise<any> {
    const npcVisibility = db.prepare(`
      SELECT nn.*, n.title as narration_title, npc.character_id
      FROM narration_npcs nn
      LEFT JOIN narrations n ON n.id = nn.narration_id
      LEFT JOIN game_table_npcs npc ON npc.id = nn.npc_id
      WHERE nn.npc_id = ?
    `).all(id) as any[]
    return npcVisibility
  }

  /* =============== */
  /*    CHARACTERS   */
  /* =============== */

  async createGameCharacter(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO characters (id, user_id, table_id, name)
      VALUES (?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.user_id,
      data.table_id,
      data.name
    )
  }

  async editGameCharacter(data: any): Promise<void> {
    db.prepare(`
      UPDATE characters
      SET user_id = ?, table_id = ?, name = ?
      WHERE id = ?
    `).run(
      data.user_id,
      data.table_id,
      data.name,
      data.id
    )
  }

  async findGameCharacter(id: any): Promise<any> {
    const characterData = db.prepare(`
      SELECT
        c.id as character_id,
        c.user_id,
        c.table_id,
        c.name as character_name,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.bio,
        cs.backstory,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        cs.fatigue,
        cs.encumbrance,
        u.username,
        u.email,
        u.phone,
        u.type as user_type,
        g.title as table_title,
        g.intro as table_intro,
        g.system as table_system
      FROM characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      WHERE c.id = ?
    `).get(id) as any

    if (!characterData) return null

    const characterId = characterData.character_id
    const tableId = characterData.table_id
    const userId = characterData.user_id

    const advantages = db.prepare(`
      SELECT * FROM game_table_character_advantages
      WHERE character_id = ?
    `).all(characterId) as any[]

    const skills = db.prepare(`
      SELECT
        csk.id,
        csk.skill_id,
        csk.cost_points,
        csk.effect,
        s.name as skill_name,
        s.predefinition_type,
        s.predefinition_difficulty
      FROM game_table_character_skills csk
      LEFT JOIN game_table_skills s ON s.id = csk.skill_id
      WHERE csk.character_id = ?
    `).all(characterId) as any[]

    const items = db.prepare(`
      SELECT * FROM game_table_items
      WHERE holder_id = ? OR owner_id = ?
    `).all(userId, userId) as any[]

    const peculiarities = db.prepare(`
      SELECT * FROM game_table_peculiarities
      WHERE table_id = ?
    `).all(tableId) as any[]

    const damages = db.prepare(`
      SELECT * FROM game_table_damages
      WHERE character_id = ?
    `).all(characterId) as any[]

    return {
      character: {
        id: characterData.character_id,
        name: characterData.character_name,
        user: {
          id: characterData.user_id,
          username: characterData.username,
          email: characterData.email,
          phone: characterData.phone,
          type: characterData.user_type
        },
        sheet: characterData.sheet_id ? {
          id: characterData.sheet_id,
          name: characterData.sheet_name,
          bio: characterData.bio,
          backstory: characterData.backstory,
          points: characterData.points,
          hp: characterData.hp,
          st: characterData.st,
          dx: characterData.dx,
          iq: characterData.iq,
          ht: characterData.ht,
          fatigue: characterData.fatigue,
          encumbrance: characterData.encumbrance
        } : null,
        advantages,
        skills,
        items,
        damages
      },
      table: {
        id: characterData.table_id,
        title: characterData.table_title,
        intro: characterData.table_intro,
        system: characterData.table_system
      },
      peculiarities
    }
  }

  async findAllGameCharacters(tableId: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(tableId as string)

    const characters = db.prepare(`
      SELECT
        c.id as character_id,
        c.user_id,
        c.name as character_name,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        u.username
      FROM characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.table_id = ?
    `).all(tableId) as any[]

    return {
      table,
      characters: characters.map(char => ({
        id: char.character_id,
        name: char.character_name,
        user: {
          id: char.user_id,
          username: char.username
        },
        sheet: char.sheet_id ? {
          id: char.sheet_id,
          name: char.sheet_name,
          points: char.points,
          hp: char.hp,
          st: char.st,
          dx: char.dx,
          iq: char.iq,
          ht: char.ht
        } : null
      }))
    }
  }
}