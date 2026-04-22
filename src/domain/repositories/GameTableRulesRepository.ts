import { db } from '../../infra/database/database'

import { IGameTableRulesRepository } from '../irepositories/IGameTableRulesRepository'

export class GameTableRulesRepository implements IGameTableRulesRepository {
  
  async createGameSkills(id: any): Promise<void> {

  }

  async editGameSkills(id: any): Promise<void> {}
  async findGameSkills(id: any): Promise<void> {}
  async findAllGameSkills(id: any): Promise<void> {}
  
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
