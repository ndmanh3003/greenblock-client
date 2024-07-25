export const arr2obj = (arr: unknown[]) => {
  const _arr = new Set(arr)
  return Array.from(_arr).map((data, index) => ({ index, data }))
}

export const obj2arr = (obj: { index: number; data: unknown }[]) => {
  return Array.from(new Set(obj.map((item) => item.data)))
}
