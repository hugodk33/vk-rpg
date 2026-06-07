function layout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - VKRPG</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-900 text-zinc-100 min-h-screen">
  ${content}
</body>
</html>`
}

export function characterViewer(data: any): string {
  const ch = data.character
  const sheet = ch.sheet

  return layout(sheet?.name || ch.name || 'Character', `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">${sheet?.name || ch.name}</h1>
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-zinc-800 rounded p-4">
          <span class="text-zinc-400 text-sm">HP</span>
          <p class="text-xl font-semibold">${sheet?.hp ?? '-'}</p>
        </div>
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
          <p class="text-xl font-semibold">${sheet?.basic_speed ?? '-'}</p>
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

      <a href="/" class="inline-block mt-8 text-blue-400 hover:text-blue-300">← Back</a>
    </div>
  `)
}
