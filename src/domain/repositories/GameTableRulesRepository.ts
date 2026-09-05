import { db } from '../../infra/database/database'
import crypto from 'crypto'
import { IGameTableRulesRepository } from '../irepositories/IGameTableRulesRepository'
import  {Skill} from '../entities/GURPS/Skill_GURPS'

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

  async findAllGameTableSkills(id: any, search?: string, type?: string, difficulty?: string): Promise<any> {

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
      skills: formattedSkills
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

  async findAllGameAdvantages(id: any, search?: string, category?: string): Promise<any> {
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
      advantages: gameTablesAdvantages
    })
  }

  async findAllGameDisadvantages(id: any, search?: string, category?: string): Promise<any> {
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
      disadvantages: gameTablesDisadvantages
    })
  }

  async findGameDisadvantages(id: any): Promise<any> {
    const disadvantage = db.prepare(`
      SELECT * FROM game_table_disadvantages WHERE id = ?
    `).get(id) as any
    return disadvantage
  }

  async findGameLocation(id: any): Promise<any> {
    const location = db.prepare(`
      SELECT tl.*, gt.id AS table_id, gt.title AS table_title
      FROM table_locations tl
      LEFT JOIN narration_locations nl ON nl.location_id = tl.id
      LEFT JOIN narrations n ON n.id = nl.narrations_id
      LEFT JOIN scenes gs ON gs.id = n.scene_id
      LEFT JOIN game_tables gt ON gt.id = gs.table_id
      WHERE tl.id = ?
      LIMIT 1
    `).get(id) as any
    return location
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

  async findAllGameItems(id: any, search?: string, category?: string, kind?: string): Promise<any> {
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

    return ({
      table: table,
      items: gameTablesItems
    })
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


  async findGameCharacter(id: any, moment?: number): Promise<any> {
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
        g.system as table_system
      FROM game_table_characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN game_tables g ON g.id = c.table_id
      WHERE c.id = ?
    `).get(id) as any

    if (!characterData) return null

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

    return {
      table: {
        id: characterData.table_id,
        title: characterData.table_title,
        intro: characterData.table_intro,
        system: characterData.table_system
      },
      character: {
        id: characterData.character_id,
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
          encumbrance: characterData.encumbrance,
          basic_speed: basicSpeed,
          move: basicSpeed - encumbranceValue,
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

  async findAllGameCharacters(tableId: any): Promise<any> {
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
        u.username
      FROM game_table_characters c
      LEFT JOIN game_table_character_sheets cs ON cs.character_id = c.id
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.table_id = ?
    `).all(tableId) as any[]

    return {
      table,
      characters: characters.map(char => ({
        id: char.character_id,
        name: char.sheet_name,
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
    }
  }

  /* =============== */
  /*    MODIFIERS    */
  /* =============== */

  async createGameModifier(data: any): Promise<any> {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO modifiers (id, character_id, item_id, skill_id, advantage_id, disadvantage_id, action_id, narration_id, scene_id, name, cost_points, effect, description, hp, st, dx, iq, ht, fatigue, encumbrance, mod_hp, mod_st, mod_dx, mod_iq, mod_ht, mod_fatigue, mod_encumbrance, skill_value, advantage_value, disadvantage_value, armor_value, damage_value, item_quantity, item_dimension, item_weight, item_range, item_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      data.item_status || null
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
        item_quantity = ?, item_dimension = ?, item_weight = ?, item_range = ?, item_status = ?
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

  /* =============== */
  /*    VISIBILITY   */
  /* =============== */

  async createGameVisibility(data: any): Promise<any> {
    const id = crypto.randomUUID()
    db.prepare(`
      INSERT INTO visibility (id, character_id, skill_id, advantage_id, disadvantage_id, attribute, additionals_attributes, item_id, value, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.character_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.attribute || null,
      data.additionals_attributes || null,
      data.item_id || null,
      data.value || '',
      data.status || 'hidden'
    )
    return { id }
  }

  async editGameVisibility(data: any): Promise<void> {
    db.prepare(`
      UPDATE visibility SET
        character_id = ?, skill_id = ?, advantage_id = ?, disadvantage_id = ?,
        attribute = ?, additionals_attributes = ?, item_id = ?, value = ?, status = ?
      WHERE id = ?
    `).run(
      data.character_id || null,
      data.skill_id || null,
      data.advantage_id || null,
      data.disadvantage_id || null,
      data.attribute || null,
      data.additionals_attributes || null,
      data.item_id || null,
      data.value || '',
      data.status || 'hidden',
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
      INSERT INTO queue (id, character_id, action_id, queue, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      id,
      data.character_id || null,
      data.action_id || null,
      data.queue || '',
      data.status || 'pending'
    )
    return { id }
  }

  async editGameQueue(data: any): Promise<void> {
    db.prepare(`
      UPDATE queue SET character_id = ?, action_id = ?, queue = ?, status = ?
      WHERE id = ?
    `).run(
      data.character_id || null,
      data.action_id || null,
      data.queue || '',
      data.status || 'pending',
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