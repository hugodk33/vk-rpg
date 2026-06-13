import { layout } from './layout'

function locationCard(loc: any): string {
  if (!loc) return ''
  return `
    <div class="bg-zinc-800/50 rounded p-3 mt-2 text-sm border-l-2 border-blue-600">
      <div class="font-medium text-blue-300">${loc.name}</div>
      <div class="text-zinc-400">${loc.region}${loc.subRegion ? ` &middot; ${loc.subRegion}` : ''}</div>
      ${loc.address ? `<div class="text-zinc-500">${loc.address}</div>` : ''}
      ${loc.description ? `<p class="text-zinc-400 mt-1">${loc.description}</p>` : ''}
      <div class="flex gap-2 mt-1 text-xs text-zinc-500">
        <span>${loc.area}</span>
        <span>${loc.dimensions}</span>
        ${loc.isIndoor ? '<span class="text-yellow-400">Indoor</span>' : '<span class="text-green-400">Outdoor</span>'}
      </div>
    </div>
  `
}

function entityBadge(id: string, name: string, subtitle: string): string {
  return `
    <a href="/game-table-character-viewer/${id}"
       class="inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 rounded px-3 py-1.5 text-sm transition-colors">
      <span class="w-2 h-2 rounded-full bg-blue-500"></span>
      <div>
        <div class="font-medium text-zinc-200">${name}</div>
        <div class="text-xs text-zinc-500">${subtitle}</div>
      </div>
    </a>
  `
}

function actionRow(a: any): string {
  const charId = a.character?.id || ''
  const charName = a.character?.name || a.character?.username || 'Unknown'
  const statusClass = a.result && a.test
    ? (Number(a.result) <= Number(a.test) ? 'text-green-400' : 'text-red-400')
    : 'text-zinc-400'
  return `
    <div class="flex items-start gap-3 py-2 border-b border-zinc-700/50 last:border-0">
      <span class="text-xs text-zinc-500 w-4 mt-1">${a.queue}.</span>
      <div class="flex-1">
        <div class="flex items-baseline gap-2">
          ${charId ? `<a href="/game-table-character-viewer/${charId}" class="font-medium text-sm text-zinc-200 hover:text-blue-400">${charName}</a>` : `<span class="font-medium text-sm">${charName}</span>`}
          <span class="text-xs text-zinc-500">${a.test ? `TN ${a.test}` : ''}</span>
        </div>
        <p class="text-sm text-zinc-300">${a.description}</p>
        ${a.dice_roll ? `<span class="text-xs ${statusClass}">${a.dice_roll}${a.result ? ` = ${a.result}` : ''}</span>` : ''}
      </div>
    </div>
  `
}

function narrationBlock(n: any): string {
  const participants = [
    ...(n.characters ?? []).map((ch: any) => entityBadge(ch.id, ch.name || ch.username || 'Unknown', 'Player')),
    ...(n.npcs ?? []).map((npc: any) => entityBadge(npc.characterId, npc.name || 'Unknown', npc.status || 'NPC'))
  ]

  return `
    <div class="bg-zinc-800/30 rounded-lg p-4 mb-3">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-medium text-zinc-300">${n.title}</span>
        <span class="text-xs text-zinc-500">moment ${n.moment}</span>
      </div>
      <p class="text-sm text-zinc-400 italic mb-3">${n.narration}</p>

      ${n.location ? locationCard(n.location) : ''}

      ${participants.length ? `
        <div class="flex flex-wrap gap-2 mb-3">
          ${participants.join('')}
        </div>
      ` : ''}

      ${n.actions?.length ? `
        <div class="mt-3">
          <div class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Actions</div>
          ${n.actions.map(actionRow).join('')}
        </div>
      ` : ''}
    </div>
  `
}

export function gameTableScenes(data: any): string {
  const table = data.table
  const scenes = data.scenes ?? []

  return layout(`${table?.title || 'Scenes'} — Scenes`, `
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-6">
        <a href="/" class="text-blue-400 hover:text-blue-300 text-sm">&larr; Back to tables</a>
        <h1 class="text-3xl font-bold mt-2">${table?.title || 'Scenes'}</h1>
        ${table?.intro ? `<p class="text-zinc-400 mt-1">${table.intro}</p>` : ''}
        <div class="flex gap-3 mt-3">
          <a href="/view/game_table_characters/${table?.id}" class="text-emerald-400 hover:text-emerald-300 text-sm">View Characters &rarr;</a>
        </div>
      </div>

      ${scenes.length === 0 ? `
        <div class="bg-zinc-800 rounded p-6 text-center text-zinc-400">No scenes available.</div>
      ` : scenes.map((scene: any) => `
        <div class="mb-6">
          <div class="flex items-baseline gap-3 mb-3">
            <h2 class="text-xl font-semibold">${scene.title}</h2>
            <span class="text-sm text-zinc-500">Chapter ${scene.chapter} &middot; Moment ${scene.moment}</span>
          </div>

          ${scene.narrations?.length ? scene.narrations.map(narrationBlock).join('') : `
            <div class="text-sm text-zinc-500 italic">No narrations for this scene.</div>
          `}
        </div>
      `).join('')}
    </div>
  `)
}
