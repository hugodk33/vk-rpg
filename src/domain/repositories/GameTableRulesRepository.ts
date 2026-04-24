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

  async editGameTableSkills(id: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_skills
      SET name = ?, predefinition_value = ?, predefinition_type = ?
      WHERE id = ?
    `).run(     
      id
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
  
  async createGameAdvantages(id: any): Promise<void> {

  }

  async editGameAdvantages(id: any): Promise<void> {

  }
 
  async findGameAdvantages(id: any): Promise<void> {
    db.prepare(`
      SELECT 
      * FROM 
      game_table_advantages WHERE id = ?
    `).get(id) as any
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

  async createGamePeculiarites(id: any): Promise<void> {}
  async editGamePeculiarites(id: any): Promise<void> {}
  async findGamePeculiarites(id: any): Promise<void> {}
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
  
  async createGameItems(id: any): Promise<void> {}
  async editGameItems(id: any): Promise<void> {}
  async findGameItems(id: any): Promise<void> {}
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

  async createGameNPCS(id: any): Promise<void> {}
  async editGameNPCS(id: any): Promise<void> {}
  async findGameNPCS(id: any): Promise<void> {}
  async findAllGameNPCS(id: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTablesNPCS = db.prepare(`
      SELECT 
      * FROM 
      game_table_NPCS 
      LEFT JOIN characters c ON c.id = game_table_NPCS.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      WHERE table_id = ?
    `).all(id) as any[]
    
    return ({
        'table': table,
        'npcs': gameTablesNPCS
    })
  }
  
  /* =============== */
  /* NPCS VISIBILITY */
  /* =============== */

  async createGameNPCVisibility(id: any): Promise<void> {}  
  async editGameNPCVisibility(id: any): Promise<void> {}
  async findGameNPCVisibility(id: any): Promise<void> {}
  async findAllGameNPCVisibility(id: any): Promise<void> {}
}
