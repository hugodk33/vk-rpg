import { db } from '../../infra/database/database'
import crypto from 'crypto'
import { IGameTableRulesRepository } from '../irepositories/IGameTableRulesRepository'
import  {Skill} from '../entities/GURPS/Skill_GURPS'
import { shapeCatalogForViewer, shapeCharacterForViewer } from '../services/CharacterVisibility'

/** Rules an observer holds (any target) — the "knowledge" set that gates
    catalogs and locations. Catalog/location rows are observer-global, but
    any visible item rule (even target-scoped) counts as knowing the item. */
function viewerRules(viewerId: string): any[] {
  return db.prepare(`SELECT * FROM visibility WHERE character_id = ?`)
    .all(viewerId) as any[]
}

function possessedItemIds(characterId: string): Set<string> {
  const rows = db.prepare(
    `SELECT DISTINCT item_id FROM character_equipment WHERE character_id = ?`
  ).all(characterId) as any[]
  return new Set(rows.map((r: any) => String(r.item_id)).filter(Boolean))
}

/* ================================================================
   LOCATIONS — hierarquia de território + grade hexagonal (GURPS)
   ----------------------------------------------------------------
   A `table_locations` é uma árvore: um local ENVELOPA os filhos
   (world > continent > nation > region > city > district > site >
   battlemap). `path` é o caminho materializado `/pai/filho/` (permite
   subárvore e ordenação por O(log n)); `level` é a profundidade.
   A geometria de cada local é uma grade hexagonal:
     size_m      = metros por lado de hex (escala da grade)
     q,r         = coords axiais do CENTRO do local dentro do pai
     width/height= pegada em hexes
   Um local vira MAPA DE BATALHA quando a escala chega em ~metros
   (hex_size_m <= 2) — é o ponto onde o narrador monta o grid tático.
   ================================================================ */

/** Escala "em metros por hex" recomendada por divisão. Raiz herda do sistema. */
export const LOCATION_KIND_RANK: Record<string, number> = {
  world: 0,
  continent: 10,
  nation: 20,
  region: 30,
  biome: 35,
  province: 40,
  city: 50,
  district: 60,
  locale: 70,
  site: 80,
  battlemap: 90,
  point: 95,
}

export const LOCATION_KIND_LABELS: Record<string, string> = {
  world: 'World',
  continent: 'Continent',
  nation: 'Nation',
  region: 'Region',
  biome: 'Biome',
  province: 'Province',
  city: 'City',
  district: 'District',
  locale: 'Locale',
  site: 'Site',
  battlemap: 'Battle Map',
  point: 'Point',
}

function locationIsBattlemap(hexSizeM: unknown, stored?: unknown): boolean {
  if (stored != null) return !!stored
  if (hexSizeM == null) return false
  return (hexSizeM as number) <= 2
}

function locationToDTO(l: any): any {
  const hexSizeM = l.hex_size_m ?? null
  return {
    id: l.id,
    tableId: l.table_id ?? null,
    parentId: l.parent_id ?? null,
    kind: l.kind ?? 'site',
    level: l.level ?? 0,
    path: l.path ?? '/',
    name: l.name ?? null,
    region: l.region ?? null,
    subRegion: l.sub_region ?? l.subRegion ?? null,
    address: l.address ?? null,
    isIndoor: !!l.is_indoor,
    country: l.country ?? null,
    area: l.area ?? null,
    dimensions: l.dimensions ?? null,
    description: l.description ?? null,
    other: l.other ?? null,
    hex: {
      sizeM: hexSizeM,
      width: l.width_hexes ?? null,
      height: l.height_hexes ?? null,
      centerQ: l.center_q ?? 0,
      centerR: l.center_r ?? 0,
      orientation: l.orientation ?? 'flat',
      rotationDeg: l.rotation_deg ?? 0,
    },
    isBattlemap: locationIsBattlemap(hexSizeM, l.is_battlemap),
  }
}

/** Monta a árvore de locais a partir da lista plana. */
function buildLocationTree(locations: any[]): any[] {
  const byParent = new Map<string | null, any[]>()
  for (const loc of locations) {
    const pid = loc.parentId ?? null
    if (!byParent.has(pid)) byParent.set(pid, [])
    byParent.get(pid)!.push(loc)
  }
  const sortSiblings = (a: any, b: any) =>
    (a.hex?.centerQ ?? 0) - (b.hex?.centerQ ?? 0) ||
    (a.hex?.centerR ?? 0) - (b.hex?.centerR ?? 0) ||
    (a.name ?? '').localeCompare(b.name ?? '')
  const attach = (loc: any): any => ({
    ...loc,
    children: (byParent.get(loc.id) ?? []).sort(sortSiblings).map(attach),
  })
  return (byParent.get(null) ?? []).sort(sortSiblings).map(attach)
}

/** Mantém só os nós visíveis (e filhos visíveis) quando há viewer. */
function filterTreeVisible(tree: any[], visible: Set<string>): any[] {
  return tree
    .filter((n) => visible.has(String(n.id)))
    .map((n) => ({ ...n, children: filterTreeVisible(n.children ?? [], visible) }))
}

/** level/path materializado. path SEMPRE inclui o próprio id (`/pai/filho/`). */
function locationAncestry(selfId: string, parentId: string | null): { level: number; path: string } {
  if (!parentId) return { level: 0, path: `/${selfId}/` }
  const parent: any = db.prepare('SELECT id, level, path FROM table_locations WHERE id = ?').get(parentId)
  if (!parent) return { level: 0, path: `/${selfId}/` }
  let parentPath = parent.path ?? ''
  if (!parentPath || !parentPath.endsWith('/')) parentPath = parentPath ? `${parentPath}/` : '/'
  return { level: (parent.level ?? 0) + 1, path: `${parentPath}${selfId}/` }
}

export class GameTableRulesRepository implements IGameTableRulesRepository {
  /* =============== */
  /*      SKILLS     */
  /* =============== */
  async createGameTableSkills(skill: Skill): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_skills (id, name , predefinition_value , predefinition_type)
      VALUES (?, ? , ?, ?)
    `).run(
      crypto.randomUUID(),
      skill.name,
      skill.predefinition_value,
      skill.predefinition_type
    ) 
  }

  async editGameTableSkills(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_skills
      SET name = ?, predefinition_value = ?, predefinition_type = ?
      WHERE id = ?
    `).run(     
      data.name,
      data.predefinition_value,
      data.predefinition_type,
      data.id
    )
  }

  async findGameTableSkill(id: any): Promise<void> {
    const gameTableSkill = db.prepare(`
      SELECT 
      * FROM 
      game_table_skills WHERE id = ?
    `).get(id) as any
    return gameTableSkill
  }

  async findAllGameTableSkills(id: any, search?: string, type?: string, difficulty?: string, viewer?: any): Promise<any> {

    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const skillClauses: string[] = ["table_id = ?"]
    const skillParams: any[] = [id]

    if (search) {
      skillClauses.push("(name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR predefinition_type LIKE ? OR predefinition_difficulty LIKE ? OR description LIKE ?)")
      const like = `%${search}%`
      skillParams.push(like, like, like, like, like, like)
    }
    if (type) { skillClauses.push("predefinition_type = ?"); skillParams.push(type) }
    if (difficulty) { skillClauses.push("predefinition_difficulty = ?"); skillParams.push(difficulty) }

    // Todas as skills
    const skills = db.prepare(`
      SELECT *
      FROM game_table_skills
      WHERE ${skillClauses.join(" AND ")}
    `).all(...skillParams) as any[]

    // =========================
    // PREDEFINITIONS
    // =========================

    const predefinitions = db.prepare(`
      SELECT
        gtsp.origin_skill_id,
        gtsp.depends_on_skill_value,
        gtsp.depends_on_skill_for_others_attributes,

        dependent_skill.id as dependent_skill_id,
        dependent_skill.name as dependent_skill_name

      FROM game_table_skill_predefinede gtsp

      LEFT JOIN game_table_skills dependent_skill
        ON dependent_skill.id = gtsp.depends_on_skill_id

      WHERE gtsp.origin_skill_id IN (
        SELECT id
        FROM game_table_skills
        WHERE table_id = ?
      )
    `).all(id) as any[]

    // =========================
    // DEPENDENCIES
    // =========================

    const dependencies = db.prepare(`
      SELECT
        gtsd.origin_skill_id,
        gtsd.depends_on_skill_value,
        gtsd.depends_type,

        dependent_skill.id as dependent_skill_id,
        dependent_skill.name as dependent_skill_name

      FROM game_table_skill_dependencies gtsd

      LEFT JOIN game_table_skills dependent_skill
        ON dependent_skill.id = gtsd.depends_on_skill_id

      WHERE gtsd.origin_skill_id IN (
        SELECT id
        FROM game_table_skills
        WHERE table_id = ?
      )
    `).all(id) as any[]

    // =========================
    // FORMATAÇÃO FINAL
    // =========================

    const formattedSkills = skills.map((skill) => {

      const skillPredefinitions = predefinitions
        .filter(pre => pre.origin_skill_id === skill.id)
        .map(pre => ({
          skill: pre.dependent_skill_name || null,
          value: pre.depends_on_skill_value || null,
          depends_on_skill_for_others_attributes:
            pre.depends_on_skill_for_others_attributes || null
        }))

      const skillDependencies = dependencies
        .filter(dep => dep.origin_skill_id === skill.id)
        .map(dep => ({
          skill: dep.dependent_skill_name || null,
          value: dep.depends_on_skill_value || null,
          type: dep.depends_type || null
        }))

      return {
        ...skill,
        predefinition: skillPredefinitions,
        dependencies: skillDependencies
      }
    })

    return {
      table,
      skills: viewer
        ? shapeCatalogForViewer(formattedSkills, viewerRules(viewer), 'skill')
        : formattedSkills
    }
  }

  /* =============== */
  /*    ADVANTAGES   */
  /* =============== */
  
  async createGameAdvantages(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_advantages (id, table_id, name, cost_points, effect, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.table_id,
      data.name,
      data.cost_points,
      data.effect,
      data.description
    )
  }

  async editGameAdvantages(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_advantages
      SET name = ?, cost_points = ?, effect = ?, description = ?
      WHERE id = ?
    `).run(
      data.name,
      data.cost_points,
      data.effect,
      data.description,
      data.id
    )
  }
 
  async findGameAdvantages(id: any): Promise<any> {
    const gameTableAdvantage = db.prepare(`
      SELECT *
      FROM game_table_advantages
      WHERE id = ?
    `).get(id) as any
    return gameTableAdvantage
  }

  async findAllGameAdvantages(id: any, search?: string, category?: string, viewer?: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const advClauses: string[] = ["table_id = ?"]
    const advParams: any[] = [id]
    if (search) {
      advClauses.push("(name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR description LIKE ?)")
      const like = `%${search}%`
      advParams.push(like, like, like, like)
    }
    if (category) { advClauses.push("category = ?"); advParams.push(category) }

    const gameTablesAdvantages = db.prepare(`
      SELECT * FROM game_table_advantages
      WHERE ${advClauses.join(" AND ")}
    `).all(...advParams) as any[]
    return ({
      table: table,
      advantages: viewer
        ? shapeCatalogForViewer(gameTablesAdvantages, viewerRules(viewer), 'advantage')
        : gameTablesAdvantages
    })
  }

  async findAllGameDisadvantages(id: any, search?: string, category?: string, viewer?: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const disClauses: string[] = ["table_id = ?"]
    const disParams: any[] = [id]
    if (search) {
      disClauses.push("(name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR effect LIKE ? OR description LIKE ?)")
      const like = `%${search}%`
      disParams.push(like, like, like, like, like)
    }
    if (category) { disClauses.push("category = ?"); disParams.push(category) }

    const gameTablesDisadvantages = db.prepare(`
      SELECT * FROM game_table_disadvantages
      WHERE ${disClauses.join(" AND ")}
    `).all(...disParams) as any[]
    return ({
      table: table,
      disadvantages: viewer
        ? shapeCatalogForViewer(gameTablesDisadvantages, viewerRules(viewer), 'disadvantage')
        : gameTablesDisadvantages
    })
  }

  async findGameDisadvantages(id: any): Promise<any> {
    const disadvantage = db.prepare(`
      SELECT * FROM game_table_disadvantages WHERE id = ?
    `).get(id) as any
    return disadvantage
  }

  async findGameLocation(id: any): Promise<any> {
    const row: any = db.prepare(`
      SELECT tl.*, gt.title AS table_title
      FROM table_locations tl
      LEFT JOIN game_tables gt ON gt.id = tl.table_id
      WHERE tl.id = ?
      LIMIT 1
    `).get(id)
    if (!row) return null

    const dto = locationToDTO(row)

    // Ancestralidade (cadeia raiz -> pai, sem o próprio nó)
    const ancestors: any[] = []
    const guard = new Set<string>([row.id])
    let curId: string | null = row.parent_id ?? null
    while (curId) {
      if (guard.has(curId)) break
      guard.add(curId)
      const parentRow: any = db.prepare('SELECT * FROM table_locations WHERE id = ?').get(curId)
      if (!parentRow) break
      ancestors.unshift(locationToDTO(parentRow))
      curId = parentRow.parent_id ?? null
    }

    const children = (db.prepare(`
      SELECT * FROM table_locations
      WHERE parent_id = ?
      ORDER BY hex_size_m IS NULL, hex_size_m ASC, name ASC
    `).all(id) as any[]).map(locationToDTO)

    return {
      ...dto,
      table_id: row.table_id,
      table_title: row.table_title,
      ancestors,
      children,
    }
  }

  /* =============== */
  /*   PECULIARITES  */
  /* =============== */

  async createGamePeculiarites(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO game_table_characters_quirks (id, character_id, name, cost_points, effect, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.character_id,
      data.name,
      data.cost_points,
      data.effect,
      data.description
    )
  }
  async editGamePeculiarites(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_characters_quirks
      SET name = ?, cost_points = ?, effect = ?, description = ?
      WHERE id = ?
    `).run(
      data.name,
      data.cost_points,
      data.effect,
      data.description,
      data.id
    )
  }
  async findGamePeculiarites(id: any): Promise<any> {
    const gameTablePeculiarity = db.prepare(`
      SELECT *
      FROM game_table_characters_quirks
      WHERE id = ?
    `).get(id) as any
    return gameTablePeculiarity
  }
  async findAllGamePeculiarites(id: any): Promise<any> {
    
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const gameTablesPeculiarites = db.prepare(`
      SELECT q.* FROM game_table_characters_quirks q
      LEFT JOIN game_table_characters c ON c.id = q.character_id
      WHERE c.table_id = ?
    `).all(id) as any[]
    return ({
      table: table,
      peculiarites: gameTablesPeculiarites
    })
  }

  /* =============== */
  /*      ITEMS      */
  /* =============== */

  async createGameItems(data: any): Promise<any> {
    const itemId = crypto.randomUUID()
    const kind = data.kind || (data.type === 1 ? 'weapon' : data.type === 2 ? 'armor' : 'equipment')
    db.prepare(`
      INSERT INTO game_table_items (id, table_id, name, kind, category, weight_lb, cost, dimensions, description, quality, condition)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      itemId,
      data.table_id,
      data.name,
      kind,
      data.category,
      data.weight_lb ?? data.weight ?? null,
      data.cost ?? null,
      data.dimensions,
      data.description,
      data.quality,
      data.condition
    )

    // ---- WEAPON / SHIELD: atributos de arma + ataques ----
    if (kind === 'weapon' || kind === 'shield') {
      const weaponId = crypto.randomUUID()
      db.prepare(`
        INSERT INTO game_table_weapons (id, item_id, skill, min_st, rated_st, handedness, reach, parry, block, fit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        weaponId, itemId,
        data.weapon_skill || (data.skill_level || null),
        data.min_st ?? null,
        data.rated_st ?? null,
        data.handedness ?? 1,
        data.reach || 'C',
        data.parry || null,
        data.block || null,
        data.weapon_fit || 'normal'
      )

      const attacks = Array.isArray(data.attacks) ? data.attacks : []
      const insertAttack = db.prepare(`
        INSERT INTO weapon_attacks (id, weapon_id, name, usage, damage_source, damage_modifier, damage_dice, damage_type, armor_penetration, accuracy, range, recoil, shots)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      for (const atk of attacks) {
        insertAttack.run(
          crypto.randomUUID(), weaponId,
          atk.name || 'Attack', atk.usage || null,
          atk.damage_source || 'fixed', atk.damage_modifier ?? 0,
          atk.damage_dice || null, atk.damage_type || 'cr',
          atk.armor_penetration ?? 0, atk.accuracy ?? null,
          atk.range || 'Melee', atk.recoil ?? null, atk.shots ?? null
        )
      }
    }

    // ---- ARMOR: atributos de armadura ----
    if (kind === 'armor' || kind === 'shield') {
      db.prepare(`
        INSERT INTO game_table_armors (id, item_id, dr, flex, locations, fit)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        crypto.randomUUID(), itemId,
        data.dr ?? data.armor_value ?? null,
        data.flex ? 1 : 0,
        data.locations || data.fit || 'torso',
        data.armor_fit || 'normal'
      )
    }

    return { id: itemId }
  }

  async editGameItems(data: any): Promise<void> {
    const kind = data.kind || (data.type === 1 ? 'weapon' : data.type === 2 ? 'armor' : 'equipment')
    db.prepare(`
      UPDATE game_table_items
      SET name = ?, kind = ?, category = ?, weight_lb = ?, cost = ?, dimensions = ?, description = ?, quality = ?, condition = ?
      WHERE id = ?
    `).run(
      data.name,
      kind,
      data.category,
      data.weight_lb ?? data.weight ?? null,
      data.cost ?? null,
      data.dimensions,
      data.description,
      data.quality,
      data.condition,
      data.id
    )

    const existingWeapon = db.prepare(`SELECT id, fit FROM game_table_weapons WHERE item_id = ?`).get(data.id) as any

    // ---- WEAPON / SHIELD ----
    if (kind === 'weapon' || kind === 'shield') {
      const weaponId = existingWeapon?.id || crypto.randomUUID()
      if (existingWeapon) {
        db.prepare(`
          UPDATE game_table_weapons SET skill = ?, min_st = ?, rated_st = ?, handedness = ?, reach = ?, parry = ?, block = ?, fit = ?
          WHERE id = ?
        `).run(
          data.weapon_skill || data.skill_level || null,
          data.min_st ?? null,
          data.rated_st ?? null,
          data.handedness ?? 1,
          data.reach || 'C',
          data.parry || null,
          data.block || null,
          data.weapon_fit || existingWeapon.fit || 'normal',
          weaponId
        )
      } else {
        db.prepare(`
          INSERT INTO game_table_weapons (id, item_id, skill, min_st, rated_st, handedness, reach, parry, block, fit)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(weaponId, data.id, data.weapon_skill || data.skill_level || null, data.min_st ?? null, data.rated_st ?? null, data.handedness ?? 1, data.reach || 'C', data.parry || null, data.block || null, data.weapon_fit || 'normal')
      }

      // Substitui os ataques (recreate por simplicidade de edição)
      db.prepare(`DELETE FROM weapon_attacks WHERE weapon_id = ?`).run(weaponId)
      const attacks = Array.isArray(data.attacks) ? data.attacks : []
      const insertAttack = db.prepare(`
        INSERT INTO weapon_attacks (id, weapon_id, name, usage, damage_source, damage_modifier, damage_dice, damage_type, armor_penetration, accuracy, range, recoil, shots)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      for (const atk of attacks) {
        insertAttack.run(
          crypto.randomUUID(), weaponId,
          atk.name || 'Attack', atk.usage || null,
          atk.damage_source || 'fixed', atk.damage_modifier ?? 0,
          atk.damage_dice || null, atk.damage_type || 'cr',
          atk.armor_penetration ?? 0, atk.accuracy ?? null,
          atk.range || 'Melee', atk.recoil ?? null, atk.shots ?? null
        )
      }
    } else if (existingWeapon) {
      // deixou de ser arma: remove ataques e atributos de arma
      db.prepare(`DELETE FROM weapon_attacks WHERE weapon_id = ?`).run(existingWeapon.id)
      db.prepare(`DELETE FROM game_table_weapons WHERE id = ?`).run(existingWeapon.id)
    }

    // ---- ARMOR ----
    const existingArmor = db.prepare(`SELECT id FROM game_table_armors WHERE item_id = ?`).get(data.id) as any
    if (kind === 'armor' || kind === 'shield') {
      if (existingArmor) {
        db.prepare(`
          UPDATE game_table_armors SET dr = ?, flex = ?, locations = ?, fit = ? WHERE id = ?
        `).run(
          data.dr ?? data.armor_value ?? null,
          data.flex ? 1 : 0,
          data.locations || data.fit || 'torso',
          data.armor_fit || 'normal',
          existingArmor.id
        )
      } else {
        db.prepare(`
          INSERT INTO game_table_armors (id, item_id, dr, flex, locations, fit)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(crypto.randomUUID(), data.id, data.dr ?? data.armor_value ?? null, data.flex ? 1 : 0, data.locations || data.fit || 'torso', data.armor_fit || 'normal')
      }
    } else if (existingArmor) {
      db.prepare(`DELETE FROM game_table_armors WHERE id = ?`).run(existingArmor.id)
    }
  }

  async findGameItems(id: any): Promise<any> {
    const gameTableItem = db.prepare(`
      SELECT i.*
      FROM game_table_items i
      WHERE i.id = ?
    `).get(id) as any
    if (!gameTableItem) return gameTableItem

    const weapon = db.prepare(`
      SELECT * FROM game_table_weapons WHERE item_id = ?
    `).get(gameTableItem.id) as any
    if (weapon) {
      weapon.attacks = db.prepare(`
        SELECT * FROM weapon_attacks WHERE weapon_id = ? ORDER BY rowid ASC
      `).all(weapon.id) as any[]
    }

    const armor = db.prepare(`SELECT * FROM game_table_armors WHERE item_id = ?`).get(gameTableItem.id) as any

    return { ...gameTableItem, weapon: weapon || null, armor: armor || null }
  }

  async findAllGameItems(id: any, search?: string, category?: string, kind?: string, viewer?: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const itemClauses: string[] = ["table_id = ?"]
    const itemParams: any[] = [id]

    if (search) {
      itemClauses.push("(name LIKE ? OR category LIKE ? OR quality LIKE ? OR condition LIKE ? OR description LIKE ?)")
      const q = `%${search}%`
      itemParams.push(q, q, q, q, q)
    }

    if (category) {
      itemClauses.push("category = ?")
      itemParams.push(category)
    }

    if (kind) {
      itemClauses.push("kind = ?")
      itemParams.push(kind)
    }

    const gameTablesItems = db.prepare(`
      SELECT *
      FROM game_table_items
      WHERE ${itemClauses.join(" AND ")}
    `).all(...itemParams) as any[]

    // Associa cada item ao seu weapon (com ataques) e/ou armor
    for (const item of gameTablesItems) {
      const weapon = db.prepare(`SELECT * FROM game_table_weapons WHERE item_id = ?`).get(item.id) as any
      if (weapon) {
        weapon.attacks = db.prepare(`SELECT * FROM weapon_attacks WHERE weapon_id = ? ORDER BY rowid ASC`).all(weapon.id) as any[]
        item.weapon = weapon
      }
      const armor = db.prepare(`SELECT * FROM game_table_armors WHERE item_id = ?`).get(item.id) as any
      if (armor) item.armor = armor
    }

    const shapedItems = viewer
      ? shapeCatalogForViewer(gameTablesItems, viewerRules(viewer), 'item', possessedItemIds(viewer))
      : gameTablesItems

    return ({
      table: table,
      items: shapedItems
    })
  }

  /* =============== */
  /*    LOCATIONS    */
  /* =============== */

  async findAllGameLocations(id: any, viewer?: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(id as string)

    const locations = (db.prepare(`
      SELECT *
      FROM table_locations
      WHERE table_id = ?
      ORDER BY path ASC, name ASC
    `).all(id as string) as any[]).map(locationToDTO)

    const shaped = viewer
      ? shapeCatalogForViewer(locations, viewerRules(viewer), 'location')
      : locations

    return ({
      table: table,
      locations: shaped,
      tree: viewer
        ? filterTreeVisible(buildLocationTree(shaped), new Set(shaped.map((x: any) => String(x.id))))
        : buildLocationTree(locations),
    })
  }

  /* =============== */
  /*   LOCATIONS CRUD */
  /* =============== */

  async createGameLocation(data: any): Promise<any> {
    const id = data.id ?? crypto.randomUUID()
    const parentId = data.parent_id ?? data.parentId ?? null
    const { level, path } = locationAncestry(id, parentId)
    const isIndoor = data.is_indoor ?? data.isIndoor ? 1 : 0
    const hexSizeM = data.hex_size_m ?? data.hex?.sizeM ?? null
    const isBattle = data.is_battlemap !== undefined
      ? (data.is_battlemap ? 1 : 0)
      : (locationIsBattlemap(hexSizeM) ? 1 : 0)

    db.prepare(`
      INSERT INTO table_locations (
        id, table_id, parent_id, kind, level, path,
        name, region, address, sub_region, is_indoor, other, country, area, dimensions, description,
        hex_size_m, width_hexes, height_hexes, center_q, center_r, orientation, rotation_deg, is_battlemap
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.table_id,
      parentId,
      data.kind ?? 'site',
      level,
      path,
      data.name ?? null,
      data.region ?? null,
      data.address ?? null,
      data.sub_region ?? data.subRegion ?? null,
      isIndoor,
      data.other ?? null,
      data.country ?? null,
      data.area ?? null,
      data.dimensions ?? null,
      data.description ?? null,
      hexSizeM,
      data.width_hexes ?? data.hex?.width ?? null,
      data.height_hexes ?? data.hex?.height ?? null,
      data.center_q ?? data.hex?.centerQ ?? 0,
      data.center_r ?? data.hex?.centerR ?? 0,
      data.orientation ?? data.hex?.orientation ?? 'flat',
      data.rotation_deg ?? data.hex?.rotationDeg ?? 0,
      isBattle
    )

    return this.findGameLocation(id)
  }

  async editGameLocation(data: any): Promise<void> {
    const current: any = db.prepare('SELECT * FROM table_locations WHERE id = ?').get(data.id)
    if (!current) throw new Error('Location not found')

    const parentId = data.parent_id ?? data.parentId ?? current.parent_id ?? null
    const parentChanged = String(parentId ?? '') !== String(current.parent_id ?? '')
    const { level, path } = parentChanged
      ? locationAncestry(data.id, parentId)
      : { level: current.level, path: current.path }

    const hexSizeM = data.hex_size_m ?? data.hex?.sizeM ?? current.hex_size_m ?? null
    const isBattle = data.is_battlemap !== undefined
      ? (data.is_battlemap ? 1 : 0)
      : (locationIsBattlemap(hexSizeM, current.is_battlemap) ? 1 : 0)

    db.prepare(`
      UPDATE table_locations SET
        parent_id = ?, kind = ?, level = ?, path = ?,
        name = ?, region = ?, address = ?, sub_region = ?, is_indoor = ?,
        other = ?, country = ?, area = ?, dimensions = ?, description = ?,
        hex_size_m = ?, width_hexes = ?, height_hexes = ?, center_q = ?, center_r = ?,
        orientation = ?, rotation_deg = ?, is_battlemap = ?
      WHERE id = ?
    `).run(
      parentId,
      data.kind ?? current.kind ?? 'site',
      level,
      path,
      data.name ?? current.name ?? null,
      data.region ?? current.region ?? null,
      data.address ?? current.address ?? null,
      data.sub_region ?? data.subRegion ?? current.sub_region ?? null,
      data.is_indoor !== undefined ? (data.is_indoor ? 1 : 0) : current.is_indoor ?? 0,
      data.other ?? current.other ?? null,
      data.country ?? current.country ?? null,
      data.area ?? current.area ?? null,
      data.dimensions ?? current.dimensions ?? null,
      data.description ?? current.description ?? null,
      hexSizeM,
      data.width_hexes ?? data.hex?.width ?? current.width_hexes ?? null,
      data.height_hexes ?? data.hex?.height ?? current.height_hexes ?? null,
      data.center_q ?? data.hex?.centerQ ?? current.center_q ?? 0,
      data.center_r ?? data.hex?.centerR ?? current.center_r ?? 0,
      data.orientation ?? data.hex?.orientation ?? current.orientation ?? 'flat',
      data.rotation_deg ?? data.hex?.rotationDeg ?? current.rotation_deg ?? 0,
      isBattle,
      data.id
    )

    if (parentChanged) this.recomputeLocationSubtree(data.id)
  }

  /**
   * Remove uma folha do território. Recusa se o local tiver subdivisões
   * (apague os filhos primeiro) e desvincula referências antigas
   * (narration_locations / visibility) para não violar as FKs.
   */
  async deleteGameLocation(id: string): Promise<any> {
    const row: any = db.prepare('SELECT id, name, parent_id FROM table_locations WHERE id = ?').get(id)
    if (!row) throw new Error('Location not found')

    const child = db.prepare('SELECT COUNT(*) AS c FROM table_locations WHERE parent_id = ?').get(id) as { c: number }
    if (child.c > 0) {
      throw new Error(`Location "${row.name}" has ${child.c} subdivision(s); remove them first`)
    }

    const tx = db.transaction(() => {
      db.prepare('UPDATE narration_locations SET location_id = NULL WHERE location_id = ?').run(id)
      db.prepare('UPDATE visibility SET location_id = NULL WHERE location_id = ?').run(id)
      db.prepare('DELETE FROM table_locations WHERE id = ?').run(id)
    })
    tx()

    return { success: true, id, parent_id: row.parent_id ?? null, name: row.name }
  }

  /** Recalcula level/path de toda a subárvore (após mover de pai). */
  private recomputeLocationSubtree(rootId: string): void {
    const queue: string[] = [rootId]
    while (queue.length) {
      const parentId = queue.shift()!
      const parent: any = db.prepare('SELECT id, level, path FROM table_locations WHERE id = ?').get(parentId)
      if (!parent) continue
      const children = db.prepare('SELECT id FROM table_locations WHERE parent_id = ?').all(parentId) as any[]
      for (const child of children) {
        let base = parent.path ?? ''
        if (!base || !base.endsWith('/')) base = base ? `${base}/` : '/'
        db.prepare('UPDATE table_locations SET level = ?, path = ? WHERE id = ?')
          .run((parent.level ?? 0) + 1, `${base}${child.id}/`, child.id)
        queue.push(child.id)
      }
    }
  }

  /* =============== */
  /*       NPCS      */
  /* =============== */

  async createGameNPC(data: any): Promise<any> {
    const characterId = data.character_id || crypto.randomUUID()
    const sheetId = crypto.randomUUID()

    const insertTransaction = db.transaction(() => {
      db.prepare(`
        INSERT INTO game_table_characters (id, user_id, table_id)
        VALUES (?, ?, ?)
      `).run(characterId, data.user_id || null, data.table_id)

      if (data.sheet) {
        db.prepare(`
          INSERT INTO game_table_character_sheets (id, character_id, name, bio, backstory, points, hp, st, dx, iq, ht, fatigue, encumbrance)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          sheetId, characterId,
          data.sheet.name || '',
          data.sheet.bio || '',
          data.sheet.backstory || '',
          data.sheet.points ?? 0,
          data.sheet.hp ?? 10,
          data.sheet.st ?? 10,
          data.sheet.dx ?? 10,
          data.sheet.iq ?? 10,
          data.sheet.ht ?? 10,
          data.sheet.fatigue ?? 10,
          data.sheet.encumbrance || 'None'
        )
      }

      const insertAdvantage = db.prepare(`
        INSERT INTO game_table_character_advantages (id, advantage_id, name, character_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const adv of (data.advantages || [])) {
        insertAdvantage.run(crypto.randomUUID(), adv.advantage_id || null, adv.name, characterId, adv.cost_points, adv.effect || '')
      }

      const insertDisadvantage = db.prepare(`
        INSERT INTO game_table_character_disadvantages (id, disadvantage_id, name, character_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const dis of (data.disadvantages || [])) {
        insertDisadvantage.run(crypto.randomUUID(), dis.disadvantage_id || null, dis.name, characterId, dis.cost_points, dis.effect || '')
      }

      const insertSkill = db.prepare(`
        INSERT INTO game_table_character_skills (id, character_id, skill_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?)
      `)
      for (const sk of (data.skills || [])) {
        insertSkill.run(crypto.randomUUID(), characterId, sk.skill_id, sk.cost_points ?? 0, sk.effect || '')
      }

      db.prepare(`
        INSERT INTO game_table_npcs (id, character_id, status)
        VALUES (?, ?, ?)
      `).run(crypto.randomUUID(), characterId, data.status || 'active')
    })

    insertTransaction()
    return { character_id: characterId, sheet_id: sheetId }
  }
  async editGameNPC(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_npcs
      SET character_id = ?, status = ?
      WHERE id = ?
    `).run(
      data.character_id,
      data.status,
      data.id
    )
  }
  async findGameNPC(id: any): Promise<any> {
    const npcData = db.prepare(`
      SELECT
        npc.id as npc_id,
        npc.status,
        npc.character_id,
        c.table_id,
        c.user_id,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.bio,
        cs.backstory,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        cs.fatigue,
        cs.encumbrance,
        u.username,
        u.email,
        u.phone,
        g.title as table_title,
        g.intro as table_intro,
        g.system as table_system
      FROM game_table_npcs npc
      LEFT JOIN characters c ON c.id = npc.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      WHERE npc.id = ?
    `).get(id) as any

    if (!npcData) return null

    const characterId = npcData.character_id
    const tableId = npcData.table_id
    const userId = npcData.user_id

    const advantages = db.prepare(`
      SELECT * FROM game_table_character_advantages
      WHERE character_id = ?
    `).all(characterId) as any[]

    const skills = db.prepare(`
      SELECT
        csk.id,
        csk.skill_id,
        csk.cost_points,
        csk.effect,
        s.name as skill_name,
        s.predefinition_type,
        s.predefinition_difficulty
      FROM game_table_character_skills csk
      LEFT JOIN game_table_skills s ON s.id = csk.skill_id
      WHERE csk.character_id = ?
    `).all(characterId) as any[]

    const items = db.prepare(`
      SELECT
        i.*,
        ce.id AS equipment_id,
        ce.quantity AS equipment_quantity,
        ce.status AS equipment_status,
        ce.location AS equipment_location
      FROM character_equipment ce
      LEFT JOIN game_table_items i ON i.id = ce.item_id
      WHERE ce.character_id = ?
    `).all(characterId) as any[]

    const peculiarities = db.prepare(`
      SELECT * FROM game_table_characters_quirks
      WHERE character_id = ?
    `).all(characterId) as any[]

    return {
      npc: {
        id: npcData.npc_id,
        status: npcData.status
      },
      character: {
        id: npcData.character_id,
        name: npcData.character_name,
        user: {
          id: npcData.user_id,
          username: npcData.username,
          email: npcData.email,
          phone: npcData.phone
        },
        sheet: npcData.sheet_id ? {
          id: npcData.sheet_id,
          name: npcData.sheet_name,
          bio: npcData.bio,
          backstory: npcData.backstory,
          points: npcData.points,
          hp: npcData.hp,
          st: npcData.st,
          dx: npcData.dx,
          iq: npcData.iq,
          ht: npcData.ht,
          fatigue: npcData.fatigue,
          encumbrance: npcData.encumbrance
        } : null,
        advantages,
        skills,
        items
      },
      table: {
        id: npcData.table_id,
        title: npcData.table_title,
        intro: npcData.table_intro,
        system: npcData.table_system
      },
      peculiarities
    }
  }
  async findAllGameNPCS(tableId: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(tableId as string)

    const gameTablesNPCS = db.prepare(`
      SELECT 
        npc.id as id,
        npc.status,
        npc.character_id,
        cs.name as name,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht
      FROM game_table_npcs npc
      LEFT JOIN game_table_characters c ON c.id = npc.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      WHERE c.table_id = ?
    `).all(tableId) as any[]
    
    return ({
        'table': table,
        'npcs': gameTablesNPCS
    })
  }
  
  /* =============== */
  /* NPCS VISIBILITY */
  /* =============== */

  async createGameNPCVisibility(data: any): Promise<void> {
    db.prepare(`
      INSERT INTO narration_npcs (id, narration_id, npc_id)
      VALUES (?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.narration_id,
      data.npc_id
    )
  }
  async editGameNPCVisibility(data: any): Promise<void> {
    db.prepare(`
      UPDATE narration_npcs
      SET narration_id = ?, npc_id = ?
      WHERE id = ?
    `).run(
      data.narration_id,
      data.npc_id,
      data.id
    )
  }
  async findGameNPCVisibility(id: any): Promise<any> {
    const npcVisibility = db.prepare(`
      SELECT *
      FROM narration_npcs
      WHERE id = ?
    `).get(id) as any
    return npcVisibility
  }
  async findAllGameNPCVisibility(id: any): Promise<any> {
    const npcVisibility = db.prepare(`
      SELECT nn.*, n.title as narration_title, npc.character_id
      FROM narration_npcs nn
      LEFT JOIN narrations n ON n.id = nn.narration_id
      LEFT JOIN game_table_npcs npc ON npc.id = nn.npc_id
      WHERE nn.npc_id = ?
    `).all(id) as any[]
    return npcVisibility
  }

  /* =============== */
  /*    CHARACTERS   */
  /* =============== */

  async createGameCharacter(data: any): Promise<any> {
    const characterId = data.character_id || crypto.randomUUID()
    const sheetId = crypto.randomUUID()

    const insertTransaction = db.transaction(() => {
      db.prepare(`
        INSERT INTO game_table_characters (id, user_id, table_id)
        VALUES (?, ?, ?)
      `).run(characterId, data.user_id, data.table_id)

      if (data.sheet) {
        db.prepare(`
          INSERT INTO game_table_character_sheets (id, character_id, name, bio, backstory, points, hp, st, dx, iq, ht, fatigue, encumbrance)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          sheetId, characterId,
          data.sheet.name || '',
          data.sheet.bio || '',
          data.sheet.backstory || '',
          data.sheet.points ?? 0,
          data.sheet.hp ?? 10,
          data.sheet.st ?? 10,
          data.sheet.dx ?? 10,
          data.sheet.iq ?? 10,
          data.sheet.ht ?? 10,
          data.sheet.fatigue ?? 10,
          data.sheet.encumbrance || 'None'
        )
      }

      const insertAdvantage = db.prepare(`
        INSERT INTO game_table_character_advantages (id, advantage_id, name, character_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const adv of (data.advantages || [])) {
        insertAdvantage.run(crypto.randomUUID(), adv.advantage_id || null, adv.name, characterId, adv.cost_points, adv.effect || '')
      }

      const insertDisadvantage = db.prepare(`
        INSERT INTO game_table_character_disadvantages (id, disadvantage_id, name, character_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const dis of (data.disadvantages || [])) {
        insertDisadvantage.run(crypto.randomUUID(), dis.disadvantage_id || null, dis.name, characterId, dis.cost_points, dis.effect || '')
      }

      const insertSkill = db.prepare(`
        INSERT INTO game_table_character_skills (id, character_id, skill_id, cost_points, effect)
        VALUES (?, ?, ?, ?, ?)
      `)
      for (const sk of (data.skills || [])) {
        insertSkill.run(crypto.randomUUID(), characterId, sk.skill_id, sk.cost_points ?? 0, sk.effect || '')
      }

      const insertEquipment = db.prepare(`
        INSERT INTO character_equipment (id, character_id, item_id, quantity, status, location)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const eq of (data.equipment || [])) {
        if (!eq.item_id) continue
        insertEquipment.run(crypto.randomUUID(), characterId, eq.item_id, eq.quantity ?? 1, eq.status || 'in_inventory', eq.location || 'none')
      }

      const insertPeculiarity = db.prepare(`
        INSERT INTO game_table_characters_quirks (id, character_id, name, cost_points, effect, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      for (const pec of (data.peculiarities || [])) {
        insertPeculiarity.run(crypto.randomUUID(), characterId, pec.name, pec.cost_points ?? 0, pec.effect || '', pec.description || '')
      }
    })

    insertTransaction()
    return { character_id: characterId, sheet_id: sheetId }
  }

  async editGameCharacter(data: any): Promise<void> {
    db.prepare(`
      UPDATE game_table_characters
      SET user_id = ?, table_id = ?
      WHERE id = ?
    `).run(
      data.user_id,
      data.table_id,
      data.id
    )
  }

  async editGameCharacterEquipment(data: any): Promise<any> {
    const characterId = data.character_id
    const itemId = data.item_id
    if (!characterId || !itemId) return { success: false }

    const existing = db.prepare(`
      SELECT * FROM character_equipment WHERE character_id = ? AND item_id = ?
    `).get(characterId, itemId) as any

    const status = data.status ?? existing?.status ?? 'in_inventory'
    const location = data.location ?? existing?.location ?? 'none'
    const quantity = data.quantity ?? existing?.quantity ?? 1

    if (existing) {
      db.prepare(`
        UPDATE character_equipment
        SET status = ?, location = ?, quantity = ?, rendered_st = ?
        WHERE id = ?
      `).run(
        status,
        location,
        quantity,
        data.rendered_st ?? existing.rendered_st ?? null,
        existing.id
      )
    } else {
      db.prepare(`
        INSERT INTO character_equipment (id, character_id, item_id, quantity, status, location, rendered_st)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(crypto.randomUUID(), characterId, itemId, quantity, status, location, data.rendered_st ?? null)
    }

    return { success: true }
  }


  async findGameCharacter(id: any, moment?: number, viewer?: any): Promise<any> {
    const characterData = db.prepare(`
      SELECT
        c.id as character_id,
        c.user_id,
        c.table_id,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.bio,
        cs.backstory,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        cs.fatigue,
        cs.encumbrance,
        u.username,
        u.email,
        u.phone,
        u.type as user_type,
        g.title as table_title,
        g.intro as table_intro,
        g.system as table_system,
        CASE WHEN npc.id IS NOT NULL THEN 1 ELSE 0 END as is_npc
      FROM game_table_characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      LEFT JOIN game_table_npcs npc ON npc.character_id = c.id
      WHERE c.id = ?
    `).get(id) as any

    const characterId = characterData.character_id
    const tableId = characterData.table_id
    const userId = characterData.user_id

    const advantages = db.prepare(`
      SELECT * FROM game_table_character_advantages
      WHERE character_id = ?
    `).all(characterId) as any[]

    const skills = db.prepare(`
      SELECT
        csk.id,
        csk.skill_id,
        csk.cost_points,
        csk.effect,
        s.name as skill_name,
        s.predefinition_type,
        s.predefinition_difficulty
      FROM game_table_character_skills csk
      LEFT JOIN game_table_skills s ON s.id = csk.skill_id
      WHERE csk.character_id = ?
    `).all(characterId) as any[]

    // Items do personagem via character_equipment (estado/equipamento)
    const items = db.prepare(`
      SELECT
        i.*,
        ce.id AS equipment_id,
        ce.quantity AS equipment_quantity,
        ce.status AS equipment_status,
        ce.location AS equipment_location,
        ce.rendered_st AS equipment_rendered_st,
        w.id AS weapon_id,
        a.id AS armor_id
      FROM character_equipment ce
      LEFT JOIN game_table_items i ON i.id = ce.item_id
      LEFT JOIN game_table_weapons w ON w.item_id = i.id
      LEFT JOIN game_table_armors a ON a.item_id = i.id
      WHERE ce.character_id = ?
    `).all(characterId) as any[]

    // Enriquece cada item com weapon (e ataques) / armor aninhados
    const weaponByItem = new Map<string, any>()
    const armorByItem = new Map<string, any>()
    for (const item of items) {
      if (item.weapon_id && !weaponByItem.has(item.weapon_id)) {
        const w = db.prepare(`SELECT * FROM game_table_weapons WHERE id = ?`).get(item.weapon_id) as any
        if (w) {
          w.attacks = db.prepare(`SELECT * FROM weapon_attacks WHERE weapon_id = ? ORDER BY rowid ASC`).all(w.id) as any[]
          weaponByItem.set(item.weapon_id, w)
        }
      }
      if (item.armor_id && !armorByItem.has(item.armor_id)) {
        const arm = db.prepare(`SELECT * FROM game_table_armors WHERE id = ?`).get(item.armor_id) as any
        if (arm) armorByItem.set(item.armor_id, arm)
      }
    }
    for (const item of items) {
      if (item.weapon_id) item.weapon = weaponByItem.get(item.weapon_id) || null
      if (item.armor_id) item.armor = armorByItem.get(item.armor_id) || null
    }

    const peculiarities = db.prepare(`
      SELECT * FROM game_table_characters_quirks
      WHERE character_id = ?
    `).all(characterId) as any[]

    const disadvantages = db.prepare(`
      SELECT * FROM game_table_character_disadvantages
      WHERE character_id = ?
    `).all(characterId) as any[]

    // Armaduras equipadas pelo personagem (defesa já resolvida pela engine)
    const armors = db.prepare(`
      SELECT a.* FROM character_equipment ce
      INNER JOIN game_table_armors a ON a.item_id = ce.item_id
      WHERE ce.character_id = ? AND ce.status = 'equipped'
    `).all(characterId) as any[]

    const moments = db.prepare(`
      SELECT DISTINCT n.moment
      FROM narrations n
      WHERE n.table_id = ? AND n.moment IS NOT NULL
      ORDER BY n.moment ASC
    `).all(tableId) as any[]

    let modifiers: any[]
    if (moment != null) {
      modifiers = db.prepare(`
        SELECT m.* FROM modifiers m
        LEFT JOIN narrations n ON n.id = m.narration_id
        WHERE m.character_id = ?
          AND (n.moment IS NULL OR n.moment <= ?)
        ORDER BY m.rowid ASC
      `).all(characterId, moment) as any[]
    } else {
      modifiers = db.prepare(`
        SELECT * FROM modifiers
        WHERE character_id = ?
        ORDER BY rowid ASC
      `).all(characterId) as any[]
    }

    const activeEffects = modifiers
      .filter((m) =>
        m.mod_hp != null || m.mod_st != null || m.mod_dx != null ||
        m.mod_iq != null || m.mod_ht != null || m.mod_fatigue != null ||
        m.mod_encumbrance != null || m.hp != null || m.st != null || m.dx != null ||
        m.iq != null || m.ht != null || m.fatigue != null || m.encumbrance != null)
      .map((m) => {
        const e: any = { id: m.id }
        for (const k of [
          'name', 'effect', 'description', 'damage_value',
          'mod_hp', 'mod_st', 'mod_dx', 'mod_iq', 'mod_ht', 'mod_fatigue', 'mod_encumbrance',
          'hp', 'st', 'dx', 'iq', 'ht', 'fatigue', 'encumbrance',
          'skill_value', 'advantage_value', 'disadvantage_value', 'armor_value',
          'item_quantity', 'item_weight'
        ]) {
          if (m[k] != null) e[k] = m[k]
        }
        return e
      })

    const baseStats = {
      hp: characterData.hp ?? 10,
      st: characterData.st ?? 10,
      dx: characterData.dx ?? 10,
      iq: characterData.iq ?? 10,
      ht: characterData.ht ?? 10,
      fatigue: characterData.fatigue ?? 10,
    }

    const currentStats = { ...baseStats }

    for (const mod of modifiers) {
      if (mod.apply_on_roll === 1) continue
      if (mod.hp != null) currentStats.hp = mod.hp
      if (mod.st != null) currentStats.st = mod.st
      if (mod.dx != null) currentStats.dx = mod.dx
      if (mod.iq != null) currentStats.iq = mod.iq
      if (mod.ht != null) currentStats.ht = mod.ht
      if (mod.fatigue != null) currentStats.fatigue = mod.fatigue

      if (mod.mod_hp != null) currentStats.hp += mod.mod_hp
      if (mod.mod_st != null) currentStats.st += mod.mod_st
      if (mod.mod_dx != null) currentStats.dx += mod.mod_dx
      if (mod.mod_iq != null) currentStats.iq += mod.mod_iq
      if (mod.mod_ht != null) currentStats.ht += mod.mod_ht
      if (mod.mod_fatigue != null) currentStats.fatigue += mod.mod_fatigue
    }

    const basicSpeed = (currentStats.dx + currentStats.ht) / 4
    const itemsWeight = items.reduce(
      (total, item) => total + ((item.weight_lb as number || 0) * (item.equipment_quantity || 1)),
      0
    )
    const st = currentStats.st;

  const encumbranceValue =
      itemsWeight <= st * 2 ? 0 :
      itemsWeight <= st * 4 ? 1 :
      itemsWeight <= st * 6 ? 2 :
      itemsWeight <= st * 12 ? 3 :
      itemsWeight <= st * 20 ? 4 :
      0;

    // Regra de Fadiga (GURPS 4e adaptada): a barra de FP guarda o cansaço
    // acumulado. Zerada (0) o personagem está descansado; conforme o FP
    // enche em direção ao máximo (HT), ele vai cansando. Quando resta menos
    // de 1/3 do FP máximo (remaining < fatigueThreshold), ST, Move e Dodge
    // caem pela metade (arredondando para cima). No topo (0 restante) ele
    // está à beira do colapso: cada FP a mais custa 1 HP de injúria e
    // qualquer ação exige um teste de Vontade.
    const fatigueMax = Math.max(1, baseStats.fatigue > 0 ? baseStats.fatigue : baseStats.ht)
    const fatigueThreshold = Math.ceil(fatigueMax / 3)
    const remainingFatigue = fatigueMax - currentStats.fatigue
    const fatigueState = remainingFatigue <= 0
      ? 'exhausted'
      : remainingFatigue < fatigueThreshold
        ? 'tired'
        : 'active'
    const fatiguedPenalty = fatigueState === 'tired' || fatigueState === 'exhausted'
    const move = basicSpeed - encumbranceValue
    const dodge = Math.round((basicSpeed + 3) * 10) / 10
    const effectiveSt = fatiguedPenalty ? Math.ceil(currentStats.st / 2) : currentStats.st
    const effectiveMove = fatiguedPenalty ? Math.ceil(move / 2) : move
    const effectiveDodge = fatiguedPenalty ? Math.ceil(dodge / 2) : dodge

    const result: any = {
      table: {
        id: characterData.table_id,
        title: characterData.table_title,
        intro: characterData.table_intro,
        system: characterData.table_system
      },
      character: {
        id: characterData.character_id,
        isNpc: !!characterData.is_npc,
        name: characterData.sheet_name,
        user: {
          id: characterData.user_id,
          username: characterData.username,
          email: characterData.email,
          phone: characterData.phone,
          type: characterData.user_type
        },
        sheet: characterData.sheet_id ? {
          id: characterData.sheet_id,
          name: characterData.sheet_name,
          bio: characterData.bio,
          backstory: characterData.backstory,
          points: characterData.points,
          hp: currentStats.hp,
          st: currentStats.st,
          dx: currentStats.dx,
          iq: currentStats.iq,
          ht: currentStats.ht,
          fatigue: currentStats.fatigue,
          fatigue_max: fatigueMax,
          fatigue_threshold: fatigueThreshold,
          fatigue_state: fatigueState,
          encumbrance: characterData.encumbrance,
          basic_speed: basicSpeed,
          move,
          dodge,
          effective_st: effectiveSt,
          effective_move: effectiveMove,
          effective_dodge: effectiveDodge,
          base_hp: baseStats.hp,
          base_st: baseStats.st,
          base_dx: baseStats.dx,
          base_iq: baseStats.iq,
          base_ht: baseStats.ht,
          base_fatigue: baseStats.fatigue,
          } : null,
        advantages,
        disadvantages,
        armors,
        skills,
        items,
        active_effects: activeEffects
      },
      peculiarities,
      moments: moments.map((r: any) => r.moment).filter((m: any) => m != null),
      selected_moment: moment ?? null
    }

    // Visibilidade — se um observador (type 1) de outro personagem pede,
    // molde o payload pelas regras de visibilidade desse observador.
    if (viewer && viewer !== characterId) {
      const viewerRow = db.prepare(`
        SELECT u.type as t
        FROM game_table_characters c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = ?
      `).get(viewer) as any
      if (viewerRow && viewerRow.t !== 0) {
        const rules = db.prepare(`
          SELECT * FROM visibility
          WHERE character_id = ?
            AND (other_character_id IS NULL OR other_character_id = ?)
        `).all(viewer, characterId) as any[]
        shapeCharacterForViewer(result.character, rules)
      }
    }

    return result
  }

  async findGameCharacterHistory(id: any, moment?: number): Promise<any> {
    const characterData = db.prepare(`
      SELECT
        c.id as character_id,
        c.user_id,
        c.table_id,
        cs.name as sheet_name,
        u.username,
        g.title as table_title,
        g.system as table_system
      FROM game_table_characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      WHERE c.id = ?
    `).get(id) as any

    if (!characterData) return null

    const characterId = characterData.character_id

    const events = (moment != null
      ? db.prepare(`
        SELECT
          m.*,
          n.moment AS narration_moment,
          n.title AS narration_title,
          n.narration AS narration_body,
          s.title AS scene_title,
          s.chapter AS chapter,
          na.queue AS action_queue,
          na.description AS action_description,
          na.result AS action_result,
          na.dice_roll AS action_dice_roll
        FROM modifiers m
        LEFT JOIN narrations n ON n.id = m.narration_id
        LEFT JOIN scenes s ON s.id = n.scene_id
        LEFT JOIN narration_actions na ON na.id = m.action_id
        WHERE m.character_id = ?
          AND (n.moment IS NULL OR n.moment <= ?)
        ORDER BY s.chapter ASC, s.moment ASC, n.moment ASC, m.rowid ASC
      `).all(characterId, moment) as any[]
      : db.prepare(`
        SELECT
          m.*,
          n.moment AS narration_moment,
          n.title AS narration_title,
          n.narration AS narration_body,
          s.title AS scene_title,
          s.chapter AS chapter,
          na.queue AS action_queue,
          na.description AS action_description,
          na.result AS action_result,
          na.dice_roll AS action_dice_roll
        FROM modifiers m
        LEFT JOIN narrations n ON n.id = m.narration_id
        LEFT JOIN scenes s ON s.id = n.scene_id
        LEFT JOIN narration_actions na ON na.id = m.action_id
        WHERE m.character_id = ?
        ORDER BY s.chapter ASC, s.moment ASC, n.moment ASC, m.rowid ASC
      `).all(characterId) as any[])

    return {
      character: {
        id: characterData.character_id,
        name: characterData.sheet_name,
        user: {
          id: characterData.user_id,
          username: characterData.username
        }
      },
      table: {
        id: characterData.table_id,
        title: characterData.table_title,
        system: characterData.table_system
      },
      events
    }
  }

  async findAllGameCharacters(tableId: any, viewer?: any): Promise<any> {
    const table = db.prepare(`
      SELECT
        id,
        narrator_id,
        intro,
        title
      FROM game_tables
      WHERE id = ?
    `).get(tableId as string)

    const characters = db.prepare(`
      SELECT
        c.id as character_id,
        c.user_id,
        u.type as user_type,
        cs.id as sheet_id,
        cs.name as sheet_name,
        cs.points,
        cs.hp,
        cs.st,
        cs.dx,
        cs.iq,
        cs.ht,
        u.username,
        CASE WHEN npc.id IS NOT NULL THEN 1 ELSE 0 END as is_npc
      FROM game_table_characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_table_npcs npc ON npc.character_id = c.id
      WHERE c.table_id = ?
    `).all(tableId) as any[]

    const rows = characters.map(char => ({
      id: char.character_id,
      name: char.sheet_name,
      isNpc: !!char.is_npc,
      user: {
        id: char.user_id,
        username: char.username,
        type: char.user_type
      },
      sheet: char.sheet_id ? {
        id: char.sheet_id,
        name: char.sheet_name,
        points: char.points,
        hp: char.hp,
        st: char.st,
        dx: char.dx,
        iq: char.iq,
        ht: char.ht
      } : null
    }))

    /* Visibilidade — se um observador (type 1) de outro personagem
       pede a lista, molde cada linha pelas regras desse observador
       (mesma semântica do findGameCharacter com ?viewer). type-0
       (narrator) ou a própria personagem mantêm o payload completo.
       `known` = existe ao menos uma regra de visibilidade escopada
       ao alvo (global ou específica). */
    if (viewer) {
      const viewerRow = db.prepare(`
        SELECT u.type as t
        FROM game_table_characters c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = ?
      `).get(viewer) as any
      if (viewerRow && viewerRow.t !== 0) {
        const shaped = rows.map((ch: any) => {
          if (ch.id === viewer) {
            return { ...ch, known: true }
          }
          const rules = db.prepare(`
            SELECT * FROM visibility
            WHERE character_id = ?
              AND (other_character_id IS NULL OR other_character_id = ?)
          `).all(viewer, ch.id) as any[]
          const shapedChar = shapeCharacterForViewer(
            { ...ch, items: [], skills: [], advantages: [], disadvantages: [], armors: [] },
            rules
          )
          // `known` = existe regra de status VISÍVEL (not unknown) para o alvo.
          // NPCs sem regra visível ficam ocultos das listas do jogador até o
          // mestre liberá-los (seguindo a lógica "mestre vai liberando").
          const known = rules.some((r: any) => r.status === 'known' || r.status === 'specialist')
          return { ...shapedChar, known }
        })
        return { table, characters: shaped }
      }
    }

    return {
      table,
      characters: rows.map((ch: any) => ({ ...ch, known: true }))
    }
  }

  /* =============== */
  /*    MODIFIERS    */
  /* =============== */

  async createGameModifier(data: any): Promise<any> {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO modifiers (id, character_id, item_id, skill_id, advantage_id, disadvantage_id, action_id, narration_id, scene_id, name, cost_points, effect, description, hp, st, dx, iq, ht, fatigue, encumbrance, mod_hp, mod_st, mod_dx, mod_iq, mod_ht, mod_fatigue, mod_encumbrance, skill_value, advantage_value, disadvantage_value, armor_value, damage_value, item_quantity, item_dimension, item_weight, item_range, item_status, apply_on_roll)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.character_id || null,
      data.item_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.action_id || null,
      data.narration_id || null,
      data.scene_id || null,
      data.name || '',
      data.cost_points ?? null,
      data.effect || '',
      data.description || '',
      data.hp ?? null,
      data.st ?? null,
      data.dx ?? null,
      data.iq ?? null,
      data.ht ?? null,
      data.fatigue ?? null,
      data.encumbrance || null,
      data.mod_hp ?? null,
      data.mod_st ?? null,
      data.mod_dx ?? null,
      data.mod_iq ?? null,
      data.mod_ht ?? null,
      data.mod_fatigue ?? null,
      data.mod_encumbrance || null,
      data.skill_value || null,
      data.advantage_value || null,
      data.disadvantage_value || null,
      data.armor_value || null,
      data.damage_value || null,
      data.item_quantity ?? null,
      data.item_dimension || null,
      data.item_weight ?? null,
      data.item_range || null,
      data.item_status || null,
      data.apply_on_roll ?? 0
    )
    return { id }
  }

  async editGameModifier(data: any): Promise<void> {
    db.prepare(`
      UPDATE modifiers SET
        character_id = ?, item_id = ?, skill_id = ?, advantage_id = ?, disadvantage_id = ?,
        action_id = ?, narration_id = ?, scene_id = ?, name = ?, cost_points = ?,
        effect = ?, description = ?, hp = ?, st = ?, dx = ?, iq = ?, ht = ?,
        fatigue = ?, encumbrance = ?, mod_hp = ?, mod_st = ?, mod_dx = ?, mod_iq = ?,
        mod_ht = ?, mod_fatigue = ?, mod_encumbrance = ?, skill_value = ?,
        advantage_value = ?, disadvantage_value = ?, armor_value = ?, damage_value = ?,
        item_quantity = ?, item_dimension = ?, item_weight = ?, item_range = ?, item_status = ?,
        apply_on_roll = ?
      WHERE id = ?
    `).run(
      data.character_id || null,
      data.item_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.action_id || null,
      data.narration_id || null,
      data.scene_id || null,
      data.name || '',
      data.cost_points ?? null,
      data.effect || '',
      data.description || '',
      data.hp ?? null,
      data.st ?? null,
      data.dx ?? null,
      data.iq ?? null,
      data.ht ?? null,
      data.fatigue ?? null,
      data.encumbrance || null,
      data.mod_hp ?? null,
      data.mod_st ?? null,
      data.mod_dx ?? null,
      data.mod_iq ?? null,
      data.mod_ht ?? null,
      data.mod_fatigue ?? null,
      data.mod_encumbrance || null,
      data.skill_value || null,
      data.advantage_value || null,
      data.disadvantage_value || null,
      data.armor_value || null,
      data.damage_value || null,
      data.item_quantity ?? null,
      data.item_dimension || null,
      data.item_weight ?? null,
      data.item_range || null,
      data.item_status || null,
      data.apply_on_roll ?? 0,
      data.id
    )
  }

  async findGameModifier(id: any): Promise<any> {
    const modifier = db.prepare(`SELECT * FROM modifiers WHERE id = ?`).get(id) as any
    return modifier
  }

  async findAllGameModifiers(tableId: any): Promise<any> {
    const table = db.prepare(`SELECT id, narrator_id, intro, title FROM game_tables WHERE id = ?`).get(tableId as string)

    const modifiers = db.prepare(`
      SELECT DISTINCT m.* FROM modifiers m
      LEFT JOIN game_table_characters gc ON gc.id = m.character_id
      LEFT JOIN scenes s ON s.id = m.scene_id
      LEFT JOIN narrations n ON n.id = m.narration_id
      LEFT JOIN narration_actions na ON na.id = m.action_id
      LEFT JOIN game_table_items gi ON gi.id = m.item_id
      LEFT JOIN game_table_skills gsk ON gsk.id = m.skill_id
      LEFT JOIN game_table_advantages ga ON ga.id = m.advantage_id
      LEFT JOIN game_table_disadvantages gd ON gd.id = m.disadvantage_id
      WHERE gc.table_id = ?
         OR s.table_id = ?
         OR n.table_id = ?
         OR na.narrations_id IN (SELECT id FROM narrations WHERE table_id = ?)
         OR gi.table_id = ?
         OR gsk.table_id = ?
         OR ga.table_id = ?
         OR gd.table_id = ?
    `).all(tableId, tableId, tableId, tableId, tableId, tableId, tableId, tableId) as any[]

    return { table, modifiers }
  }

  /* Consequência automática de skill (por rolagem): quando o teste
     baseado na skill passa, cada modifier do ator marcado com
     apply_on_roll=1 é materializado como um efeito ativo (cópia com
     apply_on_roll=0), que passa a alterar HP/fadiga/atributos do sheet.
     Assim o dano/cura/custo persiste e o máximo de HP/FP não muda. */
  async applyGameSkillEffect(characterId: string, skillId: string): Promise<any[]> {
    const templates = db.prepare(`
      SELECT * FROM modifiers
      WHERE character_id = ? AND skill_id = ? AND apply_on_roll = 1
    `).all(characterId, skillId) as any[]

    let applied: any[] = []
    for (const t of templates) {
      const id = crypto.randomUUID()
      db.prepare(`
        INSERT INTO modifiers (id, character_id, item_id, skill_id, advantage_id, disadvantage_id, action_id, narration_id, scene_id, name, cost_points, effect, description, hp, st, dx, iq, ht, fatigue, encumbrance, mod_hp, mod_st, mod_dx, mod_iq, mod_ht, mod_fatigue, mod_encumbrance, skill_value, advantage_value, disadvantage_value, armor_value, damage_value, item_quantity, item_dimension, item_weight, item_range, item_status, apply_on_roll)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        t.character_id || null,
        t.item_id || null,
        t.skill_id || null,
        t.advantage_id || null,
        t.disadvantage_id || null,
        t.action_id || null,
        t.narration_id || null,
        t.scene_id || null,
        t.name || '',
        t.cost_points ?? null,
        t.effect || '',
        t.description || '',
        t.hp ?? null,
        t.st ?? null,
        t.dx ?? null,
        t.iq ?? null,
        t.ht ?? null,
        t.fatigue ?? null,
        t.encumbrance || null,
        t.mod_hp ?? null,
        t.mod_st ?? null,
        t.mod_dx ?? null,
        t.mod_iq ?? null,
        t.mod_ht ?? null,
        t.mod_fatigue ?? null,
        t.mod_encumbrance || null,
        t.skill_value || null,
        t.advantage_value || null,
        t.disadvantage_value || null,
        t.armor_value || null,
        t.damage_value || null,
        t.item_quantity ?? null,
        t.item_dimension || null,
        t.item_weight ?? null,
        t.item_range || null,
        t.item_status || null,
        0
      )
      applied.push({
        id,
        name: t.name || 'Effect',
        effect: t.effect || '',
        mod_hp: t.mod_hp ?? null,
        mod_fatigue: t.mod_fatigue ?? null,
        damage_value: t.damage_value ?? null
      })
    }

    return applied
  }

  /* =============== */
  /*    VISIBILITY   */
  /* =============== */

  async createGameVisibility(data: any): Promise<any> {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO visibility (id, character_id, other_character_id, skill_id, advantage_id, disadvantage_id, attribute, additionals_attributes, item_id, location_id, value, status, scene_id, narration_id, moment, previous_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.character_id || null,
      data.other_character_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.attribute || null,
      data.additionals_attributes || null,
      data.item_id || null,
      data.location_id || null,
      data.value || '',
      data.status || 'unknown',
      data.scene_id || null,
      data.narration_id || null,
      data.moment ?? null,
      data.previous_status ?? null
    )
    return { id }
  }

  async editGameVisibility(data: any): Promise<void> {
    const existing = data.id
      ? db.prepare(`SELECT * FROM visibility WHERE id = ?`).get(data.id) as any
      : null
    const statusChanged =
      !!existing && !!data.status && existing.status !== data.status
    // Ao mudar de status, registra o estado anterior (delta de descoberta);
    // o contexto cena/narração/momento acompanha a mudança (ou o atual).
    const previousStatus = statusChanged
      ? (existing.status ?? null)
      : (existing?.previous_status ?? null)
    const sceneId = data.scene_id || (existing?.scene_id ?? null)
    const narrationId = data.narration_id || (existing?.narration_id ?? null)
    const moment = data.moment != null ? data.moment : (existing?.moment ?? null)

    db.prepare(`
      UPDATE visibility SET
        character_id = ?, other_character_id = ?, skill_id = ?, advantage_id = ?, disadvantage_id = ?,
        attribute = ?, additionals_attributes = ?, item_id = ?, location_id = ?, value = ?, status = ?,
        scene_id = ?, narration_id = ?, moment = ?, previous_status = ?
      WHERE id = ?
    `).run(
      data.character_id || null,
      data.other_character_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.attribute || null,
      data.additionals_attributes || null,
      data.item_id || null,
      data.location_id || null,
      data.value || '',
      data.status || 'unknown',
      sceneId,
      narrationId,
      moment,
      previousStatus,
      data.id
    )
  }

  async findGameVisibility(id: any): Promise<any> {
    const visibility = db.prepare(`SELECT * FROM visibility WHERE id = ?`).get(id) as any
    return visibility
  }

  async findAllGameVisibility(characterId: any): Promise<any> {
    const visibility = db.prepare(`SELECT * FROM visibility WHERE character_id = ?`).all(characterId) as any[]
    return visibility
  }

  /* =============== */
  /*      QUEUE      */
  /* =============== */

  async createGameQueue(data: any): Promise<any> {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO queue (id, character_id, action_id, queue, status, test_dice, test_count, test_mod, test_attr, test_kind, test_skill)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.character_id || null,
      data.action_id || null,
      data.queue || '',
      data.status || 'pending',
      data.test_dice || '6',
      data.test_count ?? 3,
      data.test_mod ?? 0,
      data.test_attr || 'dx',
      data.test_kind || 'attr',
      data.test_skill || null
    )
    return { id }
  }

  async editGameQueue(data: any): Promise<void> {
    db.prepare(`
      UPDATE queue SET character_id = ?, action_id = ?, queue = ?, status = ?, test_dice = ?, test_count = ?, test_mod = ?, test_attr = ?, test_kind = ?, test_skill = ?
      WHERE id = ?
    `).run(
      data.character_id || null,
      data.action_id || null,
      data.queue || '',
      data.status || 'pending',
      data.test_dice || '6',
      data.test_count ?? 3,
      data.test_mod ?? 0,
      data.test_attr || 'dx',
      data.test_kind || 'attr',
      data.test_skill || null,
      data.id
    )
  }

  async findGameQueue(id: any): Promise<any> {
    const queueItem = db.prepare(`SELECT * FROM queue WHERE id = ?`).get(id) as any
    return queueItem
  }

  async findAllGameQueue(tableId: any): Promise<any> {
    const queueItems = db.prepare(`
      SELECT q.*, cs.name as character_name
      FROM queue q
      LEFT JOIN game_table_characters gc ON gc.id = q.character_id
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = gc.id
      WHERE gc.table_id = ?
      ORDER BY q.queue ASC
    `).all(tableId) as any[]
    return queueItems
  }
}