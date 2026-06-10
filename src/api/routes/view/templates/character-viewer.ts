import { layout } from './layout'

export function characterViewer(data: any): string {
  const ch = data.character
  const sheet = ch.sheet
  return layout(sheet?.name || ch.name || 'Character', `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">${sheet?.name || ch.name}</h1>
      <hr class="text-3xl font-bold mb-1"/>
      <p class="text-lg text-zinc-300">${sheet?.points || ch.points}</p>
      <p class="text-lg text-zinc-300">${sheet?.bio || ch.bio}</p>
      <p class="text-lg text-zinc-300 mb-3">${sheet?.backstory || ch.backstory}</p>
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">HP</span>
          <p class="text-xl font-semibold">${sheet?.hp ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">Fatigue</span>
          <p class="text-xl font-semibold">${sheet?.fatigue ?? '-'}</p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">ST</span>
          <p class="text-xl font-semibold">${sheet?.st ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">DX</span>
          <p class="text-xl font-semibold">${sheet?.dx ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">IQ</span>
          <p class="text-xl font-semibold">${sheet?.iq ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">HT</span>
          <p class="text-xl font-semibold">${sheet?.ht ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">Basic Speed</span>
          <p class="text-xl font-semibold">${sheet?.basic_speed ? `${sheet.basic_speed} km/h` : '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">Move</span>
          <p class="text-xl font-semibold">${sheet?.move ?? '-'}</p>
        </div>
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">Encumbrance</span>
          <p class="text-xl font-semibold">${sheet?.encumbrance ?? '-'}</p>
        </div>
      </div>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Advantages</h2>
        <div class="space-y-2">
          ${(ch.advantages ?? []).map((a: any) => `
            <div class="bg-zinc-800 rounded p-3 flex justify-between">
              <span>${a.name}</span>
              <span class="text-emerald-400">${a.cost_points}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Disadvantages</h2>
        <div class="space-y-2">
          ${(ch.disadvantages ?? []).map((d: any) => `
            <div class="bg-zinc-800 rounded p-3 flex justify-between">
              <span>${d.name}</span>
              <span class="text-red-400">${d.cost_points}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Skills</h2>
        <div class="space-y-2">
          ${(ch.skills ?? []).map((s: any) => `
            <div class="bg-zinc-800 rounded p-3">
              <div class="flex justify-between">
                <span>${s.skill_name}</span>
                <span class="text-zinc-400 text-sm">${s.predefinition_type} / ${s.predefinition_difficulty}</span>
              </div>
              <p class="text-zinc-400 text-sm mt-1">${s.effect}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Armors</h2>
        <div class="space-y-2">
          ${(ch.armors ?? []).map((a: any) => `
            <div class="bg-zinc-800 rounded p-3 flex justify-between">
              <span>${a.name}</span>
              <span class="text-zinc-400 text-sm">DR ${a.value ?? '-'}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-3">Items</h2>
        <div class="space-y-2">
          ${(ch.items ?? []).map((i: any) => `
            <div class="bg-zinc-800 rounded p-3 flex justify-between">
              <span>${i.name}</span>
              <span class="text-zinc-400 text-sm">DR ${i.value ?? '-'}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <a href="/" class="inline-block mt-8 text-blue-400 hover:text-blue-300">← Back</a>
    </div>
  `)
}
