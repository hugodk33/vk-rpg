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
  DELETE FROM narration_locations;
  DELETE FROM narration_npcs;
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
  DELETE FROM table_locations;
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

const characterNPCsIds = Array.from({ length: 10 }, () => crypto.randomUUID())

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
  },
  { id: characterNPCsIds[0] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Riven Kael' },
  { id: characterNPCsIds[1] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Thorne Black' },
  { id: characterNPCsIds[2] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Selene Voss' },
  { id: characterNPCsIds[3] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Kael Draven' },
  { id: characterNPCsIds[4] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Lyra Moonfall' },
  { id: characterNPCsIds[5] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Borin Stonehelm' },
  { id: characterNPCsIds[6] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Nyx Shadowend' },
  { id: characterNPCsIds[7] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Eldric Vale' },
  { id: characterNPCsIds[8] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Vera Hollow' },
  { id: characterNPCsIds[9] as string, userId: users[0]?.id, tableId: gameTables[0].id, name: 'Dante Crowe' }

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
  },
    {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[0] as string,
    name: 'Riven Kael Sheet',
    bio: 'A fast dual-blade fighter.',
    backstory: 'Survived by speed and instinct.',
    points: 150, hp: 11, st: 11, dx: 14, iq: 11, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[1] as string,
    name: 'Thorne Black Sheet',
    bio: 'A grim bounty hunter.',
    backstory: 'Tracks targets across kingdoms.',
    points: 155, hp: 12, st: 12, dx: 12, iq: 11, ht: 11, fatigue: 11, encumbrance: 'Medium'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[2] as string,
    name: 'Selene Voss Sheet',
    bio: 'A shadow mage.',
    backstory: 'Manipulates darkness itself.',
    points: 160, hp: 10, st: 9, dx: 12, iq: 15, ht: 10, fatigue: 12, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[3] as string,
    name: 'Kael Draven Sheet',
    bio: 'A ruthless duelist.',
    backstory: 'Seeks perfection in combat.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[4] as string,
    name: 'Lyra Moonfall Sheet',
    bio: 'A celestial sorcerer.',
    backstory: 'Gifted by ancient stars.',
    points: 165, hp: 10, st: 9, dx: 11, iq: 15, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[5] as string,
    name: 'Borin Stonehelm Sheet',
    bio: 'A dwarven tank.',
    backstory: 'Unbreakable in battle.',
    points: 160, hp: 14, st: 14, dx: 10, iq: 10, ht: 13, fatigue: 12, encumbrance: 'Heavy'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[6] as string,
    name: 'Nyx Shadowend Sheet',
    bio: 'An elite assassin.',
    backstory: 'Never seen, always lethal.',
    points: 155, hp: 10, st: 10, dx: 15, iq: 12, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[7] as string,
    name: 'Eldric Vale Sheet',
    bio: 'A wise mage.',
    backstory: 'Keeper of forbidden lore.',
    points: 170, hp: 10, st: 9, dx: 10, iq: 16, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[8] as string,
    name: 'Vera Hollow Sheet',
    bio: 'A cursed archer.',
    backstory: 'Haunted by past battles.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[9] as string,
    name: 'Dante Crowe Sheet',
    bio: 'A charismatic warlock.',
    backstory: 'Power at a terrible cost.',
    points: 165, hp: 10, st: 10, dx: 11, iq: 15, ht: 11, fatigue: 12, encumbrance: 'Light'
  }
]

type SeedNpc = {
  id: string
  character_id: string
  status: 'enemy' | 'ally' | 'neutral' | 'boss'
}

const Npc1Id = crypto.randomUUID()
const Npc2Id = crypto.randomUUID()
const Npc3Id = crypto.randomUUID()
const Npc4Id = crypto.randomUUID()
const Npc5Id = crypto.randomUUID()
const Npc6Id = crypto.randomUUID()
const Npc7Id = crypto.randomUUID()
const Npc8Id = crypto.randomUUID()
const Npc9Id = crypto.randomUUID()
const Npc10Id = crypto.randomUUID()

const newNpcs: SeedNpc[] = [
  { id: Npc1Id, character_id: characterNPCsIds[0] as string, status: 'enemy' },
  { id: Npc2Id, character_id: characterNPCsIds[1] as string, status: 'enemy' },
  { id: Npc3Id, character_id: characterNPCsIds[2] as string, status: 'boss' },
  { id: Npc4Id, character_id: characterNPCsIds[3] as string, status: 'neutral' },
  { id: Npc5Id, character_id: characterNPCsIds[4] as string, status: 'ally' },
  { id: Npc6Id, character_id: characterNPCsIds[5] as string, status: 'enemy' },
  { id: Npc7Id, character_id: characterNPCsIds[6] as string, status: 'enemy' },
  { id: Npc8Id, character_id: characterNPCsIds[7] as string, status: 'ally' },
  { id: Npc9Id, character_id: characterNPCsIds[8] as string, status: 'neutral' },
  { id: Npc10Id, character_id: characterNPCsIds[9] as string, status: 'boss' }
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
  title: string
  chapter: number
  moment: number
}

const modifierScenes: [SeedModifierScene ,  SeedModifierScene , SeedModifierScene , SeedModifierScene ] = [
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    title: 'The Forest',
    chapter: 1,
    moment: 0,
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    title: 'The Clearing',
    chapter: 1,
    moment: 1,
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    title: 'The River',
    chapter: 1,
    moment: 2
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    title: 'The Mountain Pass',
    chapter: 1,
    moment: 3
  }
]

type SeedModifierNarration= {
  id: string
  table_id: string
  scene_id: string
  title: string
  narration: string
  moment: number
}

const narration1 = crypto.randomUUID()
const narration2 = crypto.randomUUID()
const narration3 = crypto.randomUUID()

const modifierNarrations: SeedModifierNarration[] = [
  {
    id: narration1,
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id,
    title: 'The Forest', 
    narration: 'The party enters the forest.',
    moment: 0 
  },
  {
    id: narration2,
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    title: 'The Clearing',
    narration: 'The party enters the forest.',
    moment: 1 
  },
  {
    id: narration3,
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    title: 'The River',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 3 
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    scene_id: modifierScenes[1].id, 
    title: 'The River',
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

const modifierNarrationsActions: SeedModifierNarrationActions[] = [
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '10',
    test: 'Mira usou a habilidade de ataque e deu certo',
    character_id: characterMiraId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '17',
    test: 'Garrick usou a habilidade de defesa e deu errado',
    character_id: characterGarrickId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '',
    test: 'Kasumi não fez nada',
    character_id: characterKasumiId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '11',
    test: 'Mira usou a habilidade de ataque novamente e deu certo',
    character_id: characterMiraId,
  }
]

type SeedModifierNarrationCharacter= {
  id: string
  character_id: string
  narrations_id: string
}

const modifierNarrationsCharacters: SeedModifierNarrationCharacter[] = [
  {
    id: crypto.randomUUID(),
    character_id: characterMiraId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGarrickId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKasumiId,
    narrations_id: narration1
  }
]

type SeedModifierNarrationNPCs= {
  id: string,
  narration_id: string,
  npc_id: string,
}

const modifierNarrationsNPCs: SeedModifierNarrationNPCs[] = [
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: Npc1Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: Npc2Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: Npc3Id
  }
]

type SeedModifierLocation= {
  id: string
  table_id: string
  name: string
  region: string
  address: string
  sub_region: string
  is_indoor: number
  other: string
  country: string
  area: string
  dimensions: string
  description: string
}

const locationId1 = crypto.randomUUID()
const locationId2 = crypto.randomUUID()
const locationId3 = crypto.randomUUID()

const modifierTableLocations: SeedModifierLocation[] = [
  {
    id: locationId1,
    table_id: gameTables[0].id,
    name: 'Iron Alley',
    region: 'Industrial District',
    sub_region: 'Backstreets',
    address: 'Sector 7, Alley 3',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Narrow street',
    dimensions: '40m x 3m',
    description: 'A tight alley filled with pipes, steam vents, and constant dripping water. Perfect for ambushes.',
    other: 'Low visibility due to steam'
  },
  {
    id: locationId2,
    table_id: gameTables[0].id,
    name: 'Steel Market',
    region: 'Central District',
    sub_region: 'Commerce Hub',
    address: 'Main Plaza',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Open market',
    dimensions: '120m x 120m',
    description: 'A crowded marketplace full of merchants, guards, and noise. Ideal for social interactions and stealth.',
    other: 'High civilian density'
  },
  {
    id: locationId3,
    table_id: gameTables[0].id,
    name: 'Underground Sewers',
    region: 'Lower City',
    sub_region: 'Maintenance Tunnels',
    address: 'Access Gate 12',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Tunnel system',
    dimensions: 'Variable',
    description: 'Dark tunnels beneath the city with foul smell and dangerous footing.',
    other: 'Slippery terrain, disease risk'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'The Broken Tower',
    region: 'Old District',
    sub_region: 'Ruins',
    address: 'Hilltop Sector',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Ruined structure',
    dimensions: '60m height',
    description: 'An ancient collapsed tower rumored to hold magical remnants.',
    other: 'Unstable structure'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'Blacksmith Forge',
    region: 'Industrial District',
    sub_region: 'Workshop Area',
    address: 'Forge Street 22',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Workshop',
    dimensions: '20m x 15m',
    description: 'A hot and noisy forge filled with weapons, tools, and molten metal.',
    other: 'Extreme heat'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'City Watch Barracks',
    region: 'Central District',
    sub_region: 'Security Zone',
    address: 'Guard Avenue',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Military building',
    dimensions: '80m x 50m',
    description: 'Headquarters of the city guards, heavily patrolled and organized.',
    other: 'High security'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'Shadow Tavern',
    region: 'Lower City',
    sub_region: 'Underground Social',
    address: 'Hidden Entrance',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Bar',
    dimensions: '25m x 20m',
    description: 'A dim tavern where criminals and mercenaries gather.',
    other: 'Illegal activities common'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'Abandoned Warehouse',
    region: 'Dock District',
    sub_region: 'Storage Zone',
    address: 'Pier 9',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Storage building',
    dimensions: '100m x 70m',
    description: 'An empty warehouse with crates and shadows — perfect for encounters.',
    other: 'Echoing acoustics'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'Rooftops of Steel',
    region: 'Central District',
    sub_region: 'Upper Levels',
    address: 'Various buildings',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Urban rooftops',
    dimensions: 'Connected area',
    description: 'A dangerous network of rooftops ideal for chases and stealth movement.',
    other: 'Fall risk'
  },
  {
    id: crypto.randomUUID(),
    table_id: gameTables[0].id,
    name: 'Arcane Library',
    region: 'Scholars Quarter',
    sub_region: 'Magic District',
    address: 'Knowledge Street 1',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Library',
    dimensions: '60m x 60m',
    description: 'A massive library containing forbidden knowledge and magical texts.',
    other: 'Magical interference'
  }
]

type SeedModifierNarrationLocations= {
  id: string,
  location_id: string,
  narrations_id: string,
}

const modifierNarrationsLocations: SeedModifierNarrationLocations[] = [
  {
    id: crypto.randomUUID(),
    location_id: locationId1,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId2,
    narrations_id: narration2
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId3,
    narrations_id: narration3
  }  
]

/* CENTRO DA FOLHA */
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

const npcSheetStmt = db.prepare(`
  INSERT INTO npcs (id, character_id , status)
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

console.log('🌱 Seed executed successfully!')
