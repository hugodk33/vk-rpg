import { layout } from './layout'

function radarChart(st: number, dx: number, iq: number, ht: number, size = 165): string {
  const cx = size / 2, cy = size / 2, r = size * 0.4
  const angles = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]
  const max = 20
  const labels = ['ST', 'DX', 'IQ', 'HT']
  const vals = [st, dx, iq, ht]
  const pts = vals.map((v, i) => {
    const pct = Math.min(1, (v ?? 10) / max)
    const a = (angles[i] ?? 0) - Math.PI / 2
    return `${cx + r * pct * Math.cos(a)},${cy + r * pct * Math.sin(a)}`
  }).join(' ')
  const grid = [0.25, 0.5, 0.75, 1].map(pct =>
    angles.map(a => {
      const angle = a - Math.PI / 2
      return `${cx + r * pct * Math.cos(angle)},${cy + r * pct * Math.sin(angle)}`
    }).join(' ')
  )
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="shrink-0">
      ${grid.map(g => `<polygon points="${g}" fill="none" stroke="#3f3f46" stroke-width="0.8"/>`).join('')}
      <polygon points="${pts}" fill="rgba(251,191,36,0.12)" stroke="#f59e0b" stroke-width="1.5"/>
      ${angles.map((a, i) => {
        const v = vals[i] ?? 10
        const pct = Math.min(1, v / max)
        const angle = a - Math.PI / 2
        const px = cx + r * pct * Math.cos(angle)
        const py = cy + r * pct * Math.sin(angle)
        const lx = cx + r * Math.cos(angle)
        const ly = cy + r * Math.sin(angle)
        const lpx = cx + (r + 20) * Math.cos(angle)
        const lpy = cy + (r + 20) * Math.sin(angle)
        return `
          <line x1="${cx}" y1="${cy}" x2="${lx}" y2="${ly}" stroke="#3f3f46" stroke-width="0.8"/>
          <circle cx="${px}" cy="${py}" r="3" fill="#f59e0b"/>
          <text x="${lpx}" y="${lpy + 3}" text-anchor="middle" fill="#a1a1aa" font-size="9" font-weight="600">${labels[i]} ${v}</text>
        `
      }).join('')}
    </svg>
  `
}

function drFor(armors: any[], ...fits: string[]): number {
  let total = 0
  for (const a of armors ?? []) {
    if (fits.some(f => a.fit?.toLowerCase()?.includes(f))) {
      const m = /(\d+)/.exec(a.value ?? '')
      if (m) total += parseInt(m[1] ?? '0', 10)
    }
  }
  return total
}

function hitLocationBadge(label: string, dr: number, style: string): string {
  return `
    <div class="absolute flex flex-col items-center justify-center p-1 bg-zinc-700/90 rounded border border-amber-700/60" style="${style}; width: 52px; height: 44px;">
      <span class="text-zinc-400 uppercase" style="font-size: 7px; line-height: 1; letter-spacing: 0.3px;">${label}</span>
      <span class="text-amber-400 font-bold text-sm leading-none mt-0.5">${dr}</span>
    </div>
  `
}

function armorDiagram(armors: any[]): string {
  const head = drFor(armors, 'head', 'helmet', 'skull')
  const torso = drFor(armors, 'torso', 'chest', 'body', 'full body')
  const armR = drFor(armors, 'arm', 'arms')
  const armL = armR
  const legR = drFor(armors, 'leg', 'legs')
  const legL = legR

  return `
    <div class="relative flex justify-center py-12">
      <div class="relative">
        <svg fill="#52525b" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="width: 90px;">
          <circle cx="256" cy="56" r="56"/>
          <path d="M437,128H75a27,27,0,0,0,0,54H176.88c6.91,0,15,3.09,19.58,15,5.35,13.83,2.73,40.54-.57,61.23l-4.32,24.45a.42.42,0,0,1-.12.35l-34.6,196.81A27.43,27.43,0,0,0,179,511.58a27.06,27.06,0,0,0,31.42-22.29l23.91-136.8S242,320,256,320c14.23,0,21.74,32.49,21.74,32.49l23.91,136.92a27.24,27.24,0,1,0,53.62-9.6L320.66,283a.45.45,0,0,0-.11-.35l-4.33-24.45c-3.3-20.69-5.92-47.4-.57-61.23,4.56-11.88,12.91-15,19.28-15H437a27,27,0,0,0,0-54Z"/>
        </svg>
        <div class="absolute inset-0 w-full">
          ${hitLocationBadge('head', head, 'top: -54px; left: 50%; transform: translateX(-50%);')}
          ${hitLocationBadge('a.rig', armR, 'top: -32px; right: -50px;')}
          ${hitLocationBadge('a.lef', armL, 'top: -32px; left: -50px;')}
          ${hitLocationBadge('torso', torso, 'top: 100px; left: 50%; transform: translateX(-50%);')}
          ${hitLocationBadge('l.rig', legR, 'top: 85px; right: -50px;')}
          ${hitLocationBadge('l.lef', legL, 'top: 85px; left: -50px;')}
        </div>
      </div>
    </div>
  `
}

function section(title: string, content: string, icon = ''): string {
  return `
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-3 border-b border-zinc-700/60 pb-1.5">
        ${icon || ''}
        <h2 class="text-lg font-bold uppercase tracking-wider text-zinc-300">${title}</h2>
      </div>
      ${content}
    </div>
  `
}

function meleeIcon(): string {
  return '<svg class="w-3.5 h-3.5 inline align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>'
}

function rangedIcon(): string {
  return '<svg class="w-3.5 h-3.5 inline align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21L13 11M10 14L21 3M15 15L21 21M3 3L9 9"/></svg>'
}

function isRanged(type?: string): boolean {
  if (!type) return false
  const t = type.toLowerCase()
  return t.includes('range') || t.includes('ranged') || t.includes('bow') || t.includes('thrown')
}

function isMelee(type?: string): boolean {
  if (!type) return true
  const t = type.toLowerCase()
  return t.includes('melee') || t.includes('swing') || t.includes('thrust') || t.includes('sword')
}

export function characterViewer(data: any): string {
  const ch = data.character
  const s = ch.sheet
  const table = data.table
  const name = s?.name || ch.name || 'Character'

  return layout(name, `
    <div class="max-w-6xl mx-auto p-4 md:p-6">
      ${table?.id ? `
        <div class="mb-3 flex items-center justify-between">
          <a href="/view/game_table_scenes/${table.id}" class="text-zinc-500 hover:text-amber-400 text-sm transition-colors">&larr; Back to table</a>
        </div>
        <div class="flex gap-1 border-b border-zinc-700/50 mb-6">
          <a href="/table/${table.id}" class="tab-btn px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent transition-colors">Act</a>
          <a href="/table/${table.id}" class="tab-btn px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent transition-colors">Timeline</a>
          <a href="/table/${table.id}" class="tab-btn px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent transition-colors">Table</a>
          <a href="/game-table-character-viewer/${ch.id}" class="tab-btn px-4 py-2.5 text-sm font-medium text-zinc-200 border-b-2 border-amber-500 transition-colors">Character</a>
        </div>
      ` : ''}
      <div class="bg-zinc-900/90 border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden">

        <div class="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700/60 px-6 py-5">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-3xl font-bold text-amber-100 tracking-tight">${name}</h1>
            </div>
            <div class="text-right">
              <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Points</span>
              <p class="text-amber-400 font-bold text-xl">${s?.points || ch.points || '0'}</p>
            </div>
          </div>
          ${s?.bio ? `<p class="text-xl text-zinc-400 mt-1">${s.bio}</p>` : ''}
          ${s?.backstory ? `<p class="text-zinc-500 text-sm mt-1">${s.backstory}</p>` : ''}
        </div>

        <div class="p-6">

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Core Attributes</h3>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
                <span class="text-zinc-400 text-sm font-semibold"><svg class="w-4 h-4 inline align-text-bottom text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg> ST <span class="text-red-400 text-xl font-bold ml-1">${s?.st ?? '-'}</span></span>
                <span class="text-zinc-400 text-sm font-semibold"><svg class="w-4 h-4 inline align-text-bottom text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> DX <span class="text-emerald-400 text-xl font-bold ml-1">${s?.dx ?? '-'}</span></span>
                <span class="text-zinc-400 text-sm font-semibold"><svg class="w-4 h-4 inline align-text-bottom text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> IQ <span class="text-blue-400 text-xl font-bold ml-1">${s?.iq ?? '-'}</span></span>
                <span class="text-zinc-400 text-sm font-semibold"><svg class="w-4 h-4 inline align-text-bottom text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg> HT <span class="text-purple-400 text-xl font-bold ml-1">${s?.ht ?? '-'}</span></span>
              </div>
              <div class="flex pl-2">
                ${s ? radarChart(s.st ?? 10, s.dx ?? 10, s.iq ?? 10, s.ht ?? 10) : ''}
              </div>
            </div>
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Vitals</h3>
              <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <div class="flex items-center gap-2">
                  <span class="text-zinc-500 text-xs font-semibold uppercase">HP</span>
                  <span class="text-red-400 font-bold text-lg">${s?.hp ?? '-'}</span>
                  <div class="w-24 bg-zinc-700/50 rounded-full h-2"><div class="bg-red-500/80 h-2 rounded-full" style="width: ${Math.min(100, (parseInt(s?.hp) || 10) * 10)}%"></div></div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-zinc-500 text-xs font-semibold uppercase">FP</span>
                  <span class="text-emerald-400 font-bold text-lg">${s?.fatigue ?? '-'}</span>
                  <div class="w-24 bg-zinc-700/50 rounded-full h-2"><div class="bg-emerald-500/80 h-2 rounded-full" style="width: ${Math.min(100, (parseInt(s?.fatigue) || 10) * 10)}%"></div></div>
                </div>
              </div>

              <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Movement</h3>
              <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span class="text-zinc-400 text-sm font-semibold">Spd <span class="text-cyan-400 text-lg font-bold ml-1">${s?.basic_speed ?? '-'}</span></span>
                <span class="text-zinc-400 text-sm font-semibold">Move <span class="text-cyan-400 text-lg font-bold ml-1">${s?.move ?? '-'}</span></span>
                <span class="text-zinc-400 text-sm font-semibold">Enc <span class="text-cyan-400 text-lg font-bold ml-1">${s?.encumbrance ?? '-'}</span></span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              ${section('Advantages',
                !ch.advantages || ch.advantages.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : ch.advantages.map((a: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-3 py-2 flex justify-between items-center mb-1.5 last:mb-0">
                      <span class="text-zinc-200 text-sm font-medium">${a.name}</span>
                      <span class="text-emerald-400 text-xs font-semibold">${a.cost_points}</span>
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
              )}
            </div>
            <div>
              ${section('Disadvantages',
                !ch.disadvantages || ch.disadvantages.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : ch.disadvantages.map((d: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-3 py-2 flex justify-between items-center mb-1.5 last:mb-0">
                      <span class="text-zinc-200 text-sm font-medium">${d.name}</span>
                      <span class="text-red-400 text-xs font-semibold">${d.cost_points}</span>
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
              )}
            </div>
            <div>
              ${section('Skills',
                !ch.skills || ch.skills.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : ch.skills.map((sk: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-3 py-2 mb-1.5 last:mb-0">
                      <div class="flex justify-between items-center">
                        <span class="text-zinc-200 text-sm font-medium">${sk.skill_name}</span>
                        <span class="text-zinc-500 text-xs">${sk.predefinition_type || ''}${sk.predefinition_difficulty ? '/' + sk.predefinition_difficulty : ''}</span>
                      </div>
                      ${sk.effect ? `<p class="text-zinc-500 text-xs mt-0.5">${sk.effect}</p>` : ''}
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
              )}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              ${section('Attacks & Damage',
                !ch.damages || ch.damages.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : ch.damages.map((d: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-3 py-2 mb-1.5 last:mb-0">
                      <div class="flex justify-between items-start">
                        <div>
                          <span class="text-zinc-200 text-sm font-medium">${d.name || 'Unnamed'}</span>
                          ${d.type ? `
                            <span class="text-zinc-500 text-xs ml-1">
                              ${isMelee(d.type) ? meleeIcon() : ''}
                              ${isRanged(d.type) ? rangedIcon() : ''}
                              ${d.type}${d.subtype ? '/' + d.subtype : ''}
                            </span>
                          ` : ''}
                          ${d.range ? `<span class="text-zinc-500 text-xs ml-1">${d.range}</span>` : ''}
                        </div>
                        <span class="text-red-400 font-bold text-sm">${d.value || ''}</span>
                      </div>
                      ${d.description ? `<p class="text-zinc-500 text-xs mt-0.5">${d.description}</p>` : ''}
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>'
              )}
            </div>
            <div>
              ${section('Items',
                !ch.items || ch.items.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : ch.items.map((i: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-3 py-2 mb-1.5 last:mb-0">
                      <div class="flex justify-between items-start">
                        <span class="text-zinc-200 text-sm font-medium">${i.name || 'Unnamed'}</span>
                        ${i.weight ? `<span class="text-zinc-500 text-xs">${i.weight} kg</span>` : ''}
                      </div>
                      <div class="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-zinc-500">
                        ${i.category ? `<span>${i.category}</span>` : ''}
                        ${i.quality ? `<span>${i.quality}</span>` : ''}
                        ${i.condition ? `<span>${i.condition}</span>` : ''}
                        ${i.dimensions ? `<span>${i.dimensions}</span>` : ''}
                      </div>
                      ${i.description ? `<p class="text-zinc-500 text-xs mt-0.5">${i.description}</p>` : ''}
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
              )}
            </div>
            <div>
              ${section('Armor',
                !ch.armors || ch.armors.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">None</p>'
                  : `
                    ${armorDiagram(ch.armors)}
                    <div class="space-y-1 mt-4 border-t border-zinc-700/40 pt-4">
                      ${(ch.armors ?? []).map((a: any) => `
                        <div class="flex justify-between text-xs">
                          <span class="text-zinc-300">${a.name}</span>
                          <span class="text-amber-400/80">${(a.value ?? '').replace('DR ', '')} ${a.fit || ''}</span>
                        </div>
                      `).join('')}
                    </div>
                  `,
                '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
              )}
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-zinc-700/40">
            <a href="/" class="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">&larr; Back</a>
            ${table?.id ? `<a href="/view/game_table_scenes/${table.id}" class="text-amber-500 hover:text-amber-400 text-sm transition-colors">View table &rarr;</a>` : ''}
          </div>

        </div>
      </div>
    </div>
  `)
}
