import { User , PublicUser } from '../../domain/entities/User'

export interface IUserRepository {
  create(user: User): Promise<void>
  findById(id: string): Promise<PublicUser | null>
  findByEmail(email: string): Promise<User | null>
  findByString(searchTerm: string): Promise<PublicUser | null>
  editUser(user: User): Promise<void>
  findAll(): Promise<User[]>
}