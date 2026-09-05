// src/infra/database/seed.ts
import { db } from './database'
import './migrate'

const allTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all() as { name: string }[]
db.exec('PRAGMA foreign_keys = OFF')
for (const { name } of allTables) {
  db.exec(`DELETE FROM "${name}"`)
}
db.exec('PRAGMA foreign_keys = ON')

import { narrators  , gameTables , gameTablePlayers  } from '../variables/varGameTable'
import { modifierNarrationsActions , modifierNarrationsLocations , modifierNarrationsCharacters , modifierNarrationsNPCs , modifierSeedEntries } from '../variables/varModifiers'
import { skills } from '../variables/varSkills'
import { items, weapons, weaponAttacks, armors } from '../variables/varItems'
import { gurpsDamageTable } from '../variables/varGurpsDamage'
import { characterEquipment } from '../variables/varEquipment'
import { advantages } from '../variables/varAdvantages'
import { disadvantages } from '../variables/varDisadvantage'
import { users } from '../variables/varUsers'
import { characters , characterSheets , characterSkills , characterAdvantages , characterDisadvantages } from '../variables/varCharacters'
import { newNpcs } from '../variables/varNPC'
import { peculiarities } from '../variables/varPeculiarites'
import { scenes } from '../variables/varScenes'
import { narrations } from '../variables/varNarrations'
import { modifierTableLocations } from '../variables/varLocations'
import { modifierGameTableSkillsPreDetermined } from '../variables/varPreDetermined'
import { modifierGameTableSkillsDependecies } from '../variables/varDependecies'

const userStmt = db.prepare(`
  INSERT INTO users (id, type, username, password, phone, email)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const user of users) {
  userStmt.run(
    user.id,
    user.type,
    user.username,
    user.password,
    user.phone,
    user.email
  )
}

// insert narrators
const narratorStmt = db.prepare(`
  INSERT INTO narrators (id, user_id, name)
  VALUES (?, ?, ?)
`)

for (const narrator of narrators) {
  narratorStmt.run(narrator.id, narrator.userId, narrator.name)
}

// insert game tables
const gameTableStmt = db.prepare(`
  INSERT INTO game_tables (id, narrator_id, intro , title, system)
  VALUES (?, ?, ? , ?, ?)
`)

for (const table of gameTables) {
  gameTableStmt.run(table.id, table.narratorId, table.intro , table.title, table.system)
}

// insert advantages
const advantageStmt = db.prepare(`
  INSERT INTO game_table_advantages (id, table_id , name , cost_points, description)
  VALUES (?, ?, ?, ? , ?)
`)

for (const advantage of advantages) {
  advantageStmt.run(
    advantage.id,
    advantage.table_id,
    advantage.name,
    advantage.costPoints,
    advantage.description
  )


}

const disadvantageStmt = db.prepare(`
  INSERT INTO game_table_disadvantages (id, table_id , name, cost_points, description)
  VALUES (?, ?, ?, ? , ?)
`)

for (const disadvantage of disadvantages) {
  disadvantageStmt.run(
    disadvantage.id,
    disadvantage.table_id,
    disadvantage.name,
    disadvantage.costPoints,
    disadvantage.description
  )
}

// insert game table players
const gameTablePlayerStmt = db.prepare(`
  INSERT INTO game_table_players (id, table_id, user_id)
  VALUES (?, ?, ?)
`)

for (const entry of gameTablePlayers) {
  gameTablePlayerStmt.run(entry.id, entry.tableId, entry.userId)
}

// insert skills
const skillStmt = db.prepare(`
  INSERT INTO game_table_skills (id, table_id , name, predefinition_type , predefinition_difficulty , description)
  VALUES (?, ? , ?, ?, ? , ?)
`)

for (const skill of skills) {
  skillStmt.run(skill.id , skill.table_id , skill.name, skill.predefinition_type , skill.predefinition_difficulty, skill.description)
}

// insert characters
const characterStmt = db.prepare(`
  INSERT INTO game_table_characters (id, user_id, table_id)
  VALUES (?, ?, ?)
`)

for (const character of characters) {
  characterStmt.run(character.id, character.userId, character.tableId)
}

// insert character sheets
const characterSheetStmt = db.prepare(`
  INSERT INTO game_table_character_sheets (id, character_id, name, bio, backstory, points, hp, st, dx, iq, ht, fatigue, encumbrance)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const sheet of characterSheets) {
  characterSheetStmt.run(
    sheet.id,
    sheet.characterId,
    sheet.name,
    sheet.bio,
    sheet.backstory,
    sheet.points,
    sheet.hp,
    sheet.st,
    sheet.dx,
    sheet.iq,
    sheet.ht,
    sheet.fatigue,
    sheet.encumbrance
  )
}

const npcSheetStmt = db.prepare(`
  INSERT INTO game_table_npcs (id, character_id , status)
  VALUES (?, ?, ? )
`)

for (const npcSheet of newNpcs) {
  npcSheetStmt.run(
    npcSheet.id,
    npcSheet.character_id,
    npcSheet.status
  )
}

// insert items
const itemStmt = db.prepare(`
  INSERT INTO game_table_items (id, table_id , name, kind, category, weight_lb, cost, dimensions, description, quality, condition)
  VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const item of items) {
  itemStmt.run(
    item.id,
    item.table_id,
    item.name,
    item.kind,
    item.category,
    item.weight_lb,
    item.cost,
    item.dimensions,
    item.description,
    item.quality,
    item.condition
  )
}

// insert weapons (específico de arma)
const weaponStmt = db.prepare(`
  INSERT INTO game_table_weapons (id, item_id, skill, min_st, rated_st, handedness, reach, parry, block, fit)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const weapon of weapons) {
  weaponStmt.run(
    weapon.id,
    weapon.item_id,
    weapon.skill,
    weapon.min_st,
    weapon.rated_st,
    weapon.handedness,
    weapon.reach,
    weapon.parry,
    weapon.block,
    weapon.fit
  )
}

// insert weapon attacks (formas de ataque por arma)
const weaponAttackStmt = db.prepare(`
  INSERT INTO weapon_attacks (id, weapon_id, name, usage, damage_source, damage_modifier, damage_dice, damage_type, armor_penetration, accuracy, range, recoil, shots)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const attack of weaponAttacks) {
  weaponAttackStmt.run(
    attack.id,
    attack.weapon_id,
    attack.name,
    attack.usage,
    attack.damage_source,
    attack.damage_modifier,
    attack.damage_dice,
    attack.damage_type,
    attack.armor_penetration,
    attack.accuracy,
    attack.range,
    attack.recoil,
    attack.shots
  )
}

// insert armors (específico de armadura, agora ancorado no item)
const armorStmt = db.prepare(`
  INSERT INTO game_table_armors (id, item_id, dr, flex, locations, fit)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const armor of armors) {
  armorStmt.run(
    armor.id,
    armor.item_id,
    armor.dr,
    armor.flex,
    armor.locations,
    armor.fit
  )
}

// insert gurps damage table (ST -> THR/SW)
const gurpsDamageStmt = db.prepare(`
  INSERT INTO gurps_damage_table (id, st, thrust, swing)
  VALUES (?, ?, ?, ?)
`)

for (const row of gurpsDamageTable) {
  gurpsDamageStmt.run(row.id, row.st, row.thrust, row.swing)
}

// insert character equipment (estado do personagem)
const equipmentStmt = db.prepare(`
  INSERT INTO character_equipment (id, character_id, item_id, quantity, status, location, rendered_st)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

for (const eq of characterEquipment) {
  equipmentStmt.run(
    eq.id,
    eq.character_id,
    eq.item_id,
    eq.quantity,
    eq.status,
    eq.location,
    eq.rendered_st
  )
}

// insert character skills
const characterSkillStmt = db.prepare(`
  INSERT INTO game_table_character_skills (id, character_id, skill_id, cost_points, effect)
  VALUES (?, ?, ?, ?, ?)
`)

for (const characterSkill of characterSkills) {
  characterSkillStmt.run(
    characterSkill.id,
    characterSkill.characterId,
    characterSkill.skillId,
    characterSkill.costPoints,
    characterSkill.effect
  )
}

// insert peculiarities
const peculiarityStmt = db.prepare(`
  INSERT INTO game_table_characters_quirks (id, character_id, name, cost_points, effect)
  VALUES (?, ?, ?, ?, ?)
`)

for (const peculiarity of peculiarities) {
  peculiarityStmt.run(
    peculiarity.id,
    peculiarity.character_id,
    peculiarity.name,
    peculiarity.costPoints,
    peculiarity.effect
  )
}

const modifierSceneStmt = db.prepare(`
  INSERT INTO scenes(id, table_id , title , chapter , moment)
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierScene of scenes ) {
  modifierSceneStmt.run(modifierScene.id, modifierScene.table_id , modifierScene.title, modifierScene.chapter, modifierScene.moment)
}

const modifierNarrationstmt = db.prepare(`
  INSERT INTO narrations(id, table_id, title , scene_id , narration, moment)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const modifierNarration of narrations) {
  modifierNarrationstmt.run(modifierNarration.id, modifierNarration.table_id, modifierNarration.title , modifierNarration.scene_id, modifierNarration.narration, modifierNarration.moment)
}

const modifierNarrationsActionstmt = db.prepare(`
  INSERT INTO narration_actions(id, narrations_id, queue, result, dice_roll, description, character_id, modificator, target, multitarget)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const modifierNarrationAction of modifierNarrationsActions) {
  modifierNarrationsActionstmt.run(modifierNarrationAction.id, modifierNarrationAction.narrations_id, modifierNarrationAction.queue , modifierNarrationAction.result, modifierNarrationAction.dice_roll, modifierNarrationAction.description, modifierNarrationAction.character_id, modifierNarrationAction.modificator, modifierNarrationAction.target, Number(modifierNarrationAction.multitarget))
}

const modifierNarrationsCharacterstmt = db.prepare(`
  INSERT INTO narration_characters(id, character_id, narrations_id)
  VALUES (?, ?, ?)
`)

for (const modifierNarrationCharacter of modifierNarrationsCharacters) {
  modifierNarrationsCharacterstmt.run(modifierNarrationCharacter.id, modifierNarrationCharacter.character_id, modifierNarrationCharacter.narrations_id)
}

const modifierNarrationsNPCstmt = db.prepare(`
  INSERT INTO narration_npcs(id, narration_id, npc_id)
  VALUES (?, ?, ?)
`)

for (const modifierNarrationsNPC of modifierNarrationsNPCs) {
  modifierNarrationsNPCstmt.run(modifierNarrationsNPC.id, modifierNarrationsNPC.narration_id, modifierNarrationsNPC.npc_id)
}

const modifierTableLocationstmt = db.prepare(`
  INSERT INTO table_locations(id, table_id, name, region, address, sub_region, is_indoor, other, country, area, dimensions, description )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const modifierTableLocation of modifierTableLocations) {
  modifierTableLocationstmt.run(modifierTableLocation.id, modifierTableLocation.table_id, modifierTableLocation.name, modifierTableLocation.region, modifierTableLocation.address, modifierTableLocation.sub_region, modifierTableLocation.is_indoor, modifierTableLocation.other, modifierTableLocation.country, modifierTableLocation.area, modifierTableLocation.dimensions, modifierTableLocation.description)
}

const modifierNarrationsLocationstmt = db.prepare(`
  INSERT INTO narration_locations(id, location_id, narrations_id)
  VALUES (?, ?, ?)
`)

for (const modifierNarrationsLocation of modifierNarrationsLocations) {
  modifierNarrationsLocationstmt.run(modifierNarrationsLocation.id, modifierNarrationsLocation.location_id, modifierNarrationsLocation.narrations_id)
}

const modifierGameTableSkillDependencystmt = db.prepare(`
  INSERT INTO game_table_skill_dependencies(
    id,
    origin_skill_id,
    depends_on_skill_id,
    depends_on_skill_value,
    depends_type
  )
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierGameTableSkillDependency of modifierGameTableSkillsDependecies) {
    modifierGameTableSkillDependencystmt.run(
      modifierGameTableSkillDependency.id,
      modifierGameTableSkillDependency.origin_skill_id,
      modifierGameTableSkillDependency.depends_on_skill_id,
      modifierGameTableSkillDependency.depends_on_skill_value,
      modifierGameTableSkillDependency.depends_type    
    )
}

const modifierGameTableSkillPreDeterminedstmt = db.prepare(`
  INSERT INTO game_table_skill_predefinede(
    id,
    origin_skill_id,
    depends_on_skill_id,
    depends_on_skill_value,
    depends_on_skill_for_others_attributes
  )
  VALUES (?, ?, ?, ? , ? )
`)

for (const modifierGameTableSkillDependency of modifierGameTableSkillsPreDetermined) {
  modifierGameTableSkillPreDeterminedstmt.run(
    modifierGameTableSkillDependency.id,
    modifierGameTableSkillDependency.origin_skill_id,
    modifierGameTableSkillDependency.depends_on_skill_id,
    modifierGameTableSkillDependency.depends_on_skill_value,
    modifierGameTableSkillDependency.depends_on_skill_for_others_attributes
  )
}

const modifierGameTableCharacterAdvantagestmt = db.prepare(`
  INSERT INTO game_table_character_advantages(
  id,
  advantage_id,
  name,
  character_id,
  cost_points,
  effect
  )
  VALUES ( ?, ?, ?, ?, ?, ?)
`)

for (const modifierGameTableCharacterAdvantage of characterAdvantages) {
  modifierGameTableCharacterAdvantagestmt.run(
    modifierGameTableCharacterAdvantage.id,
    modifierGameTableCharacterAdvantage.advantage_id,
    modifierGameTableCharacterAdvantage.name,
    modifierGameTableCharacterAdvantage.character_id,
    modifierGameTableCharacterAdvantage.cost_points,
    modifierGameTableCharacterAdvantage.effect
  )
}

const modifierGameTableCharacterDisadvantagestmt = db.prepare(`
  INSERT INTO game_table_character_disadvantages(
  id,
  disadvantage_id,
  name,
  character_id,
  cost_points,
  effect
  )
  VALUES ( ?, ?, ?, ?, ?, ?)
`)

for (const modifierGameTableCharacterDisadvantage of characterDisadvantages) {
  modifierGameTableCharacterDisadvantagestmt.run(
    modifierGameTableCharacterDisadvantage.id,
    modifierGameTableCharacterDisadvantage.disadvantage_id,
    modifierGameTableCharacterDisadvantage.name,
    modifierGameTableCharacterDisadvantage.character_id,
    modifierGameTableCharacterDisadvantage.cost_points,
    modifierGameTableCharacterDisadvantage.effect
  )
}

const modifierStmt = db.prepare(`
  INSERT INTO modifiers(
    id, character_id, action_id, narration_id,
    name, description,
    mod_hp, mod_st, mod_dx, mod_iq, mod_ht, mod_fatigue,
    damage_value, skill_value, item_quantity, item_weight
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const modifier of modifierSeedEntries) {
  modifierStmt.run(
    modifier.id,
    modifier.character_id,
    modifier.action_id,
    modifier.narration_id,
    modifier.name,
    modifier.description,
    modifier.mod_hp ?? null,
    modifier.mod_st ?? null,
    modifier.mod_dx ?? null,
    modifier.mod_iq ?? null,
    modifier.mod_ht ?? null,
    modifier.mod_fatigue ?? null,
    modifier.damage_value ?? null,
    modifier.skill_value ?? null,
    modifier.item_quantity ?? null,
    modifier.item_weight ?? null
  )
}

console.log('🌱 Seed executed successfully!')
