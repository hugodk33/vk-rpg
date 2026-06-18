import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import { users } from "./varUsers"
import { characterGalarhornId, characterGarrickId, characterKasumiId, characterLyraId, characterKaelId, characterNPCsIds } from "./MainUUIDIds/uuidCharacters"
import * as skillsIds from './MainUUIDIds/uuidSkills'
import * as advantagesIds from "./MainUUIDIds/uuidAdvantages"
import * as itemsIds from "./MainUUIDIds/uuidItems"
import * as disadvantagesIds from "./MainUUIDIds/uuidDisadvantages"
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
    name: 'Riven Kael',
    bio: 'A fast dual-blade fighter.',
    backstory: 'Survived by speed and instinct.',
    points: 150, hp: 11, st: 11, dx: 14, iq: 11, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[1] as string,
    name: 'Thorne Black',
    bio: 'A grim bounty hunter.',
    backstory: 'Tracks targets across kingdoms.',
    points: 155, hp: 12, st: 12, dx: 12, iq: 11, ht: 11, fatigue: 11, encumbrance: 'Medium'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[2] as string,
    name: 'Selene Voss',
    bio: 'A shadow mage.',
    backstory: 'Manipulates darkness itself.',
    points: 160, hp: 10, st: 9, dx: 12, iq: 15, ht: 10, fatigue: 12, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[3] as string,
    name: 'Kael Draven',
    bio: 'A ruthless duelist.',
    backstory: 'Seeks perfection in combat.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[4] as string,
    name: 'Lyra Moonfall',
    bio: 'A celestial sorcerer.',
    backstory: 'Gifted by ancient stars.',
    points: 165, hp: 10, st: 9, dx: 11, iq: 15, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[5] as string,
    name: 'Borin Stonehelm',
    bio: 'A dwarven tank.',
    backstory: 'Unbreakable in battle.',
    points: 160, hp: 14, st: 14, dx: 10, iq: 10, ht: 13, fatigue: 12, encumbrance: 'Heavy'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[6] as string,
    name: 'Nyx Shadowend',
    bio: 'An elite assassin.',
    backstory: 'Never seen, always lethal.',
    points: 155, hp: 10, st: 10, dx: 15, iq: 12, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[7] as string,
    name: 'Eldric Vale',
    bio: 'A wise mage.',
    backstory: 'Keeper of forbidden lore.',
    points: 170, hp: 10, st: 9, dx: 10, iq: 16, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[8] as string,
    name: 'Vera Hollow',
    bio: 'A cursed archer.',
    backstory: 'Haunted by past battles.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[9] as string,
    name: 'Dante Crowe',
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
    name: 'Leather Armor',
    description: 'Sturdy leather armor offering moderate protection.',
    type: 'Armor',
    value: 'DR 2',
    fit: 'Torso',
    character_id: characterGalarhornId,
    item_id: itemsIds.galhornLeatherArmorId
  },
  {
    id: crypto.randomUUID(),
    name: 'Leather Bracers',
    description: 'Leather forearm guards for added protection.',
    type: 'Armor',
    value: 'DR 1',
    fit: 'Arms',
    character_id: characterGalarhornId,
    item_id: itemsIds.leatherBracersId
  },
  {
    id: crypto.randomUUID(),
    name: 'Leather Boots',
    description: 'Sturdy leather boots that protect the feet and lower legs.',
    type: 'Armor',
    value: 'DR 1',
    fit: 'Legs',
    character_id: characterGalarhornId,
    item_id: itemsIds.leatherBootsId
  },
  {
    id: crypto.randomUUID(),
    name: 'Medium Shield',
    description: 'A wooden shield reinforced with metal bands.',
    type: 'Shield',
    value: 'DB 2',
    fit: 'One Arm',
    character_id: characterGalarhornId,
    item_id: itemsIds.mediumShieldId
  },
  {
    id: crypto.randomUUID(),
    name: 'Travel Cloak',
    description: 'A simple travel cloak for weather protection.',
    type: 'Clothing',
    value: '-',
    fit: 'Shoulders',
    character_id: characterGalarhornId,
    item_id: itemsIds.travelCloakId
  },
  {
    id: crypto.randomUUID(),
    name: 'Robes',
    description: 'Simple but durable wizard robes.',
    type: 'Clothing',
    value: '-',
    fit: 'Full body',
    character_id: characterLyraId,
    item_id: itemsIds.robesId
  },
  {
    id: crypto.randomUUID(),
    name: 'Leather Armor',
    description: 'Light leather armor optimized for stealth and mobility.',
    type: 'Armor',
    value: 'DR 2',
    fit: 'Torso',
    character_id: characterKaelId,
    item_id: itemsIds.kaelLeatherArmorId
  },
  {
    id: crypto.randomUUID(),
    name: 'Dark Hooded Cloak',
    description: 'A dark, hooded cloak that helps blend into shadows.',
    type: 'Clothing',
    value: '-',
    fit: 'Shoulders',
    character_id: characterKaelId,
    item_id: itemsIds.darkHoodedCloakId
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

type SeedCharacterDisadvantage = {
  id: string
  disadvantage_id: string | null
  name: string
  character_id: string
  cost_points: number
  effect: string
}

export const characterDisadvantages: SeedCharacterDisadvantage[] = [
  {
    id: crypto.randomUUID(),
    disadvantage_id: disadvantagesIds.disadvantageCodeOfHonorId,
    name: 'Code of Honor (Soldier)',
    character_id: characterGalarhornId,
    cost_points: -10,
    effect: 'Maintains discipline and professional conduct.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: null,
    name: 'Enemy',
    character_id: characterGalarhornId,
    cost_points: -10,
    effect: 'A corrupt former captain of the city watch seeks revenge.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: disadvantagesIds.disadvantageOverconfidenceId,
    name: 'Overconfidence',
    character_id: characterGalarhornId,
    cost_points: -5,
    effect: 'Frequently underestimates opponents.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: null,
    name: 'Curious',
    character_id: characterLyraId,
    cost_points: -5,
    effect: 'Cannot resist investigating mysteries.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: disadvantagesIds.disadvantageLowPainThresholdId,
    name: 'Low Pain Threshold',
    character_id: characterLyraId,
    cost_points: -10,
    effect: 'Poor tolerance for injury.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: null,
    name: 'Pacifism (Reluctant Killer)',
    character_id: characterLyraId,
    cost_points: -5,
    effect: 'Avoids taking lives whenever possible.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: disadvantagesIds.disadvantageGreedId,
    name: 'Greed',
    character_id: characterKaelId,
    cost_points: -15,
    effect: 'Has difficulty ignoring valuable treasures.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: null,
    name: 'Secret',
    character_id: characterKaelId,
    cost_points: -10,
    effect: 'Wanted by a major thieves guild.'
  },
  {
    id: crypto.randomUUID(),
    disadvantage_id: disadvantagesIds.disadvantageOverconfidenceId,
    name: 'Overconfidence',
    character_id: characterKaelId,
    cost_points: -5,
    effect: 'Often takes unnecessary risks.'
  }
]

