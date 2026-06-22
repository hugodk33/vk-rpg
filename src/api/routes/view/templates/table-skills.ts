import { layout } from './layout'
import { tabBar } from './tab-bar'

export function tableSkills(data: any): string {
  const table = data.table
  const skills = data.skills ?? []
  const actUrl = data.actUrl ?? `/session/${table?.id}`
  const isPlayer = data.isPlayer ?? false

  return layout(`${table?.title || 'Skills'} — Skills`, `
    <div class="max-w-4xl mx-auto p-6">
      ${tabBar(table?.id, '', actUrl, undefined, isPlayer)}
      <h1 class="text-2xl font-bold text-amber-100 mb-6">${table?.title || 'Table'} — Skills</h1>

      ${skills.length === 0 ? `
        <p class="text-zinc-500 italic">No skills registered for this table.</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${skills.map((s: any) => `
            <div class="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3">
              <div class="flex justify-between items-start mb-1">
                <span class="text-zinc-200 font-medium">${s.name || 'Unnamed'}</span>
                <span class="text-zinc-500 text-xs">${s.predefinition_type || ''}${s.predefinition_difficulty ? '/' + s.predefinition_difficulty : ''}</span>
              </div>
              ${s.effect ? `<p class="text-zinc-500 text-xs mt-1">${s.effect}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `)
}
