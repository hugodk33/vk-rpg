import { db } from '../../infra/database/database'
import crypto from 'crypto'
import { IGameTableRulesRepository } from '../irepositories/IGameTableRulesRepository'
import  {Skill} from '../entities/GURPS/Skill_GURPS'

export class GameTableRulesRepository implements IGameTableRulesRepository {
  
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
    const gameTableSkill = db.prepare(`SELECT * FROM game_table_skills WHERE id = ?`).get(id) as any
    return gameTableSkill
  }

  async findAllGameTableSkills( ): Promise<any[]> {
    const gameTableSkills = db.prepare(`SELECT * FROM game_table_skills`).all() as any[]
    return gameTableSkills
  }
  
  async createGameAdvantages(id: any): Promise<void> {}
  async editGameAdvantages(id: any): Promise<void> {}
  async findGameAdvantages(id: any): Promise<void> {}
  async findAllGameAdvantages(id: any): Promise<void> {}

  async createGamePeculiarites(id: any): Promise<void> {}
  async editGamePeculiarites(id: any): Promise<void> {}
  async findGamePeculiarites(id: any): Promise<void> {}
  async findAllGamePeculiarites(id: any): Promise<void> {}
  
  async createGameItems(id: any): Promise<void> {}
  async editGameItems(id: any): Promise<void> {}
  async findGameItems(id: any): Promise<void> {}
  async findAllGameItems(id: any): Promise<void> {}
  
  async createGameNPCS(id: any): Promise<void> {}
  async editGameNPCS(id: any): Promise<void> {}
  async findGameNPCS(id: any): Promise<void> {}
  async findAllGameNPCS(id: any): Promise<void> {}
  
  async createGameNPCVisibility(id: any): Promise<void> {}  
  async editGameNPCVisibility(id: any): Promise<void> {}
  async findGameNPCVisibility(id: any): Promise<void> {}
  async findAllGameNPCVisibility(id: any): Promise<void> {}
}
