export function tabBar(tableId: string, active: string, actUrl: string, characterUrl?: string, isPlayer?: boolean): string {
  const qs = isPlayer ? '?player=1' : ''
  const tabs = [
    { id: 'act', label: 'Act', url: actUrl },
    { id: 'timeline', label: 'Timeline', url: `/view/game_table_scenes/${tableId}${qs}` },
  ]
  return `
    <div class="flex gap-1 border-b border-zinc-700/50 mb-6">
      ${tabs.map(t => `
        <a href="${t.url}" class="px-4 py-2.5 text-sm font-medium transition-colors ${t.id === active ? 'text-zinc-200 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent'}">${t.label}</a>
      `).join('')}
      <details class="relative">
        <summary class="px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent cursor-pointer list-none flex items-center gap-1">Table<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></summary>
        <div class="absolute top-full left-0 mt-1 w-44 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 z-50">
          <a href="/view/game_table_items/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Items</a>
          <a href="/view/game_table_advantages/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Advantages</a>
          <a href="/view/game_table_disadvantages/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Disadvantages</a>
          <a href="/view/game_table_skills/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Skills</a>
          <a href="/view/game_table_characters/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Characters</a>
          <a href="/view/game_table_locations/${tableId}${qs}" class="block px-4 py-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-700/50 text-sm">Locations</a>
        </div>
      </details>
      ${characterUrl ? `<a href="${characterUrl}${qs}" class="px-4 py-2.5 text-sm font-medium transition-colors ${active === 'character' ? 'text-zinc-200 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent'}">Character</a>` : ''}
    </div>
  `
}
