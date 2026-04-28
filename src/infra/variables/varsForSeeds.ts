// src/infra/database/seed.ts
import { db } from '../database/database'
import crypto from 'crypto'

// limpa dados (opcional, mas útil em dev)
db.exec(`
  DELETE FROM log;
  DELETE FROM game_table_modifier_scenes;
  DELETE FROM game_table_modifier_items;
  DELETE FROM game_table_modifier_advantages;
  DELETE FROM game_table_modifier_skills;
  DELETE FROM game_table_modifier_attributes;
  DELETE FROM narrations;
  DELETE FROM narration_actions;
  DELETE FROM narration_characters;
  DELETE FROM narration_locations;
  DELETE FROM narration_npcs;
  DELETE FROM scenes;
  DELETE FROM game_table_modifiers;
  DELETE FROM game_table_npcs;
  DELETE FROM game_table_damages;
  DELETE FROM game_table_character_skills;
  DELETE FROM game_table_advantages;
  DELETE FROM game_table_character_advantages;
  DELETE FROM game_table_peculiarities;
  DELETE FROM game_table_character_images;
  DELETE FROM game_table_character_sheets;
  DELETE FROM characters;
  DELETE FROM item_images;
  DELETE FROM game_table_items;
  DELETE FROM table_images;
  DELETE FROM table_locations;
  DELETE FROM game_table_skill_dependencies;
  DELETE FROM game_table_skills;
  DELETE FROM game_table_players;
  DELETE FROM narrator_images;
  DELETE FROM game_tables;
  DELETE FROM narrators;
  DELETE FROM users;
`)

const  adminId = crypto.randomUUID()

type SeedUser = {
  id: string
  type: number
  username: string
  password: string
  phone: string
  email: string
}

export const  users: [
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

export const  narrators: SeedNarrator[] = [
  {
    id: crypto.randomUUID(),
    userId: adminId,
    name: 'admin'
  }
]

const  narratorId = narrators[0]!.id

type SeedGameTable = {
  id: string
  title: string
  system: string
  narratorId: string
  intro: string
}

const mainGameTableId = crypto.randomUUID()

export const  gameTables: [SeedGameTable, SeedGameTable, SeedGameTable] = [
  {
    id: mainGameTableId,
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

export const  gameTablePlayers: SeedGameTablePlayer[] = [
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[1].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[2].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[3].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[5].id }
]

type SeedSkill = {
  id: string
  table_id: string
  name: string
  predefinition_type: string
  predefinition_difficulty: string
  description: string
}

const  skillSwordsmanshipId = crypto.randomUUID()
const  skillBowsId = crypto.randomUUID()
const  skillStealthId = crypto.randomUUID()
const  skillTacticsId = crypto.randomUUID()
const  skillStrategyId = crypto.randomUUID()
const  skillMagicId = crypto.randomUUID()
const  skillSingId = crypto.randomUUID()


export const  skills: SeedSkill[] = [
    {
        id: skillSwordsmanshipId,
        table_id: mainGameTableId,
        name: 'Swordsmanship',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: 'A skill for fighting with swords, including techniques for attack and defense.'
    },
    {
        id: skillBowsId,
        table_id: mainGameTableId,
        name: 'Bows',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'A skill for using bows and crossbows, covering aiming, shooting, and maintenance.'
    },
    {
        id: skillStealthId,
        table_id: mainGameTableId,
        name: 'Stealth',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'A skill for moving quietly and avoiding detection.'
    },
    {
        id: skillTacticsId,
        table_id: mainGameTableId,
        name: 'Tactics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: 'A skill for planning and executing combat maneuvers.'
    },
    {
        id: skillMagicId,
        table_id: mainGameTableId,
        name: 'Magery',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: 'A skill for casting spells and performing magical rituals.'
    },
    {
        id: skillSingId,
        table_id: mainGameTableId,                                  
        name: "Sing",         
        predefinition_type: "Physical",
        predefinition_difficulty: "Easy",
        description: "The study of this skill is based on HT, not DX. This is the ability to sing pleasantly. A success on a skill test means the audience liked your song. Modifiers: -2 if the audience doesn't understand the language you're singing in; +2 if you have the Melodious Voice advantage."
    },
    {
        id: skillStrategyId,
        table_id: mainGameTableId,                                  
        name: "Strategy",         
        predefinition_type: "Mental",
        predefinition_difficulty: "Hard",
        description: "The ability to plan and execute complex strategies."
    }
]

type SeedCharacter = {
  id: string
  userId: string
  tableId: string
  name: string
}

const  characterMiraId = crypto.randomUUID()
const  characterGarrickId = crypto.randomUUID()
const  characterKasumiId = crypto.randomUUID()

const  characterNPCsIds = Array.from({ length: 10 }, () => crypto.randomUUID())

export const  characters: SeedCharacter[] = [
  {
    id: characterMiraId,
    userId: users[1].id,
    tableId: mainGameTableId,
    name: 'Mira Thorne'
  },
  {
    id: characterGarrickId,
    userId: users[2].id,
    tableId: mainGameTableId,
    name: 'Garrick Stone'
  },
  {
    id: characterKasumiId,
    userId: users[3].id,
    tableId: mainGameTableId,
    name: 'Kasumi Noh'
  },
  { id: characterNPCsIds[0] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Riven Kael' },
  { id: characterNPCsIds[1] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Thorne Black' },
  { id: characterNPCsIds[2] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Selene Voss' },
  { id: characterNPCsIds[3] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Kael Draven' },
  { id: characterNPCsIds[4] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Lyra Moonfall' },
  { id: characterNPCsIds[5] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Borin Stonehelm' },
  { id: characterNPCsIds[6] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Nyx Shadowend' },
  { id: characterNPCsIds[7] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Eldric Vale' },
  { id: characterNPCsIds[8] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Vera Hollow' },
  { id: characterNPCsIds[9] as string, userId: users[0]?.id, tableId: mainGameTableId, name: 'Dante Crowe' }

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

export const  characterSheets: SeedCharacterSheet[] = [
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

const  Npc1Id = crypto.randomUUID()
const  Npc2Id = crypto.randomUUID()
const  Npc3Id = crypto.randomUUID()
const  Npc4Id = crypto.randomUUID()
const  Npc5Id = crypto.randomUUID()
const  Npc6Id = crypto.randomUUID()
const  Npc7Id = crypto.randomUUID()
const  Npc8Id = crypto.randomUUID()
const  Npc9Id = crypto.randomUUID()
const  Npc10Id = crypto.randomUUID()

export const  newNpcs: SeedNpc[] = [
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
  table_id: string
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

const  shortSwordId = crypto.randomUUID()
const  leatherArmorId = crypto.randomUUID()
const  bowId = crypto.randomUUID()

export const  items: SeedItem[] = [
  {
    id: shortSwordId,
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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

const  advantageCombatReflexesId = crypto.randomUUID()
const  advantageVeryFitId = crypto.randomUUID()
const  advantageMageryId = crypto.randomUUID()

type SeedModifierGameTableAdvantages = {
  id: string
  table_id: string
  name: string
  costPoints: number
  effect: string
}

export const advantages: SeedModifierGameTableAdvantages[] = [
  {
    id: advantageCombatReflexesId,
    table_id: mainGameTableId,
    name: 'Combat Reflexes',
    costPoints: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: advantageVeryFitId,
    table_id: mainGameTableId,
    name: 'Very Fit',
    costPoints: 10,
    effect: '+2 fatigue, better recovery.'
  },
  {
    id: advantageMageryId,
    table_id: mainGameTableId,
    name: 'Magery 1',
    costPoints: 25,
    effect: 'Basic access to spellcasting and rituals.'
  }
]

type SeedPeculiarity = {
  id: string
  table_id: string
  name: string
  costPoints: number
  effect: string
}

export const  peculiarities: SeedPeculiarity[] = [
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Bad Temper',
    costPoints: -5,
    effect: '-2 reaction rolls when provoked.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Night Owl',
    costPoints: -5,
    effect: 'Harder to sleep at night, +1 alertness after midnight.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Fragile Bones',
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

export const  damages: SeedDamage[] = [
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

export const  characterSkills: SeedCharacterSkill[] = [
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

const  modifierFocusId = crypto.randomUUID()
const  modifierCurseId = crypto.randomUUID()

export const  modifiers: SeedModifier[] = [
  {
    id: modifierFocusId,
    tableId: mainGameTableId,
    name: 'Battle Focus',
    duration: 'Scene'
  },
  {
    id: modifierCurseId,
    tableId: mainGameTableId,
    name: 'Curse of Clumsiness',
    duration: 'Scene'
  }
]

type SeedModifierAttribute = {
  id: string
  modifierId: string
  attribute: string
}

export const  modifierAttributes: SeedModifierAttribute[] = [
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

export const  modifierSkills: SeedModifierSkill[] = [
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

export const  modifierAdvantages: SeedModifierAdvantage[] = [
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

export const  modifierItems: SeedModifierItem[] = [
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

export const  modifierScenes: [SeedModifierScene ,  SeedModifierScene , SeedModifierScene , SeedModifierScene ] = [
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The Forest',
    chapter: 1,
    moment: 0,
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The Clearing',
    chapter: 1,
    moment: 1,
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The River',
    chapter: 1,
    moment: 2
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
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

const  narration1 = crypto.randomUUID()
const  narration2 = crypto.randomUUID()
const  narration3 = crypto.randomUUID()

export const  modifierNarrations: SeedModifierNarration[] = [
  {
    id: narration1,
    table_id: mainGameTableId,
    scene_id: modifierScenes[0].id,
    title: 'The Forest', 
    narration: 'The party enters the forest.',
    moment: 0 
  },
  {
    id: narration2,
    table_id: mainGameTableId,
    scene_id: modifierScenes[0].id, 
    title: 'The Clearing',
    narration: 'The party enters the forest.',
    moment: 1 
  },
  {
    id: narration3,
    table_id: mainGameTableId,
    scene_id: modifierScenes[0].id, 
    title: 'The River',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: modifierScenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: modifierScenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 3 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
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

export const  modifierNarrationsActions: SeedModifierNarrationActions[] = [
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

export const  modifierNarrationsCharacters: SeedModifierNarrationCharacter[] = [
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

export const  modifierNarrationsNPCs: SeedModifierNarrationNPCs[] = [
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

const  locationId1 = crypto.randomUUID()
const  locationId2 = crypto.randomUUID()
const  locationId3 = crypto.randomUUID()

export const  modifierTableLocations: SeedModifierLocation[] = [
  {
    id: locationId1,
    table_id: mainGameTableId,
    name: 'Iron Alley',
    region: 'Industrial District',
    sub_region: 'Backstreets',
    address: 'Sector 7, Alley 3',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Narrow street',
    dimensions: '40m x 3m',
    description: 'A tight alley filled with pipes, steam vents, and export const ant dripping water. Perfect for ambushes.',
    other: 'Low visibility due to steam'
  },
  {
    id: locationId2,
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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
    table_id: mainGameTableId,
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

export const  modifierNarrationsLocations: SeedModifierNarrationLocations[] = [
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

type SeedModifierGameTableSkillsDependecies = {
    id: string,
    origin_skill_id: string,
    depends_on_skill_id: string | null,
    depends_on_skill_value: string | null,
    depends_on_skill_for_others_attributes: string | null
}

export const  modifierGameTableSkillsDependecies: SeedModifierGameTableSkillsDependecies[] = [
    {
        id: crypto.randomUUID(),                                  
        origin_skill_id: skillSingId,
        depends_on_skill_id: null,
        depends_on_skill_value: null,
        depends_on_skill_for_others_attributes: '[HT - 4]'
    },
    {
        id: crypto.randomUUID(),                                  
        origin_skill_id: skillSingId,
        depends_on_skill_id: null,
        depends_on_skill_value: null,

        depends_on_skill_for_others_attributes: '[DX - 5]'
    },
    {
        id: crypto.randomUUID(),                                  
        origin_skill_id: skillBowsId,
        depends_on_skill_id: null,
        depends_on_skill_value: null,
        depends_on_skill_for_others_attributes: '[DX - 6]'
    },
    {
        id: crypto.randomUUID(),                                  
        origin_skill_id: skillBowsId,
        depends_on_skill_id: null,
        depends_on_skill_value: null,
        depends_on_skill_for_others_attributes: '[IQ - 6]'
    }
]