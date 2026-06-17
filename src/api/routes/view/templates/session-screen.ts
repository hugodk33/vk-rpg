import { layout } from './layout'

function charCard(ch: any, isNpc: boolean): string {
  const id = isNpc ? ch.characterId : ch.id
  const name = ch.name || ch.username || 'Unknown'
  const hp = ch.hp ?? ch.sheet?.hp ?? '-'
  const fp = ch.fatigue ?? ch.sheet?.fatigue ?? '-'
  const st = ch.st ?? ch.sheet?.st ?? '-'
  const dx = ch.dx ?? ch.sheet?.dx ?? '-'
  const iq = ch.iq ?? ch.sheet?.iq ?? '-'
  const ht = ch.ht ?? ch.sheet?.ht ?? '-'
  const border = isNpc ? 'border-zinc-600/40' : 'border-emerald-700/30'
  const tag = isNpc
    ? '<span class="text-[10px] text-zinc-600 uppercase tracking-wider">NPC</span>'
    : '<span class="text-[10px] text-emerald-500 uppercase tracking-wider flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>' + (ch.user?.username || 'Player') + '</span>'
  return `
    <a href="/game-table-character-viewer/${id}" class="block bg-zinc-800/50 border ${border} rounded-lg p-4 hover:bg-zinc-700/50 transition-colors group">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h3 class="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors">${name}</h3>
          ${tag}
        </div>
      </div>
      <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span>ST <span class="text-red-400 font-bold">${st}</span></span>
        <span>DX <span class="text-emerald-400 font-bold">${dx}</span></span>
        <span>IQ <span class="text-blue-400 font-bold">${iq}</span></span>
        <span>HT <span class="text-purple-400 font-bold">${ht}</span></span>
        <span>HP <span class="text-zinc-300">${hp}</span></span>
        <span>FP <span class="text-zinc-300">${fp}</span></span>
      </div>
    </a>
  `
}

export function sessionScreen(data: any): string {
  const table = data.table
  const characters = data.characters ?? []
  const scenes = data.scenes ?? []

  const players = characters.filter((c: any) => !c.isNpc)
  const npcs = characters.filter((c: any) => c.isNpc)

  return layout(`Session — ${table?.title || 'Game'}`, `
    <div class="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <a href="/dashboard/narrator/0" class="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">&larr; Back to dashboard</a>
        <h1 class="text-2xl font-bold text-amber-100 mt-1">${table?.title || 'Session'}</h1>
      </div>

      <div class="bg-zinc-900/80 border border-zinc-700/40 rounded-xl p-5">
        <h2 class="text-lg font-bold text-zinc-100 mb-4">Scene</h2>
        <form id="sceneForm" class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div class="md:col-span-2">
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Title</label>
              <input type="text" name="title" placeholder="A New Beginning..."
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-700/60 transition-colors" />
            </div>
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Chapter</label>
              <input type="number" name="chapter" value="1" min="1"
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-700/60 transition-colors" />
            </div>
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Moment</label>
              <input type="number" name="moment" value="0" min="0"
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-700/60 transition-colors" />
            </div>
          </div>
          <button type="submit"
            class="bg-amber-700/80 hover:bg-amber-600 text-amber-100 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            + Create Scene
          </button>
        </form>
      </div>

      <div class="bg-zinc-900/80 border border-zinc-700/40 rounded-xl p-5">
        <h2 class="text-lg font-bold text-zinc-100 mb-4">Narration</h2>
        <form id="narrationForm" class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Scene</label>
              <select name="sceneId"
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-700/60 transition-colors">
                <option value="" class="bg-zinc-800">Select scene...</option>
                ${scenes.map((s: any) => `
                  <option value="${s.id}" class="bg-zinc-800">${s.title}</option>
                `).join('')}
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Title</label>
              <input type="text" name="title" placeholder="A twist in the tale..."
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-700/60 transition-colors" />
            </div>
          </div>
          <div>
            <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Narration</label>
            <textarea name="narration" rows="3" placeholder="Describe what happens..."
              class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-700/60 transition-colors resize-none"></textarea>
          </div>
          <button type="submit"
            class="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            + Add to Scene
          </button>
        </form>
      </div>

      <div class="bg-zinc-900/80 border border-zinc-700/40 rounded-xl p-5">
        <h2 class="text-lg font-bold text-zinc-100 mb-4">Cast</h2>
        ${players.length === 0 && npcs.length === 0 ? `
          <p class="text-zinc-600 text-sm italic">No characters yet.</p>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${players.map((ch: any) => charCard(ch, false)).join('')}
            ${npcs.map((n: any) => charCard(n, true)).join('')}
          </div>
        `}
      </div>

      <div class="bg-zinc-900/80 border border-zinc-700/40 rounded-xl p-5">
        <h2 class="text-lg font-bold text-zinc-100 mb-4">Roll &amp; Act</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="flex items-center justify-center gap-4 mb-4 pt-6">
              <div id="d1" class="w-16 h-16 bg-zinc-800 border border-zinc-600/60 rounded-xl flex items-center justify-center text-3xl font-bold text-amber-400 font-mono shadow-inner">1</div>
              <span class="text-zinc-600 text-xl">+</span>
              <div id="d2" class="w-16 h-16 bg-zinc-800 border border-zinc-600/60 rounded-xl flex items-center justify-center text-3xl font-bold text-amber-400 font-mono shadow-inner">1</div>
              <span class="text-zinc-600 text-xl">+</span>
              <div id="d3" class="w-16 h-16 bg-zinc-800 border border-zinc-600/60 rounded-xl flex items-center justify-center text-3xl font-bold text-amber-400 font-mono shadow-inner">1</div>
            </div>

            <div class="flex items-center justify-center gap-3 mb-3">
              <label class="text-xs text-zinc-500 uppercase tracking-wider">Mod</label>
              <input type="number" id="diceMod" value="0" min="-20" max="20"
                class="w-16 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-2 py-1.5 text-zinc-100 text-sm text-center focus:outline-none focus:border-amber-700/60 transition-colors" />
              <span class="text-sm text-zinc-500">
                Modifier: <span id="modDisplay" class="text-zinc-300 font-semibold">0</span>
              </span>
              <span class="text-base text-zinc-300 font-semibold">
                Total: <span id="totalDisplay" class="text-amber-400 font-bold text-xl font-mono">3</span>
              </span>
            </div>

            <div class="flex justify-center gap-3">
              <button id="rollBtn"
                class="bg-amber-700/80 hover:bg-amber-600 text-amber-100 text-sm font-semibold px-5 py-2 rounded-lg transition-colors flex items-center gap-2">
                <span>🎲</span> Roll 3d6
              </button>
              <button id="copyRollBtn"
                class="bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
                📋 Copy
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Character</label>
              <select id="diceChar"
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-700/60 transition-colors">
                <option value="" class="bg-zinc-800">—</option>
                ${characters.map((c: any) => `
                  <option value="${c.id}" data-st="${c.st || c.sheet?.st || 10}" data-dx="${c.dx || c.sheet?.dx || 10}" data-iq="${c.iq || c.sheet?.iq || 10}" data-ht="${c.ht || c.sheet?.ht || 10}" class="bg-zinc-800">${c.name || c.username || 'Unknown'}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Skill / Attribute</label>
              <select id="diceSkill"
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:border-amber-700/60 transition-colors">
                <option value="st" class="bg-zinc-800">ST</option>
                <option value="dx" class="bg-zinc-800">DX</option>
                <option value="iq" class="bg-zinc-800">IQ</option>
                <option value="ht" class="bg-zinc-800">HT</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Description</label>
              <input type="text" name="actionDesc" placeholder="Attacks the goblin..."
                class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-700/60 transition-colors" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Target Number</label>
                <input type="number" name="actionTn" placeholder="TN"
                  class="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-amber-700/60 transition-colors" />
              </div>
              <div class="flex items-end">
                <button type="submit"
                  class="w-full bg-amber-700/80 hover:bg-amber-600 text-amber-100 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  + Add Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-zinc-900/80 border border-zinc-700/40 rounded-xl p-5">
        <h2 class="text-lg font-bold text-zinc-100 mb-4">Timeline</h2>
        ${scenes.length === 0 ? `
          <p class="text-zinc-600 text-sm italic">No scenes yet. Create one above.</p>
        ` : scenes.map((s: any) => `
          <div class="mb-6 last:mb-0">
            <div class="flex items-baseline gap-2 mb-2">
              <h3 class="text-base font-semibold text-amber-100">${s.title}</h3>
              <span class="text-xs text-zinc-600">Ch.${s.chapter} &middot; M.${s.moment}</span>
            </div>
            ${(s.narrations ?? []).map((n: any) => `
              <div class="ml-4 pl-4 border-l-2 border-zinc-700/50 mb-3">
                <p class="text-sm text-zinc-300 leading-relaxed">${n.narration}</p>
                ${n.title ? `<p class="text-xs text-zinc-500 mt-1">— ${n.title}</p>` : ''}
                ${n.actions?.length ? `
                  <div class="mt-2 text-xs text-zinc-500">
                    ${n.actions.map((a: any) => `
                      <div class="flex items-center gap-2 py-0.5">
                        <span class="text-zinc-600">#${a.queue}</span>
                        <span class="text-zinc-300">${a.character?.name || a.character?.username || '?'}</span>
                        <span>${a.description}</span>
                        ${a.dice_roll ? `<span class="font-mono ${a.result && a.test && Number(a.result) <= Number(a.test) ? 'text-emerald-400' : 'text-red-400'}">${a.dice_roll}${a.result ? `=${a.result}` : ''}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
    <script>
    (function() {
      var rollBtn = document.getElementById('rollBtn');
      var copyBtn = document.getElementById('copyRollBtn');
      var d1 = document.getElementById('d1');
      var d2 = document.getElementById('d2');
      var d3 = document.getElementById('d3');
      var modDisplay = document.getElementById('modDisplay');
      var totalDisplay = document.getElementById('totalDisplay');
      var diceChar = document.getElementById('diceChar');
      var diceSkill = document.getElementById('diceSkill');
      var diceMod = document.getElementById('diceMod');

      function getAttrib(opt, attr) {
        return parseInt((opt && opt.getAttribute(attr)) || '10', 10);
      }

      function updateMod() {
        var sel = diceChar && diceChar.options[diceChar.selectedIndex];
        var skill = diceSkill ? diceSkill.value : 'dx';
        var attrib = getAttrib(sel, 'data-' + skill);
        var mod = parseInt((diceMod && diceMod.value) || '0', 10);
        var totalMod = Math.floor((attrib - 10) / 2) + mod;
        if (modDisplay) modDisplay.textContent = (totalMod >= 0 ? '+' : '') + totalMod;
        return totalMod;
      }

      function rollAll() {
        var r1 = Math.floor(Math.random() * 6) + 1;
        var r2 = Math.floor(Math.random() * 6) + 1;
        var r3 = Math.floor(Math.random() * 6) + 1;
        if (d1) d1.textContent = r1;
        if (d2) d2.textContent = r2;
        if (d3) d3.textContent = r3;
        var mod = updateMod();
        var sum = r1 + r2 + r3 + mod;
        if (totalDisplay) totalDisplay.textContent = sum;
        return { rolls: [r1, r2, r3], mod: mod, total: sum };
      }

      if (diceChar) diceChar.addEventListener('change', updateMod);
      if (diceSkill) diceSkill.addEventListener('change', updateMod);
      if (diceMod) diceMod.addEventListener('input', updateMod);
      updateMod();

      if (rollBtn) {
        rollBtn.addEventListener('click', function(e) {
          e.preventDefault();
          rollAll();
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
          e.preventDefault();
          var r1 = (d1 && d1.textContent) || '0';
          var r2 = (d2 && d2.textContent) || '0';
          var r3 = (d3 && d3.textContent) || '0';
          var total = (totalDisplay && totalDisplay.textContent) || '0';
          navigator.clipboard.writeText(r1 + '+' + r2 + '+' + r3 + '=' + total).catch(function() {});
        });
      }
    })();
    </script>
  `)
}
