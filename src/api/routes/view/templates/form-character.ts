import { layout } from './layout'

export function formCharacter(data?: any): string {
  const isEdit = !!data?.character?.id
  const ch = data?.character || {}
  const s = ch.sheet || {}
  const t = data?.table
  return layout(isEdit ? 'Editar Personagem' : 'Novo Personagem', `
    <div class="max-w-3xl mx-auto p-6">
      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-6">
        <h1 class="text-2xl font-bold text-amber-100 mb-6">${isEdit ? 'Editar Personagem' : 'Novo Personagem'}</h1>
        <form method="POST" action="${isEdit ? `/api/characters/${ch.id}` : '/api/characters'}" class="space-y-6">
          ${isEdit ? `<input type="hidden" name="id" value="${ch.id}"/>` : ''}
          <input type="hidden" name="table_id" value="${data?.table_id || t?.id || ''}"/>

          <div class="border-b border-zinc-700/40 pb-4">
            <h2 class="text-lg font-semibold text-zinc-300 mb-4">Identidade</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Nome</label>
                <input name="name" value="${s.name || ch.name || ''}" required
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Pontos Totais</label>
                <input name="points" type="number" value="${s.points ?? ''}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Bio / Descrição</label>
              <textarea name="bio" rows="2"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">${s.bio || ''}</textarea>
            </div>
            <div class="mt-4">
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">História / Backstory</label>
              <textarea name="backstory" rows="3"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">${s.backstory || ''}</textarea>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-zinc-300 mb-4">Atributos</h2>
            <div class="grid grid-cols-4 gap-3">
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">ST</label>
                <input name="st" type="number" value="${s.st ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">DX</label>
                <input name="dx" type="number" value="${s.dx ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">IQ</label>
                <input name="iq" type="number" value="${s.iq ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">HT</label>
                <input name="ht" type="number" value="${s.ht ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">HP</label>
              <input name="hp" type="number" value="${s.hp ?? 10}"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
            </div>
            <div>
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Fatigue (FP)</label>
              <input name="fatigue" type="number" value="${s.fatigue ?? 10}"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
            </div>
          </div>

          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Encumbrância</label>
            <select name="encumbrance"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">
              <option value="" ${!s.encumbrance ? 'selected' : ''}>Nenhuma (0)</option>
              <option value="leve" ${s.encumbrance === 'leve' ? 'selected' : ''}>Leve (1)</option>
              <option value="media" ${s.encumbrance === 'media' ? 'selected' : ''}>Média (2)</option>
              <option value="pesada" ${s.encumbrance === 'pesada' ? 'selected' : ''}>Pesada (3)</option>
              <option value="excessiva" ${s.encumbrance === 'excessiva' ? 'selected' : ''}>Excessiva (4)</option>
            </select>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button type="submit"
              class="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              ${isEdit ? 'Salvar Alterações' : 'Criar Personagem'}
            </button>
            <a href="/" class="text-zinc-400 hover:text-zinc-300 text-sm transition-colors">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  `)
}
