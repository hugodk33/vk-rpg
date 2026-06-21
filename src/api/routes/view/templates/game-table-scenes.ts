import { layout } from './layout'
import { tabBar } from './tab-bar'

function locationCard(loc: any): string {
  if (!loc) return ''
  return `
    <p class="text-sm text-zinc-500 mt-2">
      <span class="text-blue-400">${loc.name}</span>
      ${loc.region ? `&middot; ${loc.region}${loc.subRegion ? `, ${loc.subRegion}` : ''}` : ''}
      ${loc.address ? `&middot; ${loc.address}` : ''}
    </p>
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
  return `
    <div class="flex items-start gap-3 py-1.5">
      <span class="text-xs text-zinc-600 w-4 mt-0.5">${a.queue}.</span>
      <div class="flex-1">
        <span class="text-sm text-zinc-300">
          ${charId ? `<a href="/game-table-character-viewer/${charId}" class="text-zinc-200 hover:text-blue-400">${charName}</a>` : charName}
          ${a.description ? `&mdash; ${a.description}` : ''}
        </span>
        ${a.dice_roll ? `<span class="text-xs text-zinc-400 ml-1">${a.dice_roll}${a.result ? ` = ${a.result}` : ''}</span>` : ''}
      </div>
    </div>
  `
}

export function gameTableScenes(data: any): string {
  const table = data.table
  const scenes = data.scenes ?? []
  const actUrl = data.actUrl ?? `/session/${table?.id}`
  const isPlayer = data.isPlayer ?? false

  const chapters = new Map<number, any[]>()
  for (const scene of scenes) {
    const ch = scene.chapter || 1
    if (!chapters.has(ch)) chapters.set(ch, [])
    chapters.get(ch)!.push(scene)
  }
  const chapterEntries = [...chapters.entries()]

  return layout(`${table?.title || 'Scenes'} &mdash; Scenes`, `
    <div class="max-w-4xl mx-auto p-6">
      ${tabBar(table?.id, 'timeline', actUrl, undefined, isPlayer)}
      <h1 class="text-3xl font-bold text-amber-100">${table?.title || 'Scenes'}</h1>
      ${table?.intro ? `<p class="text-zinc-400 mt-1 mb-6">${table.intro}</p>` : '<br />'}

      ${scenes.length === 0 ? `
        <p class="text-zinc-500 italic">No scenes yet.</p>
      ` : chapterEntries.map(([chapter, chapterScenes]) => `
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-amber-100 mb-6">Chapter ${chapter}</h2>
          ${chapterScenes.map((scene: any) => `
            <div class="mb-10">
              <h3 class="text-lg font-semibold text-zinc-200 mb-4">${scene.title}</h3>
              ${(() => {
                const narrations = scene.narrations ?? []
                if (narrations.length === 0) return '<p class="text-sm text-zinc-500 italic">No narrations.</p>'
                return narrations.map((n: any, ni: number) => `
                  <div class="mb-5 pl-6 border-l-2 border-zinc-700/50">
                    <div class="flex items-baseline gap-2 mb-1">
                      <span class="text-xs text-zinc-500 font-mono">${scene.moment as number + 1}.${ni + 1}</span>
                      ${n.title ? `<span class="text-sm font-medium text-zinc-300">${n.title}</span>` : ''}
                    </div>
                    <p class="text-base text-zinc-300 leading-relaxed">${n.narration}</p>
                    ${n.location ? locationCard(n.location) : ''}
                    ${(() => {
                      const participants = [
                        ...(n.characters ?? []).map((ch: any) => entityBadge(ch.id, ch.name || ch.username || 'Unknown', 'Player')),
                        ...(n.npcs ?? []).map((npc: any) => entityBadge(npc.characterId, npc.name || 'Unknown', npc.status || 'NPC'))
                      ]
                      return participants.length ? `
                        <div class="flex flex-wrap gap-3 mt-3">
                          ${participants.join('')}
                        </div>
                      ` : ''
                    })()}
                    ${n.actions?.length ? `
                      <div class="mt-3">
                        <p class="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Actions</p>
                        ${[...n.actions].sort((a: any, b: any) => (a.queue ?? 0) - (b.queue ?? 0)).map(actionRow).join('')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')
              })()}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `)
}
