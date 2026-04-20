import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { CreateUserUseCase } from '../../application/use-cases/users-use-cases/CreateUserUseCase'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { NarratorRepository } from '../../domain/repositories/NarratorRepository'
import { FindAllUsersUseCase } from '../../application/use-cases/users-use-cases/FindAllUsersUseCase'

import { GameTableRepository } from '../../domain/repositories/GameTableRepository'
import { CreateGameTableUseCase } from '../../application/use-cases/tables-use-cases/CreateGameTableCase'
import { GameTableController } from '../controllers/GameTableController'
import { FindGameTableUseCase } from '../../application/use-cases/tables-use-cases/FindGameTableUseCase'
import { FindAllGameTablesUseCase } from '../../application/use-cases/tables-use-cases/FindAllGameTablesUseCase'
import { FindAllTableGameScenesUseCase } from '../../application/use-cases/tables-use-cases/FindAllTableGameScenesUseCase'
import { FindByStringUserUseCase } from '../../application/use-cases/tables-use-cases/FindByStringUserUseCase'
import { EditUsersUseCase } from '../../application/use-cases/users-use-cases/EditUsersUseCase'

const router = Router()

const repo = new UserRepository()
const narratorRepo = new NarratorRepository()
const gameTableRepo = new GameTableRepository()

/* USERS */
const findAllUsersUseCase = new FindAllUsersUseCase(repo)
const createUserUseCase = new CreateUserUseCase(repo, narratorRepo)
const findByStringUserUseCase = new FindByStringUserUseCase(repo)
const editUsersUseCase = new EditUsersUseCase(repo) 

/* ========== */
const userController = new UserController(createUserUseCase, findAllUsersUseCase , findByStringUserUseCase, editUsersUseCase);

/* GAME TABLE */
const createGameTableUseCase = new CreateGameTableUseCase(gameTableRepo)
const findGameTableUseCase = new FindGameTableUseCase(gameTableRepo)
const findAllGameTablesUseCase = new FindAllGameTablesUseCase(gameTableRepo)
const findAllTableGameScenesUseCase = new FindAllTableGameScenesUseCase(gameTableRepo)
/* ========== */
const gameTableController = new GameTableController(createGameTableUseCase, findGameTableUseCase , findAllGameTablesUseCase , findAllTableGameScenesUseCase)

/* ROUTES */
/* ===== USER ===== */
router.post('/create-user', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.findAll(req, res))
router.get('/users/search/:searchTerm', (req, res) => userController.findByString(req, res))
router.put('/users/edit/:id', (req, res) => userController.editUser(req, res))

/* ===== GAME TABLES ===== */
router.get('/game-tables', (req, res) => gameTableController.findAll(req, res))
router.get('/game-tables/:id', (req, res) => gameTableController.findById(req, res))
router.get('/game-tables-scenes/:searchTerm', (req, res) => gameTableController.findByAllScenes(req, res))

export default router