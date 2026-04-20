import { Request , Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/FindAllUsersUseCase'
import { FindByStringUserUseCase } from '../../application/use-cases/FindByStringUserUseCase'

export class UserController {
  constructor(
    private useCase: CreateUserUseCase ,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findByStringUserUseCase: FindByStringUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    const user = await this.useCase.execute(req.body)
    return res.json(user)
  }

  async findAll(req: Request, res: Response) {
    const users = await this.findAllUsersUseCase.execute()
    return res.json(users)
  }

  async findByString(req: Request, res: Response) {
    const { searchTerm } = req.params  
    const user = await this.findByStringUserUseCase.execute({ searchTerm })
    return res.json(user)
  }
}