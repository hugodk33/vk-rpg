import { layout } from './layout'

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
    <div class="absolute flex flex-col items-center justify-center p-1 bg-zinc-700/90 rounded border border-amber-700/60" style="${style}; width: 58px; height: 48px;">
      <span class="text-zinc-400 uppercase" style="font-size: 7px; line-height: 1.1; letter-spacing: 0.5px;">${label}</span>
      <span class="text-amber-400 font-bold text-base leading-none mt-0.5">${dr}</span>
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
    <div class="relative flex justify-center py-14">
      <div class="relative">
        <svg fill="#71717a" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="width: 100px;">
          <circle cx="256" cy="56" r="56"/>
          <path d="M437,128H75a27,27,0,0,0,0,54H176.88c6.91,0,15,3.09,19.58,15,5.35,13.83,2.73,40.54-.57,61.23l-4.32,24.45a.42.42,0,0,1-.12.35l-34.6,196.81A27.43,27.43,0,0,0,179,511.58a27.06,27.06,0,0,0,31.42-22.29l23.91-136.8S242,320,256,320c14.23,0,21.74,32.49,21.74,32.49l23.91,136.92a27.24,27.24,0,1,0,53.62-9.6L320.66,283a.45.45,0,0,0-.11-.35l-4.33-24.45c-3.3-20.69-5.92-47.4-.57-61.23,4.56-11.88,12.91-15,19.28-15H437a27,27,0,0,0,0-54Z"/>
        </svg>
        <div class="absolute inset-0 w-full">
          ${hitLocationBadge('cabeça', head, 'top: -48px; left: 50%; transform: translateX(-50%);')}
          ${hitLocationBadge('b.dir', armR, 'top: -16px; right: -48px;')}
          ${hitLocationBadge('b.esq', armL, 'top: -16px; left: -48px;')}
          ${hitLocationBadge('torso', torso, 'top: 120px; left: 50%; transform: translateX(-50%);')}
          ${hitLocationBadge('p.dir', legR, 'top: 90px; right: -48px;')}
          ${hitLocationBadge('p.esq', legL, 'top: 90px; left: -48px;')}
        </div>
      </div>
    </div>
  `
}

function section(title: string, content: string, icon = ''): string {
  return `
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-3 border-b border-zinc-700/60 pb-1.5">
        ${icon ? `<span class="text-amber-500 text-sm">${icon}</span>` : ''}
        <h2 class="text-lg font-bold uppercase tracking-wider text-zinc-300">${title}</h2>
      </div>
      ${content}
    </div>
  `
}

export function characterViewer(data: any): string {
  const ch = data.character
  const s = ch.sheet
  const table = data.table
  const name = s?.name || ch.name || 'Character'

  return layout(name, `
    <div class="max-w-5xl mx-auto p-4 md:p-6">
      <div class="bg-zinc-900/90 border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden">

        <div class="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700/60 px-6 py-5">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-3xl font-bold text-amber-100 tracking-tight">${name}</h1>
              <p class="text-zinc-400 text-sm mt-1">${s?.points || ch.points || ''}</p>
            </div>
            ${table?.id ? `<a href="/view/game_table_scenes/${table.id}" class="text-xs text-amber-500 hover:text-amber-400 underline underline-offset-2">voltar à mesa</a>` : ''}
          </div>
          ${s?.bio || s?.backstory ? `
            <div class="mt-3 pt-3 border-t border-zinc-700/40 text-zinc-400 text-sm leading-relaxed">
              ${s?.bio || ''}${s?.bio && s?.backstory ? '<br/>' : ''}${s?.backstory || ''}
            </div>
          ` : ''}
        </div>

        <div class="p-6">

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Atributos Básicos</h3>
              <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="flex flex-col items-center bg-zinc-800/80 rounded-lg border border-zinc-700/60 px-3 py-3">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">ST</span>
                  <span class="text-red-400 text-3xl font-bold leading-tight mt-0.5">${s?.st ?? '-'}</span>
                </div>
                <div class="flex flex-col items-center bg-zinc-800/80 rounded-lg border border-zinc-700/60 px-3 py-3">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">DX</span>
                  <span class="text-emerald-400 text-3xl font-bold leading-tight mt-0.5">${s?.dx ?? '-'}</span>
                </div>
                <div class="flex flex-col items-center bg-zinc-800/80 rounded-lg border border-zinc-700/60 px-3 py-3">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">IQ</span>
                  <span class="text-blue-400 text-3xl font-bold leading-tight mt-0.5">${s?.iq ?? '-'}</span>
                </div>
                <div class="flex flex-col items-center bg-zinc-800/80 rounded-lg border border-zinc-700/60 px-3 py-3">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">HT</span>
                  <span class="text-purple-400 text-3xl font-bold leading-tight mt-0.5">${s?.ht ?? '-'}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-zinc-400 text-sm font-semibold uppercase tracking-wider">HP</span>
                    <span class="text-2xl font-bold text-red-400">${s?.hp ?? '-'}</span>
                  </div>
                  <div class="w-full bg-zinc-700/50 rounded-full h-2.5"><div class="bg-red-500/80 h-2.5 rounded-full" style="width: ${Math.min(100, (parseInt(s?.hp) || 10) * 10)}%"></div></div>
                </div>
                <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-zinc-400 text-sm font-semibold uppercase tracking-wider">FP</span>
                    <span class="text-2xl font-bold text-emerald-400">${s?.fatigue ?? '-'}</span>
                  </div>
                  <div class="w-full bg-zinc-700/50 rounded-full h-2.5"><div class="bg-emerald-500/80 h-2.5 rounded-full" style="width: ${Math.min(100, (parseInt(s?.fatigue) || 10) * 10)}%"></div></div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="flex flex-col items-center bg-zinc-800/40 rounded-lg border border-zinc-700/40 px-3 py-2">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">B. Speed</span>
                  <span class="text-cyan-400 text-lg font-bold leading-tight mt-0.5">${s?.basic_speed ? `${s.basic_speed} km/h` : '-'}</span>
                </div>
                <div class="flex flex-col items-center bg-zinc-800/40 rounded-lg border border-zinc-700/40 px-3 py-2">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Move</span>
                  <span class="text-cyan-400 text-lg font-bold leading-tight mt-0.5">${s?.move ?? '-'}</span>
                </div>
                <div class="flex flex-col items-center bg-zinc-800/40 rounded-lg border border-zinc-700/40 px-3 py-2">
                  <span class="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Enc.</span>
                  <span class="text-cyan-400 text-lg font-bold leading-tight mt-0.5">${s?.encumbrance ?? '-'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 text-center">Armadura (DR)</h3>
              <div class="bg-zinc-800/40 rounded-xl border border-zinc-700/40 p-3">
                ${armorDiagram(ch.armors)}
                ${(ch.armors ?? []).length > 0 ? `
                  <div class="space-y-1.5 border-t border-zinc-700/40 pt-3">
                    ${(ch.armors ?? []).map((a: any) => `
                      <div class="flex justify-between text-xs">
                        <span class="text-zinc-300">${a.name}</span>
                        <span class="text-amber-400/80 font-medium">${(a.value ?? '').replace('DR ', '')} — ${a.fit || '?'}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : '<p class="text-zinc-600 text-xs text-center italic mt-3">Sem armadura</p>'}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              ${section('Ataques & Danos',
                !ch.damages || ch.damages.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">Nenhum</p>'
                  : ch.damages.map((d: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-3 mb-2 last:mb-0">
                      <div class="flex justify-between items-start">
                        <div>
                          <span class="text-zinc-200 font-medium">${d.name || 'Sem nome'}</span>
                          ${d.type ? `<span class="text-zinc-500 text-xs ml-2">${d.type}${d.subtype ? '/' + d.subtype : ''}</span>` : ''}
                          ${d.range ? `<span class="text-zinc-500 text-xs ml-2">alcance ${d.range}</span>` : ''}
                        </div>
                        <span class="text-red-400 font-bold text-sm">${d.value || ''}</span>
                      </div>
                      ${d.description ? `<p class="text-zinc-500 text-xs mt-1">${d.description}</p>` : ''}
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>'
              )}
            </div>

            <div>
              ${section('Itens',
                !ch.items || ch.items.length === 0
                  ? '<p class="text-zinc-600 text-sm italic">Nenhum</p>'
                  : ch.items.map((i: any) => `
                    <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-3 mb-2 last:mb-0">
                      <div class="flex justify-between items-start">
                        <span class="text-zinc-200 font-medium">${i.name || 'Sem nome'}</span>
                        ${i.weight ? `<span class="text-zinc-500 text-xs">${i.weight} kg</span>` : ''}
                      </div>
                      <div class="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-zinc-500">
                        ${i.category ? `<span>Cat: ${i.category}</span>` : ''}
                        ${i.quality ? `<span>Qualidade: ${i.quality}</span>` : ''}
                        ${i.condition ? `<span>Cond.: ${i.condition}</span>` : ''}
                        ${i.dimensions ? `<span>Dim.: ${i.dimensions}</span>` : ''}
                        ${i.type !== undefined ? `<span>Tipo: ${i.type}</span>` : ''}
                      </div>
                      ${i.description ? `<p class="text-zinc-500 text-xs mt-1 border-t border-zinc-700/30 pt-1">${i.description}</p>` : ''}
                    </div>
                  `).join(''),
                '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
              )}
            </div>
          </div>

          ${section('Vantagens',
            !ch.advantages || ch.advantages.length === 0
              ? '<p class="text-zinc-600 text-sm italic">Nenhuma</p>'
              : ch.advantages.map((a: any) => `
                <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-2.5 flex justify-between items-center mb-2 last:mb-0">
                  <span class="text-zinc-200 font-medium">${a.name}</span>
                  <span class="text-emerald-400 text-sm font-semibold">${a.cost_points} pts</span>
                </div>
              `).join(''),
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
          )}

          ${section('Desvantagens',
            !ch.disadvantages || ch.disadvantages.length === 0
              ? '<p class="text-zinc-600 text-sm italic">Nenhuma</p>'
              : ch.disadvantages.map((d: any) => `
                <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-2.5 flex justify-between items-center mb-2 last:mb-0">
                  <span class="text-zinc-200 font-medium">${d.name}</span>
                  <span class="text-red-400 text-sm font-semibold">${d.cost_points} pts</span>
                </div>
              `).join(''),
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
          )}

          ${section('Perícias',
            !ch.skills || ch.skills.length === 0
              ? '<p class="text-zinc-600 text-sm italic">Nenhuma</p>'
              : ch.skills.map((sk: any) => `
                <div class="bg-zinc-800/60 rounded-lg border border-zinc-700/40 px-4 py-2.5 mb-2 last:mb-0">
                  <div class="flex justify-between items-center">
                    <span class="text-zinc-200 font-medium">${sk.skill_name}</span>
                    <span class="text-zinc-400 text-xs">${sk.predefinition_type || ''}${sk.predefinition_difficulty ? '/' + sk.predefinition_difficulty : ''}</span>
                  </div>
                  ${sk.effect ? `<p class="text-zinc-500 text-xs mt-0.5">${sk.effect}</p>` : ''}
                </div>
              `).join(''),
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
          )}

          <div class="flex items-center justify-between mt-8 pt-4 border-t border-zinc-700/40">
            <a href="/" class="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">&larr; Voltar</a>
            ${table?.id ? `<a href="/view/game_table_scenes/${table.id}" class="text-amber-500 hover:text-amber-400 text-sm transition-colors">Ver mesas &rarr;</a>` : ''}
          </div>

        </div>
      </div>
    </div>
  `)
}
