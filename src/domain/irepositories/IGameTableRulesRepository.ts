export interface IGameTableRulesRepository {
  createGameTableSkills(id: any): Promise<void>
  editGameTableSkills(id: any): Promise<void>
  findGameTableSkill(id: any): Promise<void>
  findAllGameTableSkills(id: any, search?: string, type?: string, difficulty?: string, viewer?: any): Promise<any[] | void>

  createGameAdvantages(id: any): Promise<void>
  editGameAdvantages(id: any): Promise<void>
  findGameAdvantages(id: any): Promise<void>
  findAllGameAdvantages(id: any, search?: string, category?: string, viewer?: any): Promise<any[] | void>
  findAllGameDisadvantages(id: any, search?: string, category?: string, viewer?: any): Promise<any[] | void>
  findGameDisadvantages(id: any): Promise<void>
  
  findGameLocation(id: any, viewer?: any): Promise<any>
  findAllGameLocations(id: any, viewer?: any): Promise<any[] | void>
  createGameLocation(data: any): Promise<any>
  editGameLocation(data: any): Promise<void>
  deleteGameLocation(id: any): Promise<any>
  setDefaultGameLocation(tableId: any, locationId: any): Promise<any>
  
  createGamePeculiarites(id: any): Promise<void>
  editGamePeculiarites(id: any): Promise<void>
  findGamePeculiarites(id: any): Promise<void>
  findAllGamePeculiarites(id: any): Promise<any[] | void>
  
  createGameItems(id: any): Promise<any>
  editGameItems(id: any): Promise<void>
  findGameItems(id: any): Promise<void>
  findAllGameItems(id: any, search?: string, category?: string, type?: string, viewer?: any, location?: any): Promise<any[] | void>

  createGameCharacter(data: any): Promise<any>
  editGameCharacter(id: any): Promise<void>
  findGameCharacter(id: any, moment?: number, viewer?: any): Promise<void>
  findGameCharacterHistory(id: any, moment?: number): Promise<any>
  findAllGameCharacters(id: any, viewer?: any): Promise<any[] | void>

  editGameCharacterEquipment(data: any): Promise<any>

  createGameNPC(data: any): Promise<any>
  editGameNPC(id: any): Promise<void>
  findGameNPC(id: any): Promise<void>
  findAllGameNPCS(id: any, location?: any): Promise<any[] | void>
  
  createGameNPCVisibility(id: any): Promise<void>
  editGameNPCVisibility(id: any): Promise<void>
  findGameNPCVisibility(id: any): Promise<void>
  findAllGameNPCVisibility(id: any): Promise<void>

  createGameModifier(data: any): Promise<any>
  editGameModifier(data: any): Promise<void>
  findGameModifier(id: any): Promise<any>
  findAllGameModifiers(tableId: any): Promise<any>
  applyGameSkillEffect(characterId: string, skillId: string): Promise<any[]>

  createGameVisibility(data: any): Promise<any>
  editGameVisibility(data: any): Promise<void>
  findGameVisibility(id: any): Promise<any>
  findAllGameVisibility(characterId: any): Promise<any>

  createGameQueue(data: any): Promise<any>
  editGameQueue(data: any): Promise<void>
  findGameQueue(id: any): Promise<any>
  findAllGameQueue(tableId: any): Promise<any>
}
