import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindAllTableLocationsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, viewer?: any) {
    const locations = await this.repo.findAllGameLocations(id, viewer)
    return locations
  }
}
