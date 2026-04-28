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

  async createGameNPCS(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_npcs (id, character_id, status)
      VALUES (?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.character_id,
      data.status
    )
  }
  async editGameNPCS(data: any): Promise<void> {
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
  async findGameNPCS(id: any): Promise<any> {
    const gameTableNPC = db.prepare(`
      SELECT npc.*, c.name as character_name
      FROM game_table_npcs npc
      LEFT JOIN characters c ON c.id = npc.character_id
      WHERE npc.id = ?
    `).get(id) as any
    return gameTableNPC
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
}