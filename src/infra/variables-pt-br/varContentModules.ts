// src/infra/variables-pt-br/varContentModules.ts
// Variante pt-BR da camada de conteúdo: mesmas regras de tag do arquivo em
// inglês, mas indexadas pelos nomes traduzidos. O "zip" entre variantes é:
//   - skills/items  -> por id (ids fixos, estáveis entre variantes)
//   - advantages/disadvantages -> por POSIÇÃO no array (os dois arquivos
//     espelham a mesma ordem, pois vantagens/desvantagens usam
//     crypto.randomUUID() no seed e não têm id estável).

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

const indexById = <T extends { id: string }>(rows: T[]): Map<string, T> =>
  new Map(rows.map((row) => [row.id, row]))

const enSkillById = indexById(enSkills)
const enItemById = indexById(enItems)

// =========================
// TAGS DE SKILLS (regra por nome; paridade via id EN -> PT)
// =========================
export const skillTag: Record<string, SkillTag> = Object.fromEntries(
  skills
    .map((skill) => {
      const enName = enSkillById.get(skill.id)?.name
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
// TAGS DE ITEMS (delega ao EN pelo id; kind/category são constantes EN)
// =========================
export const itemTagBy = (item: { id: string; name: string; kind: string; category: string }): ContentTag => {
  const en = enItemById.get(item.id)
  if (en) return enItemTagBy({ name: en.name, kind: en.kind, category: en.category })
  return enItemTagBy(item)
}