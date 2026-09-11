import crypto  from 'crypto'

// Locais de cena (site) — ids estáveis referenciados nas narrações
export const locationId1 = crypto.randomUUID()
export const locationId2 = crypto.randomUUID()
export const locationId3 = crypto.randomUUID()

// Cascata de território do seed (world > ... > battlemap)
export const locWorldId = crypto.randomUUID()
export const locContinentId = crypto.randomUUID()
export const locNationId = crypto.randomUUID()
export const locRegionId = crypto.randomUUID()
export const locCityId = crypto.randomUUID()

// Distritos da capital
export const locDistrictMerchantId = crypto.randomUUID()
export const locDistrictCentralId = crypto.randomUUID()
export const locDistrictLowerId = crypto.randomUUID()
export const locDistrictDockId = crypto.randomUUID()
export const locDistrictScholarsId = crypto.randomUUID()
export const locDistrictOldId = crypto.randomUUID()