// src/domain/repositories/ContentCatalogRepository.ts
import { db } from '../../infra/database/database'
import crypto from 'crypto'

export type ContentModuleRow = {
  id: string
  slug: string
  name: string
  tech_level: string | null
  description: string | null
  accent: string | null
  sort: number
}

export type ContentCategoryRow = {
  id: string
  domain: string
  parent_id: string | null
  name: string
  display_name: string
  sort: number
}

export type ContentCatalogCount = {
  moduleId: string
  domain: string
  category: string
  subcategory: string | null
  count: number
}

export type ContentCatalog = {
  modules: ContentModuleRow[]
  categories: ContentCategoryRow[]
  counts: ContentCatalogCount[]
}

export type ContentCategorySelection = {
  domain: string
  category: string
  subcategories?: string[]
}

export type ContentSelection = {
  modules?: string[]
  categories?: ContentCategorySelection[]
}

export type ContentInstallSummary = {
  skills: number
  items: number
  advantages: number
  disadvantages: number
  npcs: number
  characters: number
}

const DOMAIN_TABLES: Record<string, string> = {
  skill: 'game_table_skills',
  item: 'game_table_items',
  advantage: 'game_table_advantages',
  disadvantage: 'game_table_disadvantages',
  npc: 'game_table_npcs'
}

export class ContentCatalogRepository {
  async findCatalog(): Promise<ContentCatalog> {
    const modules = db.prepare('SELECT * FROM content_modules ORDER BY sort, name').all() as ContentModuleRow[]
    const categories = db
      .prepare('SELECT * FROM content_categories ORDER BY domain, sort, name')
      .all() as ContentCategoryRow[]

    const counts: ContentCatalogCount[] = []
    for (const [domain, table] of Object.entries(DOMAIN_TABLES)) {
      const rows = db
        .prepare(
          `SELECT module_id, category, subcategory, COUNT(*) AS count
           FROM ${table}
           WHERE module_id IS NOT NULL
           GROUP BY module_id, category, subcategory
           ORDER BY category, subcategory`
        )
        .all() as any[]
      for (const row of rows) {
        counts.push({
          moduleId: row.module_id,
          domain,
          category: row.category,
          subcategory: row.subcategory ?? null,
          count: row.count
        })
      }
    }

    return { modules, categories, counts }
  }

  /**
   * Instala conteúdo de catálogo (linhas com module_id preenchido) numa mesa.
   * A seleção é a UNIÃO entre:
   *   (a) linhas cujo module_id está em selection.modules, e
   *   (b) linhas cujas categorias/subcategorias foram marcadas.
   */
  async installContent(targetTableId: string, selection: ContentSelection): Promise<ContentInstallSummary> {
    const modules: string[] = Array.isArray(selection.modules) ? selection.modules.filter(Boolean) : []
    const categories: ContentCategorySelection[] = Array.isArray(selection.categories)
      ? selection.categories.filter((c) => c && c.domain && c.category)
      : []

    const moduleFilter = modules.length ? `module_id IN (${modules.map(() => '?').join(',')})` : null

    const wholeCats: string[] = []
    const subPairs: { category: string; subcategory: string }[] = []
    for (const entry of categories) {
      const subs = Array.isArray(entry.subcategories) ? entry.subcategories.filter(Boolean) : []
      if (subs.length) {
        for (const sub of subs) subPairs.push({ category: entry.category, subcategory: sub })
      } else {
        wholeCats.push(entry.category)
      }
    }

    const wholeFilter = wholeCats.length ? `category IN (${wholeCats.map(() => '?').join(',')})` : null
    const subFilter = subPairs.length
      ? `(${subPairs.map(() => '(category = ? AND subcategory = ?)').join(' OR ')})`
      : null

    const whereParts = [moduleFilter, wholeFilter, subFilter].filter(Boolean) as string[]
    const whereClause = `module_id IS NOT NULL AND (${whereParts.join(' OR ')})`

    const pickParams = (): any[] => {
      const params: any[] = [...modules, ...wholeCats]
      for (const p of subPairs) params.push(p.category, p.subcategory)
      return params
    }

    const summary: ContentInstallSummary = { skills: 0, items: 0, advantages: 0, disadvantages: 0, npcs: 0, characters: 0 }

    db.transaction(() => {
      // ---- SKILLS ----
      if (whereParts.length) {
        const skillRows = db
          .prepare(
            `SELECT id, name, category, subcategory, type, predefinition_type, predefinition_difficulty, description, module_id
             FROM game_table_skills WHERE ${whereClause}`
          )
          .all(...pickParams()) as any[]
        const skillStmt = db.prepare(
          `INSERT INTO game_table_skills (id, table_id, name, category, subcategory, type, predefinition_type, predefinition_difficulty, description, module_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        for (const row of skillRows) {
          skillStmt.run(crypto.randomUUID(), targetTableId, row.name, row.category, row.subcategory, row.type, row.predefinition_type, row.predefinition_difficulty, row.description, row.module_id)
          summary.skills++
        }

        // ---- ADVANTAGES ----
        const advantageRows = db
          .prepare(
            `SELECT name, category, subcategory, cost_points, description, module_id FROM game_table_advantages
             WHERE module_id IS NOT NULL AND (${whereParts.join(' OR ')})`
          )
          .all(...pickParams()) as any[]
        const advantageStmt = db.prepare(
          `INSERT INTO game_table_advantages (id, table_id, name, category, subcategory, cost_points, description, module_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
        for (const row of advantageRows) {
          advantageStmt.run(crypto.randomUUID(), targetTableId, row.name, row.category, row.subcategory, row.cost_points, row.description, row.module_id)
          summary.advantages++
        }

        // ---- DISADVANTAGES ----
        const disadvantageRows = db
          .prepare(
            `SELECT name, category, subcategory, cost_points, effect, description, module_id FROM game_table_disadvantages
             WHERE module_id IS NOT NULL AND (${whereParts.join(' OR ')})`
          )
          .all(...pickParams()) as any[]
        const disadvantageStmt = db.prepare(
          `INSERT INTO game_table_disadvantages (id, table_id, name, category, subcategory, cost_points, effect, description, module_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        for (const row of disadvantageRows) {
          disadvantageStmt.run(crypto.randomUUID(), targetTableId, row.name, row.category, row.subcategory, row.cost_points, row.effect, row.description, row.module_id)
          summary.disadvantages++
        }

        // ---- ITEMS (com weapons/attacks/armors aninhados) ----
        const itemRows = db
          .prepare(`SELECT * FROM game_table_items WHERE module_id IS NOT NULL AND (${whereParts.join(' OR ')})`)
          .all(...pickParams()) as any[]
        const itemStmt = db.prepare(
          `INSERT INTO game_table_items (id, table_id, location_id, name, kind, category, weight_lb, cost, dimensions, description, quality, condition, module_id, subcategory)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        for (const item of itemRows) {
          const newItemId = crypto.randomUUID()
          itemStmt.run(newItemId, targetTableId, null, item.name, item.kind, item.category, item.weight_lb, item.cost, item.dimensions, item.description, item.quality, item.condition, item.module_id, item.subcategory)
          summary.items++

          const weapons = db.prepare('SELECT * FROM game_table_weapons WHERE item_id = ?').all(item.id) as any[]
          for (const weapon of weapons) {
            const newWeaponId = crypto.randomUUID()
            db.prepare(
              `INSERT INTO game_table_weapons (id, item_id, skill, min_st, rated_st, handedness, reach, parry, block, fit)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            ).run(newWeaponId, newItemId, weapon.skill, weapon.min_st, weapon.rated_st, weapon.handedness, weapon.reach, weapon.parry, weapon.block, weapon.fit)
            const attacks = db.prepare('SELECT * FROM weapon_attacks WHERE weapon_id = ?').all(weapon.id) as any[]
            for (const attack of attacks) {
              db.prepare(
                `INSERT INTO weapon_attacks (id, weapon_id, name, usage, damage_source, damage_modifier, damage_dice, damage_type, armor_penetration, accuracy, range, recoil, shots)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
              ).run(
                crypto.randomUUID(), newWeaponId, attack.name, attack.usage,
                attack.damage_source, attack.damage_modifier, attack.damage_dice, attack.damage_type,
                attack.armor_penetration, attack.accuracy, attack.range, attack.recoil, attack.shots
              )
            }
          }

          const armors = db.prepare('SELECT * FROM game_table_armors WHERE item_id = ?').all(item.id) as any[]
          for (const armor of armors) {
            db.prepare(
              `INSERT INTO game_table_armors (id, item_id, dr, flex, locations, fit)
               VALUES (?, ?, ?, ?, ?, ?)`
            ).run(crypto.randomUUID(), newItemId, armor.dr, armor.flex, armor.locations, armor.fit)
          }
        }

        // ---- NPCS (bundle: character + sheet + npc) ----
        const npcRows = db
          .prepare(`SELECT * FROM game_table_npcs WHERE module_id IS NOT NULL AND (${whereParts.join(' OR ')})`)
          .all(...pickParams()) as any[]
        const npcStmt = db.prepare(
          `INSERT INTO game_table_npcs (id, character_id, status, location_id, module_id, category, subcategory)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
        for (const npc of npcRows) {
          const characterRow = db.prepare('SELECT * FROM game_table_characters WHERE id = ?').get(npc.character_id) as any
          if (!characterRow) continue
          const newCharacterId = crypto.randomUUID()
          db.prepare(
            `INSERT INTO game_table_characters (id, user_id, table_id)
             VALUES (?, ?, ?)`
          ).run(newCharacterId, characterRow.user_id ?? null, targetTableId)
          summary.characters++

          const sheets = db.prepare('SELECT * FROM game_table_character_sheets WHERE character_id = ?').all(npc.character_id) as any[]
          for (const sheet of sheets) {
            db.prepare(
              `INSERT INTO game_table_character_sheets (id, character_id, name, bio, backstory, points, hp, st, dx, iq, ht, fatigue, encumbrance)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            ).run(
              crypto.randomUUID(), newCharacterId, sheet.name, sheet.bio, sheet.backstory,
              sheet.points, sheet.hp, sheet.st, sheet.dx, sheet.iq, sheet.ht, sheet.fatigue, sheet.encumbrance
            )
          }

          npcStmt.run(crypto.randomUUID(), newCharacterId, npc.status, null, npc.module_id, npc.category, npc.subcategory)
          summary.npcs++
        }
      }

      // registra os módulos escolhidos na mesa
      if (modules.length) {
        db.prepare('UPDATE game_tables SET modules = ? WHERE id = ?').run(JSON.stringify(modules), targetTableId)
      }
    })()

    return summary
  }
}

export default ContentCatalogRepository