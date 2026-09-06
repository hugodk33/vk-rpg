/* ============================================================
   CharacterVisibility — server-side shaping of a character
   payload for a "player" viewer (user.type 1).

   Rules live in the `visibility` table:
     character_id       = the OBSERVING character
     other_character_id = the TARGET character (NULL = any target)
     skill/advantage/disadvantage/item_id/attribute = entity switched
     status  = 'known' | 'specialist' | 'unknown'  (legacy 'hidden' → unknown)
     value   = alias/placeholder shown in place of the real value

   Absent rule ⇒ hidden (default). type-0 viewers keep the full
   payload and never reach this module.
   ============================================================ */

export type VisStatus = 'known' | 'specialist' | 'unknown'

interface VisRule {
  status: VisStatus
  value: string
}

const ATTR_KEYS = [
  'st',
  'dx',
  'iq',
  'ht',
  'hp',
  'fatigue',
  'points',
  'basic_speed',
  'move',
  'encumbrance',
]

const BASE_ATTR_MAP: Record<string, string> = {
  st: 'base_st',
  dx: 'base_dx',
  iq: 'base_iq',
  ht: 'base_ht',
  hp: 'base_hp',
  fatigue: 'base_fatigue',
}

const HIDEABLE_SHEET_TEXT = ['bio', 'backstory']

function isVisible(r?: VisRule): boolean {
  return !!r && (r.status === 'known' || r.status === 'specialist')
}

interface RuleMap {
  attrs: Map<string, VisRule>
  items: Map<string, VisRule>
  skills: Map<string, VisRule>
  advantages: Map<string, VisRule>
  disadvantages: Map<string, VisRule>
}

function buildRuleMap(rules: any[]): RuleMap {
  const map: RuleMap = {
    attrs: new Map(),
    items: new Map(),
    skills: new Map(),
    advantages: new Map(),
    disadvantages: new Map(),
  }
  for (const r of rules ?? []) {
    if (!r) continue
    const status: VisStatus =
      r.status === 'known' || r.status === 'specialist' ? r.status : 'unknown'
    const rule: VisRule = { status, value: r.value ?? '' }
    if (r.attribute) {
      const names = [
        String(r.attribute).toLowerCase(),
        ...String(r.additionals_attributes ?? '')
          .split(',')
          .map((s: string) => s.trim().toLowerCase())
          .filter(Boolean),
      ]
      for (const n of names) map.attrs.set(n, rule)
    }
    if (r.item_id) map.items.set(String(r.item_id), rule)
    if (r.skill_id) map.skills.set(String(r.skill_id), rule)
    if (r.advantage_id) map.advantages.set(String(r.advantage_id), rule)
    if (r.disadvantage_id) map.disadvantages.set(String(r.disadvantage_id), rule)
  }
  return map
}

export function shapeCharacterForViewer(character: any, rules: any[]): any {
  if (!character) return character
  const map = buildRuleMap(rules)
  const sheet = character.sheet

  if (character.user) {
    const nameRule = map.attrs.get('name')
    if (!nameRule || !isVisible(nameRule)) {
      character.user.username = null
      character.user.email = null
      character.user.phone = null
    }
  }

  if (sheet) {
    const nameRule = map.attrs.get('name')
    const shownName = nameRule
      ? isVisible(nameRule)
        ? sheet.name
        : nameRule.value || '???'
      : '???'
    sheet.name = shownName
    character.name = shownName

    for (const key of HIDEABLE_SHEET_TEXT) {
      const r = map.attrs.get(key)
      if (r && !isVisible(r)) sheet[key] = r.value || null
    }

    for (const key of ATTR_KEYS) {
      const r = map.attrs.get(key)
      if (r && !isVisible(r)) sheet[key] = r.value || null
      else if (!r) sheet[key] = null
    }
    for (const [attr, baseKey] of Object.entries(BASE_ATTR_MAP)) {
      const r = map.attrs.get(attr)
      if (!isVisible(r)) sheet[baseKey] = null
    }
  }

  character.items = (character.items ?? []).filter((it: any) =>
    isVisible(map.items.get(String(it?.item_id ?? it?.id)))
  )
  character.skills = (character.skills ?? []).filter((sk: any) =>
    isVisible(map.skills.get(String(sk?.skill_id ?? sk?.id)))
  )
  character.advantages = (character.advantages ?? []).filter((a: any) =>
    isVisible(map.advantages.get(String(a?.advantage_id ?? a?.id)))
  )
  character.disadvantages = (character.disadvantages ?? []).filter((d: any) =>
    isVisible(map.disadvantages.get(String(d?.disadvantage_id ?? d?.id)))
  )
  character.armors = (character.armors ?? []).filter((a: any) =>
    isVisible(map.items.get(String(a?.item_id)))
  )

  return character
}