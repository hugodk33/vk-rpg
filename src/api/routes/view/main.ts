import { Router } from 'express'
import { GameTableRulesRepository } from '../../../domain/repositories/GameTableRulesRepository'
import { GameTableRepository } from '../../../domain/repositories/GameTableRepository'
import { FindAllGameTablesUseCase } from '../../../application/use-cases/tables-use-cases/FindAllGameTablesUseCase'
import { FindAllGameTableScenesUseCase } from '../../../application/use-cases/tables-use-cases/FindAllGameTableScenesUseCase'
import { FindGameTableUseCase } from '../../../application/use-cases/tables-use-cases/FindGameTableUseCase'
import { characterViewer } from './templates/character-viewer'
import { gameTableList } from './templates/game-table-list'
import { gameTableScenes } from './templates/game-table-scenes'
import { gameTableCharacters } from './templates/game-table-characters'
import { formGameTable } from './templates/form-game-table'
import { formCharacter } from './templates/form-character'
import { formNpc } from './templates/form-npc'
import { formItem } from './templates/form-item'
import { formAdvantage } from './templates/form-advantage'
import { formDisadvantage } from './templates/form-disadvantage'
import { narratorDashboard } from './templates/narrator-dashboard'
import { playerDashboard } from './templates/player-dashboard'
import { tableItems } from './templates/table-items'
import { tableAdvantages } from './templates/table-advantages'
import { tableDisadvantages } from './templates/table-disadvantages'
import { sessionScreen } from './templates/session-screen'
import { FindAllGameTableCharactersUseCase } from '../../../application/use-cases/table-game-rules-use-case/FindAllGameTableCharactersUseCase'

const router = Router()
const gameTableRepo = new GameTableRepository()
const findAllGameTablesUseCase = new FindAllGameTablesUseCase(gameTableRepo)
const findAllGameTableScenesUseCase = new FindAllGameTableScenesUseCase(gameTableRepo)
const findGameTableUseCase = new FindGameTableUseCase(gameTableRepo)
const charRepo = new GameTableRulesRepository()
const findAllGameTableCharactersUseCase = new FindAllGameTableCharactersUseCase(charRepo)

router.get('/', async (req, res) => {
  try {
    const tables = await findAllGameTablesUseCase.execute()
    const search = (req.query.search as string || '').toLowerCase()
    const filtered = search
      ? tables.filter((t: any) =>
          t.title?.toLowerCase().includes(search) ||
          t.narrator?.username?.toLowerCase().includes(search) ||
          t.intro?.toLowerCase().includes(search)
        )
      : tables
    res.send(gameTableList(filtered, req.query.search as string || ''))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/view/game_table_scenes/:id', async (req, res) => {
  try {
    const data = await findAllGameTableScenesUseCase.execute(req.params.id)
    res.send(gameTableScenes(data))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/view/game_table_characters/:id', async (req, res) => {
  try {
    const data = await findAllGameTableCharactersUseCase.execute(req.params.id)
    res.send(gameTableCharacters(data))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/game-table-character-viewer/:id', async (req, res) => {
  try {
    const character = await charRepo.findGameCharacter(req.params.id)
    if (!character) {
      return res.status(404).send('Character not found')
    }
    res.send(characterViewer(character))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/view/game_table_items/:id', async (req, res) => {
  try {
    const data = await charRepo.findAllGameItems(req.params.id)
    res.send(tableItems(data))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/view/game_table_advantages/:id', async (req, res) => {
  try {
    const data = await charRepo.findAllGameAdvantages(req.params.id)
    res.send(tableAdvantages(data))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/view/game_table_disadvantages/:id', async (req, res) => {
  try {
    const data = await charRepo.findAllGameDisadvantages(req.params.id)
    res.send(tableDisadvantages(data))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/session/:tableId', async (req, res) => {
  try {
    const [characters, scenes] = await Promise.all([
      charRepo.findAllGameCharacters(req.params.tableId),
      findAllGameTableScenesUseCase.execute(req.params.tableId)
    ])
    const isAdmin = req.query.userType !== 'player'
    res.send(sessionScreen({ table: characters?.table || scenes?.table, characters: characters?.characters || [], scenes: scenes?.scenes || [], isAdmin }))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/session/:tableId/admin', async (req, res) => {
  try {
    const [characters, scenes] = await Promise.all([
      charRepo.findAllGameCharacters(req.params.tableId),
      findAllGameTableScenesUseCase.execute(req.params.tableId)
    ])
    res.send(sessionScreen({ table: characters?.table || scenes?.table, characters: characters?.characters || [], scenes: scenes?.scenes || [], isAdmin: true }))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/session/:tableId/player', async (req, res) => {
  try {
    const [characters, scenes] = await Promise.all([
      charRepo.findAllGameCharacters(req.params.tableId),
      findAllGameTableScenesUseCase.execute(req.params.tableId)
    ])
    res.send(sessionScreen({ table: characters?.table || scenes?.table, characters: characters?.characters || [], scenes: scenes?.scenes || [], isAdmin: false }))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/game-table/new', (_req, res) => {
  res.send(formGameTable())
})

router.get('/form/game-table/:id', async (req, res) => {
  try {
    const table = await findGameTableUseCase.execute(req.params.id)
    if (!table) return res.status(404).send('Mesa não encontrada')
    res.send(formGameTable(table))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/character/new', async (req, res) => {
  const tableId = req.query.table_id as string
  if (tableId) {
    try {
      const table = await findGameTableUseCase.execute(tableId)
      res.send(formCharacter({ table, table_id: tableId }))
      return
    } catch { /* fall through */ }
  }
  res.send(formCharacter({ table_id: tableId || '' }))
})

router.get('/form/character/:id', async (req, res) => {
  try {
    const ch = await charRepo.findGameCharacter(req.params.id)
    if (!ch) return res.status(404).send('Personagem não encontrado')
    res.send(formCharacter(ch))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/npc/new', async (_req, res) => {
  res.send(formNpc({}))
})

router.get('/form/npc/:id', async (req, res) => {
  try {
    const npc = await charRepo.findGameNPC(req.params.id)
    if (!npc) return res.status(404).send('NPC não encontrado')
    res.send(formNpc(npc))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/item/new', (req, res) => {
  const tableId = req.query.table_id as string
  res.send(formItem({ table_id: tableId || '' }))
})

router.get('/form/item/:id', async (req, res) => {
  try {
    const item = await charRepo.findGameItems(req.params.id)
    if (!item) return res.status(404).send('Item não encontrado')
    res.send(formItem(item))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/advantage/new', (req, res) => {
  const tableId = req.query.table_id as string
  res.send(formAdvantage({ table_id: tableId || '' }))
})

router.get('/form/advantage/:id', async (req, res) => {
  try {
    const adv = await charRepo.findGameAdvantages(req.params.id)
    if (!adv) return res.status(404).send('Vantagem não encontrada')
    res.send(formAdvantage(adv))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/form/disadvantage/new', (req, res) => {
  const tableId = req.query.table_id as string
  res.send(formDisadvantage({ table_id: tableId || '' }))
})

router.get('/form/disadvantage/:id', async (req, res) => {
  try {
    const tables = await findAllGameTablesUseCase.execute()
    const table = tables[0]
    res.send(formDisadvantage({ table_id: table?.id || '' }))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/dashboard/narrator/:narratorId', async (req, res) => {
  try {
    const tables = await findAllGameTablesUseCase.execute()
    res.send(narratorDashboard({
      narrator: { name: 'Narrador' },
      tables
    }))
  } catch { res.status(500).send('Internal server error') }
})

router.get('/dashboard/player/:userId', async (req, res) => {
  try {
    const tables = await findAllGameTablesUseCase.execute()
    res.send(playerDashboard({
      player: { username: 'Jogador' },
      characters: [],
      tables
    }))
  } catch { res.status(500).send('Internal server error') }
})

export default router
