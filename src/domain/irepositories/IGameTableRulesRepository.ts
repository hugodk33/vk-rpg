export interface IGameTableRulesRepository {
  createGameTableSkills(id: any): Promise<void>
  editGameTableSkills(id: any): Promise<void>
  findGameTableSkill(id: any): Promise<void>
  findAllGameTableSkills(id: any): Promise<any[] | void>

  createGameAdvantages(id: any): Promise<void>
  editGameAdvantages(id: any): Promise<void>
  findGameAdvantages(id: any): Promise<void>
  findAllGameAdvantages(id: any): Promise<any[] | void>
  
  createGamePeculiarites(id: any): Promise<void>
  editGamePeculiarites(id: any): Promise<void>
  findGamePeculiarites(id: any): Promise<void>
  findAllGamePeculiarites(id: any): Promise<any[] | void>
  
  createGameItems(id: any): Promise<void>
  editGameItems(id: any): Promise<void>
  findGameItems(id: any): Promise<void>
  findAllGameItems(id: any): Promise<any[] | void>
  
  createGameNPCS(id: any): Promise<void>
  editGameNPCS(id: any): Promise<void>
  findGameNPCS(id: any): Promise<void>
  findAllGameNPCS(id: any): Promise<any[] | void>
  
  createGameNPCVisibility(id: any): Promise<void>
  editGameNPCVisibility(id: any): Promise<void>
  findGameNPCVisibility(id: any): Promise<void>
  findAllGameNPCVisibility(id: any): Promise<void>
}
