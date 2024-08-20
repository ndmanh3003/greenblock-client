export * from './product.api'
export * from './product.query'
export * from './product.type'

export const allCurrent = {
  PLANTING: 'planting',
  HARVESTED: 'harvested',
  INSPECTING: 'inspecting',
  INSPECTED: 'inspected',
  EXPORTED: 'exported',
  SOLD: 'sold'
}

export const roleCurrent = {
  farmer: [allCurrent.PLANTING, allCurrent.HARVESTED],
  inspector: [allCurrent.INSPECTING, allCurrent.INSPECTED],
  business: [allCurrent.EXPORTED, allCurrent.SOLD]
}
