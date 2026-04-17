// src/infra/database/seed.ts
import { db } from './database'
import crypto from 'crypto'

// limpa dados (opcional, mas útil em dev)
db.exec(`
  DELETE FROM log;
  DELETE FROM modifier_scenes;
  DELETE FROM modifier_items;
  DELETE FROM modifier_advantages;
  DELETE FROM modifier_skills;
  DELETE FROM modifier_attributes;
  DELETE FROM narrations;
  DELETE FROM narration_actions;
  DELETE FROM narration_characters;
  DELETE FROM locations;
  DELETE FROM scenes;
  DELETE FROM modifiers;
  DELETE FROM npcs;
  DELETE FROM damages;
  DELETE FROM character_skills;
  DELETE FROM character_advantages;
  DELETE FROM peculiarities;
  DELETE FROM character_images;
  DELETE FROM character_sheets;
  DELETE FROM characters;
  DELETE FROM item_images;
  DELETE FROM items;
  DELETE FROM table_images;
  DELETE FROM skill_dependencies;
  DELETE FROM skills;
  DELETE FROM game_table_players;
  DELETE FROM narrator_images;
  DELETE FROM game_tables;
  DELETE FROM narrators;
  DELETE FROM users;
`)

const adminId = crypto.randomUUID()

type SeedUser = {
  id: string
  type: number
  username: string
  password: string
  phone: string
  email: string
}

const users: [
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser,
  SeedUser
] = [
  {
    id: adminId,
    type: 0,
    username: 'admin',
    password: '123456',
    phone: '85999999999',
    email: 'admin@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Mira Thorne',
    password: '123456',
    phone: '85888888888',
    email: 'mira.thorne@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Garrick Stone',
    password: '123456',
    phone: '85777777777',
    email: 'garrick.stone@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Kasumi Noh',
    password: '123456',
    phone: '85666666666',
    email: 'kasumi.noh@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Daniela Homenick',
    password: '123456',
    phone: '85555555555',
    email: 'daniela.homenick@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Denzel Kihn',
    password: '123456',
    phone: '85444444444',
    email: 'denzel.kihn@email.com'
  },
  {
    id: crypto.randomUUID(),
    type: 1,
    username: 'Dan Smith',
    password: '123456',
    phone: '85333333333',
    email: 'dan.smith@email.com'
  }
]

type SeedNarrator = {
  id: string
  userId: string
  name: string
}

const narrators: SeedNarrator[] = [
  {
    id: crypto.randomUUID(),
    userId: adminId,
    name: 'admin'
  }
]

const narratorId = narrators[0]!.id

type SeedGameTable = {
  id: string
  title: string
  system: string
  narratorId: string
  intro: string
}

const gameTables: [SeedGameTable, SeedGameTable, SeedGameTable] = [
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'City of Steel',
    system: 'GURPS',
    intro: 'A gritty urban fantasy table with three player characters.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Jungle Expedition',
    system: 'GURPS',
    intro: 'A two-player exploration game with survival challenges.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Admin Sandbox',
    system: 'GURPS',
    intro: 'A test table for admin scenes.'
  }
]

type SeedGameTablePlayer = {
  id: string
  tableId: string
  userId: string
}

const gameTablePlayers: SeedGameTablePlayer[] = [
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[1].id },
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[2].id },
  { id: crypto.randomUUID(), tableId: gameTables[0].id, userId: users[3].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[5].id }
]

type SeedSkill = {
  id: string
  name: string
  predefinition_value: string
  predefinition_type: string
}

const skillSwordsmanshipId = crypto.randomUUID()
const skillBowsId = crypto.randomUUID()
const skillStealthId = crypto.randomUUID()
const skillTacticsId = crypto.randomUUID()
const skillMagicId = crypto.randomUUID()

const skills: SeedSkill[] = [
  {
    id: skillSwordsmanshipId,
    name: 'Swordsmanship',
    predefinition_value: 'DX+2',
    predefinition_type: 'Combat'
  },
  {
    id: skillBowsId,
    name: 'Bows',
    predefinition_value: 'DX+1',
    predefinition_type: 'Ranged'
  },
  {
    id: skillStealthId,
    name: 'Stealth',
    predefinition_value: 'DX-1',
    predefinition_type: 'Movement'
  },
  {
    id: skillTacticsId,
    name: 'Tactics',
    predefinition_value: 'IQ',
    predefinition_type: 'Strategy'
  },
  {
    id: skillMagicId,
    name: 'Magery',
    predefinition_value: 'IQ+1',
    predefinition_type: 'Mental'
  }
]

type SeedCharacter = {
  id: string
  userId: string
  tableId: string
  name: string
}

const characterMiraId = crypto.randomUUID()
const characterGarrickId = crypto.randomUUID()
const characterKasumiId = crypto.randomUUID()

const characters: SeedCharacter[] = [
  {
    id: characterMiraId,
    userId: users[1].id,
    tableId: gameTables[0].id,
    name: 'Mira Thorne'
  },
  {
    id: characterGarrickId,
    userId: users[2].id,
    tableId: gameTables[0].id,
    name: 'Garrick Stone'
  },
  {
    id: characterKasumiId,
    userId: users[3].id,
    tableId: gameTables[0].id,
    name: 'Kasumi Noh'
  }
]

type SeedCharacterSheet = {
  id: string
  characterId: string
  name: string
  bio: string
  backstory: string
  points: number
  hp: number
  st: number
  dx: number
  iq: number
  ht: number
  fatigue: number
  encumbrance: string
}

const characterSheets: SeedCharacterSheet[] = [
  {
    id: crypto.randomUUID(),
    characterId: characterMiraId,
    name: 'Mira Thorne Sheet',
    bio: 'A streetwise duelist with quick reflexes.',
    backstory: 'Former city watch turned blade-for-hire, she fights for freedom and survival.',
    points: 150,
    hp: 11,
    st: 11,
    dx: 12,
    iq: 13,
    ht: 10,
    fatigue: 10,
    encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterGarrickId,
    name: 'Garrick Stone Sheet',
    bio: 'A hulking veteran whose strength keeps him alive.',
    backstory: 'A former soldier carrying the scars of many battles into the city.',
    points: 145,
    hp: 12,
    st: 12,
    dx: 11,
    iq: 10,
    ht: 11,
    fatigue: 11,
    encumbrance: 'Medium'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKasumiId,
    name: 'Kasumi Noh Sheet',
    bio: 'A scholar whose magic is still growing.',
    backstory: 'Raised in a hidden tower, she now seeks her place among the city shadows.',
    points: 155,
    hp: 10,
    st: 9,
    dx: 13,
    iq: 14,
    ht: 10,
    fatigue: 10,
    encumbrance: 'Light'
  }
]

type SeedItem = {
  id: string
  name: string
  type: number
  category: string
  weight: number
  dimensions: string
  description: string
  quality: string
  condition: string
  holderId: string
  ownerId: string
  skillUserId: string
  skillLevel: string
}

const shortSwordId = crypto.randomUUID()
const leatherArmorId = crypto.randomUUID()
const bowId = crypto.randomUUID()

const items: SeedItem[] = [
  {
    id: shortSwordId,
    name: 'Short Sword',
    type: 1,
    category: 'Melee',
    weight: 3,
    dimensions: '30cm',
    description: 'A balanced steel short sword for fast close combat.',
    quality: 'Fine',
    condition: 'Good',
    holderId: users[1].id,
    ownerId: users[1].id,
    skillUserId: users[1].id,
    skillLevel: 'Swordsmanship 15'
  },
  {
    id: leatherArmorId,
    name: 'Leather Armor',
    type: 2,
    category: 'Armor',
    weight: 15,
    dimensions: 'Torso',
    description: 'Light leather armor that offers protection without limiting movement.',
    quality: 'Standard',
    condition: 'Worn',
    holderId: users[2].id,
    ownerId: users[2].id,
    skillUserId: users[2].id,
    skillLevel: 'Armor Use 12'
  },
  {
    id: bowId,
    name: 'Recurve Bow',
    type: 1,
    category: 'Ranged',
    weight: 4,
    dimensions: '1.2m',
    description: 'A recurved bow with excellent range for an archer.',
    quality: 'Good',
    condition: 'Excellent',
    holderId: users[3].id,
    ownerId: users[3].id,
    skillUserId: users[3].id,
    skillLevel: 'Bows 14'
  }
]

type SeedAdvantage = {
  id: string
  name: string
  characterId: string
  costPoints: number
  effect: string
}

const advantageCombatReflexesId = crypto.randomUUID()
const advantageVeryFitId = crypto.randomUUID()
const advantageMageryId = crypto.randomUUID()

const advantages: SeedAdvantage[] = [
  {
    id: advantageCombatReflexesId,
    name: 'Combat Reflexes',
    characterId: characterMiraId,
    costPoints: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: advantageVeryFitId,
    name: 'Very Fit',
    characterId: characterGarrickId,
    costPoints: 10,
    effect: '+2 fatigue, better recovery.'
  },
  {
    id: advantageMageryId,
    name: 'Magery 1',
    characterId: characterKasumiId,
    costPoints: 25,
    effect: 'Basic access to spellcasting and rituals.'
  }
]

type SeedPeculiarity = {
  id: string
  name: string
  characterId: string
  costPoints: number
  effect: string
}

const peculiarities: SeedPeculiarity[] = [
  {
    id: crypto.randomUUID(),
    name: 'Bad Temper',
    characterId: characterMiraId,
    costPoints: -5,
    effect: '-2 reaction rolls when provoked.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Night Owl',
    characterId: characterGarrickId,
    costPoints: -5,
    effect: 'Harder to sleep at night, +1 alertness after midnight.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fragile Bones',
    characterId: characterKasumiId,
    costPoints: -10,
    effect: '+1 injury roll from falls and blunt trauma.'
  }
]

type SeedDamage = {
  id: string
  name: string
  description: string
  type: string
  value: string
  range: string
  characterId: string
  itemId?: string
  skillId?: string
  advantageId?: string
}

const damages: SeedDamage[] = [
  {
    id: crypto.randomUUID(),
    name: 'Cutting Strike',
    description: 'A fast slash with a short sword designed to open armor gaps.',
    type: 'Physical',
    value: 'sw+2 cut',
    range: 'Melee',
    characterId: characterMiraId,
    itemId: shortSwordId
  },
  {
    id: crypto.randomUUID(),
    name: 'Power Shot',
    description: 'A heavy arrow fired from the recurved bow.',
    type: 'Physical',
    value: '2d+1 imp',
    range: '75 yards',
    characterId: characterKasumiId,
    itemId: bowId,
    skillId: skillBowsId
  },
  {
    id: crypto.randomUUID(),
    name: 'Arcane Blast',
    description: 'A small burst of magical energy fueled by Magery.',
    type: 'Energy',
    value: '3d burning',
    range: 'Medium',
    characterId: characterKasumiId,
    skillId: skillMagicId,
    advantageId: advantageMageryId
  }
]

type SeedCharacterSkill = {
  id: string
  characterId: string
  skillId: string
  costPoints: number
  effect: string
}

const characterSkills: SeedCharacterSkill[] = [
  {
    id: crypto.randomUUID(),
    characterId: characterMiraId,
    skillId: skillSwordsmanshipId,
    costPoints: 14,
    effect: 'Used for melee attacks with swords and blades.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterGarrickId,
    skillId: skillTacticsId,
    costPoints: 10,
    effect: 'Used to coordinate allies and plan battlefield movement.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKasumiId,
    skillId: skillMagicId,
    costPoints: 25,
    effect: 'Used to cast spells and channel magical energy.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterGarrickId,
    skillId: skillStealthId,
    costPoints: 12,
    effect: 'Used to move quietly when avoiding patrols.'
  }
]

type SeedModifier = {
  id: string
  tableId: string
  name: string
  duration: string
}

const modifierFocusId = crypto.randomUUID()
const modifierCurseId = crypto.randomUUID()

const modifiers: SeedModifier[] = [
  {
    id: modifierFocusId,
    tableId: gameTables[0].id,
    name: 'Battle Focus',
    duration: 'Scene'
  },
  {
    id: modifierCurseId,
    tableId: gameTables[0].id,
    name: 'Curse of Clumsiness',
    duration: 'Scene'
  }
]

type SeedModifierAttribute = {
  id: string
  modifierId: string
  attribute: string
}

const modifierAttributes: SeedModifierAttribute[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    attribute: 'DX+1'
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    attribute: 'HT+1'
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    attribute: 'DX-2'
  }
]

type SeedModifierSkill = {
  id: string
  modifierId: string
  skillId: string
}

const modifierSkills: SeedModifierSkill[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    skillId: skillSwordsmanshipId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    skillId: skillTacticsId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    skillId: skillStealthId
  }
]

type SeedModifierAdvantage = {
  id: string
  modifierId: string
  advantageId: string
}

const modifierAdvantages: SeedModifierAdvantage[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    advantageId: advantageCombatReflexesId
  }
]

type SeedModifierItem = {
  id: string
  modifierId: string
  itemId: string
}

const modifierItems: SeedModifierItem[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    itemId: shortSwordId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    itemId: leatherArmorId
  }
]

type SeedModifierScene= {
  id: string
  table_id: string
}

const modifierScenes: [SeedModifierScene ,  SeedModifierScene , SeedModifierScene , SeedModifierScene ] = [
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id
  }
]

type SeedModifierNarration= {
  id: string
  table_id: string
  scene_id: string
  narration: string
  moment: number
}

const modifierNarrations: [SeedModifierNarration , SeedModifierNarration , SeedModifierNarration , SeedModifierNarration , SeedModifierNarration , SeedModifierNarration ] = [
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    narration: 'The party enters the forest.',
    moment: 0 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    narration: 'The party enters the forest.',
    moment: 1 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[1].id, 
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[2].id, 
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[2].id, 
    narration: 'The party enters the forest.',
    moment: 3 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[3].id, 
    narration: 'The party enters the forest.',
    moment: 3 
  }
]

type SeedModifierNarrationActions= {
  id: string,
  narrations_id: string,
  value: string,
  test: string,
  character_id: string,
}

const modifierNarrationsActions: [SeedModifierNarrationActions , SeedModifierNarrationActions , SeedModifierNarrationActions , SeedModifierNarrationActions ] = [
  {
    id: crypto.randomUUID(),
    narrations_id: modifierNarrations[0].id,
    value: '10',
    test: 'Mira usou a habilidade de ataque e deu certo',
    character_id: characterMiraId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: modifierNarrations[0].id,
    value: '17',
    test: 'Garrick usou a habilidade de defesa e deu errado',
    character_id: characterGarrickId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: modifierNarrations[0].id,
    value: '',
    test: 'Kasumi não fez nada',
    character_id: characterKasumiId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: modifierNarrations[0].id,
    value: '11',
    test: 'Mira usou a habilidade de ataque novamente e deu certo',
    character_id: characterMiraId,
  }
]

// insert users
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
  INSERT INTO skills (id, name, predefinition_value, predefinition_type)
  VALUES (?, ?, ?, ?)
`)

for (const skill of skills) {
  skillStmt.run(skill.id, skill.name, skill.predefinition_value, skill.predefinition_type)
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
  INSERT INTO character_sheets (id, character_id, name, bio, backstory, points, hp, st, dx, iq, ht, fatigue, encumbrance)
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

// insert items
const itemStmt = db.prepare(`
  INSERT INTO items (id, name, type, category, weight, dimensions, description, quality, condition, holder_id, owner_id, skill_user_id, skill_level)
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
  INSERT INTO character_advantages (id, name, character_id, cost_points, effect)
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
  INSERT INTO damages (id, name, description, type, value, range, character_id, item_id, skill_id, advantage_id)
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
  INSERT INTO character_skills (id, character_id, skill_id, cost_points, effect)
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
  INSERT INTO peculiarities (id, name, character_id, cost_points, effect)
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
  INSERT INTO modifiers (id, table_id, name, duration)
  VALUES (?, ?, ?, ?)
`)

for (const modifier of modifiers) {
  modifierStmt.run(modifier.id, modifier.tableId, modifier.name, modifier.duration)
}

// insert modifier attributes
const modifierAttributeStmt = db.prepare(`
  INSERT INTO modifier_attributes (id, modifier_id, attribute)
  VALUES (?, ?, ?)
`)

for (const modifierAttribute of modifierAttributes) {
  modifierAttributeStmt.run(modifierAttribute.id, modifierAttribute.modifierId, modifierAttribute.attribute)
}

// insert modifier skills
const modifierSkillStmt = db.prepare(`
  INSERT INTO modifier_skills (id, modifier_id, skill_id)
  VALUES (?, ?, ?)
`)

for (const modifierSkill of modifierSkills) {
  modifierSkillStmt.run(modifierSkill.id, modifierSkill.modifierId, modifierSkill.skillId)
}

// insert modifier advantages
const modifierAdvantageStmt = db.prepare(`
  INSERT INTO modifier_advantages (id, modifier_id, advantage_id)
  VALUES (?, ?, ?)
`)

for (const modifierAdvantage of modifierAdvantages) {
  modifierAdvantageStmt.run(modifierAdvantage.id, modifierAdvantage.modifierId, modifierAdvantage.advantageId)
}

// insert modifier items
const modifierItemStmt = db.prepare(`
  INSERT INTO modifier_items (id, modifier_id, item_id)
  VALUES (?, ?, ?)
`)

for (const modifierItem of modifierItems) {
  modifierItemStmt.run(modifierItem.id, modifierItem.modifierId, modifierItem.itemId)
}

const modifierSceneStmt = db.prepare(`
  INSERT INTO scenes(id, table_id)
  VALUES (?, ?)
`)

for (const modifierScene of modifierScenes) {
  modifierSceneStmt.run(modifierScene.id, modifierScene.table_id)
}

const modifierNarrationstmt = db.prepare(`
  INSERT INTO narrations(id, table_id, scene_id, narration, moment)
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierNarration of modifierNarrations) {
  modifierNarrationstmt.run(modifierNarration.id, modifierNarration.table_id, modifierNarration.scene_id, modifierNarration.narration, modifierNarration.moment)
}

const modifierNarrationsActionstmt = db.prepare(`
  INSERT INTO narration_actions(id, narrations_id, value, test, character_id)
  VALUES (?, ?, ?, ?, ?)
`)

for (const modifierNarrationAction of modifierNarrationsActions) {
  modifierNarrationsActionstmt.run(modifierNarrationAction.id, modifierNarrationAction.narrations_id, modifierNarrationAction.value, modifierNarrationAction.test, modifierNarrationAction.character_id)
}

console.log('🌱 Seed executed successfully!')
