import { layout } from './layout'

interface RouteDoc {
  method: 'GET' | 'POST' | 'PUT'
  path: string
  desc: string
  reqBody?: string
  resBody: string
}

const adminRoutes: RouteDoc[] = [
  {
    method: 'POST', path: '/create-user',
    desc: 'Create a new user.',
    reqBody: JSON.stringify({ username: 'gm_narrator', password: 'secret123' }, null, 2),
    resBody: JSON.stringify({ id: 'usr_abc123', username: 'gm_narrator' }, null, 2)
  },
  {
    method: 'POST', path: '/create-game-table',
    desc: 'Create a new game table.',
    reqBody: JSON.stringify({ title: 'My Campaign', narrator_id: 'usr_abc123' }, null, 2),
    resBody: JSON.stringify({ id: 'tbl_xyz789', title: 'My Campaign' }, null, 2)
  },
  {
    method: 'PUT', path: '/users/edit/:id',
    desc: 'Update a user.',
    reqBody: JSON.stringify({ username: 'new_name' }, null, 2),
    resBody: JSON.stringify({ id: 'usr_abc123', username: 'new_name' }, null, 2)
  },
  {
    method: 'GET', path: '/game-tables',
    desc: 'List all game tables.',
    resBody: JSON.stringify([{ id: 'tbl_xyz789', title: 'My Campaign', narrator: { username: 'gm_narrator' } }], null, 2)
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
    reqBody: JSON.stringify({ table_id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', title: 'Session 2', description: 'The dungeon crawl', order: 2 }, null, 2),
    resBody: JSON.stringify({ id: 'scn_002', title: 'Session 2' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-narration',
    desc: 'Create a narration block inside a scene.',
    reqBody: JSON.stringify({ scene_id: 'scn_002', text: 'The door creaks open...', moment: 0 }, null, 2),
    resBody: JSON.stringify({ id: 'nar_002', text: 'The door creaks open...' }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-npc',
    desc: 'Create a new NPC.',
    reqBody: JSON.stringify({ table_id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', sheet: { name: 'Goblin', st: 9, dx: 12, iq: 8, ht: 10 } }, null, 2),
    resBody: JSON.stringify({ character_id: 'a1b2c3d4-0000-0000-0000-000000000000', sheet_id: 'b2c3d4e5-0000-0000-0000-000000000000' }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-npc/:id',
    desc: 'Get a single NPC by ID.',
    resBody: JSON.stringify({
      npc: { id: 'd6e7f8a9-b0c1-2345-defa-456789012345', status: 'active' },
      character: {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        name: 'Goblin', user: null,
        sheet: { id: 'e5f6a7b8-c9d0-1234-efab-345678901234', name: 'Goblin', hp: 7, st: 9, dx: 12, iq: 8, ht: 10, fatigue: 10, encumbrance: 'None' },
        advantages: [], skills: [], items: [], damages: [], armors: []
      }
    }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-npcs/:id',
    desc: 'List all NPCs for a game table.',
    resBody: JSON.stringify({
      table: { id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', title: 'Campaign' },
      npcs: [{ npc_id: 'd6e7f8a9-b0c1-2345-defa-456789012345', sheet_name: 'Goblin', st: 9, dx: 12, hp: 7 }]
    }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-modifier',
    desc: 'Create a new modifier for a character.',
    reqBody: JSON.stringify({ character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', name: 'Slash Wound', mod_hp: -4, narration_id: '64b076b3-36da-47fe-b601-ce4587c931ed', action_id: 'f30b26f3-90fc-4a93-b225-9edaf8347e7e' }, null, 2),
    resBody: JSON.stringify({ id: '0ffb17df-c9d9-4782-b5ea-8e976a5eb577', name: 'Blunt trauma' }, null, 2)
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
    reqBody: JSON.stringify({ table_id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', item_id: '7e0ba973-b602-4e5a-ab5d-9e264ff0ef3e', role: 'player', visible: true }, null, 2),
    resBody: JSON.stringify({ id: 'vis_002', item_id: '7e0ba973-b602-4e5a-ab5d-9e264ff0ef3e', role: 'player', visible: true }, null, 2)
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
    resBody: JSON.stringify([{ id: 'que_001', character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', position: 1 }], null, 2)
  },
  {
    method: 'GET', path: '/game-table-queue-item/:id',
    desc: 'Get a single queue entry by ID.',
    resBody: JSON.stringify({ id: 'que_001', character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', position: 1 }, null, 2)
  },
  {
    method: 'POST', path: '/game-table-queue',
    desc: 'Create a queue entry.',
    reqBody: JSON.stringify({ table_id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', position: 1 }, null, 2),
    resBody: JSON.stringify({ id: 'que_002', character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', position: 1 }, null, 2)
  },
  {
    method: 'PUT', path: '/game-table-queue',
    desc: 'Update a queue entry.',
    reqBody: JSON.stringify({ id: 'que_002', position: 2 }, null, 2),
    resBody: JSON.stringify({ id: 'que_002', position: 2 }, null, 2)
  }
]

const publicRoutes: RouteDoc[] = [
  {
    method: 'GET', path: '/users/search/:searchTerm',
    desc: 'Search users by username.',
    resBody: JSON.stringify([{ id: '5af72edc-aef3-4af0-a494-27c4926d1c45', username: 'John Doe' }], null, 2)
  },
  {
    method: 'GET', path: '/game-table/:id',
    desc: 'Get a single game table by ID.',
    resBody: JSON.stringify({ id: 'f8a9b0c1-d2e3-4567-fabc-678901234567', title: 'A Noite do Lobisomem', narrator: { username: 'gm_narrator' } }, null, 2)
  },
  {
    method: 'GET', path: '/game-table-scenes/:id',
    desc: 'Get all scenes for a game table (with narrations, actions, and modifiers).',
    resBody: JSON.stringify([{ id: 'scn_001', title: 'Session 1', narrations: [{ id: 'nar_001', text: 'The party arrives...', moment: 0 }] }], null, 2)
  },
  {
    method: 'POST', path: '/game-table-action',
    desc: 'Create an action inside a narration (character action, NPC action, etc.).',
    reqBody: JSON.stringify({ narration_id: 'nar_002', character_id: 'dc60499b-829f-4763-983f-9b7a22f3c00a', type: 'attack', description: 'Swing sword' }, null, 2),
    resBody: JSON.stringify({ id: 'act_001', narration_id: 'nar_002', type: 'attack' }, null, 2)
  }
]

function renderRoutes(routes: RouteDoc[]): string {
  return routes.map(r => `
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
  `).join('')
}

export function apiDocs(tablesHtml?: string): string {
  return layout('Home and routes', `
    <div class="max-w-4xl mx-auto p-6">
      ${tablesHtml ?? ''}

      <div class="mb-6${tablesHtml ? ' mt-10' : ''}">
        <h1 class="text-3xl font-bold text-amber-100">API Documentation</h1>
        <p class="text-zinc-400 mt-2">Backend routes for the VKRPG microservice. Click a route to see request/response examples.</p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Admin
        </h2>
        <div class="space-y-2">
          ${renderRoutes(adminRoutes)}
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Character
        </h2>
        <div class="space-y-2">
          ${renderRoutes(characterRoutes)}
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Rules
        </h2>
        <p class="text-xs text-zinc-500 mb-3">Routes from the GameTableRules interface: skills, advantages, peculiarities, items, visibility, queue.</p>
        <div class="space-y-2">
          ${renderRoutes(rulesRoutes)}
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-zinc-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          All
        </h2>
        <div class="space-y-2">
          ${renderRoutes(publicRoutes)}
        </div>
      </div>
    </div>
    <script>
      document.querySelectorAll('.space-y-2 details').forEach(d => {
        d.addEventListener('toggle', () => {
          if (d.open) {
            d.closest('.space-y-2').querySelectorAll('details[open]').forEach(o => {
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
