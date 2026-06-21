import { layout } from './layout'
import { tabBar } from './tab-bar'

export function tableLocations(data: any): string {
  const table = data.table
  const locations = data.locations ?? []
  const actUrl = data.actUrl ?? `/session/${table?.id}`
  const isPlayer = data.isPlayer ?? false

  return layout(`${table?.title || 'Locations'} — Locations`, `
    <div class="max-w-4xl mx-auto p-6">
      ${tabBar(table?.id, '', actUrl, undefined, isPlayer)}
      <h1 class="text-2xl font-bold text-amber-100 mb-6">${table?.title || 'Table'} — Locations</h1>

      ${locations.length === 0 ? `
        <p class="text-zinc-500 italic">No locations registered for this table.</p>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${locations.map((l: any) => `
            <div class="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3">
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span class="text-zinc-200 font-medium">${l.name || 'Unnamed'}</span>
              </div>
              ${l.region ? `<p class="text-xs text-zinc-500 ml-6">${l.region}${l.subRegion ? ', ' + l.subRegion : ''}</p>` : ''}
              ${l.address ? `<p class="text-xs text-zinc-500 ml-6">${l.address}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `)
}
