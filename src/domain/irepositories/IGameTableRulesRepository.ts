export interface IGameTableRulesRepository {
  createGameSkills(id: any): Promise<void>
  editGameSkills(id: any): Promise<void>
  findGameSkills(id: any): Promise<void>
  findAllGameSkills(id: any): Promise<void>
  createGameAdvantages(id: any): Promise<void>
  editGameAdvantages(id: any): Promise<void>
  findGameAdvantages(id: any): Promise<void>
  findAllGameAdvantages(id: any): Promise<void>
  createGamePeculiarites(id: any): Promise<void>
  editGamePeculiarites(id: any): Promise<void>
  findGamePeculiarites(id: any): Promise<void>
  findAllGamePeculiarites(id: any): Promise<void>
  createGameItems(id: any): Promise<void>
  editGameItems(id: any): Promise<void>
  findGameItems(id: any): Promise<void>
  findAllGameItems(id: any): Promise<void>
  createGameNPCS(id: any): Promise<void>
  editGameNPCS(id: any): Promise<void>
  findGameNPCS(id: any): Promise<void>
  findAllGameNPCS(id: any): Promise<void>
  createGameNPCVisibility(id: any): Promise<void>
  editGameNPCVisibility(id: any): Promise<void>
  findGameNPCVisibility(id: any): Promise<void>
  findAllGameNPCVisibility(id: any): Promise<void>
}
