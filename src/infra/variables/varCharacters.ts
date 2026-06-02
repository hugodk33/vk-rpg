import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import { users } from "./varUsers"
import { characterGalarhornId , characterGarrickId, characterKasumiId, characterLyraId, characterKaelId, characterNPCsIds } from "./MainUUIDIds/uuidCharacters"
import * as skillsIds from './MainUUIDIds/uuidSkills'
import * as advantagesIds from "./MainUUIDIds/uuidAdvantages"
import * as itemsIds from "./MainUUIDIds/uuidItems"
import * as UserCharacterIds from "./MainUUIDIds/uuidGeral"

type SeedCharacter = {
  id: string
  userId: string
  tableId: string
}

export const characters: SeedCharacter[] = [
  {
    id: characterGalarhornId,
    userId: UserCharacterIds.playerOneId,
    tableId: mainGameTableId
  },
  {
    id: characterGarrickId,
    userId: users[2].id,
    tableId: mainGameTableId
  },
  {
    id: characterKasumiId,
    userId: users[3].id,
    tableId: mainGameTableId
  },
  {
    id: characterLyraId,
    userId: users[4].id,
    tableId: mainGameTableId
  },
  {
    id: characterKaelId,
    userId: users[5].id,
    tableId: mainGameTableId
  },
  { id: characterNPCsIds[0] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[1] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[2] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[3] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[4] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[5] as string, userId: users[0]?.id, tableId: mainGameTableId },
  { id: characterNPCsIds[6] as string, userId: users[0]?.id, tableId: mainGameTableId},
  { id: characterNPCsIds[7] as string, userId: users[0]?.id, tableId: mainGameTableId},
  { id: characterNPCsIds[8] as string, userId: users[0]?.id, tableId: mainGameTableId},
  { id: characterNPCsIds[9] as string, userId: users[0]?.id, tableId: mainGameTableId}

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

export const characterSheets: SeedCharacterSheet[] = [
  {
    id: crypto.randomUUID(),
    characterId: characterGalarhornId,
    name: 'Elric Galrhorn Denmark',
    bio: 'A streetwise duelist with quick reflexes.',
    backstory: 'Former city watch turned blade-for-hire, she fights for freedom and survival.',
    points: 150,
    hp: 11,
    st: 11,
    dx: 12,
    iq: 13,
    ht: 10,
    fatigue: 0,
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
    characterId: characterLyraId,
    name: 'Lyra Moonwhisper',
    bio: 'A gifted wizard obsessed with ancient knowledge.',
    backstory: 'Raised within a secluded arcane academy, Lyra left to uncover forgotten magical secrets.',
    points: 150,
    hp: 9,
    st: 9,
    dx: 10,
    iq: 15,
    ht: 10,
    fatigue: 13,
    encumbrance: 'None'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    name: 'Kael Shadowstep',
    bio: 'A nimble rogue specializing in infiltration and silent kills.',
    backstory: 'Raised among thieves and smugglers, Kael learned that information is often worth more than gold.',
    points: 150,
    hp: 10,
    st: 10,
    dx: 14,
    iq: 12,
    ht: 11,
    fatigue: 11,
    encumbrance: 'None'
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

type SeedDamage = {
  id: string
  name: string
  description: string
  type: string
  value: string
  range: string
  character_id: string
  item_id?: string
  skill_id?: string
  advantage_id?: string
}

export const damages: SeedDamage[] = [
  {
    id: crypto.randomUUID(),
    name: 'Cutting Strike',
    description: 'A fast slash with a short sword designed to open armor gaps.',
    type: 'Physical',
    value: 'sw+2 cut',
    range: 'Melee',
    character_id: characterGalarhornId,
    item_id: itemsIds.shortSwordId
  },
  {
    id: crypto.randomUUID(),
    name: 'Power Shot',
    description: 'A heavy arrow fired from the recurved bow.',
    type: 'Physical',
    value: '2d+1 imp',
    range: '75 yards',
    character_id: characterKasumiId,
    item_id: itemsIds.bowId,
  },
  {
    id: crypto.randomUUID(),
    name: 'Arcane Blast',
    description: 'A small burst of magical energy fueled by Magery.',
    type: 'Energy',
    value: '3d burning',
    range: 'Medium',
    character_id: characterKasumiId
  },
  {
    id: crypto.randomUUID(),
    name: "Swinging Fist Strike",
    description: "A powerful punch with a swinging motion.",
    type: "melee attack",
    value: "1d-2 cr",
    range: "close",
    character_id: characterGalarhornId,
  },
  {
    id: crypto.randomUUID(),
    name: "Straight Punch",
    description: "A direct and fast punch aimed at the target.",
    type: "melee attack",
    value: "1d-1 cr",
    range: "close",
    character_id: characterGalarhornId,
  },
  {
    id: crypto.randomUUID(),
    name: "Sword Thrust",
    description: "A precise thrusting attack using the sword point.",
    type: "melee attack",
    value: "1d imp",
    range: "1",
    character_id: characterGalarhornId
  },
  {
    id: crypto.randomUUID(),
    name: "Sword Swing",
    description: "A wide swinging slash attack with the sword.",
    type: "melee attack",
    value: "2d cut",
    range: "1",
    character_id: characterGalarhornId
  },
  {
    id: crypto.randomUUID(),
    name: 'Staff Strike',
    description: 'A blunt strike with a wizard staff.',
    type: 'melee attack',
    value: '1d cr',
    range: '1',
    character_id: characterLyraId,
    item_id: itemsIds.wizardStaffId
  },
  {
    id: crypto.randomUUID(),
    name: 'Fireball',
    description: 'A ball of fire launched at the target.',
    type: 'energy attack',
    value: '2d burn',
    range: '25',
    character_id: characterLyraId
  },
  {
    id: crypto.randomUUID(),
    name: 'Lightning Bolt',
    description: 'A bolt of lightning arcing toward the target.',
    type: 'energy attack',
    value: '2d burn surge',
    range: '20',
    character_id: characterLyraId
  },
  {
    id: crypto.randomUUID(),
    name: 'Ice Shard',
    description: 'A sharp shard of ice hurled at the target.',
    type: 'energy attack',
    value: '1d+2 imp',
    range: '15',
    character_id: characterLyraId
  },
  {
    id: crypto.randomUUID(),
    name: 'Punch',
    description: 'A quick punch with the fist.',
    type: 'melee attack',
    value: '1d-2 cr',
    range: 'C',
    character_id: characterKaelId
  },
  {
    id: crypto.randomUUID(),
    name: 'Dagger Thrust',
    description: 'A precise thrusting attack with a dagger.',
    type: 'melee attack',
    value: '1d imp',
    range: 'C,1',
    character_id: characterKaelId,
    item_id: itemsIds.fineDaggerId
  },
  {
    id: crypto.randomUUID(),
    name: 'Dagger Slash',
    description: 'A slashing cut with a dagger.',
    type: 'melee attack',
    value: '1d+1 cut',
    range: 'C,1',
    character_id: characterKaelId,
    item_id: itemsIds.fineDaggerId
  },
  {
    id: crypto.randomUUID(),
    name: 'Thrown Knife',
    description: 'A knife thrown at the target.',
    type: 'ranged attack',
    value: '1d imp',
    range: '10',
    character_id: characterKaelId,
    item_id: itemsIds.throwingKnifeId
  },
  {
    id: crypto.randomUUID(),
    name: 'Sneak Attack',
    description: 'A devastating precision strike from hiding.',
    type: 'melee attack',
    value: '1d+2 imp',
    range: 'C,1',
    character_id: characterKaelId,
    item_id: itemsIds.fineDaggerId
  },
]

type SeedArmor = {
  id: string
  name: string
  description: string
  type: string
  value: string
  fit: string
  character_id: string
  item_id?: string
  skill_id?: string
  advantage_id?: string
}

export const armors: SeedArmor[] = [
  {
    id: crypto.randomUUID(),
    name: 'Cutting Strike',
    description: 'A fast slash with a short sword designed to open armor gaps.',
    type: 'Perry',
    value: 'sw+2 cut',
    fit: 'Melee',
    character_id: characterGalarhornId,
    item_id: itemsIds.shortSwordId
  }
]

type SeedCharacterSkill = {
  id: string
  characterId: string
  skillId: string
  costPoints: number
  effect: string
}

export const characterSkills: SeedCharacterSkill[] = [
  {
    id: crypto.randomUUID(),
    characterId: characterGalarhornId,
    skillId: skillsIds.skillSwordsmanshipId,
    costPoints: 14,
    effect: 'Used for melee attacks with swords and blades.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterGarrickId,
    skillId: skillsIds.skillTacticsId,
    costPoints: 10,
    effect: 'Used to coordinate allies and plan battlefield movement.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKasumiId,
    skillId: skillsIds.skillMagicId,
    costPoints: 25,
    effect: 'Used to cast spells and channel magical energy.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterGarrickId,
    skillId: skillsIds.skillStealthId,
    costPoints: 12,
    effect: 'Used to move quietly when avoiding patrols.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterLyraId,
    skillId: skillsIds.skillThaumatologyId,
    costPoints: 8,
    effect: 'Used to study and understand the principles of magic.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterLyraId,
    skillId: skillsIds.skillResearchId,
    costPoints: 4,
    effect: 'Used to conduct investigations in libraries and archives.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterLyraId,
    skillId: skillsIds.skillOccultismId,
    costPoints: 4,
    effect: 'Used to recognize and understand occult symbols and practices.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterLyraId,
    skillId: skillsIds.skillAlchemyId,
    costPoints: 4,
    effect: 'Used to brew potions and identify alchemical substances.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterLyraId,
    skillId: skillsIds.skillMeditationId,
    costPoints: 2,
    effect: 'Used to calm the mind and focus magical energy.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillStealthId,
    costPoints: 12,
    effect: 'Used to move silently and hide in shadows.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillLockpickingId,
    costPoints: 8,
    effect: 'Used to open locks without a key.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillPickpocketId,
    costPoints: 8,
    effect: 'Used to steal items from pockets unnoticed.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillKnifeId,
    costPoints: 8,
    effect: 'Used for close combat with knives and daggers.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillClimbingId,
    costPoints: 4,
    effect: 'Used to scale walls and other vertical surfaces.'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterKaelId,
    skillId: skillsIds.skillStreetwiseId,
    costPoints: 4,
    effect: 'Used to gather information in urban underworlds.'
  }
]

type SeedCharacterAdvantage = {
  id: string
  advantage_id: string
  name: string
  category: string
  subcategory: string
  character_id: string
  cost_points: string
  effect: string
}

export const characterAdvantages: SeedCharacterAdvantage[] = [
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageEideticMemoryId,
    name: 'Leadership',
    category: 'Social',
    subcategory: 'Command',
    character_id: characterGalarhornId,
    cost_points: '5',
    effect: 'Used to inspire allies and lead them in battle.'
  },
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageAbsoluteDirectionId,
    name: 'Absolute Direction',
    category: 'Social',
    subcategory: 'Command',
    character_id: characterGalarhornId,
    cost_points: '10',
    effect: 'Used to always know which way is north and navigate effectively.'
  },
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageCombatReflexesId,
    name: 'Combat Reflexes',
    category: 'Social',
    subcategory: 'Command',
    character_id: characterGalarhornId,
    cost_points: '15',
    effect: 'Used to react quickly in combat and avoid attacks.'
  },
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageMageryId,
    name: 'Magery 3',
    category: 'Magical',
    subcategory: 'Talent',
    character_id: characterLyraId,
    cost_points: '35',
    effect: 'Used to channel and enhance magical spells.'
  },
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageEideticMemoryId,
    name: 'Eidetic Memory',
    category: 'Mental',
    subcategory: 'Talent',
    character_id: characterLyraId,
    cost_points: '5',
    effect: 'Used to remember spells and research with exceptional clarity.'
  },
  {
    id: crypto.randomUUID(),
    advantage_id: advantagesIds.advantageFlexibilityId,
    name: 'Flexibility',
    category: 'Physical',
    subcategory: 'Talent',
    character_id: characterKaelId,
    cost_points: '5',
    effect: 'Used to gain a bonus on Climbing and Escape checks.'
  }
]

