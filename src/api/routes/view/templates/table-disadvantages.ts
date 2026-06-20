import { layout } from './layout'

export function tableDisadvantages(data: any): string {
  const table = data.table
  const disadvantages = data.disadvantages ?? []

  return layout(`${table?.title || 'Disadvantages'} — Disadvantages`, `
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-6">
        <a href="/" class="text-zinc-500 hover:text-zinc-300 text-sm">&larr; Back to tables</a>
        <h1 class="text-2xl font-bold text-amber-100 mt-2">${table?.title || 'Table'} — Disadvantages</h1>
      </div>

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
