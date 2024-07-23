import { IStatus } from '../../pages/Status'

/* eslint-disable no-unused-vars */
export interface IHr {
  setData: (data: IStatus) => void
  setCurrent: (current: number) => void
  data: IStatus | undefined
}
