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
import { FindAllGameTableScenesUseCase } from '../../application/use-cases/tables-use-cases/FindAllGameTableScenesUseCase'
import { EditGameTableUseCase } from '../../application/use-cases/tables-use-cases/EditGameTableUseCase'

import { FindByStringUserUseCase } from '../../application/use-cases/tables-use-cases/FindByStringGameTableUseCase'
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
const userController = 
    new UserController(
        createUserUseCase, 
        findAllUsersUseCase , 
        findByStringUserUseCase, 
        editUsersUseCase
    );  

/* GAME TABLE */
const createGameTableUseCase = new CreateGameTableUseCase(gameTableRepo)
const findGameTableUseCase = new FindGameTableUseCase(gameTableRepo)
const findAllGameTablesUseCase = new FindAllGameTablesUseCase(gameTableRepo)
const findAllGameTableScenesUseCase = new FindAllGameTableScenesUseCase(gameTableRepo)
const editGameTableUseCase = new EditGameTableUseCase(gameTableRepo)
/* ========== */
const gameTableController = 
    new GameTableController(
        createGameTableUseCase, 
        findGameTableUseCase , 
        findAllGameTablesUseCase , 
        findAllGameTableScenesUseCase, 
        editGameTableUseCase
    )

/* ROUTES */
/* ===== USER ===== */
router.post('/create-user', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.findAll(req, res))
router.get('/users/search/:searchTerm', (req, res) => userController.findByString(req, res))
router.put('/users/edit/:id', (req, res) => userController.editUser(req, res))

/* ===== GAME TABLES ===== */
router.post('/create-game-table', (req, res) => gameTableController.create(req, res))
router.get('/game-tables', (req, res) => gameTableController.findAll(req, res))
router.get('/game-table/:id', (req, res) => gameTableController.findById(req, res))
router.get('/game-table-scenes/:id', (req, res) => gameTableController.findByAllScenes(req, res))
router.put('/game-table/edit/:id', (req, res) => gameTableController.editGameTable(req, res))

export default router