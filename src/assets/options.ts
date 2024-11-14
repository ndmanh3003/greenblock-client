export const _roles = ['inspector', 'business'] as const

export const _types = ['land', 'variety'] as const

export const _order = ['asc', 'desc'] as const

export const _currents = {
  PLANTING: 'planting',
  HARVESTED: 'harvested',
  INSPECTING: 'inspecting',
  INSPECTED: 'inspected',
  EXPORTED: 'exported',
  SOLD: 'sold'
}

export const _roleCurrents = {
  farmer: [_currents.PLANTING, _currents.HARVESTED],
  inspector: [_currents.INSPECTING, _currents.INSPECTED],
  business: [_currents.EXPORTED, _currents.SOLD]
}
