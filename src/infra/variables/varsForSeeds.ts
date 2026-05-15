// src/infra/database/seed.ts
import { db } from '../database/database'
import crypto from 'crypto'

// limpa dados (opcional, mas útil em dev)
// db.exec(`
//   DELETE FROM log;
//   DELETE FROM game_table_modifier_scenes;
//   DELETE FROM game_table_modifier_items;
//   DELETE FROM game_table_modifier_advantages;
//   DELETE FROM game_table_modifier_skills;
//   DELETE FROM game_table_modifier_attributes;
//   DELETE FROM narrations;
//   DELETE FROM narration_actions;
//   DELETE FROM narration_characters;
//   DELETE FROM narration_locations;
//   DELETE FROM narration_npcs;
//   DELETE FROM scenes;
//   DELETE FROM game_table_modifiers;
//   DELETE FROM game_table_npcs;
//   DELETE FROM game_table_damages;
//   DELETE FROM game_table_character_skills;
//   DELETE FROM game_table_advantages;
//   DELETE FROM game_table_disadvantages;
//   DELETE FROM game_table_character_advantages;
//   DELETE FROM game_table_character_disadvantages;
//   DELETE FROM game_table_peculiarities;
//   DELETE FROM game_table_character_images;
//   DELETE FROM game_table_character_sheets;
//   DELETE FROM characters;
//   DELETE FROM item_images;
//   DELETE FROM game_table_items;
//   DELETE FROM table_images;
//   DELETE FROM table_locations;
//   DELETE FROM game_table_skill_dependencies;
//   DELETE FROM game_table_skill_predefinede;
//   DELETE FROM game_table_skills;
//   DELETE FROM game_table_players;
//   DELETE FROM narrator_images;
//   DELETE FROM game_tables;
//   DELETE FROM narrators;
//   DELETE FROM users;
// `)

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

// Skills from var-skills.ts (translated to English)
const  skillAnimalTrainingId = crypto.randomUUID()
const  skillFalconryId = crypto.randomUUID()
const  skillAnimalPackingId = crypto.randomUUID()
const  skillRidingId = crypto.randomUUID()
const  skillTeamsterId = crypto.randomUUID()
const  skillVeterinaryId = crypto.randomUUID()
const  skillArtistId = crypto.randomUUID()
const  skillBardId = crypto.randomUUID()
const  skillDancingId = crypto.randomUUID()
const  skillPoetryId = crypto.randomUUID()
const  skillSculptingId = crypto.randomUUID()
const  skillWritingId = crypto.randomUUID()
const  skillAcrobaticsId = crypto.randomUUID()
const  skillBreathControlId = crypto.randomUUID()
const  skillZeroGId = crypto.randomUUID()
const  skillJumpingId = crypto.randomUUID()
const  skillRunningId = crypto.randomUUID()
const  skillDivingId = crypto.randomUUID()
const  skillSkiingId = crypto.randomUUID()
const  skillSwimmingId = crypto.randomUUID()
const  skillAxeMaceId = crypto.randomUUID()
const  skillAxeThrowingId = crypto.randomUUID()
const  skillCombatSuitId = crypto.randomUUID()
// Additional skills referenced by pre-definidos in var-skills.ts
const  skillMedicineId = crypto.randomUUID()
const  skillPerformanceId = crypto.randomUUID()
const  skillLanguageId = crypto.randomUUID()
const  skillPressureSuitId = crypto.randomUUID()
// Additional skills referenced by pre-definidos in pericias2
const  skillFirstAidId = crypto.randomUUID()
const  skillSavoirFaireId = crypto.randomUUID()

// Skills from pericias2 (translated to English)
const  skillAccountingId = crypto.randomUUID()
const  skillActingId = crypto.randomUUID()
const  skillAdministrationId = crypto.randomUUID()
const  skillAgronomyId = crypto.randomUUID()
const  skillAlchemyId = crypto.randomUUID()
const  skillAnthropologyId = crypto.randomUUID()
const  skillArchaeologyId = crypto.randomUUID()
const  skillArchitectureId = crypto.randomUUID()
const  skillAreaKnowledgeId = crypto.randomUUID()
const  skillArmouryId = crypto.randomUUID()
const  skillAstronavigationId = crypto.randomUUID()
const  skillAstronomyId = crypto.randomUUID()
const  skillBeamWeaponsId = crypto.randomUUID()
const  skillBiochemistryId = crypto.randomUUID()
const  skillBlackjackId = crypto.randomUUID()
const  skillBlowpipeId = crypto.randomUUID()
const  skillBoatingId = crypto.randomUUID()
const  skillBolasId = crypto.randomUUID()
const  skillBotanyId = crypto.randomUUID()
const  skillBowId = crypto.randomUUID()
const  skillBrawlingId = crypto.randomUUID()
const  skillBroadswordId = crypto.randomUUID()
const  skillBucklerId = crypto.randomUUID()
const  skillCamouflageId = crypto.randomUUID()
const  skillCarousingId = crypto.randomUUID()
const  skillCarpentryId = crypto.randomUUID()
const  skillChemistryId = crypto.randomUUID()
const  skillClimbingId = crypto.randomUUID()
const  skillComputerOperationId = crypto.randomUUID()
const  skillComputerProgrammingId = crypto.randomUUID()
const  skillCookingId = crypto.randomUUID()
const  skillCriminologyId = crypto.randomUUID()
const  skillCrossbowId = crypto.randomUUID()
const  skillCyclingId = crypto.randomUUID()
const  skillDemolitionId = crypto.randomUUID()
const  skillDetectLiesId = crypto.randomUUID()
const  skillDiplomacyId = crypto.randomUUID()
const  skillDisguiseId = crypto.randomUUID()
const  skillDrivingId = crypto.randomUUID()
const  skillEcologyId = crypto.randomUUID()
const  skillEconomicsId = crypto.randomUUID()
const  skillElectronicsId = crypto.randomUUID()
const  skillElectronicsOperationId = crypto.randomUUID()
const  skillEngineeringMechanicalId = crypto.randomUUID()
const  skillEscapeId = crypto.randomUUID()
const  skillFastDrawId = crypto.randomUUID()
const  skillFastReloadId = crypto.randomUUID()
const  skillFastTalkId = crypto.randomUUID()
const  skillFencingId = crypto.randomUUID()
const  skillFishingId = crypto.randomUUID()
const  skillFlailId = crypto.randomUUID()
const  skillForensicsId = crypto.randomUUID()
const  skillForgeryId = crypto.randomUUID()
const  skillGamblingId = crypto.randomUUID()
const  skillGeneticsId = crypto.randomUUID()
const  skillGeologyId = crypto.randomUUID()
const  skillGunsId = crypto.randomUUID()
const  skillGunsMusketId = crypto.randomUUID()
const  skillHeraldryId = crypto.randomUUID()
const  skillHistoryId = crypto.randomUUID()
const  skillHoldoutId = crypto.randomUUID()
const  skillIntelligenceAnalysisId = crypto.randomUUID()
const  skillInterrogationId = crypto.randomUUID()
const  skillJewelerId = crypto.randomUUID()
const  skillJudoId = crypto.randomUUID()
const  skillKarateId = crypto.randomUUID()
const  skillKnifeId = crypto.randomUUID()
const  skillKnifeThrowingId = crypto.randomUUID()
const  skillLanceId = crypto.randomUUID()
const  skillLassoId = crypto.randomUUID()
const  skillLawId = crypto.randomUUID()
const  skillLeadershipId = crypto.randomUUID()
const  skillLeatherworkingId = crypto.randomUUID()
const  skillLinguisticsId = crypto.randomUUID()
const  skillLipReadingId = crypto.randomUUID()
const  skillLiteratureId = crypto.randomUUID()
const  skillLockpickingId = crypto.randomUUID()
const  skillMathematicsId = crypto.randomUUID()
const  skillMechanicId = crypto.randomUUID()
const  skillMerchantId = crypto.randomUUID()
const  skillMetallurgyId = crypto.randomUUID()
const  skillMeteorologyId = crypto.randomUUID()
const  skillMimePantomimeId = crypto.randomUUID()
const  skillMotorcycleId = crypto.randomUUID()
const  skillNaturalistId = crypto.randomUUID()
const  skillNavigationId = crypto.randomUUID()
const  skillNetId = crypto.randomUUID()
const  skillNuclearPhysicsId = crypto.randomUUID()
const  skillOccultismId = crypto.randomUUID()
const  skillPhysicsId = crypto.randomUUID()
const  skillPhysiologyId = crypto.randomUUID()
const  skillPickpocketId = crypto.randomUUID()
const  skillPilotingId = crypto.randomUUID()
const  skillPoisonId = crypto.randomUUID()
const  skillPolearmId = crypto.randomUUID()
const  skillPotteryId = crypto.randomUUID()
const  skillPowerboatId = crypto.randomUUID()
const  skillProspectingId = crypto.randomUUID()
const  skillPsychologyId = crypto.randomUUID()
const  skillResearchId = crypto.randomUUID()
const  skillScroungingId = crypto.randomUUID()
const  skillSeamanshipId = crypto.randomUUID()
const  skillSexAppealId = crypto.randomUUID()
const  skillShadowingId = crypto.randomUUID()
const  skillShieldId = crypto.randomUUID()
const  skillShortswordId = crypto.randomUUID()
const  skillSignLanguageId = crypto.randomUUID()
const  skillSleightOfHandId = crypto.randomUUID()
const  skillSlingId = crypto.randomUUID()
const  skillSmithId = crypto.randomUUID()
const  skillSpearId = crypto.randomUUID()
const  skillSpearThrowerId = crypto.randomUUID()
const  skillSpearThrowingId = crypto.randomUUID()
const  skillStaffId = crypto.randomUUID()
const  skillStreetwiseId = crypto.randomUUID()
const  skillSurgeryId = crypto.randomUUID()
const  skillSurvivalId = crypto.randomUUID()
const  skillTeachingId = crypto.randomUUID()
const  skillTelegraphyId = crypto.randomUUID()
const  skillTheologyId = crypto.randomUUID()
const  skillTrackingId = crypto.randomUUID()
const  skillTrapsId = crypto.randomUUID()
const  skillTwoHandedAxeMaceId = crypto.randomUUID()
const  skillTwoHandedSwordId = crypto.randomUUID()
const  skillUnderwaterDemolitionId = crypto.randomUUID()
const  skillVentriloquismId = crypto.randomUUID()
const  skillWhipId = crypto.randomUUID()
const  skillWoodworkingId = crypto.randomUUID()
const  skillZoologyId = crypto.randomUUID()

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
        description: "The ability to hide and move silently. A successful test roll indicates you can hide anywhere except a completely empty room, or move so quietly that no one will hear you, or follow someone without being noticed (to follow someone in a crowd use the Shadowing skill). Modifiers: minus your Encumbrance level; -5 to hide in an area without natural hiding places; -5 to move silently if running instead of walking; -5 to fool dogs instead of people."
    },
    {
        id: skillTacticsId,
        table_id: mainGameTableId,
        name: 'Tactics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "The ability to plan military actions and predict those of the enemy. Normally taught only by the military. A successful skill test allows you to deduce the enemy's military plans, unless they are led by someone with this skill. In that case, the GM should make a Quick Contest of Skills between the two tacticians. If the player's character loses, they will make an incorrect conjecture about enemy plans."
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
        description: "The ability to plan military actions and predict those of the enemy. Normally taught only by the military. A successful skill test allows you to deduce the enemy's military plans, unless they are led by someone with this skill. In that case, the GM should make a Quick Contest of Skills between the two strategists. If the player's character loses, they will make an incorrect conjecture about enemy plans. The amount of information obtained depends on how good your test result was, but not on the quality of the enemy's plans."
    },
    // Skills from var-skills.ts (translated to English)
    {
        id: skillAnimalTrainingId,
        table_id: mainGameTableId,
        name: 'Animal Training',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: 'The ability to train and work with all kinds of animals. To train an animal, the trainer must succeed on a skill test each day of training. A failure means the animal learned nothing. A critical failure means the animal attacked the trainer.'
    },
    {
        id: skillFalconryId,
        table_id: mainGameTableId,
        name: 'Falconry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to hunt small animals using a trained falcon. A good falconer knows hunting and training techniques, as well as how to care for a falcon.'
    },
    {
        id: skillAnimalPackingId,
        table_id: mainGameTableId,
        name: 'Animal Packing',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: 'The ability to load and unload animals quickly and efficiently. Includes the ability to correctly assess animals before purchase, get the best performance from them, and select the best routes for caravans.'
    },
    {
        id: skillRidingId,
        table_id: mainGameTableId,
        name: 'Riding',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'This skill is different for each type of animal. If you encounter a mount you are not familiar with, use your skill level with the closest animal type. Modifiers: +5 if the animal knows and likes you; -10 if the animal is not a "common" mount or has not been trained as such.'
    },
    {
        id: skillTeamsterId,
        table_id: mainGameTableId,
        name: 'Teamster',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The skill of driving teams of animals, such as a wagon. Includes the ability to hitch and care for animals, and assess them before purchase. Driving a group with more than 4 animals, or with unfamiliar animals, subjects the character to a -2 penalty.'
    },
    {
        id: skillVeterinaryId,
        table_id: mainGameTableId,
        name: 'Veterinary',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: 'The ability to care for injured or sick animals. This is a Medical skill. Modifiers: +5 if the animal already knows and trusts you; -2 or worse if the animal is of a type you are not familiar with.'
    },
    {
        id: skillArtistId,
        table_id: mainGameTableId,
        name: 'Artist',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: 'The ability to draw and paint with beauty and precision. A success on a skill test could mean you made a drawing good enough to help identify a person, draw an easy-to-follow map, or even paint a picture good enough to trade for a meal.'
    },
    {
        id: skillBardId,
        table_id: mainGameTableId,
        name: 'Bard',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to tell stories and speak impromptu. Good use of this talent will allow you to give a good political speech, entertain a group of people around a campfire, incite (or calm) a riot, or succeed in the role of "court jester".'
    },
    {
        id: skillDancingId,
        table_id: mainGameTableId,
        name: 'Dancing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'The ability to perform dances peculiar to your own culture and learn new styles quickly. Modifiers: -5 if the dance is unknown. A dance will be familiar to you after you successfully perform it 3 times.'
    },
    {
        id: skillPoetryId,
        table_id: mainGameTableId,
        name: 'Poetry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to compose any kind of poetry known in your civilization with "good" quality, in any language you are fluent in. A successful Poetry test means you composed a good poem in an adequate time.'
    },
    {
        id: skillSculptingId,
        table_id: mainGameTableId,
        name: 'Sculpting',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'The ability to shape an image reasonably similar to a human being or object, using clay, wood, ivory, or whatever comes to hand. To produce a metal sculpture, you need to have forging skill.'
    },
    {
        id: skillWritingId,
        table_id: mainGameTableId,
        name: 'Writing',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to write clearly and/or entertainingly. A success on a skill test means the work is legible and accurate. Modifiers: -3 if you were in a hurry; +3 if you had plenty of time; -5 if you were writing about a subject you are not familiar with.'
    },
    {
        id: skillAcrobaticsId,
        table_id: mainGameTableId,
        name: 'Acrobatics',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: 'The ability to perform acrobatic and gymnastic feats, roll, take tumbles, etc. A test should be made for each trick you attempt. This skill can be convenient in an adventure; tightrope walking, human pyramids, and trapeze all have practical applications.'
    },
    {
        id: skillBreathControlId,
        table_id: mainGameTableId,
        name: 'Breath Control',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: 'The ability to breathe as efficiently as possible. On a successful skill test, the character can triple the time they can hold their breath for any reason. A success also enables recovery of 1 fatigue point in just two minutes.'
    },
    {
        id: skillZeroGId,
        table_id: mainGameTableId,
        name: 'Zero-G',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The skill of dealing with a zero-gravity (free fall) environment. A test is required when you first enter free fall. A failure means you feel nauseous, and a successful HT test will be required to avoid suffocation.'
    },
    {
        id: skillJumpingId,
        table_id: mainGameTableId,
        name: 'Jumping',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: 'The skill of making the best possible use of your strength when jumping. When the character attempts a difficult jump, they may substitute their Jumping skill level for their ST or DX.'
    },
    {
        id: skillRunningId,
        table_id: mainGameTableId,
        name: 'Running',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: 'This skill is based on HT, not DX. It represents training in short and long distance running. If you studied this subject, divide your skill level by 8 (do not round) and add the result to your Speed parameter when calculating your Movement.'
    },
    {
        id: skillDivingId,
        table_id: mainGameTableId,
        name: 'Diving',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to use equipment to breathe underwater. To avoid ingesting water (which would result in loss of 1 ST point and risk of drowning), you must succeed on a test made as soon as you enter the water and subsequent tests made every 30 minutes.'
    },
    {
        id: skillSkiingId,
        table_id: mainGameTableId,
        name: 'Skiing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: 'The ability to ski. A skill test is required when you start a descent, except on a very easy slope, and another every 30 minutes. A failure means you fall. In case of a critical failure, you suffer 1D-1 points of damage to a randomly chosen limb.'
    },
    {
        id: skillSwimmingId,
        table_id: mainGameTableId,
        name: 'Swimming',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: 'This skill is used both for swimming (or floating in emergency cases) and for saving a drowning victim. See Swimming for complete rules on swimming, drowning, and lifesaving.'
    },
    {
        id: skillAxeMaceId,
        table_id: mainGameTableId,
        name: 'Axe or Mace',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: 'Skill in using any small, unbalanced weapon like an axe, hatchet, mace, pickaxe, etc.'
    },
    {
        id: skillAxeThrowingId,
        table_id: mainGameTableId,
        name: 'Axe Throwing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: 'Skill in throwing any balanced throwing axe, but not an unbalanced war axe.'
    },
    // new skill
    {
        id: skillCombatSuitId,
        table_id: mainGameTableId,
        name: 'Combat Suit',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to use a self-propelled armored suit, including the corresponding armament.'
    },
    {
        id: skillMedicineId,
        table_id: mainGameTableId,
        name: 'Medicine',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the generic professional skill for treating the sick, prescribing medications and treatments, etc. When a GM requires a test of Competence or general medical knowledge, it will be made against this skill. A doctor has the option of adopting a specialization."
    },
    {
        id: skillPerformanceId,
        table_id: mainGameTableId,
        name: 'Performance',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to act, perform, and tell stories for an audience.'
    },
    {
        id: skillLanguageId,
        table_id: mainGameTableId,
        name: 'Language',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to speak, read, and write a foreign language.'
    },
    {
        id: skillPressureSuitId,
        table_id: mainGameTableId,
        name: 'Pressure Suit',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: 'The ability to use a pressure suit or space suit for survival in hostile environments.'
    },
    // Skills from pericias2 (var-skills.ts)
    {
        id: skillBeamWeaponsId,
        table_id: mainGameTableId,
        name: 'Beam Weapons',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using any type of Beam Weapon — ion beams, lasers, stunners, etc. It includes both pistol-type and rifle-type weapons, since neither suffers from recoil. If your IQ is 10 or 11, add 1 point to your skill level. If greater than 11, add 2 points. The modifiers are the same as those described for the Guns skill."
    },
    {
        id: skillBlackjackId,
        table_id: mainGameTableId,
        name: 'Blackjack',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This weapon is only useful in close combat and, in most cases, is used for surprise attacks. Since it causes very small basic damage, it is usually used to strike the head. If you do not wish to cause serious injury, the attacker may 'pull their punch,' not using their full ST."
    },
    {
        id: skillGunsMusketId,
        table_id: mainGameTableId,
        name: 'Guns (Musket)',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using gunpowder weapons, including muskets, pistols and rifles. Add 1 to your skill level if your IQ is 10 or 11, and 2 for IQ 12 or higher. The modifiers are the same as those found in Guns, p. 51."
    },
    {
        id: skillBlowpipeId,
        table_id: mainGameTableId,
        name: 'Blowpipe',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using the blowpipe to launch small darts (normally poisoned). These darts cannot pierce normal clothing, except in the case of a decisive success, and never penetrate clothing or armor. If a dart hits skin or light clothing, the poison may take effect. Modifiers: -2 or more in case of wind."
    },
    {
        id: skillBolasId,
        table_id: mainGameTableId,
        name: 'Bolas',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in throwing bolas (a leather strip with two or more weights attached to its ends) to entangle the victim. They are mainly used to stop animals in a herd, or hunting small wild animals or birds. They can also be used in combat. It is possible to dodge or block them, but an attempt to parry will cause them to automatically wrap around the weapon used. Exception: A successful parry with a cutting weapon will cut the strips, ruining the bolas."
    },
    {
        id: skillBowId,
        table_id: mainGameTableId,
        name: 'Bow',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using bows in general. It also covers composite bows, although someone who has never seen one before will need a successful IQ test to figure out how to use it correctly."
    },
    {
        id: skillBrawlingId,
        table_id: mainGameTableId,
        name: 'Brawling',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the unscientific 'skill' of fist-fighting in close combat. Make a Brawling test whenever you attack an opponent with your hands or feet to see if you can hit them. Add 1/10 of your Brawling skill level (rounded down) to damage dealt. It is possible to parry twice per turn (one for each hand) when defending with bare hands, and your Parry parameter will be 2/3 of your Brawling skill level. With this skill, you can only parry attacks from hands, feet, and weapons used in close combat."
    },
    {
        id: skillBroadswordId,
        table_id: mainGameTableId,
        name: 'Broadsword',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in fighting with swords, including techniques for attack and defense."
    },
    {
        id: skillBucklerId,
        table_id: mainGameTableId,
        name: 'Buckler',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using a buckler, a small shield used for active defense."
    },
    {
        id: skillCrossbowId,
        table_id: mainGameTableId,
        name: 'Crossbow',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using crossbows, including bullet or stone crossbows. If you have this skill, you will know how siege-engine-type machines similar to crossbows work, but you will have no special ability in their use."
    },
    {
        id: skillFastDrawId,
        table_id: mainGameTableId,
        name: 'Fast-Draw',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "There is a separate skill for each type of weapon. It is available for the following weapons: Knife, Club, Sword (one-handed), Two-Handed Sword, Arrow (including crossbow bolts), Pistol, Rifle (including hand machine guns, etc.), magazines, speed loaders. The GM may add a new skill of this type for any weapon that can be drawn quickly, but is significantly different from all weapons above. This skill is used when you want to ready a weapon that is in its holster, sheath, etc. A success means you readied the weapon instantly (this does not count as a maneuver) and can attack with it (or load the bow) in the same turn. A failure means you readied the weapon normally, but can do nothing else this turn. A critical failure means you dropped the weapon."
    },
    {
        id: skillFencingId,
        table_id: mainGameTableId,
        name: 'Fencing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to use fencer's weapons (rapier, smallsword, and sabre). The rapier is a long (range 2 hexes) and light thrusting weapon. The smallsword is a light, thrusting weapon, shorter (range 1 hex) somewhat similar to a modern foil with a point. The sabre is a light cutting and thrusting weapon. If you have one of these weapons, a small shield, and an Encumbrance no greater than Light, your Parry will be 2/3 of your Fencing skill level. Additionally, you can parry twice per turn."
    },
    {
        id: skillFlailId,
        table_id: mainGameTableId,
        name: 'Flail',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using unbalanced weapons with the head attached to the handle by a chain or cord, such as the flail, morningstar, or nunchaku. The flail is hard to use, but also hard to defend against. Any attempt to block one of these weapons is subject to a -2 penalty. Any attempt to parry has a -4 penalty. Knives and Fencing weapons cannot parry a Flail."
    },
    {
        id: skillGunsId,
        table_id: mainGameTableId,
        name: 'Guns',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using any type of 20th-century cartridge weapon. Add 1 to your skill level if you have IQ 10 or 11, and 2 for IQ 12+. Modifiers: See Familiarity, p. 43. -2 for a weapon of a known type you are not familiar with; -4 or more for a weapon in poor condition; -4 or more for an unknown weapon type."
    },
    {
        id: skillJudoId,
        table_id: mainGameTableId,
        name: 'Judo',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This skill represents a general ability in falls and holds, not a specific school of unarmed combat. It is not possible to use Judo if holding anything in your hands or if your Encumbrance is greater than Light. Using Judo, you can parry with either hand as if it were a weapon, using 2/3 of your Judo skill level as your Parry."
    },
    {
        id: skillKarateId,
        table_id: mainGameTableId,
        name: 'Karate',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This skill does not represent any specific school of unarmed combat, but a general ability with punches and kicks. There is no penalty for using the left hand. Any hand used must be empty, and your Encumbrance must be Light or less. You can parry with either hand as if it were a weapon, using 2/3 of your Karate skill level as your Parry."
    },
    {
        id: skillKnifeId,
        table_id: mainGameTableId,
        name: 'Knife',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "The skill in using, but not throwing, any type of knife, dagger, or stiletto."
    },
    {
        id: skillKnifeThrowingId,
        table_id: mainGameTableId,
        name: 'Knife Throwing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "The ability to throw any kind of knife."
    },
    {
        id: skillLanceId,
        table_id: mainGameTableId,
        name: 'Lance',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in using the jousting lance, a weapon similar to a normal spear, with a length of 3.5m or more, used on horseback. It is not common to parry in combat with lances; you must Block or Dodge enemy attacks."
    },
    {
        id: skillLassoId,
        table_id: mainGameTableId,
        name: 'Lasso',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in throwing the lasso. It is mainly used to lasso animals. You can try to lasso a specific body part, or choose one randomly from the Hit Location Table. Make a Quick Contest of ST if the lasso has caught an arm or torso. If the lassoer wins, the victim is immobilized; if they lose, they lost the rope."
    },
    {
        id: skillNetId,
        table_id: mainGameTableId,
        name: 'Net',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using the net as a weapon in a fight. It is possible to dodge a net, but not block or parry. In the case of a successful throw, the victim is entangled and unable to move or attack until the net is removed. To remove a net you need three successes, not necessarily consecutive, on DX tests."
    },
    {
        id: skillPolearmId,
        table_id: mainGameTableId,
        name: 'Polearm',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "Skill in using very long and unbalanced pole weapons, including the bardiche, halberd, bill, and hundreds of variations of the type."
    },
    {
        id: skillShieldId,
        table_id: mainGameTableId,
        name: 'Shield',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using a medieval-type shield or those used by shock troops. This skill is needed to attack with the Shield. However, the passive defense offered by the shield (1 to 4 points) protects whoever carries it, even if they do not know how to use it. The active defense of a shield (Block) is 1/2 of your Shield skill level."
    },
    {
        id: skillShortswordId,
        table_id: mainGameTableId,
        name: 'Shortsword',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in using any type of balanced weapon 30 to 60cm in length, including the cutlass, gladius, and short staff."
    },
    {
        id: skillSlingId,
        table_id: mainGameTableId,
        name: 'Sling',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using the sling or stave-sling."
    },
    {
        id: skillSpearId,
        table_id: mainGameTableId,
        name: 'Spear',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in using (but not throwing) any type of spear, dart, trident, bayonet, pike, or long, light, pointed weapon."
    },
    {
        id: skillSpearThrowerId,
        table_id: mainGameTableId,
        name: 'Spear Thrower',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This device, and the skill in its use, is different from the Spear Throwing skill, but the default level of one is equal to the other -4. A Spear Thrower is a long, flat rod with a notch and a strap at one end. It increases the force with which a dart or similar weapon is thrown, increasing the effective ST of the user (for range and damage) by 5 points."
    },
    {
        id: skillSpearThrowingId,
        table_id: mainGameTableId,
        name: 'Spear Throwing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "Skill in throwing any type of spear, dart, etc."
    },
    {
        id: skillFastReloadId,
        table_id: mainGameTableId,
        name: 'Fast Reload',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to quickly load a firearm. It is not the same as Fast-Draw, but you could, using the right skills, reload very quickly by drawing a speed loader or magazine from your belt or pocket and placing it in the weapon."
    },
    {
        id: skillStaffId,
        table_id: mainGameTableId,
        name: 'Staff',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in using the Staff or any pole or improvised rod as a Staff. This is a type of weapon wielded with both hands. Your Parry will be 2/3 of your skill level."
    },
    {
        id: skillTwoHandedAxeMaceId,
        table_id: mainGameTableId,
        name: 'Two-Handed Axe/Mace',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "Skill in using any long, heavy and unbalanced weapon such as the battleaxe or sledgehammer."
    },
    {
        id: skillTwoHandedSwordId,
        table_id: mainGameTableId,
        name: 'Two-Handed Sword',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in handling a long-bladed weapon (1m to 1.5m) with both hands. Note that the scimitar is used with this skill when wielded with two hands, but with the Broadsword skill when wielded with one hand."
    },
    {
        id: skillWhipId,
        table_id: mainGameTableId,
        name: 'Whip',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to use a whip as a weapon. Whips come in various lengths. In game terms, a 1m long whip has a reach of 1m. The time needed to re-ready a whip depends on its length: 0 turns for a 1m whip; 1 turn for a 2m whip; 2 turns for a 3m or longer whip."
    },
    {
        id: skillArmouryId,
        table_id: mainGameTableId,
        name: 'Armoury',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in building and repairing weapons and armor at the appropriate technology level. A successful test is needed to discover what is wrong with a weapon (unless it is obvious). A second success allows the character to repair it. The GM should determine a reasonable period for each repair attempt. Modifiers: -4 if the weapon is unfamiliar; -4 if you don't have the appropriate tools (-5 at TL 9+)."
    },
    {
        id: skillSmithId,
        table_id: mainGameTableId,
        name: 'Smith',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill of working manually with iron and other non-precious metals. For this work a forge is needed, but with the proper materials, a smith can build one in about 30 days. Modifier: -1 for each point of ST below 13."
    },
    {
        id: skillCarpentryId,
        table_id: mainGameTableId,
        name: 'Carpentry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in manufacturing wooden objects. A successful test roll allows one hour of competent carpentry work. A failure means the work result was poor. Modifiers: +5 if you are being supervised or assisted by someone with skill level 15+; -5 if you don't have good tools."
    },
    {
        id: skillCookingId,
        table_id: mainGameTableId,
        name: 'Cooking',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in preparing a pleasant meal from raw ingredients. In any 'outdoor' society, this skill will include the ability to clean game, i.e., prepare a freshly killed animal for cooking."
    },
    {
        id: skillJewelerId,
        table_id: mainGameTableId,
        name: 'Jeweler',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in working with precious metals of all types, manufacturing jewelry, decorating weapons, and so on. A forge is needed (see Smith, above) to work the metal. A jeweler can identify any precious metal, or determine the value of any precious trinket, if they succeed on a skill test."
    },
    {
        id: skillLeatherworkingId,
        table_id: mainGameTableId,
        name: 'Leatherworking',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in working with leather to make belts, saddles, armor, etc. Someone with this skill can make new objects or repair used ones. With a successful skill test, they can determine the value of a leather object."
    },
    {
        id: skillMechanicId,
        table_id: mainGameTableId,
        name: 'Mechanic',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in diagnosing and solving common mechanical problems, usually, but not always, in a vehicle's engine."
    },
    {
        id: skillPotteryId,
        table_id: mainGameTableId,
        name: 'Pottery',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in working with various types of ceramics. A potter can make pots and other clay utensils. With a successful skill test, they can identify appropriate clay (for bricks or domestic utensils); determine the origin or value of a ceramic object; etc."
    },
    {
        id: skillWoodworkingId,
        table_id: mainGameTableId,
        name: 'Woodworking',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in performing 'fine' woodwork; furniture construction, decorative carvings, etc. With a successful skill test, a woodworker can determine the origin and fair value of a wood carving, or identify the type of wood used."
    },
    {
        id: skillMimePantomimeId,
        table_id: mainGameTableId,
        name: 'Mime/Pantomime',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to communicate through simple improvised hand signals. Deaf and/or mute individuals have a +3 bonus when using this skill. A successful Mime/Pantomime test allows you to communicate a simple idea to another person, or understand one communicated by another."
    },
    {
        id: skillSignLanguageId,
        table_id: mainGameTableId,
        name: 'Sign Language',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is any of the true gesture languages. One of the best known is American Sign Language (Ameslan). Other examples could be the language of a speechless alien race, a sign code used by spies or revolutionaries, etc. A sign language is complex, stylized, and can communicate practically any concept."
    },
    {
        id: skillTelegraphyId,
        table_id: mainGameTableId,
        name: 'Telegraphy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to send and receive Morse code, perform small repairs on telegraph systems, and recognize other telegraph operators by their 'fist,' i.e., their characteristic way of sending a message. This skill is normally found between technology levels 5 and 7."
    },
    {
        id: skillSurgeryId,
        table_id: mainGameTableId,
        name: 'Surgery',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This skill is used when someone attempts to operate on a character to cure diseases, injuries, or organic dysfunctions. A surgeon may optionally specialize in a particular part of the body."
    },
    {
        id: skillClimbingId,
        table_id: mainGameTableId,
        name: 'Climbing',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to climb mountains, stone walls, trees, building walls, and anything else that appears in your path. Modifiers: +3 if you have the Double-Jointed advantage; minus your Encumbrance level."
    },
    {
        id: skillFishingId,
        table_id: mainGameTableId,
        name: 'Fishing',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to catch a fish (with a net, hook and line, or any other method used by your culture). If you have the appropriate equipment and there are fish to be caught, a successful skill test will bring them to you. When no fishing materials are available, you can improvise."
    },
    {
        id: skillNaturalistId,
        table_id: mainGameTableId,
        name: 'Naturalist',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This skill comprises knowledge of animals, plants, and nature in its various forms. It is the kind of knowledge one would expect from a good 20th-century biology teacher. A successful skill test allows identification of a plant and its application, or tells you something about an animal and its habits."
    },
    {
        id: skillNavigationId,
        table_id: mainGameTableId,
        name: 'Navigation',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to know your position (on Earth, not in space) by the stars, ocean currents, etc. A successful skill test will tell you where you are, at sea or on land. Note that if you don't have the skill and are attempting a test at default level, you cannot use your Seamanship skill if you are not actually at sea!"
    },
    {
        id: skillSeamanshipId,
        table_id: mainGameTableId,
        name: 'Seamanship',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to crew a long-range vessel. You will need to crew a ship (or captain it!). Modifiers: standard penalties related to TL."
    },
    {
        id: skillSurvivalId,
        table_id: mainGameTableId,
        name: 'Survival',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill of 'living off the land,' finding water and good food, avoiding dangers, building shelters, etc. Each type of terrain requires a different skill."
    },
    {
        id: skillTrackingId,
        table_id: mainGameTableId,
        name: 'Tracking',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to follow a trail left by a man or animal. Make a Tracking test to find a clue and another every 5 minutes of travel. Modifiers: -5 if the trail is more than a day old; -10 if more than a week; +5 if following a man; +10 if following a group of men."
    },
    {
        id: skillAccountingId,
        table_id: mainGameTableId,
        name: 'Accounting',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to keep a company's books up to date, examine the conditions of a business, etc., being mainly useful as a means of getting a job. However, a successful Accounting test (requiring about 2 hours of study) can tell you if a company's records are correct."
    },
    {
        id: skillComputerOperationId,
        table_id: mainGameTableId,
        name: 'Computer Operation',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to operate a computer, extract data, run existing programs, play video games, etc. This is not the same as programming (which is a separate and more difficult skill). Modifiers: -3 or more in case of a strange computer or program. This skill is only available at TL 7+."
    },
    {
        id: skillElectronicsOperationId,
        table_id: mainGameTableId,
        name: 'Electronics Operation',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This skill allows the use of electronic equipment within a known specialty. There is no need for skill tests for normal daily use of equipment. They are needed only in emergency situations, cases of 'abnormal' use of the equipment, or use of complex equipment by inexperienced people."
    },
    {
        id: skillHeraldryId,
        table_id: mainGameTableId,
        name: 'Heraldry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in designing and recognizing coats of arms, clan colors and devices, and other emblems. If successful on a skill test, a herald can recognize a knight or noble by the standard or shield being carried and describe them appropriately in heraldic terms."
    },
    {
        id: skillLawId,
        table_id: mainGameTableId,
        name: 'Law',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "Modifiers: +4 if the character is dealing with the Law of a specific area. A successful skill test allows them to remember, deduce, or devise an answer to a question about the law. Remember, however, that few legal questions have a precise answer."
    },
    {
        id: skillAgronomyId,
        table_id: mainGameTableId,
        name: 'Agronomy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the science of plant cultivation. An agronomist could answer questions or solve problems related to agriculture and livestock. An experienced farmer is an agronomist, whether they know the word or not."
    },
    {
        id: skillAlchemyId,
        table_id: mainGameTableId,
        name: 'Alchemy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the science of magical transmutations."
    },
    {
        id: skillAnthropologyId,
        table_id: mainGameTableId,
        name: 'Anthropology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of human culture and evolution. An anthropologist knows the customs of primitive (and not-so-primitive) groups of human beings (or other intelligent creatures they study). Anthropology tests could be used to explain, or even predict, the strange rituals and customs a traveler might encounter."
    },
    {
        id: skillArchaeologyId,
        table_id: mainGameTableId,
        name: 'Archaeology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of ancient civilizations. An archaeologist feels at home with excavations, pottery shards, inscriptions, etc. In case of a successful skill test, an archaeologist can answer questions about ancient history, identify artifacts and dead languages, etc."
    },
    {
        id: skillArchitectureId,
        table_id: mainGameTableId,
        name: 'Architecture',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in designing buildings and inferring the form of buildings from their function and vice versa. A successful Architecture test would allow you to draw conclusions about an unknown building, find a secret room or passage, etc."
    },
    {
        id: skillAstronavigationId,
        table_id: mainGameTableId,
        name: 'Astronavigation',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This skill relates to space and interstellar navigation. There is a different skill for each type of faster-than-light propulsion. Each of these skills can have its default level set by another with a penalty of up to -4, depending on how different the propulsion systems are."
    },
    {
        id: skillAstronomyId,
        table_id: mainGameTableId,
        name: 'Astronomy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of stars and other celestial bodies. An astronomer could solve problems related to the Sun, the planets of the solar system, meteorites, and so on. At TL 4 and below, this skill merges with Astrology."
    },
    {
        id: skillBiochemistryId,
        table_id: mainGameTableId,
        name: 'Biochemistry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the study of the chemistry of living beings. A biochemist is a specialist in the chemical reactions that sustain life."
    },
    {
        id: skillBotanyId,
        table_id: mainGameTableId,
        name: 'Botany',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of plants. A botanist can identify plants, make assumptions about the habitat and properties of an unknown plant, etc."
    },
    {
        id: skillChemistryId,
        table_id: mainGameTableId,
        name: 'Chemistry',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of matter. A chemist can identify elements, simple compounds. With the appropriate equipment, they can perform complex analyses and syntheses."
    },
    {
        id: skillComputerProgrammingId,
        table_id: mainGameTableId,
        name: 'Computer Programming',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the skill of writing computer programs."
    },
    {
        id: skillCriminologyId,
        table_id: mainGameTableId,
        name: 'Criminology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the study of crime and criminal behavior."
    },
    {
        id: skillEconomicsId,
        table_id: mainGameTableId,
        name: 'Economics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of money, exchange, and banking transactions. An economist could answer questions about investments, economic programs, etc. They could also predict the local effects of economic changes."
    },
    {
        id: skillEcologyId,
        table_id: mainGameTableId,
        name: 'Ecology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of relationships between living beings, or the entire environment. This science does not exist at TL below 6. Use Naturalist instead. An ecologist could tell which creatures are vital to an environment and which are not."
    },
    {
        id: skillElectronicsId,
        table_id: mainGameTableId,
        name: 'Electronics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is electronic engineering, the ability to design and build electronic devices. A successful test could determine the purpose of an unknown device, diagnose a fault, perform a repair, design new systems, or improvise a device to solve a problem."
    },
    {
        id: skillEngineeringMechanicalId,
        table_id: mainGameTableId,
        name: 'Engineering (Mechanical)',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the skill in designing and building complex mechanisms. A successful test allows determining the purpose of an unknown mechanism, diagnosing an electrical or mechanical problem, making a repair, designing a new mechanism, or improvising a device to solve a problem."
    },
    {
        id: skillForensicsId,
        table_id: mainGameTableId,
        name: 'Forensics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the general science of 'laboratory' criminology: calculating bullet trajectories, chemical or microscopic analysis of clues, etc. Depending on the situation, the GM may allow the use of Chemistry or another appropriate field of study as a default for Forensics."
    },
    {
        id: skillGeneticsId,
        table_id: mainGameTableId,
        name: 'Genetics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the study of heredity. A geneticist can identify genetic diseases, knows how to cross animals to develop certain characteristics, etc. The specialty Genetic Engineering comes into existence at TL 9+."
    },
    {
        id: skillGeologyId,
        table_id: mainGameTableId,
        name: 'Geology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the science that studies the Earth. A geologist studies ores, rocks, oil, knows about earthquakes, volcanoes, and fossils. In a campaign, they could find water using their 'field sensitivity' as in the Survival skill."
    },
    {
        id: skillHistoryId,
        table_id: mainGameTableId,
        name: 'History',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of the recorded past (as opposed to archaeology which studies pre-historic past). A historian can answer questions about history and might be allowed (at the GM's discretion) to test if they remember a useful historical parallel."
    },
    {
        id: skillLinguisticsId,
        table_id: mainGameTableId,
        name: 'Linguistics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the study of the principles on which languages are based. A linguist can identify an unknown language from a fragment of written or spoken text, if successful on a skill test."
    },
    {
        id: skillLiteratureId,
        table_id: mainGameTableId,
        name: 'Literature',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of great literary works. A student of literature would have knowledge of ancient poetry, dusty volumes, philosophy, criticism, etc. This can be useful for finding clues to hidden treasures, submerged continents, secrets man was not meant to know, and similar things."
    },
    {
        id: skillMathematicsId,
        table_id: mainGameTableId,
        name: 'Mathematics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This represents general knowledge of mathematics. Although there are dozens of specialties, it is unlikely that the difference between them will affect the game. A mathematician can make skill tests to answer any type of math-related problem."
    },
    {
        id: skillMetallurgyId,
        table_id: mainGameTableId,
        name: 'Metallurgy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of metals and their properties. A metallurgist can identify metals or alloys and solve problems related to metals, their mining, and refining."
    },
    {
        id: skillMeteorologyId,
        table_id: mainGameTableId,
        name: 'Meteorology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the study of weather and the ability to predict it. The GM always makes Meteorology skill tests for the player. A good result means they will tell the truth, while a failure means a random answer or a lie."
    },
    {
        id: skillNuclearPhysicsId,
        table_id: mainGameTableId,
        name: 'Nuclear Physics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the study of nuclear processes. A nuclear physicist could answer questions about the interior of the sun, nuclear weapons, and/or nuclear power plants."
    },
    {
        id: skillOccultismId,
        table_id: mainGameTableId,
        name: 'Occultism',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the study of the inexplicable and/or supernatural. An occultist has intense knowledge of mysticism, primitive magical doctrines, ancient rituals, obsessions, etc. Remember that an occultist does not necessarily have to believe in the material they study."
    },
    {
        id: skillPhysicsId,
        table_id: mainGameTableId,
        name: 'Physics',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of matter, energy, and the fundamental forces of nature."
    },
    {
        id: skillPhysiologyId,
        table_id: mainGameTableId,
        name: 'Physiology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Very Hard',
        description: "This is the study of the human body and its functions. A physiologist knows where muscles, bones, and organs are located and how they function."
    },
    {
        id: skillProspectingId,
        table_id: mainGameTableId,
        name: 'Prospecting',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is applied geology: the ability to discover valuable minerals through local inspection. Long-distance prospecting, using maps and instruments, requires the Geology skill. A prospector is subject to a -1 penalty in a new area of a familiar type."
    },
    {
        id: skillPsychologyId,
        table_id: mainGameTableId,
        name: 'Psychology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of behavior. A psychologist deals with the human mind (and possibly other types too). A successful Psychology test can predict, in general terms, the behavior of an individual or small group in a defined situation."
    },
    {
        id: skillResearchId,
        table_id: mainGameTableId,
        name: 'Research',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This skill can also have its default level set by any scientific skill (subject to a -2 penalty), if you are researching material related to it. Research is the general ability to conduct an investigation in a library or archive. A successful Research test in an appropriate place will allow you to discover some useful piece of information."
    },
    {
        id: skillTheologyId,
        table_id: mainGameTableId,
        name: 'Theology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of religion. A theologian has knowledge of ancient and modern religious creeds, history of religions, etc. You should consider having this skill, specialized in your own religion, if your character is a priest or saint."
    },
    {
        id: skillZoologyId,
        table_id: mainGameTableId,
        name: 'Zoology',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the study of animals. A zoologist can identify animals, have a good idea about their natural diet, habits and habitat, and predict their behavior."
    },
    {
        id: skillActingId,
        table_id: mainGameTableId,
        name: 'Acting',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to simulate moods, emotions, and voices, and to lie convincingly for a period of time. It is not the same as Disguise or Performance. A successful skill test allows you to pretend to think or feel something you do not feel. Modifiers: +1 for each point of IQ you have over the person you are trying to deceive."
    },
    {
        id: skillAdministrationId,
        table_id: mainGameTableId,
        name: 'Administration',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to direct a large organization. It is mainly useful for making money or qualifying for high positions. A trained administrator (level 15+) receives a +2 bonus when dealing with a bureaucrat and, on a successful skill test, can predict the best way to deal with a bureaucracy."
    },
    {
        id: skillAreaKnowledgeId,
        table_id: mainGameTableId,
        name: 'Area Knowledge',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is familiarity with the people, politics, and geography of a given area. Normally a character will have Area Knowledge only of the area they consider their 'base,' whether a simple farm or an entire solar system."
    },
    {
        id: skillCarousingId,
        table_id: mainGameTableId,
        name: 'Carousing',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This skill is 'bought' based on your HT attribute, not DX. It is the ability to participate in social activities, parties, etc. A successful Carousing test, made under the right circumstances, gives you a +2 bonus on a request for help or information."
    },
    {
        id: skillDiplomacyId,
        table_id: mainGameTableId,
        name: 'Diplomacy',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to negotiate, make deals, and get along with others. A Diplomacy test can replace any reaction test in a situation where combat is not imminent. A successful test allows you to predict the possible outcomes of a course of action while negotiating."
    },
    {
        id: skillFastTalkId,
        table_id: mainGameTableId,
        name: 'Fast-Talk',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to persuade others to do things against their better judgment. It is not taught (at least intentionally) in schools; it is learned while working as a salesman, con artist, lawyer, etc."
    },
    {
        id: skillGamblingId,
        table_id: mainGameTableId,
        name: 'Gambling',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill with games of chance. A successful Gambling test can tell you, among other things, whether the game is fair or not, identify a gambler among a group of strangers, or evaluate the odds in a complicated situation."
    },
    {
        id: skillLeadershipId,
        table_id: mainGameTableId,
        name: 'Leadership',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in coordinating a group of people in a tense or dangerous situation. Some level of leadership is needed to get a post in a military or paramilitary organization."
    },
    {
        id: skillMerchantId,
        table_id: mainGameTableId,
        name: 'Merchant',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in trading, buying and selling goods. It involves a talent for sales, understanding of business practices, and psychology. On a successful skill test, a Merchant can evaluate goods, discover where a given article is bought or sold, etc."
    },
    {
        id: skillSexAppealId,
        table_id: mainGameTableId,
        name: 'Sex Appeal',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "Based on HT, not IQ. This is the ability to impress the opposite sex. It can only be studied in spare time (maximum 3 hours per day), unless you are part of a harem or similar. Sex Appeal has as much to do with your attitude as with your appearance."
    },
    {
        id: skillTeachingId,
        table_id: mainGameTableId,
        name: 'Teaching',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to teach other people. To teach someone, you need to know the skill being studied at a higher level than your student. For game purposes, anyone with a level 12+ should be able to act as a teacher in most situations."
    },
    {
        id: skillCamouflageId,
        table_id: mainGameTableId,
        name: 'Camouflage',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the skill in using natural elements and/or paint to disguise yourself and hide your position, equipment, etc. To determine if the camouflage was done well, a Quick Contest of Skills (Vision vs. Camouflage) should be made."
    },
    {
        id: skillDemolitionId,
        table_id: mainGameTableId,
        name: 'Demolition',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to blow things up. Every time you use explosives, a Demolition test is required. It takes 15 to 60 minutes to properly install explosives and detonate them. A successful skill test means everything went well. A failure means you made a mistake."
    },
    {
        id: skillDetectLiesId,
        table_id: mainGameTableId,
        name: 'Detect Lies',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to tell if someone is lying or not. It is not the same as Interrogation; Detect Lies works in informal and social situations. When you ask to use this skill, the GM will make a Quick Contest between your Detect Lies and the target's IQ."
    },
    {
        id: skillDisguiseId,
        table_id: mainGameTableId,
        name: 'Disguise',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to make yourself look like another person, through the use of clothing, makeup, etc. It takes 30 to 60 minutes to prepare a good disguise. Make a Quick Contest of Skills (usually Disguise vs. IQ) for each person or group your disguise needs to fool."
    },
    {
        id: skillEscapeId,
        table_id: mainGameTableId,
        name: 'Escape',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to free yourself from ropes, handcuffs, and similar restraints. The first attempt to escape takes 1 minute; each subsequent attempt takes 10 minutes. Modifiers: The more carefully you are tied up, the greater the penalty the GM will apply."
    },
    {
        id: skillForgeryId,
        table_id: mainGameTableId,
        name: 'Forgery',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to forge a bill, passport, or other similar document. It is not taught except by espionage organizations and the underworld, although you can always study it on your own. A skill test is required every time a forged document you are using is inspected."
    },
    {
        id: skillHoldoutId,
        table_id: mainGameTableId,
        name: 'Holdout',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to hide objects on your body or on other people (normally with their cooperation). It is also the ability to find such objects hidden by others."
    },
    {
        id: skillIntelligenceAnalysisId,
        table_id: mainGameTableId,
        name: 'Intelligence Analysis',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "The ability to analyze and interpret secret information (normally military) in order to assess enemy plans and resources."
    },
    {
        id: skillInterrogationId,
        table_id: mainGameTableId,
        name: 'Interrogation',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to interrogate a prisoner. It is only taught in secret services, police forces, prisons, military units, and the underworld."
    },
    {
        id: skillLipReadingId,
        table_id: mainGameTableId,
        name: 'Lip Reading',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to see what others are saying. To do so, you must be at a distance of less than 6 meters, or use magic or binoculars for visual approximation. Each successful test allows you to catch one phrase of the conversation."
    },
    {
        id: skillLockpickingId,
        table_id: mainGameTableId,
        name: 'Lockpicking',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to open locks, padlocks, and safes without having the key or combination. Each attempt takes 1 minute. If you succeed in opening the lock, each point of your margin of success reduces the time spent by 5 seconds."
    },
    {
        id: skillPickpocketId,
        table_id: mainGameTableId,
        name: 'Pickpocket',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to take a wallet, knife, etc. from someone, or 'plant' something on them. Modifiers: +5 if the victim is distracted; +10 if they are asleep or drunk; up to -5 for items in an inner pocket."
    },
    {
        id: skillPoisonId,
        table_id: mainGameTableId,
        name: 'Poison',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the general practical knowledge of poisons. A successful test allows you to recognize a poisonous plant in the field, distill poison into a useful form, recognize poison by taste in food or drink, identify poison by observing its effects, or know the proper antidote."
    },
    {
        id: skillScroungingId,
        table_id: mainGameTableId,
        name: 'Scrounging',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to find, recover, or improvise useful objects that others cannot locate. Each attempt takes one hour. The scrounger does not necessarily steal their loot — they just locate it and then obtain it by whatever means necessary."
    },
    {
        id: skillShadowingId,
        table_id: mainGameTableId,
        name: 'Shadowing',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to follow another person in a crowd without being noticed. (Use Tracking and Stealth when in the countryside.) Make a Contest between your Shadowing and the victim's Vision every 10 minutes."
    },
    {
        id: skillSleightOfHandId,
        table_id: mainGameTableId,
        name: 'Sleight of Hand',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to 'palm' small objects, do tricks with coins and cards, etc. Each success on a skill test allows you to perform a small 'magic trick'. A failure means you messed up the trick."
    },
    {
        id: skillStreetwiseId,
        table_id: mainGameTableId,
        name: 'Streetwise',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to get along well with 'bad company'. A successful skill test can allow you to find out where any type of illegal activity is happening; which local police or bureaucrats can be bought and for how much; how to contact the local underworld, etc."
    },
    {
        id: skillTrapsId,
        table_id: mainGameTableId,
        name: 'Traps',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in building traps and detection devices and how to neutralize them. A successful Traps test enables detection of a trap, if you are looking for it; disarming a trap after detection; rearming it after passing; or (with appropriate material) building a new one."
    },
    {
        id: skillUnderwaterDemolitionId,
        table_id: mainGameTableId,
        name: 'Underwater Demolition',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Medium',
        description: "Skill in preparing and detonating an explosive charge underwater. Otherwise, same as Demolition (above). If a demolition engineer is using the default level of this skill, the test only serves to evaluate the preparation of the charge."
    },
    {
        id: skillVentriloquismId,
        table_id: mainGameTableId,
        name: 'Ventriloquism',
        predefinition_type: 'Mental',
        predefinition_difficulty: 'Hard',
        description: "This is the ability to disguise and 'throw' your voice a short distance. A successful skill test allows you to throw your voice well enough to fool your audience. Modifiers: +5 if you have a puppet or accomplice to distract the audience's attention."
    },
    {
        id: skillCyclingId,
        table_id: mainGameTableId,
        name: 'Cycling',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to ride a bicycle without falling. You can also make a test roll with a -5 penalty to try to repair a broken bicycle, assuming tools and spare parts are available."
    },
    {
        id: skillBoatingId,
        table_id: mainGameTableId,
        name: 'Boating',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the skill in handling canoes, rowboats, small sailboats, etc. By definition, a test roll is needed when getting into the boat (to avoid falling in the water) and another to get the boat moving. The GM may require new tests whenever danger arises."
    },
    {
        id: skillDrivingId,
        table_id: mainGameTableId,
        name: 'Driving',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to drive a specific type of vehicle (a specialization is needed). Modifiers: -2 for a vehicle of a known type you are not familiar with; -2 or more for a vehicle in poor condition; -2 or more for poor driving conditions."
    },
    {
        id: skillMotorcycleId,
        table_id: mainGameTableId,
        name: 'Motorcycle',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Easy',
        description: "This is the ability to ride a motorcycle. A specialization is needed in light scooters/motorcycles or medium/heavy motorcycles. Modifiers: -2 for an unfamiliar motorcycle of a known type; -4 or more for a motorcycle in poor condition."
    },
    {
        id: skillPilotingId,
        table_id: mainGameTableId,
        name: 'Piloting',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to pilot a specific type of aircraft or spacecraft. A specialization is needed. The default level uses IQ, as intelligence is needed to understand the controls in an emergency. But when the skill is normally learned, it is based on DX like other physical skills."
    },
    {
        id: skillPowerboatId,
        table_id: mainGameTableId,
        name: 'Powerboat',
        predefinition_type: 'Physical',
        predefinition_difficulty: 'Medium',
        description: "This is the ability to drive all types of small motorized vessels. When using the default level of this skill, a DX or Boating test is needed when getting into the boat (to avoid falling in the water). All dangerous situations require another roll."
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
  description: string
}

export const advantages: SeedModifierGameTableAdvantages[] = [
  {
    id: advantageCombatReflexesId,
    table_id: mainGameTableId,
    name: 'Combat Reflexes',
    costPoints: 15,
    description: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: advantageVeryFitId,
    table_id: mainGameTableId,
    name: 'Very Fit',
    costPoints: 10,
    description: '+2 fatigue, better recovery.'
  },
  {
    id: advantageMageryId,
    table_id: mainGameTableId,
    name: 'Magery 1',
    costPoints: 25,
    description: 'Basic access to spellcasting and rituals.'
  },
  // Additional GURPS advantages from var-advantages.ts
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Absolute Direction',
    costPoints: 5,
    description: 'The character always knows which way is North and is always able to retrace a route taken during the last 30 days. +3 bonus to Navigation skill. Works underground, underwater and on other planets.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Accurate Time Sense',
    costPoints: 5,
    description: 'You always know the exact time, can measure any time lapse with precision, wake up at a pre-determined hour and are not affected by time zone changes (but are by time travel).'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Acute Hearing',
    costPoints: 2,
    description: 'Bonus to Hearing tests. Costs 2 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Acute Taste and Smell',
    costPoints: 2,
    description: 'Bonus to all Taste or Smell tests. Costs 2 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Acute Vision',
    costPoints: 2,
    description: 'Bonus to all Vision tests when searching for something. Costs 2 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Alertness',
    costPoints: 5,
    description: 'General bonus to any Sense or Perception (IQ) tests. Can be combined with acute senses advantages. Cost: 5 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Ambidexterity',
    costPoints: 10,
    description: 'The character is capable of using both hands with the same skill. He is not subject to the -4 penalty on his Dexterity attribute for using the off-hand and can fight with either hand interchangeably, or with both at once. If an accident occurs with one of his arms, assume it was with the left one.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Animal Empathy',
    costPoints: 5,
    description: 'The character understands and likes animals, and they like the character. He receives a +2 bonus on any reaction test with a wild animal, and +4 on tests involving animal-related skills. However, you can never kill an animal without a very good reason, and must try to prevent others from doing so.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Charisma',
    costPoints: 5,
    description: 'This is the natural ability to impress and lead other people. Anyone can achieve illusory charisma through good appearance, good manners and intelligence, but real charisma works independently of these factors. It affects any reaction test made by an intelligent creature. Cost: 5 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Clerisy',
    costPoints: 5,
    description: 'The character was ordained as a minister of some religion. A cleric has some powers and privileges that a layperson does not. Cost: 5 points for social only, 10+ points if able to invoke divine help.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Common Sense',
    costPoints: 10,
    description: 'Every time the character starts to do something that the GM thinks is stupid, he makes a test against his IQ attribute. Success means he should warn the character. This Advantage allows an impulsive player to play the role of a thoughtful character.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Danger Sense',
    costPoints: 15,
    description: 'You can\'t count on it always, but now and then you have that weird feeling on the back of your neck that says something is wrong. The GM will secretly make a test against your IQ attribute whenever the situation involves an ambush, an imminent disaster or some other danger. Success means you should receive a warning.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Double-Jointed',
    costPoints: 5,
    description: 'The character\'s body is extraordinarily flexible. He receives a bonus equal to +3 on any Escape attempt or attempts to get free of ropes, shackles or other similar movement restriction means, and also on Mechanic tests.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Eidetic Memory',
    costPoints: 30,
    description: 'The character is capable of remembering everything he has seen or heard. First level (30 points): All points in mental skills count double. Second level (60 points): All points in mental skills count quadruple.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Empathy',
    costPoints: 15,
    description: 'The character has a \'sensitivity\' for other people. When he meets someone for the first time, the GM will say what the character \'feels\' about that person. Excellent for identifying impostors and determining loyalty.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'High Pain Threshold',
    costPoints: 10,
    description: 'The character doesn\'t feel pain with the same intensity. He won\'t be stunned, and his DX won\'t be subject to the normal penalty applied in the following turn if wounded in combat.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Immunity',
    costPoints: 10,
    description: 'Your body naturally resists microorganisms that cause disease. You never catch a \'natural\' disease or infection. You cannot acquire this advantage unless your initial HT is 12 or greater.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Intuition',
    costPoints: 15,
    description: 'The character is usually right in his conjectures. The GM adds his IQ to the number of \'correct\' choices and subtracts the number of \'incorrect\' choices and makes a roll. Success means he will direct the character to a favorable option.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Language Talent',
    costPoints: 2,
    description: 'You learn languages quickly. Add the Language Talent level to your IQ attribute every time you are learning a language. Cost: 2 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Legal Enforcement Powers',
    costPoints: 5,
    description: 'You are a law enforcement officer, with all the rights, powers and restrictions that accompany the position. Cost: 5 points for local jurisdiction, 10 points for national/international, 15 points for special privileges.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Lightning Calculator',
    costPoints: 5,
    description: 'The character is capable of performing mathematical operations instantly in his head. The player may use a calculator at any moment, to calculate whatever he desires.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Literacy',
    costPoints: 10,
    description: 'Being literate in a world where most people are not is an advantage worth 10 points. Being illiterate in a world where most people can read is a disadvantage worth -10 points.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Longevity',
    costPoints: 5,
    description: 'Your lifespan is naturally long. You will fail aging tests only if you get a result equal to 17 or 18. A character with this advantage will not receive any points when assuming the Disadvantage of Age.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Luck',
    costPoints: 15,
    description: 'Once every game hour, you may make up to three rolls of something and choose the best result. Cost: 15 points. Extraordinary Luck (30 points): Can be used every 30 minutes instead of an hour.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Magical Aptitude',
    costPoints: 15,
    description: 'You have a bonus in learning all magical operations. When learning any magical operation, you will do so as if your Intelligence were equal to (IQ + Aptitude). Cost: 15 points for first level; 10 points for each subsequent level up to maximum of 3 levels.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Magic Resistance',
    costPoints: 2,
    description: 'You have a better chance of not being affected by most types of magic. Your level of Magic Resistance is subtracted from the skill level of whoever performs the operation against you. Cost: 2 points per level.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Mathematical Talent',
    costPoints: 10,
    description: 'This advantage guarantees a +3 bonus on any skill test with mathematical or computing-related skills (except Computer Operation) and a +2 bonus on those relating to Engineering at TL6+.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Military Rank',
    costPoints: 5,
    description: 'You have a military rank which confers certain privileges and authority. Cost: 5 points per level.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Musical Talent',
    costPoints: 1,
    description: 'You have a natural talent for music and musical instruments. Your musical skill level should be added to your IQ attribute when studying Singing or any musical instrument. Cost: 1 point per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Night Vision',
    costPoints: 10,
    description: 'Your eyes adapt quickly to darkness. You are capable of seeing very well if there is any light. Whenever the GM requires a penalty due to darkness, except in the case of total darkness, this penalty will not apply to you.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Peripheral Vision',
    costPoints: 15,
    description: 'The character has an extraordinarily wide field of vision. He can attack both to the right and left, as well as those in front of him. He will have a larger viewing angle for ranged attacks.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Psychic Resistance',
    costPoints: 2,
    description: 'Psychic Resistance interferes with all uses of psychic powers made against you. Your resistance level is subtracted from the effective skill of any psychic attempt in which you are the target. Cost: 2 points per level.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Rapid Healing',
    costPoints: 5,
    description: 'This advantage is only available for characters whose HT attribute is greater than or equal to 10. Whoever has it will recover quickly from all types of wounds. Add 5 to your effective HT when making recovery tests.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Strong Will',
    costPoints: 4,
    description: 'The character has much more determination than the average person. His Will level is added to his IQ attribute every time he makes a Will test. Cost: 4 points per bonus point.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Toughness',
    costPoints: 5,
    description: 'Your skin and flesh are tougher than the average human being. Your own body has Damage Resistance. This DR is subtracted from damage caused by any blow before multiplication.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Unusual Background',
    costPoints: 10,
    description: 'This is a \'deposit\' type advantage for unusual backgrounds that provide special benefits. The GM determines the cost based on how unusual the background is.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Voice',
    costPoints: 10,
    description: 'The character has a clear, attractive and resonant voice. He receives a permanent bonus equal to +2 in skills like Bard, Diplomacy, Acting, Politics, Social Manipulation, Sex Appeal and Singing.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Wealth',
    costPoints: 5,
    description: 'Wealth can be a truly wonderful advantage. The cost in points depends on the wealth level and the campaign setting. See p. 16 for details.'
  }
]

type SeedModifierGameTableDisadvantage = {
  id: string
  table_id: string
  name: string
  costPoints: number
  description: string
}

export const disadvantages: SeedModifierGameTableDisadvantage[] = [
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Disgusting Habits',
    costPoints: 5,
    description: 'The character behaves part of (or all the) time in a way repulsive to others. The worse your behavior, the greater the number of points. You can specify the behavior at character creation and estimate the bonus with the Master. Some examples: Sweaty odor, chronic itching and humming all the time could be worth -5 points each. Making bad taste jokes or spitting on the ground could be worth -10 points each. Habits worthy of a -15 point bonus are possible, but will be left to the imagination of those depraved enough to desire them. Subtract 1 point from all reaction tests made by people capable of observing your habit for each -5 points of bonus obtained with it.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Poverty',
    costPoints: 5,
    description: 'The character was born poor, relative to the average of his culture, or lost his money somehow. He will start with only a fraction of the money a character normally receives when created, and his income is limited.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Primitive',
    costPoints: 5,
    description: 'You belong to a culture with TL lower than that of the campaign and, therefore, have no knowledge (or pre-defined skill level) related to equipment with higher technology level than yours. You are only allowed to start with skills or equipment from your culture.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Social Stigma',
    costPoints: 5,
    description: 'You belong to a race, class or gender that your culture considers inferior. The "stigma" must be obvious to all who meet you. The bonus value depends on the penalty that will be used in reaction tests: Second-class Citizen: -5 points. Minority: -10 points. Foreigner/Barbarian: -15 points.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Age',
    costPoints: 3,
    description: 'Your character is over 50 years old at character creation. This means you must make a series of rolls to verify a possible reduction of your attribute values due to advanced age. Bonus: -3 points for each year above 50.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Bad Sight',
    costPoints: 10,
    description: 'The character can be either nearsighted or farsighted. If nearsighted, he won"t be capable of reading small letters at a distance greater than 30 cm. If farsighted, he will have great difficulties reading a book and his Dexterity will be subject to a -3 penalty.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Albinism',
    costPoints: 10,
    description: 'The Character has no natural pigmentation in his body; his hair and skin are white and his eyes are pink. An albino will always be remembered and is not capable of blending into a crowd. He receives 1 point of damage for each 30 minutes of exposure to direct sun.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Blindness',
    costPoints: 50,
    description: 'The character cannot see. As partial compensation, he could start with Acute Hearing and/or Acute Taste and Smell, paying only half the necessary points. Furthermore, he won"t be subject to any penalty for acting in the dark.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Color Blindness',
    costPoints: 10,
    description: 'The character is not capable of distinguishing any color. In day-to-day, this anomaly is no more than a nuisance. However, in situations that require color identification, the GM should impose appropriate difficulties.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Deafness',
    costPoints: 20,
    description: 'You cannot hear anything. Any information must be transmitted through writing or sign language. You will also be subject to a -3 penalty on your IQ attribute when learning any language other than your own.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Dwarfism',
    costPoints: 15,
    description: 'The character is a dwarf due to genetic reasons, abnormally short for his species. Determine your height normally and then reduce it to 60%. He also cannot have a Physical Appearance equal to average.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Epilepsy',
    costPoints: 30,
    description: 'The character is subject to seizures, during which his limbs become immobilized and he is incapable of speaking or thinking clearly. Whenever he is in a tension situation, he must make a HT test. Failure causes the seizure which will last 1D minutes.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Eunuch',
    costPoints: 5,
    description: 'The character (men only) lost his masculinity through an accident or hostile action. He will be immune to seduction and will be incapable of seducing others.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Obesity',
    costPoints: 10,
    description: 'The character will be extraordinarily fat for his race. Determine your weight normally and then increase it by 50%. This results in a -1 penalty on all reaction tests and his HT can never be greater than 15.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Gigantism',
    costPoints: 10,
    description: 'The character is a giant due to genetic issues, abnormally large for his species. Determine your height normally and then increase it by 20%. He will be subject to a -2 penalty on all reaction tests.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Hard of Hearing',
    costPoints: 10,
    description: 'The character is not deaf, but lost part of his hearing. He will be subject to a -4 penalty on all Hearing tests and language skills.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Hemophilia',
    costPoints: 30,
    description: 'The character is a hemophiliac. Any wound, no matter how small, won"t heal, unless bandaged, and the character will bleed until death. Any untreated wound will bleed at a rate equal to the number of damage points per minute.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Physical Disability',
    costPoints: 15,
    description: 'The character has a certain degree of reduction in his mobility. Maimed Leg: -15 points. Peg Leg: -25 points. No legs or paraplegic: -35 points.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Low Pain Threshold',
    costPoints: 10,
    description: 'The character is very sensitive to all types of pain. Double the "shock effect" due to any wound. He will always be subject to a -4 penalty when trying to resist torture.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Mutism',
    costPoints: 25,
    description: 'The character is not capable of speaking. All communication must be done through writing or sign language. A Mute character receives a +3 bonus on all Miming/Pantomime or Sign Language tests.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'No Sense of Smell/Taste',
    costPoints: 5,
    description: 'This is a rare disease... the character is not capable of smelling or tasting anything. He will, therefore, be incapable of detecting certain dangers that normal people quickly perceive.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'One Arm',
    costPoints: 20,
    description: 'The character lost one arm (or was born without it). Assume the lost arm is the left one if he is right-handed and vice-versa. He won"t be able to use a sword and shield simultaneously.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'One Eye',
    costPoints: 15,
    description: 'The character has only one good eye. His DX attribute will be subject to a -1 penalty in combat situations and/or those involving coordination between hands and eyes.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'One Hand',
    costPoints: 15,
    description: 'The character lost one of his hands. It can be replaced by an appropriate prosthesis. A mechanical prosthesis subjects the character to a -1 penalty on all reaction tests and his DX attribute will be reduced by 2 points.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Overweight',
    costPoints: 5,
    description: 'You don"t quite reach obesity — your weight is a little above the average for your race. Determine weight normally from the ST attribute and then increase it by 30%. This increases Encumbrance as in the case of Obesity.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Skinny',
    costPoints: 5,
    description: 'The character is excessively thin. After discovering your height, verify the "average" weight for that height and reduce it by 1/3. His HT attribute can never be greater than 14.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Stuttering',
    costPoints: 10,
    description: 'The character suffers from stuttering or another speech problem. He will be subject to a -2 penalty on all reaction tests where conversation is necessary.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Youth',
    costPoints: 2,
    description: 'The character is younger in age according to the standards of his culture. The difference can vary between 1 and 3 years and the bonus will be equal to -2 points per year.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Distractible',
    costPoints: 15,
    description: 'The classic disadvantage of eccentric geniuses. The character has difficulty paying attention to anything that isn"t of immediate interest. He will be subject to a -5 penalty on any IQ test, with exception of those linked to the work on which he is focused.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Addiction',
    costPoints: 5,
    description: 'The character is addicted to some drug that he needs to ingest daily or suffer the penalties of Recovery. The bonus depends on the type of drug: Cheap drugs: -5 points. Expensive drugs: -10 points. Highly addictive: -20 points.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Alcoholism',
    costPoints: 15,
    description: 'The character is addicted to alcohol. Alcohol is treated as an addiction. It is cheap, incapacitating and (normally) legal. Therefore it"s worth -10 points. But alcohol is treacherous, sometimes -15 or -20 if illegal.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Bad Temper',
    costPoints: 10,
    description: 'The character doesn"t have total control of his emotions. He must make a Will test in any tension situation. Failure means he lost his patience and must insult, attack or act in some way against the cause of his explosion.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Berserk',
    costPoints: 15,
    description: 'Like Bad Temper, but worse. The character tends to lose control of himself when subjected to some tension, proceeding to frantically attack whoever he thinks is the cause of his problem.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Bloodlust',
    costPoints: 10,
    description: 'The character desires to see his opponents dead. In a battle he will prefer killing blows, will fire one more time to be sure of having killed an opponent, will attack guards when this could be avoided.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Boastfulness',
    costPoints: 10,
    description: 'You like to intimidate people whenever possible with impunity. Represent this on your own account. As no one likes a braggart, your reaction tests will be subject to a -2 penalty.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Code of Honor',
    costPoints: 5,
    description: 'The character has pride in a set of principles that he follows all the time. A code of honor requires behavior that is "virile", "courageous" and "honorable".'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Combat Paralysis',
    costPoints: 15,
    description: 'This is the opposite situation of Combat Reflexes; the character tends to become paralyzed when he sees himself in combat. He must make a HT test (not IQ) whenever a physical injury seems imminent.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Compulsion',
    costPoints: 5,
    description: 'You have some habit (generally, but not always, an addiction) that you feel compelled to practice daily. You spend a good part of your time satisfying this tendency.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Compulsive Lying',
    costPoints: 15,
    description: 'The character lies constantly, for no other reason than the joy of lying. To be capable of telling the pure and simple truth, a compulsive liar needs to succeed on a test against Will-4.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Cowardice',
    costPoints: 10,
    description: 'The character is extremely careful regarding his physical well-being. Every time there is need to risk himself physically, he must make a Will test. If there is risk of life, the roll will be made with a -5 penalty.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Delusions',
    costPoints: 1,
    description: 'The character believes in something (or several) that simply isn"t (aren"t) true. This may lead others to think he is crazy. The value, in points, of the Delusion depends on its nature.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Dyslexia',
    costPoints: 5,
    description: 'You have a serious deficiency. You are incapable of learning to read or write; even simple maps and highway signs are beyond your comprehension.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Fanaticism',
    costPoints: 15,
    description: 'You intensely believe in a country, religion, etc., and this is more important than anything else. You must represent your fanaticism. Note that fanatics don"t need to be necessarily insane or perverse.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Gluttony',
    costPoints: 5,
    description: 'You like too much good food and drink. If given a chance, you will always overload yourself with extra provisions and will never lose a meal of your own free will.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Greed',
    costPoints: 15,
    description: 'You have passion for money. Every time some patrimony is offered as payment for a lawful job, adventure loot, plunder or just bait, you will have to succeed on a Will test to resist temptation.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Credulity',
    costPoints: 10,
    description: 'You were born a sucker and your character is one of them. A credulous person believes everything he hears. To not believe a lie or an improbable truth, he must succeed on an IQ test modified according to the plausibility of the story.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Honesty',
    costPoints: 10,
    description: 'The character MUST obey the law always and give the best of himself so others do the same. He will be compulsive regarding the law. This is a disadvantage, because frequently it will limit your options.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Illiteracy',
    costPoints: 0,
    description: 'This is the normal condition in a low TL culture and in this case offers no bonus. In cultures with TL 5+, where the press is common, it is a disadvantage.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Impulsiveness',
    costPoints: 10,
    description: 'The character hates talking and thinking. He prefers action. When alone, he will act first and think later. Represent this characteristic! The character must try to avoid work, mainly hard work, at any cost.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Intolerance',
    costPoints: 5,
    description: 'You don"t like and don"t trust people who are different from you. A completely intolerant character (-10 points) will have a -3 penalty on his reaction tests in front of any person who doesn"t belong to your race and/or class.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Jealousy',
    costPoints: 10,
    description: 'The character has, automatically, a bad reaction in front of anyone who seems more intelligent, more attractive or in a better situation than him. He may also oppose any plan proposed by a "rival", and will hate if someone else is in evidence.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Kleptomania',
    costPoints: 15,
    description: 'The character feels compelled to steal, not necessarily valuable things, but anything he can take. Whenever there is a chance to steal, the character must make a Will test. Failure means he must try to steal the object.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Laziness',
    costPoints: 10,
    description: 'The character has a great aversion to physical work. Your chances of getting a raise or promotion in any job are reduced by half. If he works on his own account, his monthly income will fall to half.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Lechery',
    costPoints: 15,
    description: 'The character suffers from an uncontrollable desire for romance. In any contact with an attractive member of the opposite sex, the character must make a Will test. Failure means he must try a "pickup", using all the artifices and skills he is capable of.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Megalomania',
    costPoints: 10,
    description: 'You believe you are the super-man, or that you were chosen for a great task, or that your destiny is to conquer. Start by adopting the Fanaticism disadvantage, being that you are fanatic about yourself!'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Miserliness',
    costPoints: 10,
    description: 'Similar to Greed except that the character is much more interested in what he already has. He must succeed on a Will test, every time he has to spend some money, and must always look for the best price.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Overconfidence',
    costPoints: 10,
    description: 'You are too confident in your abilities. You will be subject to a -5 penalty on any test that involves self-doubt or caution. You tend to underestimate dangers and opponents.'
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
  description: string,
  dice_roll: string,
  character_id: string,
}

export const  modifierNarrationsActions: SeedModifierNarrationActions[] = [
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '10',
    test: '9',
    description: 'Mira used the attack skill and succeeded',
    dice_roll: '3d6 [ 7 , 1 , 4 ]',
    character_id: characterMiraId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '17',
    test: '12',
    description: 'Garrick used the defense skill and failed',
    dice_roll: '3d6 [ 4 , 1 , 5 ]',
    character_id: characterGarrickId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '',
    test: '',
    description: 'Kasumi did nothing',
    dice_roll: '3d6 [ 0 , 0 , 0 ]',
    character_id: characterKasumiId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '11',
    test: '10',
    description: 'Mira used the attack skill again and succeeded',
    dice_roll: '3d6 [ 3 , 4 , 2 ]',
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

type SeedModifierGameTableSkillsPreDetermined = {
    id: string,
    origin_skill_id: string,
    depends_on_skill_id: string | null,
    depends_on_skill_value: string | null,
    depends_on_skill_for_others_attributes: string | null
}

export const  modifierGameTableSkillsPreDetermined: SeedModifierGameTableSkillsPreDetermined[] = [
    // Animal Training (Adestramento de Animais): [['IQ', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAnimalTrainingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    // Falconry (Falcoaria): [['IQ', 6], ['Animal Training', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFalconryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFalconryId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: null
    },
    // Animal Packing (Carregamento): [['IQ', 6], ['Animal Training', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAnimalPackingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAnimalPackingId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: null
    },
    // Riding (Cavalgar): [['DX', 5], ['Animal Training', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillRidingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillRidingId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Teamster (Carreiro): [['DX', 5], ['Animal Training', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTeamsterId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTeamsterId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Veterinary (VeterinÃ¡ria): [['Medicine', 5], ['Animal Training', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillVeterinaryId,
        depends_on_skill_id: skillMedicineId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillVeterinaryId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Artist (Artista): [['IQ', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillArtistId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    // Bard (Trovador): [['IQ', 5], ['Performance', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBardId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBardId,
        depends_on_skill_id: skillPerformanceId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Dancing (DanÃ§a): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillDancingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Poetry (Poesia): [['IQ', 5], ['Language', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillPoetryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillPoetryId,
        depends_on_skill_id: skillLanguageId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // Sculpting (Escultura): [['DX', 5], ['IQ', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSculptingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSculptingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    // Sing (Canto): [['HT', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'ht - 4'
    },
    // Writing (Escrita): [['IQ', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillWritingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    // Acrobatics (Acrobacia): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAcrobaticsId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Zero-G (Gravidade Zero): [['DX', 5], ['HT', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillZeroGId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillZeroGId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'ht - 5'
    },
    // Jumping (Salto): [['DX', 4], ['IQ', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillJumpingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillJumpingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    // Diving (Mergulho): [['IQ', 5], ['Swimming', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillDivingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillDivingId,
        depends_on_skill_id: skillSwimmingId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // Skiing (Esqui): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSkiingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Swimming (NataÃ§Ã£o): [['ST', 5], ['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSwimmingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'st - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSwimmingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Axe or Mace (Machado ou MaÃ§a): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAxeMaceId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Axe Throwing (Arremesso de Machado): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAxeThrowingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Combat Suit (Traje de Combate): [['IQ', 5], ['DX', 5], ['Pressure Suit', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCombatSuitId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCombatSuitId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCombatSuitId,
        depends_on_skill_id: skillPressureSuitId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // ===== Skills from pericias2 =====
    // Beam Weapons (Armas de Feixe): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBeamWeaponsId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Blackjack (Armas de Feixe): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBlackjackId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Guns (Musket) (Armas de PÃ³lvora): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillGunsMusketId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Blowpipe (Zarabatana): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBlowpipeId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Bolas (Boleadeiras): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBolasId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Bow (Arco): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBowId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Broadsword (Espada de LÃ¢mina Larga): [['DX', 5], ['Shortsword', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBroadswordId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBroadswordId,
        depends_on_skill_id: skillShortswordId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Buckler (Broquel): [['DX', 4], ['Shield', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBucklerId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBucklerId,
        depends_on_skill_id: skillShieldId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Crossbow (Besta): [['DX', 4], ['Shield', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCrossbowId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCrossbowId,
        depends_on_skill_id: skillShieldId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Fencing (Esgrima): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFencingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Flail (Mangual): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFlailId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Guns (Armas de Fogo): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillGunsId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Knife (Faca): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillKnifeId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Knife Throwing (Arremesso de Faca): [['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillKnifeThrowingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Lance (Lança de Justa): [['DX', 6], ['Spear', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillLanceId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillLanceId,
        depends_on_skill_id: skillSpearId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Polearm (Armas de Haste): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillPolearmId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Shield (Escudo): [['DX', 4], ['Buckler', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillShieldId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillShieldId,
        depends_on_skill_id: skillBucklerId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Shortsword (Espadas Curtas): [['DX', 5], ['Broadsword', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillShortswordId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillShortswordId,
        depends_on_skill_id: skillBroadswordId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Sling (Funda): [['DX', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSlingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'dx - 6'
    },
    // Spear (Lança): [['DX', 5], ['Staff', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearId,
        depends_on_skill_id: skillStaffId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Spear Thrower (Arremessador de Lança): [['DX', 4], ['Spear Throwing', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearThrowerId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearThrowerId,
        depends_on_skill_id: skillSpearThrowingId,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: null
    },
    // Spear Throwing (Arremesso de Lança): [['DX', 4], ['Spear Thrower', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearThrowingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSpearThrowingId,
        depends_on_skill_id: skillSpearThrowerId,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: null
    },
    // Staff (Bastão): [['DX', 5], ['Spear', 2]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillStaffId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillStaffId,
        depends_on_skill_id: skillSpearId,
        depends_on_skill_value: '2',
        depends_on_skill_for_others_attributes: null
    },
    // Two-Handed Axe/Mace (Machado de Duas Mãos/Maça): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTwoHandedAxeMaceId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Two-Handed Sword (Espadas de Duas Mãos): [['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTwoHandedSwordId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Armoury (Armeiro): [['IQ', 5], ['Smith', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillArmouryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillArmouryId,
        depends_on_skill_id: skillSmithId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Smith (Ferreiro): [['IQ', 5], ['Jeweler', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSmithId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSmithId,
        depends_on_skill_id: skillJewelerId,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: null
    },
    // Carpentry (Carpintaria): [['IQ', 4], ['DX', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCarpentryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCarpentryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'dx - 4'
    },
    // Cooking (Culinária): [['IQ', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillCookingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    // Jeweler (Joalheiro): [['IQ', 6], ['Smith', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillJewelerId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillJewelerId,
        depends_on_skill_id: skillSmithId,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: null
    },
    // Leatherworking (Trabalhos em Couro): [['IQ', 4], ['DX', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillLeatherworkingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillLeatherworkingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    // Mechanic (Mecânica): [['IQ', 5], ['Engineering (Mechanical)', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMechanicId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMechanicId,
        depends_on_skill_id: skillEngineeringMechanicalId,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: null
    },
    // Pottery (Cerâmica): [['IQ', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillPotteryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    // Woodworking (Marcenaria): [['DX', 5], ['Carpentry', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillWoodworkingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillWoodworkingId,
        depends_on_skill_id: skillCarpentryId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Mime/Pantomime (Mímica): [['DX', 5], ['Sign Language', 0]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMimePantomimeId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMimePantomimeId,
        depends_on_skill_id: skillSignLanguageId,
        depends_on_skill_value: '0',
        depends_on_skill_for_others_attributes: null
    },
    // Medicine (Medicina): [['Veterinary', 5], ['First Aid', 11], ['IQ', 7]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMedicineId,
        depends_on_skill_id: skillVeterinaryId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // {
    //     id: crypto.randomUUID(),
    //     origin_skill_id: skillMedicineId,
    //     depends_on_skill_id: skillFirstAidId,
    //     depends_on_skill_value: '11',
    //     depends_on_skill_for_others_attributes: null
    // },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillMedicineId,
        depends_on_skill_id: null,
        depends_on_skill_value: '7',
        depends_on_skill_for_others_attributes: 'iq - 7'
    },
    // Surgery (Cirurgia): [['Veterinary', 5], ['Medicine', 5], ['Physiology', 8], ['First Aid', 12]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurgeryId,
        depends_on_skill_id: skillVeterinaryId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurgeryId,
        depends_on_skill_id: skillMedicineId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurgeryId,
        depends_on_skill_id: skillPhysiologyId,
        depends_on_skill_value: '8',
        depends_on_skill_for_others_attributes: null
    },
    // {
    //     id: crypto.randomUUID(),
    //     origin_skill_id: skillSurgeryId,
    //     depends_on_skill_id: skillFirstAidId,
    //     depends_on_skill_value: '12',
    //     depends_on_skill_for_others_attributes: null
    // },
    // Climbing (Escalada): [['DX', 5], ['ST', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillClimbingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'dx - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillClimbingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'st - 5'
    },
    // Fishing (Pescaria): [['IQ', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFishingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    // Naturalist (Naturalista): [['IQ', 6]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillNaturalistId,
        depends_on_skill_id: null,
        depends_on_skill_value: '6',
        depends_on_skill_for_others_attributes: 'iq - 6'
    },
    // Navigation (Navegação): [['Astronomy', 5], ['Seamanship', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillNavigationId,
        depends_on_skill_id: skillAstronomyId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillNavigationId,
        depends_on_skill_id: skillSeamanshipId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // Seamanship (Marinhagem): [['IQ', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSeamanshipId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    // Survival (Sobrevivência): [['IQ', 5], ['Naturalist', 3], ['Survival', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurvivalId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurvivalId,
        depends_on_skill_id: skillNaturalistId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurvivalId,
        depends_on_skill_id: skillSurvivalId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Tracking (Rastreamento): [['IQ', 5], ['Naturalist', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTrackingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillTrackingId,
        depends_on_skill_id: skillNaturalistId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // Accounting (Contabilidade): [['IQ', 10], ['Merchant', 5], ['Mathematics', 5]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAccountingId,
        depends_on_skill_id: null,
        depends_on_skill_value: '10',
        depends_on_skill_for_others_attributes: 'iq - 10'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAccountingId,
        depends_on_skill_id: skillMerchantId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillAccountingId,
        depends_on_skill_id: skillMathematicsId,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: null
    },
    // Computer Operation (Operação de Computadores): [['IQ', 4]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillComputerOperationId,
        depends_on_skill_id: null,
        depends_on_skill_value: '4',
        depends_on_skill_for_others_attributes: 'iq - 4'
    },
    // Electronics Operation (Operação de Aparelhos Eletrônicos): [['IQ', 5], ['Electronics', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillElectronicsOperationId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    },
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillElectronicsOperationId,
        depends_on_skill_id: skillElectronicsId,
        depends_on_skill_value: '3',
        depends_on_skill_for_others_attributes: null
    },
    // Heraldry (Heráldica): [['IQ', 5], ['Savoir-Faire', 3]]
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillHeraldryId,
        depends_on_skill_id: null,
        depends_on_skill_value: '5',
        depends_on_skill_for_others_attributes: 'iq - 5'
    }
]

type SeedModifierGameTableCharacterAdvantages = {
  id: string,
  name: string,
  character_id: string,
  cost_points: number,
  effect: string
}

export const  modifierGameTableCharacterAdvantages: SeedModifierGameTableCharacterAdvantages[] = [
  // Mira Thorne - streetwise duelist
  {
    id: crypto.randomUUID(),
    name: 'Combat Reflexes',
    character_id: characterMiraId,
    cost_points: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Dodge',
    character_id: characterMiraId,
    cost_points: 10,
    effect: '+1 to active defense (Dodge).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fast Draw',
    character_id: characterMiraId,
    cost_points: 10,
    effect: 'Draw weapon as free action.'
  },
  {
    id: crypto.randomUUID(),
    name: 'High Pain Threshold',
    character_id: characterMiraId,
    cost_points: 10,
    effect: 'Ignore shock from injury.'
  },

  // Garrick Stone - hulking veteran
  {
    id: crypto.randomUUID(),
    name: 'High Pain Threshold',
    character_id: characterGarrickId,
    cost_points: 10,
    effect: 'Ignore shock from injury.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Toughness',
    character_id: characterGarrickId,
    cost_points: 15,
    effect: '+2 HT for resistance rolls.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Combat Reflexes',
    character_id: characterGarrickId,
    cost_points: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fearlessness',
    character_id: characterGarrickId,
    cost_points: 10,
    effect: 'Immune to fear up to -10 reaction.'
  },

  // Kasumi Noh - scholar/mage
  {
    id: crypto.randomUUID(),
    name: 'Magery 1',
    character_id: characterKasumiId,
    cost_points: 25,
    effect: 'Basic access to spellcasting and rituals.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Intuition',
    character_id: characterKasumiId,
    cost_points: 15,
    effect: '+2 to unexpected IQ rolls.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Mathematical Ability',
    character_id: characterKasumiId,
    cost_points: 10,
    effect: '+2 to mathematics and calculations.'
  },
  {
    id: crypto.randomUUID(),
    name: 'GURPS 101',
    character_id: characterKasumiId,
    cost_points: 5,
    effect: 'Familiarity with GURPS rules gives +1 to relevant IQ checks.'
  },

  // Riven Kael - fast dual-blade fighter (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Combat Reflexes',
    character_id: characterNPCsIds[0] as string,
    cost_points: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Dodge',
    character_id: characterNPCsIds[0] as string,
    cost_points: 10,
    effect: '+1 to active defense (Dodge).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Ambidexterity',
    character_id: characterNPCsIds[0] as string,
    cost_points: 10,
    effect: 'No off-hand penalty when dual-wielding.'
  },

  // Thorne Black - grim bounty hunter (NPC)
  {
    id: crypto.randomUUID(),
    name: 'High Pain Threshold',
    character_id: characterNPCsIds[1] as string,
    cost_points: 10,
    effect: 'Ignore shock from injury.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Fearlessness',
    character_id: characterNPCsIds[1] as string,
    cost_points: 10,
    effect: 'Immune to fear up to -10 reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Absolute Direction',
    character_id: characterNPCsIds[1] as string,
    cost_points: 5,
    effect: 'Never get lost, +2 to Navigation.'
  },

  // Selene Voss - shadow mage (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Magery 2',
    character_id: characterNPCsIds[2] as string,
    cost_points: 35,
    effect: 'Enhanced access to spellcasting (level 2).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Night Vision',
    character_id: characterNPCsIds[2] as string,
    cost_points: 10,
    effect: 'See in darkness as if daylight.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Silence',
    character_id: characterNPCsIds[2] as string,
    cost_points: 15,
    effect: 'Move silently, +4 to Stealth in shadows.'
  },

  // Kael Draven - ruthless duelist (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Combat Reflexes',
    character_id: characterNPCsIds[3] as string,
    cost_points: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Dodge',
    character_id: characterNPCsIds[3] as string,
    cost_points: 10,
    effect: '+1 to active defense (Dodge).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Weapon Master',
    character_id: characterNPCsIds[3] as string,
    cost_points: 20,
    effect: '+2 to skill with chosen weapon type.'
  },

  // Lyra Moonfall - celestial sorcerer (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Magery 2',
    character_id: characterNPCsIds[4] as string,
    cost_points: 35,
    effect: 'Enhanced access to spellcasting (level 2).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Oracle',
    character_id: characterNPCsIds[4] as string,
    cost_points: 15,
    effect: 'Visions of future events (+2 to predictions).',
  },
  {
    id: crypto.randomUUID(),
    name: 'Serendipity',
    character_id: characterNPCsIds[4] as string,
    cost_points: 15,
    effect: 'Luck that helps in critical moments.'
  },

  // Borin Stonehelm - dwarven tank (NPC)
  {
    id: crypto.randomUUID(),
    name: 'High Pain Threshold',
    character_id: characterNPCsIds[5] as string,
    cost_points: 10,
    effect: 'Ignore shock from injury.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Toughness',
    character_id: characterNPCsIds[5] as string,
    cost_points: 15,
    effect: '+2 HT for resistance rolls.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Damage Resistance',
    character_id: characterNPCsIds[5] as string,
    cost_points: 20,
    effect: 'DR 2 against all physical attacks.'
  },

  // Nyx Shadowend - elite assassin (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Combat Reflexes',
    character_id: characterNPCsIds[6] as string,
    cost_points: 15,
    effect: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Silence',
    character_id: characterNPCsIds[6] as string,
    cost_points: 15,
    effect: 'Move silently, +4 to Stealth in shadows.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Night Vision',
    character_id: characterNPCsIds[6] as string,
    cost_points: 10,
    effect: 'See in darkness as if daylight.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Flexibility',
    character_id: characterNPCsIds[6] as string,
    cost_points: 5,
    effect: '+2 to Escape, +1 to Climbing.',
  },

  // Eldric Vale - wise mage (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Magery 3',
    character_id: characterNPCsIds[7] as string,
    cost_points: 45,
    effect: 'Powerful access to spellcasting (level 3).',
  },
  {
    id: crypto.randomUUID(),
    name: 'Intuition',
    character_id: characterNPCsIds[7] as string,
    cost_points: 15,
    effect: '+2 to unexpected IQ rolls.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Mathematical Ability',
    character_id: characterNPCsIds[7] as string,
    cost_points: 10,
    effect: '+2 to mathematics and calculations.'
  },
  {
    id: crypto.randomUUID(),
    name: 'GURPS 101',
    character_id: characterNPCsIds[7] as string,
    cost_points: 5,
    effect: 'Familiarity with GURPS rules gives +1 to relevant IQ checks.'
  },

  // Vera Hollow - cursed archer (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Dodge',
    character_id: characterNPCsIds[8] as string,
    cost_points: 10,
    effect: '+1 to active defense (Dodge).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Night Vision',
    character_id: characterNPCsIds[8] as string,
    cost_points: 10,
    effect: 'See in darkness as if daylight.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Absolute Direction',
    character_id: characterNPCsIds[8] as string,
    cost_points: 5,
    effect: 'Never get lost, +2 to Navigation.'
  },

  // Dante Crowe - charismatic warlock (NPC)
  {
    id: crypto.randomUUID(),
    name: 'Magery 2',
    character_id: characterNPCsIds[9] as string,
    cost_points: 35,
    effect: 'Enhanced access to spellcasting (level 2).'
  },
  {
    id: crypto.randomUUID(),
    name: 'Charisma',
    character_id: characterNPCsIds[9] as string,
    cost_points: 10,
    effect: '+2 to reaction rolls from NPCs.'
  },
  {
    id: crypto.randomUUID(),
    name: 'Serendipity',
    character_id: characterNPCsIds[9] as string,
    cost_points: 15,
    effect: 'Luck that helps in critical moments.'
  }
]

type SeedModifierGameTableSkillsDependecies = {
    id: string,
    origin_skill_id: string,
    depends_on_skill_id: string | null,
    depends_on_skill_value: string | null,
    depends_type: string | null
}

export const  modifierGameTableSkillsDependecies: SeedModifierGameTableSkillsDependecies[] = [
    // Falconry (Falcoaria) → Animal Training (Adestramento de Animais)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillFalconryId,
        depends_on_skill_id: skillAnimalTrainingId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Lance (Lança de Justa) → Riding (Cavalgar)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillLanceId,
        depends_on_skill_id: skillRidingId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Surgery (Cirurgia) → Medicine (Medicina)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillSurgeryId,
        depends_on_skill_id: skillMedicineId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Biochemistry (Bioquímica) → Chemistry (Química)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillBiochemistryId,
        depends_on_skill_id: skillChemistryId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Computer Programming (Programação de Computadores) → Computer Operation (Operação de Computadores)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillComputerProgrammingId,
        depends_on_skill_id: skillComputerOperationId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Electronics (Eletrônica) → Mathematics (Matemática)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillElectronicsId,
        depends_on_skill_id: skillMathematicsId,
        depends_on_skill_value: null,
        depends_type: null
    },
    // Engineering Mechanical (Engenharia Mecânica) → Mathematics (Matemática)
    {
        id: crypto.randomUUID(),
        origin_skill_id: skillEngineeringMechanicalId,
        depends_on_skill_id: skillMathematicsId,
        depends_on_skill_value: null,
        depends_type: null
    }
]