import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IHandleRecordReq } from '../api/product'
import { RootState } from '.'

export const stateSlice = createSlice({
  name: 'state',
  initialState: { current: 0 } as {
    data?: IHandleRecordReq
    current: number
  },
  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    },
    setData: (state, action: PayloadAction<IHandleRecordReq>) => {
      state.data = { ...state.data, ...action.payload }
    }
  }
})

export const { setCurrent, setData } = stateSlice.actions
export const selectState = (state: RootState) => state.state
export default stateSlice.reducer
