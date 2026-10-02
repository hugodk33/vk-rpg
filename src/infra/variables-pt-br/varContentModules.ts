// src/infra/variables-pt-br/varContentModules.ts
// Variante pt-BR da camada de conteúdo: mesmas regras de tag do arquivo em
// inglês, mas indexadas pelos nomes traduzidos. Como cada variante agora é
// dona dos SEUS ids (bundles MainUUIDIds independentes), o "zip" entre
// variantes é feito por POSIÇÃO no array (os arquivos pt-BR espelham a
// mesma ordem dos EN) — tanto para skills/items quanto para
// advantages/disadvantages.

import {
  contentModules,
  contentCategories,
  skillTag as enSkillTag,
  advantageTagBy as enAdvantageTagBy,
  disadvantageTagBy as enDisadvantageTagBy,
  itemTagBy as enItemTagBy,
  npcTagBy
} from '../variables/varContentModules'
import type { ContentTag } from '../variables/varContentModules'

import { skills as enSkills } from '../variables/varSkills'
import { advantages as enAdvantages } from '../variables/varAdvantages'
import { disadvantages as enDisadvantages } from '../variables/varDisadvantage'
import { items as enItems } from '../variables/varItems'

import { skills } from './varSkills'
import { advantages } from './varAdvantages'
import { disadvantages } from './varDisadvantage'
import { items } from './varItems'

export { contentModules, contentCategories, npcTagBy }

type SkillTag = { category: string; subcategory: string | undefined; moduleId: string }

// =========================
// TAGS DE SKILLS (regra por nome; paridade via POSIÇÃO EN -> PT)
// =========================
export const skillTag: Record<string, SkillTag> = Object.fromEntries(
  skills
    .map((skill, index) => {
      const enName = enSkills[index]?.name
      const tag = enName ? enSkillTag[enName] : undefined
      return tag ? [skill.name, tag] : null
    })
    .filter((entry): entry is [string, SkillTag] => entry !== null)
)

// =========================
// TAGS DE ADVANTAGES (nome pt-BR -> tag EN pela posição no array)
// =========================
const ptAdvantageByName = new Map(advantages.map((advantage) => [advantage.name, advantage]))

const enAdvantageNameAt = (index: number): string | undefined => {
  const en = enAdvantages[index]
  return en ? en.name : undefined
}

export const advantageTagBy = (name: string): ContentTag => {
  const pt = ptAdvantageByName.get(name)
  if (pt) {
    const enName = enAdvantageNameAt(advantages.indexOf(pt))
    if (enName) return enAdvantageTagBy(enName)
  }
  return enAdvantageTagBy(name)
}

// =========================
// TAGS DE DISADVANTAGES (nome pt-BR -> tag EN pela posição no array)
// =========================
const ptDisadvantageByName = new Map(
  disadvantages.map((disadvantage) => [disadvantage.name, disadvantage])
)

const enDisadvantageNameAt = (index: number): string | undefined => {
  const en = enDisadvantages[index]
  return en ? en.name : undefined
}

export const disadvantageTagBy = (name: string): ContentTag => {
  const pt = ptDisadvantageByName.get(name)
  if (pt) {
    const enName = enDisadvantageNameAt(disadvantages.indexOf(pt))
    if (enName) return enDisadvantageTagBy(enName)
  }
  return enDisadvantageTagBy(name)
}

// =========================
// TAGS DE ITEMS (delega ao EN pela posição no array)
// =========================
const enItemAt = (item: { id: string }): { name: string; kind: string; category: string } | undefined => {
  const index = items.findIndex((pt) => pt.id === item.id)
  const en = index >= 0 ? enItems[index] : undefined
  return en ? { name: en.name, kind: en.kind, category: en.category } : undefined
}

export const itemTagBy = (item: { id: string; name: string; kind: string; category: string }): ContentTag => {
  const en = enItemAt(item)
  if (en) return enItemTagBy(en)
  return enItemTagBy({ name: item.name, kind: item.kind, category: item.category })
}