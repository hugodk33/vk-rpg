import { layout } from './layout'

interface RouteDoc {
  method: 'GET' | 'POST' | 'PUT'
  path: string
  desc: string
  reqBody?: string
  resBody: string
}

const routes: RouteDoc[] = [
  {
    method: 'POST', path: '/create-user',
    desc: 'Create a new user.',
    reqBody: JSON.stringify({ username: 'gm_narrator', password: 'secret123' }, null, 2),
    resBody: JSON.stringify({ id: 'usr_abc123', username: 'gm_narrator' }, null, 2)
  },
  {
    method: 'GET', path: '/users',
    desc: 'List all users.',
    resBody: JSON.stringify([{ id: 'usr_abc123', username: 'gm_narrator' }], null, 2)
  },
  {
    method: 'GET', path: '/users/search/:searchTerm',
    desc: 'Search users by username.',
    resBody: JSON.stringify([{ id: 'usr_abc123', username: 'gm_narrator' }], null, 2)
  },
  {
    method: 'PUT', path: '/users/edit/:id',
    desc: 'Update a user.',
    reqBody: JSON.stringify({ username: 'new_name' }, null, 2),
    resBody: JSON.stringify({ id: 'usr_abc123', username: 'new_name' }, null, 2)
  },
  {
    method: 'POST', path: '/create-game-table',
    desc: 'Create a new game table.',
    reqBody: JSON.stringify({ title: 'My Campaign', narrator_id: 'usr_abc123' }, null, 2),
    resBody: JSON.stringify({ id: 'tbl_xyz789', title: 'My Campaign' }, null, 2)
  },
  {
    method: 'GET', path: '/game-tables',
    desc: 'List all game tables.',
    resBody: JSON.stringify([{ id: 'tbl_xyz789', title: 'My Campaign', narrator: { username: 'gm_narrator' } }], null, 2)
  },
  {
    method: 'GET', path: '/game-table/:id',
    desc: 'Get a single game table by ID.',
    resBody: JSON.stringify({ id: 'tbl_xyz789', title: 'My Campaign', narrator: { username: 'gm_narrator' } }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-scenes/:id',
    desc: 'Get all scenes for a game table (with narrations, actions, and modifiers).',
    resBody: JSON.stringify([{ id: 'scn_001', title: 'Session 1', narrations: [{ id: 'nar_001', text: 'The party arrives...', moment: 0 }] }], null, 2)
  },
  {
    method: 'PUT', path: '/game-table/edit/:id',
    desc: 'Update a game table.',
    reqBody: JSON.stringify({ title: 'Updated Title', intro: 'New intro text' }, null, 2),
    resBody: JSON.stringify({ id: 'tbl_xyz789', title: 'Updated Title' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-scene',
    desc: 'Create a new scene within a game table.',
    reqBody: JSON.stringify({ table_id: 'tbl_xyz789', title: 'Session 2', description: 'The dungeon crawl', order: 2 }, null, 2),
    resBody: JSON.stringify({ id: 'scn_002', title: 'Session 2' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-narration',
    desc: 'Create a narration block inside a scene.',
    reqBody: JSON.stringify({ scene_id: 'scn_002', text: 'The door creaks open...', moment: 0 }, null, 2),
    resBody: JSON.stringify({ id: 'nar_002', text: 'The door creaks open...' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-action',
    desc: 'Create an action inside a narration (character action, NPC action, etc.).',
    reqBody: JSON.stringify({ narration_id: 'nar_002', character_id: 'chr_001', type: 'attack', description: 'Swing sword' }, null, 2),
    resBody: JSON.stringify({ id: 'act_001', narration_id: 'nar_002', type: 'attack' }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-skills/:id',
    desc: 'List all skills for a game table.',
    resBody: JSON.stringify([{ id: 'skl_001', name: 'Swordsmanship', value: 14 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-advantages/:id',
    desc: 'List all advantages for a game table.',
    resBody: JSON.stringify([{ id: 'adv_001', name: 'Luck', cost_points: 15 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-peculiarities/:id',
    desc: 'List all peculiarities for a game table.',
    resBody: JSON.stringify([{ id: 'pec_001', name: 'Phobia: Spiders' }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-items/:id',
    desc: 'List all items for a game table.',
    resBody: JSON.stringify([{ id: 'item_001', name: 'Longsword', weight: 3 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-npcs/:id',
    desc: 'List all NPCs for a game table.',
    resBody: JSON.stringify([{ id: 'npc_001', name: 'Goblin', st: 9, dx: 12 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-npc/:id',
    desc: 'Get a single NPC by ID.',
    resBody: JSON.stringify({ id: 'npc_001', name: 'Goblin', st: 9, dx: 12, hp: 7 }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-npc',
    desc: 'Create a new NPC.',
    reqBody: JSON.stringify({ table_id: 'tbl_xyz789', name: 'Goblin', st: 9, dx: 12, iq: 8, ht: 10 }, null, 2),
    resBody: JSON.stringify({ id: 'npc_002', name: 'Goblin' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-character',
    desc: 'Create a new character.',
    reqBody: JSON.stringify({ table_id: 'tbl_xyz789', name: 'Lyra', player_id: 'usr_abc123', st: 10, dx: 12, iq: 14, ht: 11 }, null, 2),
    resBody: JSON.stringify({ id: 'chr_001', name: 'Lyra' }, null, 2)
  },
  {
    method: 'PUT', path: '/game-table-character',
    desc: 'Update an existing character.',
    reqBody: JSON.stringify({ id: 'chr_001', name: 'Lyra', st: 11, dx: 13 }, null, 2),
    resBody: JSON.stringify({ id: 'chr_001', name: 'Lyra', st: 11, dx: 13 }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-character/:id',
    desc: 'Get a character by ID (optionally ?moment=N for historical state).',
    resBody: JSON.stringify({
      id: 'chr_001', name: 'Lyra', base_st: 10, st: 8,
      base_hp: 12, hp: 6, base_fatigue: 10, fatigue: 5,
      modifiers: [{ name: 'Slash Wound', mod_hp: -4 }],
      moments: [0, 1], basePath: '/game-table-character-viewer/'
    }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-characters/:id',
    desc: 'List all characters for a game table.',
    resBody: JSON.stringify([{ id: 'chr_001', name: 'Lyra' }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-modifiers/:id',
    desc: 'List all modifiers for a game table.',
    resBody: JSON.stringify([{ id: 'mod_001', name: 'Slash Wound', character_id: 'chr_001', mod_hp: -4 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-modifier/:id',
    desc: 'Get a single modifier by ID.',
    resBody: JSON.stringify({ id: 'mod_001', name: 'Slash Wound', mod_hp: -4 }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-modifier',
    desc: 'Create a new modifier for a character.',
    reqBody: JSON.stringify({ character_id: 'chr_001', name: 'Slash Wound', mod_hp: -4, narration_id: 'nar_001', action_id: 'act_001' }, null, 2),
    resBody: JSON.stringify({ id: 'mod_002', name: 'Slash Wound' }, null, 2)
  },
  {
    method: 'PUT', path: '/game-table-modifier',
    desc: 'Update an existing modifier.',
    reqBody: JSON.stringify({ id: 'mod_002', name: 'Slash Wound', mod_hp: -5 }, null, 2),
    resBody: JSON.stringify({ id: 'mod_002', name: 'Slash Wound', mod_hp: -5 }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-visibility/:id',
    desc: 'List all visibility rules for a game table.',
    resBody: JSON.stringify([{ id: 'vis_001', item_id: 'item_001', role: 'player', visible: true }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-visibility-item/:id',
    desc: 'Get a single visibility rule by ID.',
    resBody: JSON.stringify({ id: 'vis_001', item_id: 'item_001', role: 'player', visible: true }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-visibility',
    desc: 'Create a visibility rule.',
    reqBody: JSON.stringify({ table_id: 'tbl_xyz789', item_id: 'item_001', role: 'player', visible: true }, null, 2),
    resBody: JSON.stringify({ id: 'vis_002', item_id: 'item_001', role: 'player', visible: true }, null, 2)
  },
  {
    method: 'PUT', path: '/game-table-visibility',
    desc: 'Update a visibility rule.',
    reqBody: JSON.stringify({ id: 'vis_002', visible: false }, null, 2),
    resBody: JSON.stringify({ id: 'vis_002', visible: false }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-queue/:id',
    desc: 'List all queue entries for a game table.',
    resBody: JSON.stringify([{ id: 'que_001', character_id: 'chr_001', position: 1 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-queue-item/:id',
    desc: 'Get a single queue entry by ID.',
    resBody: JSON.stringify({ id: 'que_001', character_id: 'chr_001', position: 1 }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-queue',
    desc: 'Create a queue entry.',
    reqBody: JSON.stringify({ table_id: 'tbl_xyz789', character_id: 'chr_001', position: 1 }, null, 2),
    resBody: JSON.stringify({ id: 'que_002', character_id: 'chr_001', position: 1 }, null, 2)
  },
  {
    method: 'PUT', path: '/game-table-queue',
    desc: 'Update a queue entry.',
    reqBody: JSON.stringify({ id: 'que_002', position: 2 }, null, 2),
    resBody: JSON.stringify({ id: 'que_002', position: 2 }, null, 2)
  }
]

export function apiDocs(tablesHtml?: string): string {
  return layout('API Docs', `
    <div class="max-w-4xl mx-auto p-6">
      ${tablesHtml ?? ''}
      <div class="mb-8${tablesHtml ? ' mt-10' : ''}">
        <h1 class="text-3xl font-bold text-amber-100">API Documentation</h1>
        <p class="text-zinc-400 mt-2">Backend routes for the VKRPG microservice. Click a route to see request/response examples.</p>
      </div>
      <div class="space-y-2" id="apiAccordion">
        ${routes.map((r, i) => `
        <details class="bg-zinc-800/60 border border-zinc-700/40 rounded-lg overflow-hidden">
          <summary class="flex items-center gap-3 px-4 py-3 cursor-pointer list-none hover:bg-zinc-700/40 transition-colors">
            <span class="px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${methodClass(r.method)}">${r.method}</span>
            <code class="text-zinc-200 text-sm font-mono flex-1">${r.path}</code>
            <span class="text-zinc-500 text-xs mr-2">${r.desc}</span>
            <svg class="w-4 h-4 text-zinc-500 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </summary>
          <div class="px-4 pb-4 border-t border-zinc-700/40 pt-3 space-y-3">
            ${r.reqBody ? `
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Request Body</p>
              <pre class="bg-zinc-950 rounded-lg p-3 overflow-x-auto text-xs text-zinc-300 font-mono">${escapeHtml(r.reqBody)}</pre>
            </div>
            ` : `
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Request</p>
              <pre class="bg-zinc-950 rounded-lg p-3 overflow-x-auto text-xs text-zinc-300 font-mono">${r.method} ${r.path}</pre>
            </div>
            `}
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Response</p>
              <pre class="bg-zinc-950 rounded-lg p-3 overflow-x-auto text-xs text-zinc-300 font-mono">${escapeHtml(r.resBody)}</pre>
            </div>
          </div>
        </details>
        `).join('')}
      </div>
    </div>
    <script>
      document.querySelectorAll('#apiAccordion details').forEach(d => {
        d.addEventListener('toggle', () => {
          if (d.open) {
            document.querySelectorAll('#apiAccordion details[open]').forEach(o => {
              if (o !== d) o.open = false
            })
          }
        })
      })
    </script>
  `)
}

function methodClass(method: string): string {
  switch (method) {
    case 'GET': return 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
    case 'POST': return 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
    case 'PUT': return 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
    default: return 'bg-zinc-700/60 text-zinc-300'
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
