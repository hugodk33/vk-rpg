import { layout } from './layout'

export function gameTableList(tables: any[], search: string): string {
  return layout('Game Tables', `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Game Tables</h1>

      <form method="GET" action="/" class="mb-8">
        <div class="flex gap-2">
          <input
            type="text"
            name="search"
            value="${search}"
            placeholder="Search tables by title or narrator..."
            class="flex-1 bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-zinc-100 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold">Search</button>
          ${search ? '<a href="/" class="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded font-semibold">Clear</a>' : ''}
        </div>
      </form>

      <div class="space-y-4">
        ${tables.length === 0 ? `
          <div class="bg-zinc-800 rounded p-6 text-center text-zinc-400">
            ${search ? 'No tables found for "' + search + '".' : 'No tables available.'}
          </div>
        ` : tables.map((t: any) => `
          <div class="bg-zinc-800 rounded p-5 hover:bg-zinc-750 transition-colors">
            <div class="flex justify-between items-start mb-2">
              <h2 class="text-xl font-semibold">${t.title}</h2>
              <span class="text-sm text-zinc-400">${t.players?.length ?? 0} players</span>
            </div>
            <p class="text-zinc-400 text-sm mb-3">${t.intro ?? ''}</p>
            <div class="flex justify-between items-center text-sm text-zinc-500">
              <span>Narrator: ${t.narrator?.username ?? 'Unknown'}</span>
              <div class="flex gap-3">
                <a href="/view/game_table_characters/${t.id}" class="text-emerald-400 hover:text-emerald-300">Characters →</a>
                <a href="/view/game_table_scenes/${t.id}" class="text-blue-400 hover:text-blue-300">Scenes →</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `)
}
