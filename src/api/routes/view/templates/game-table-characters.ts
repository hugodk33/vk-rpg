import { layout } from './layout'

export function gameTableCharacters(data: any): string {
  const table = data.table
  const characters = data.characters ?? []

  return layout(`${table?.title || 'Characters'} — Characters`, `
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-6">
        <a href="/" class="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to tables</a>
        <h1 class="text-3xl font-bold mt-2">${table?.title || 'Characters'}</h1>
        ${table?.intro ? `<p class="text-zinc-400 mt-1">${table.intro}</p>` : ''}
      </div>

      ${characters.length === 0 ? `
        <div class="bg-zinc-800 rounded p-6 text-center text-zinc-400">No characters in this table.</div>
      ` : characters.map((ch: any) => `
        <a href="/game-table-character-viewer/${ch.id}" class="block bg-zinc-800 rounded p-4 mb-3 hover:bg-zinc-750 transition-colors">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold">${ch.sheet?.name || ch.name || 'Unnamed'}</h2>
              <p class="text-sm text-zinc-400">${ch.user?.username ?? 'Unknown player'}</p>
            </div>
            <div class="flex gap-3 text-sm text-zinc-400">
              ${ch.sheet ? `
                <span>HP ${ch.sheet.hp ?? '-'}</span>
                <span>ST ${ch.sheet.st ?? '-'}</span>
                <span>DX ${ch.sheet.dx ?? '-'}</span>
                <span>IQ ${ch.sheet.iq ?? '-'}</span>
                <span>HT ${ch.sheet.ht ?? '-'}</span>
              ` : ''}
            </div>
          </div>
        </a>
      `).join('')}
    </div>
  `)
}
