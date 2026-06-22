import { layout } from './layout'
import { tabBar } from './tab-bar'

export function tableDisadvantages(data: any): string {
  const table = data.table
  const disadvantages = data.disadvantages ?? []
  const actUrl = data.actUrl ?? `/session/${table?.id}`
  const isPlayer = data.isPlayer ?? false

  return layout(`${table?.title || 'Disadvantages'} — Disadvantages`, `
    <div class="max-w-4xl mx-auto p-6">
      ${tabBar(table?.id, '', actUrl, undefined, isPlayer)}
      <h1 class="text-2xl font-bold text-amber-100 mb-6">${table?.title || 'Table'} — Disadvantages</h1>

      ${disadvantages.length === 0 ? `
        <p class="text-zinc-500 italic">No disadvantages registered for this table.</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${disadvantages.map((d: any) => `
            <div class="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3">
              <div class="flex justify-between items-start mb-1">
                <span class="text-zinc-200 font-medium">${d.name || 'Unnamed'}</span>
                <span class="text-red-400 text-xs font-semibold">${d.cost_points ?? ''}</span>
              </div>
              ${d.category ? `<span class="text-xs text-zinc-500">${d.category}${d.subcategory ? ` / ${d.subcategory}` : ''}</span>` : ''}
              ${d.effect ? `<p class="text-zinc-500 text-xs mt-1">${d.effect}</p>` : ''}
              ${d.description ? `<p class="text-zinc-500 text-xs">${d.description}</p>` : ''}
              <div class="mt-2">
                <a href="/form/disadvantage/${d.id}" class="text-xs text-amber-400 hover:text-amber-300">Edit</a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `)
}
