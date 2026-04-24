// src/infra/database/seed.ts
import { db } from './database'

import { users , narrators  , gameTables , gameTablePlayers , skills , characters ,characterSheets  , newNpcs , items , advantages , peculiarities , damages , characterSkills , modifiers , modifierAttributes , modifierSkills , modifierAdvantages , modifierItems , modifierScenes , modifierNarrations , modifierNarrationsActions , modifierNarrationsCharacters , modifierNarrationsNPCs , modifierTableLocations , modifierNarrationsLocations , modifierGameTableSkillsDependecies} from '../variables/varsForSeeds'

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
  INSERT INTO game_table_skills (id, name, predefinition_type , predefinition_difficulty , description)
  VALUES (?, ?, ?, ? , ?)
`)

for (const skill of skills) {
  skillStmt.run(skill.id, skill.name, skill.predefinition_type , skill.predefinition_difficulty, skill.description)
}

// insert characters
const characterStmt = db.prepare(`
  INSERT INTO characters (id, user_id, table_id, name)
  VALUES (?, ?, ?, ?)
`)

for (const character of characters) {
  characterStmt.run(character.id, character.userId, character.tableId, character.name)
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
  INSERT INTO game_table_items (id, name, type, category, weight, dimensions, description, quality, condition, holder_id, owner_id, skill_user_id, skill_level)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const item of items) {
  itemStmt.run(
    item.id,
    item.name,
    item.type,
    item.category,
    item.weight,
    item.dimensions,
    item.description,
    item.quality,
    item.condition,
    item.holderId,
    item.ownerId,
    item.skillUserId,
    item.skillLevel
  )
}

// insert advantages
const advantageStmt = db.prepare(`
  INSERT INTO game_table_character_advantages (id, name, character_id, cost_points, effect)
  VALUES (?, ?, ?, ?, ?)
`)

for (const advantage of advantages) {
  advantageStmt.run(
    advantage.id,
    advantage.name,
    advantage.characterId,
    advantage.costPoints,
    advantage.effect
  )
}

// insert damages
const damageStmt = db.prepare(`
  INSERT INTO game_table_damages (id, name, description, type, value, range, character_id, item_id, skill_id, advantage_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const damage of damages) {
  damageStmt.run(
    damage.id,
    damage.name,
    damage.description,
    damage.type,
    damage.value,
    damage.range,
    damage.characterId,
    damage.itemId ?? null,
    damage.skillId ?? null,
    damage.advantageId ?? null
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
  INSERT INTO game_table_peculiarities (id, name, character_id, cost_points, effect)
  VALUES (?, ?, ?, ?, ?)
`)

for (const peculiarity of peculiarities) {
  peculiarityStmt.run(
    peculiarity.id,
    peculiarity.name,
    peculiarity.characterId,
    peculiarity.costPoints,
    peculiarity.effect
  )
}

// insert modifiers
const modifierStmt = db.prepare(`
  INSERT INTO game_table_modifiers (id, table_id, name, duration)
  VALUES (?, ?, ?, ?)
`)

for (const modifier of modifiers) {
  modifierStmt.run(modifier.id, modifier.tableId, modifier.name, modifier.duration)
}

// insert modifier attributes
const modifierAttributeStmt = db.prepare(`
  INSERT INTO game_table_modifier_attributes (id, modifier_id, attribute)
  VALUES (?, ?, ?)
`)

for (const modifierAttribute of modifierAttributes) {
  modifierAttributeStmt.run(modifierAttribute.id, modifierAttribute.modifierId, modifierAttribute.attribute)
}

// insert modifier skills
const modifierSkillStmt = db.prepare(`
  INSERT INTO game_table_modifier_skills (id, modifier_id, skill_id)
  VALUES (?, ?, ?)
`)

for (const modifierSkill of modifierSkills) {
  modifierSkillStmt.run(modifierSkill.id, modifierSkill.modifierId, modifierSkill.skillId)
}

// insert modifier advantages
const modifierAdvantageStmt = db.prepare(`
  INSERT INTO game_table_modifier_advantages (id, modifier_id, advantage_id)
  VALUES (?, ?, ?)
`)

for (const modifierAdvantage of modifierAdvantages) {
  modifierAdvantageStmt.run(modifierAdvantage.id, modifierAdvantage.modifierId, modifierAdvantage.advantageId)
}

// insert modifier items
const modifierItemStmt = db.prepare(`
  INSERT INTO game_table_modifier_items (id, modifier_id, item_id)
  VALUES (?, ?, ?)
`)

for (const modifierItem of modifierItems) {
  modifierItemStmt.run(modifierItem.id, modifierItem.modifierId, modifierItem.itemId)
}

const modifierSceneStmt = db.prepare(`
  INSERT INTO scenes(id, table_id , title , chapter , moment)
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierScene of modifierScenes) {
  modifierSceneStmt.run(modifierScene.id, modifierScene.table_id , modifierScene.title, modifierScene.chapter, modifierScene.moment)
}

const modifierNarrationstmt = db.prepare(`
  INSERT INTO narrations(id, table_id, title , scene_id , narration, moment)
  VALUES (?, ?, ?, ?, ?, ?)
`)

for (const modifierNarration of modifierNarrations) {
  modifierNarrationstmt.run(modifierNarration.id, modifierNarration.table_id, modifierNarration.title , modifierNarration.scene_id, modifierNarration.narration, modifierNarration.moment)
}

const modifierNarrationsActionstmt = db.prepare(`
  INSERT INTO narration_actions(id, narrations_id, value, test, character_id)
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierNarrationAction of modifierNarrationsActions) {
  modifierNarrationsActionstmt.run(modifierNarrationAction.id, modifierNarrationAction.narrations_id, modifierNarrationAction.value, modifierNarrationAction.test, modifierNarrationAction.character_id)
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
  INSERT INTO game_table_skill_dependencies(id, origin_skill_id, depends_on_skill_id, depends_on_skill_for_others_attributes)
  VALUES (?, ?, ?, ?)
`)

for (const modifierGameTableSkillDependency of modifierGameTableSkillsDependecies ) {
  modifierGameTableSkillDependencystmt.run(modifierGameTableSkillDependency.id, modifierGameTableSkillDependency.origin_skill_id, modifierGameTableSkillDependency.depends_on_skill_id, modifierGameTableSkillDependency.depends_on_skill_for_others_attributes)
}

console.log('🌱 Seed executed successfully!')
