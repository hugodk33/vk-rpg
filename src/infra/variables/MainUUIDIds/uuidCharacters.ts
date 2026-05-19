import crypto from 'crypto'

export const characterMiraId = crypto.randomUUID()
export const characterGarrickId = crypto.randomUUID()
export const characterKasumiId = crypto.randomUUID()
export const characterNPCsIds = Array.from({ length: 10 }, () => crypto.randomUUID())

export const miraSwordSkill = crypto.randomUUID()