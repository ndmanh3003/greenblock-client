export interface IGetOverallProductRes {
  total: number
  planting: number
  harvested: number
  inspecting: number
  inspected: number
  exported: number
  sold: number
  code: string
}

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
