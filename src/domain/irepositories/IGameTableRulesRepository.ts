export interface IGameTableRulesRepository {
  createGameTableSkills(id: any): Promise<void>
  editGameTableSkills(id: any): Promise<void>
  findGameTableSkill(id: any): Promise<void>
  findAllGameTableSkills(id: any, search?: string, type?: string, difficulty?: string): Promise<any[] | void>

  createGameAdvantages(id: any): Promise<void>
  editGameAdvantages(id: any): Promise<void>
  findGameAdvantages(id: any): Promise<void>
  findAllGameAdvantages(id: any, search?: string, category?: string): Promise<any[] | void>
  findAllGameDisadvantages(id: any, search?: string, category?: string): Promise<any[] | void>
  
  createGamePeculiarites(id: any): Promise<void>
  editGamePeculiarites(id: any): Promise<void>
  findGamePeculiarites(id: any): Promise<void>
  findAllGamePeculiarites(id: any): Promise<any[] | void>
  
  createGameItems(id: any): Promise<any>
  editGameItems(id: any): Promise<void>
  findGameItems(id: any): Promise<void>
  findAllGameItems(id: any, search?: string, category?: string, type?: string): Promise<any[] | void>

  createGameCharacter(data: any): Promise<any>
  editGameCharacter(id: any): Promise<void>
  findGameCharacter(id: any): Promise<void>
  findAllGameCharacters(id: any): Promise<any[] | void>

  createGameNPC(data: any): Promise<any>
  editGameNPC(id: any): Promise<void>
  findGameNPC(id: any): Promise<void>
  findAllGameNPCS(id: any): Promise<any[] | void>
  
  createGameNPCVisibility(id: any): Promise<void>
  editGameNPCVisibility(id: any): Promise<void>
  findGameNPCVisibility(id: any): Promise<void>
  findAllGameNPCVisibility(id: any): Promise<void>

  createGameModifier(data: any): Promise<any>
  editGameModifier(data: any): Promise<void>
  findGameModifier(id: any): Promise<any>
  findAllGameModifiers(tableId: any): Promise<any>

  createGameVisibility(data: any): Promise<any>
  editGameVisibility(data: any): Promise<void>
  findGameVisibility(id: any): Promise<any>
  findAllGameVisibility(characterId: any): Promise<any>

  createGameQueue(data: any): Promise<any>
  editGameQueue(data: any): Promise<void>
  findGameQueue(id: any): Promise<any>
  findAllGameQueue(tableId: any): Promise<any>
}
