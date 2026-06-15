import { layout } from './layout'

export function narratorDashboard(data: any): string {
  const narrator = data?.narrator || {}
  const tables = data?.tables || []

  return layout(`Painel — ${narrator.name || 'Narrador'}`, `
    <div class="max-w-5xl mx-auto p-6">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-amber-100">Painel do Narrador</h1>
          <p class="text-zinc-400 text-sm mt-1">${narrator.name || 'Narrador'} — ${tables.length} mesa${tables.length !== 1 ? 's' : ''}</p>
        </div>
        <a href="/form/game-table/new" class="bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          + Nova Mesa
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${tables.map((t: any) => {
          const chars = t.characters || []
          const npcs = t.npcs || []
          const scenes = t.scenes || []
          const players = t.players || []
          return `
            <div class="bg-zinc-800/60 border border-zinc-700/50 rounded-xl overflow-hidden hover:border-amber-700/50 transition-colors">
              <div class="px-5 py-4 border-b border-zinc-700/40">
                <h2 class="text-lg font-bold text-zinc-100">${t.title || 'Sem título'}</h2>
                ${t.system ? `<span class="text-xs text-zinc-500 uppercase tracking-wider">${t.system}</span>` : ''}
                ${t.intro ? `<p class="text-zinc-400 text-sm mt-1.5 line-clamp-2">${t.intro}</p>` : ''}
              </div>
              <div class="px-5 py-4">
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div class="text-center">
                    <p class="text-xl font-bold text-amber-400">${players.length}</p>
                    <p class="text-zinc-500 text-xs uppercase tracking-wider">Jogadores</p>
                  </div>
                  <div class="text-center">
                    <p class="text-xl font-bold text-emerald-400">${chars.length}</p>
                    <p class="text-zinc-500 text-xs uppercase tracking-wider">Personagens</p>
                  </div>
                  <div class="text-center">
                    <p class="text-xl font-bold text-blue-400">${scenes.length}</p>
                    <p class="text-zinc-500 text-xs uppercase tracking-wider">Cenas</p>
                  </div>
                </div>
                ${npcs.length > 0 ? `
                  <div class="text-xs text-zinc-500 mb-3">
                    <span class="text-zinc-400">NPCs:</span>
                    ${npcs.slice(0, 4).map((n: any) => `<span class="ml-1">${n.name || n.character_name || '?'}</span>`).join(', ')}
                    ${npcs.length > 4 ? `<span class="ml-1 text-zinc-600">+${npcs.length - 4}</span>` : ''}
                  </div>
                ` : ''}
                <div class="flex gap-2">
                  <a href="/view/game_table_scenes/${t.id}"
                    class="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
                    Cenas
                  </a>
                  <a href="/view/game_table_characters/${t.id}"
                    class="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
                    Personagens
                  </a>
                  <a href="/form/game-table/${t.id}"
                    class="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
                    Editar
                  </a>
                </div>
              </div>
            </div>
          `
        }).join('')}
        ${tables.length === 0 ? `
          <div class="col-span-full text-center py-16">
            <p class="text-zinc-500 text-lg mb-2">Nenhuma mesa ainda</p>
            <p class="text-zinc-600 text-sm">Crie sua primeira mesa para começar a campanha</p>
          </div>
        ` : ''}
      </div>

      <div class="mt-8 text-center">
        <a href="/" class="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">&larr; Voltar ao início</a>
      </div>
    </div>
  `)
}
