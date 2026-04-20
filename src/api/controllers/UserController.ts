import { Request , Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/users-use-cases/CreateUserUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/users-use-cases/FindAllUsersUseCase'
import { FindByStringUserUseCase } from '../../application/use-cases/tables-use-cases/FindByStringGameTableUseCase'
import { EditUsersUseCase } from '../../application/use-cases/users-use-cases/EditUsersUseCase'

export class UserController {
  constructor(
    private useCase: CreateUserUseCase ,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findByStringUserUseCase: FindByStringUserUseCase,
    private editUsersUseCase: EditUsersUseCase
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

  async editUser(req: Request, res: Response) {
    const { id } = req.params
    const user = await this.editUsersUseCase.execute({ ...req.body, id })
    return res.json(user)
  }

}