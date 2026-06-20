import { layout } from './layout'

export function formCharacter(data?: any): string {
  const isEdit = !!data?.character?.id
  const ch = data?.character || {}
  const s = ch.sheet || {}
  const t = data?.table

  if (isEdit) {
    return layout('Edit Character', `
    <div class="max-w-3xl mx-auto p-6">
      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-6">
        <h1 class="text-2xl font-bold text-amber-100 mb-6">Edit Character</h1>
        <form id="editForm" class="space-y-6">
          <input type="hidden" id="editCharId" value="${ch.id}"/>
          <input type="hidden" id="editTableId" value="${t?.id || data?.table_id || ''}"/>

          <div class="border-b border-zinc-700/40 pb-4">
            <h2 class="text-lg font-semibold text-zinc-300 mb-4">Identity</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Name</label>
                <input id="editName" value="${s.name || ch.name || ''}" required
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Total Points</label>
                <input id="editPoints" type="number" value="${s.points ?? 150}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Bio</label>
              <textarea id="editBio" rows="2"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">${s.bio || ''}</textarea>
            </div>
            <div class="mt-4">
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Backstory</label>
              <textarea id="editBackstory" rows="3"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">${s.backstory || ''}</textarea>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-zinc-300 mb-4">Attributes</h2>
            <div class="grid grid-cols-4 gap-3">
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">ST</label>
                <input id="editSt" type="number" value="${s.st ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">DX</label>
                <input id="editDx" type="number" value="${s.dx ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">IQ</label>
                <input id="editIq" type="number" value="${s.iq ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
              <div>
                <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">HT</label>
                <input id="editHt" type="number" value="${s.ht ?? 10}"
                  class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">HP</label>
              <input id="editHp" type="number" value="${s.hp ?? 10}"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
            </div>
            <div>
              <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Fatigue (FP)</label>
              <input id="editFp" type="number" value="${s.fatigue ?? 10}"
                class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
            </div>
          </div>

          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Encumbrance</label>
            <select id="editEnc"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">
              <option value="None" ${!s.encumbrance || s.encumbrance === 'None' ? 'selected' : ''}>None (0)</option>
              <option value="Light" ${s.encumbrance === 'Light' ? 'selected' : ''}>Light (1)</option>
              <option value="Medium" ${s.encumbrance === 'Medium' ? 'selected' : ''}>Medium (2)</option>
              <option value="Heavy" ${s.encumbrance === 'Heavy' ? 'selected' : ''}>Heavy (3)</option>
              <option value="Extra" ${s.encumbrance === 'Extra' ? 'selected' : ''}>Extra (4)</option>
            </select>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <button type="submit"
              class="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              Save Changes
            </button>
            <a href="/" class="text-zinc-400 hover:text-zinc-300 text-sm transition-colors">Cancel</a>
          </div>
        </form>
      </div>
    </div>
    <script>
    document.getElementById('editForm').addEventListener('submit', async (e) => {
      e.preventDefault()
      const payload = {
        id: document.getElementById('editCharId').value,
        table_id: document.getElementById('editTableId').value,
        user_id: '',
        sheet: {
          name: document.getElementById('editName').value,
          bio: document.getElementById('editBio').value,
          backstory: document.getElementById('editBackstory').value,
          points: parseInt(document.getElementById('editPoints').value) || 150,
          hp: parseInt(document.getElementById('editHp').value) || 10,
          st: parseInt(document.getElementById('editSt').value) || 10,
          dx: parseInt(document.getElementById('editDx').value) || 10,
          iq: parseInt(document.getElementById('editIq').value) || 10,
          ht: parseInt(document.getElementById('editHt').value) || 10,
          fatigue: parseInt(document.getElementById('editFp').value) || 10,
          encumbrance: document.getElementById('editEnc').value
        }
      }
      const res = await fetch('/game-table-character', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = await res.json()
      if (result.success) {
        window.location.href = '/game-table-character-viewer/' + payload.id
      } else {
        alert('Error: ' + (result.error || 'Unknown'))
      }
    })
    </script>
    `)
  }

  return layout('New Character', `
<div class="max-w-6xl mx-auto p-4">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-bold text-amber-100">New Character</h1>
      <p class="text-zinc-400 text-sm">${t?.title || ''} — GURPS</p>
    </div>
    <div class="text-right">
      <div class="text-3xl font-bold text-amber-400" id="totalPointsDisplay">150</div>
      <div class="text-xs text-zinc-500 uppercase tracking-wider">Total Points</div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <h2 class="text-lg font-semibold text-amber-100 mb-4">Identity</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Name</label>
            <input id="chName" value=""
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Bio</label>
            <input id="chBio" value=""
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
        </div>
        <div class="mt-3">
          <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Backstory</label>
          <textarea id="chBackstory" rows="2"
            class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"></textarea>
        </div>
      </div>

      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <h2 class="text-lg font-semibold text-amber-100 mb-4">Attributes</h2>
        <div class="grid grid-cols-4 gap-3 mb-4">
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">ST</label>
            <input id="chSt" type="number" value="10" min="1" max="20"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">DX</label>
            <input id="chDx" type="number" value="10" min="1" max="20"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">IQ</label>
            <input id="chIq" type="number" value="10" min="1" max="20"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 text-center">HT</label>
            <input id="chHt" type="number" value="10" min="1" max="20"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-2 text-center text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">HP</label>
            <input id="chHp" type="number" value="10" min="1" max="50"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Fatigue (FP)</label>
            <input id="chFp" type="number" value="10" min="1" max="50"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Encumbrance</label>
            <select id="chEnc"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500">
              <option value="None">None (0)</option>
              <option value="Light">Light (1)</option>
              <option value="Medium">Medium (2)</option>
              <option value="Heavy">Heavy (3)</option>
              <option value="Extra">Extra (4)</option>
            </select>
          </div>
          <div>
            <label class="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Total Points</label>
            <input id="chPoints" type="number" value="150" min="0" max="10000"
              class="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-500"/>
          </div>
        </div>
      </div>

      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-amber-100">Advantages</h2>
          <span class="text-sm text-zinc-500" id="advCount">0 selected</span>
        </div>
        <div id="advantagesList" class="space-y-2 max-h-60 overflow-y-auto"></div>
      </div>

      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-amber-100">Disadvantages</h2>
          <span class="text-sm text-zinc-500" id="disCount">0 selected</span>
        </div>
        <div id="disadvantagesList" class="space-y-2 max-h-60 overflow-y-auto"></div>
      </div>

      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-amber-100">Skills</h2>
          <span class="text-sm text-zinc-500" id="skCount">0 selected</span>
        </div>
        <div id="skillsList" class="space-y-2 max-h-60 overflow-y-auto"></div>
      </div>

      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-amber-100">Items</h2>
          <span class="text-sm text-zinc-500" id="itemCount">0 selected</span>
        </div>
        <div id="itemsList" class="space-y-2 max-h-60 overflow-y-auto"></div>
      </div>
    </div>

    <div class="space-y-6">
      <div class="bg-zinc-800/80 border border-zinc-700/50 rounded-xl p-5 sticky top-20">
        <h2 class="text-lg font-semibold text-amber-100 mb-4">Points Budget</h2>
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-zinc-400">Total</span>
            <span class="text-zinc-100 font-mono" id="budgetTotal">150</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-zinc-400">Spent</span>
            <span class="text-amber-400 font-mono" id="budgetSpent">0</span>
          </div>
          <div class="border-t border-zinc-700/40 pt-3 flex justify-between font-semibold">
            <span>Remaining</span>
            <span class="font-mono" id="budgetRemain">150</span>
          </div>
          <div class="w-full bg-zinc-900 rounded-full h-2 mt-2">
            <div id="budgetBar" class="bg-amber-500 h-2 rounded-full transition-all" style="width:0%"></div>
          </div>
        </div>
        <button id="saveBtn"
          class="mt-6 w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          Create Character
        </button>
      </div>
    </div>
  </div>
</div>

<input type="hidden" id="tableId" value="${data?.table_id || ''}" />
<input type="hidden" id="userId" value="${data?.user_id || ''}" />

<script>
const tableId = document.getElementById('tableId').value
const selections = { advantages: [], disadvantages: [], skills: [], items: [] }
let availableData = { advantages: [], disadvantages: [], skills: [], items: [] }

async function loadAvailable() {
  const [adv, dis, sk, items] = await Promise.all([
    fetch('/game-table-advantages/' + tableId).then(r => r.json()),
    fetch('/game-table-disadvantages/' + tableId).then(r => r.json()),
    fetch('/game-table-skills/' + tableId).then(r => r.json()),
    fetch('/game-table-items/' + tableId).then(r => r.json()),
  ])
  availableData = { advantages: adv, disadvantages: dis, skills: sk, items }
  renderAll()
}
if (tableId) loadAvailable()

function renderAll() {
  renderCheckboxList('advantagesList', availableData.advantages, selections.advantages, 'advantages', 'advCount')
  renderCheckboxList('disadvantagesList', availableData.disadvantages, selections.disadvantages, 'disadvantages', 'disCount')
  renderSkillList()
  renderItemsList()
  updateBudget()
}

function renderCheckboxList(containerId, available, selected, type, countId) {
  const container = document.getElementById(containerId)
  container.innerHTML = available.map(item => {
    const isSelected = selected.some(s => s.id === item.id)
    return \`
      <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700/30 cursor-pointer \${isSelected ? 'bg-zinc-700/40 border border-amber-500/30' : 'border border-transparent'}">
        <input type="checkbox" \${isSelected ? 'checked' : ''}
          onchange="toggleSelection('\${type}', '\${item.id}', '\${(item.name || 'Unnamed').replace(/'/g, "\\\\'")}', \${item.cost_points ?? 0}, this.checked)"
          class="w-4 h-4 rounded border-zinc-600 text-amber-500 focus:ring-amber-500 bg-zinc-900"/>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-zinc-200 truncate">\${item.name || 'Unnamed'}</div>
          <div class="text-xs text-zinc-500 truncate">\${(item.description || '').substring(0, 80)}</div>
        </div>
        <span class="text-xs font-mono text-zinc-400 shrink-0">\${item.cost_points != null ? (item.cost_points >= 0 ? '+' : '') + item.cost_points : '±0'}</span>
      </label>
    \`
  }).join('')
  document.getElementById(countId).textContent = selected.length + ' selected'
}

function toggleSelection(type, id, name, cost, checked) {
  const list = selections[type]
  if (checked) {
    list.push({ id, name, cost_points: cost })
  } else {
    const idx = list.findIndex(s => s.id === id)
    if (idx >= 0) list.splice(idx, 1)
  }
  renderAll()
}

function renderSkillList() {
  const container = document.getElementById('skillsList')
  container.innerHTML = availableData.skills.map(sk => {
    const sel = selections.skills.find(s => s.id === sk.id)
    const pts = sel ? sel.cost_points : 0
    return \`
      <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700/30 \${sel ? 'bg-zinc-700/40 border border-amber-500/30' : 'border border-transparent'}">
        <input type="checkbox" \${sel ? 'checked' : ''}
          onchange="toggleSkill('\${sk.id}', '\${(sk.name || 'Unnamed').replace(/'/g, "\\\\'")}', this.checked)"
          class="w-4 h-4 rounded border-zinc-600 text-amber-500 focus:ring-amber-500 bg-zinc-900"/>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-zinc-200">\${sk.name || 'Unnamed'}</div>
          <div class="text-xs text-zinc-500">\${sk.predefinition_type || ''} \${sk.predefinition_difficulty ? '· ' + sk.predefinition_difficulty : ''}</div>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="adjSkill('\${sk.id}', -1)" class="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs font-bold flex items-center justify-center">−</button>
          <span class="text-sm font-mono text-amber-400 w-6 text-center" id="skPts_\${sk.id}">\${pts}</span>
          <button onclick="adjSkill('\${sk.id}', 1)" class="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs font-bold flex items-center justify-center">+</button>
        </div>
      </div>
    \`
  }).join('')
  document.getElementById('skCount').textContent = selections.skills.length + ' selected'
}

function toggleSkill(id, name, checked) {
  if (checked) {
    selections.skills.push({ id, name, cost_points: 1, effect: '' })
  } else {
    const idx = selections.skills.findIndex(s => s.id === id)
    if (idx >= 0) selections.skills.splice(idx, 1)
  }
  renderAll()
}

function adjSkill(id, delta) {
  const sel = selections.skills.find(s => s.id === id)
  if (!sel) return
  sel.cost_points = Math.max(0, (sel.cost_points || 0) + delta)
  renderAll()
}

function renderItemsList() {
  const container = document.getElementById('itemsList')
  container.innerHTML = availableData.items.map(item => {
    const sel = selections.items.some(s => s.id === item.id)
    return \`
      <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700/30 cursor-pointer \${sel ? 'bg-zinc-700/40 border border-amber-500/30' : 'border border-transparent'}">
        <input type="checkbox" \${sel ? 'checked' : ''}
          onchange="toggleItem('\${item.id}', '\${(item.name || 'Unnamed').replace(/'/g, "\\\\'")}', this.checked)"
          class="w-4 h-4 rounded border-zinc-600 text-amber-500 focus:ring-amber-500 bg-zinc-900"/>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-zinc-200 truncate">\${item.name || 'Unnamed'}</div>
          <div class="text-xs text-zinc-500 truncate">\${item.category || ''} \${item.weight != null ? '· ' + item.weight + ' lbs' : ''}</div>
        </div>
      </label>
    \`
  }).join('')
  document.getElementById('itemCount').textContent = selections.items.length + ' selected'
}

function toggleItem(id, name, checked) {
  if (checked) {
    selections.items.push({ id, name })
  } else {
    const idx = selections.items.findIndex(s => s.id === id)
    if (idx >= 0) selections.items.splice(idx, 1)
  }
  renderAll()
}

function updateBudget() {
  const total = parseInt(document.getElementById('chPoints').value) || 150
  const advCost = selections.advantages.reduce((s, a) => s + (a.cost_points || 0), 0)
  const disCost = selections.disadvantages.reduce((s, d) => s + (d.cost_points || 0), 0)
  const skCost = selections.skills.reduce((s, sk) => s + (sk.cost_points || 0), 0)
  const spent = advCost + disCost + skCost
  const remain = total - spent

  document.getElementById('budgetTotal').textContent = total
  document.getElementById('budgetSpent').textContent = spent
  document.getElementById('budgetRemain').textContent = remain
  document.getElementById('budgetRemain').className = 'font-mono ' + (remain < 0 ? 'text-red-400' : remain === 0 ? 'text-emerald-400' : 'text-zinc-100')
  document.getElementById('budgetBar').style.width = Math.min(100, (spent / total) * 100) + '%'
  document.getElementById('totalPointsDisplay').textContent = total
}

document.getElementById('chPoints').addEventListener('input', updateBudget)

document.getElementById('saveBtn').addEventListener('click', async () => {
  const btn = document.getElementById('saveBtn')
  btn.disabled = true
  btn.textContent = 'Saving...'

  const payload = {
    table_id: tableId,
    user_id: document.getElementById('userId').value,
    sheet: {
      name: document.getElementById('chName').value,
      bio: document.getElementById('chBio').value,
      backstory: document.getElementById('chBackstory').value,
      points: parseInt(document.getElementById('chPoints').value) || 150,
      hp: parseInt(document.getElementById('chHp').value) || 10,
      st: parseInt(document.getElementById('chSt').value) || 10,
      dx: parseInt(document.getElementById('chDx').value) || 10,
      iq: parseInt(document.getElementById('chIq').value) || 10,
      ht: parseInt(document.getElementById('chHt').value) || 10,
      fatigue: parseInt(document.getElementById('chFp').value) || 10,
      encumbrance: document.getElementById('chEnc').value,
    },
    advantages: selections.advantages.map(a => ({
      advantage_id: a.id,
      name: a.name,
      cost_points: a.cost_points,
      effect: ''
    })),
    disadvantages: selections.disadvantages.map(d => ({
      disadvantage_id: d.id,
      name: d.name,
      cost_points: d.cost_points,
      effect: ''
    })),
    skills: selections.skills.map(s => ({
      skill_id: s.id,
      cost_points: s.cost_points,
      effect: ''
    })),
    items: selections.items.map(i => ({ item_id: i.id })),
    damages: [],
    armors: [],
    peculiarities: []
  }

  try {
    const res = await fetch('/game-table-character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (result.success) {
      btn.textContent = 'Created!'
      btn.className = 'mt-6 w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'
      setTimeout(() => { window.location.href = '/game-table-character-viewer/' + result.character_id }, 800)
    } else {
      alert('Error: ' + (result.error || 'Unknown'))
      btn.disabled = false
      btn.textContent = 'Create Character'
    }
  } catch (err) {
    alert('Network error: ' + err.message)
    btn.disabled = false
    btn.textContent = 'Create Character'
  }
})
</script>
`)
}
