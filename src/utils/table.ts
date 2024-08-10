import { v4 as uuidv4 } from 'uuid'

interface IItemTable {
  name: string
  key: string
}

export const clear = <T extends IItemTable>(data: T[]) => {
  return data
    .filter((item) => item.name !== 'Add new item')
    .map((item) => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { key, ...rest } = item
      return rest
    })
}

export const keyGen = (data: object[]) => {
  return data.map((item) => ({ ...item, key: uuidv4() }))
}
