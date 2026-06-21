import { layout } from './layout'
import { tabBar } from './tab-bar'

export function tableAdvantages(data: any): string {
  const table = data.table
  const advantages = data.advantages ?? []
  const actUrl = data.actUrl ?? `/session/${table?.id}`
  const isPlayer = data.isPlayer ?? false

  return layout(`${table?.title || 'Advantages'} — Advantages`, `
    <div class="max-w-4xl mx-auto p-6">
      ${tabBar(table?.id, '', actUrl, undefined, isPlayer)}
      <h1 class="text-2xl font-bold text-amber-100 mb-6">${table?.title || 'Table'} — Advantages</h1>

      ${advantages.length === 0 ? `
        <p class="text-zinc-500 italic">No advantages registered for this table.</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${advantages.map((a: any) => `
            <div class="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3">
              <div class="flex justify-between items-start mb-1">
                <span class="text-zinc-200 font-medium">${a.name || 'Unnamed'}</span>
                <span class="text-emerald-400 text-xs font-semibold">${a.cost_points ?? ''}</span>
              </div>
              ${a.category ? `<span class="text-xs text-zinc-500">${a.category}${a.subcategory ? ` / ${a.subcategory}` : ''}</span>` : ''}
              ${a.description ? `<p class="text-zinc-500 text-xs mt-1">${a.description}</p>` : ''}
              <div class="mt-2">
                <a href="/form/advantage/${a.id}" class="text-xs text-amber-400 hover:text-amber-300">Edit</a>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `)
}
