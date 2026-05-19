import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import * as advantagesIds from "./MainUUIDIds/uuidAdvantages"

type SeedModifierGameTableAdvantages = {
  id: string
  table_id: string
  name: string
  costPoints: number
  description: string
}

export const advantages: SeedModifierGameTableAdvantages[] = [
  {
    id: advantagesIds.advantageCombatReflexesId,
    table_id: mainGameTableId,
    name: 'Combat Reflexes',
    costPoints: 15,
    description: 'No surprise penalty and faster combat reaction.'
  },
  {
    id: advantagesIds.advantageVeryFitId,
    table_id: mainGameTableId,
    name: 'Very Fit',
    costPoints: 10,
    description: '+2 fatigue, better recovery.'
  },
  {
    id: advantagesIds.advantageMageryId,
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
    id: advantagesIds.advantageEideticMemoryId,
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