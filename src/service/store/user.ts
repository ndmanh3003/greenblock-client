import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAccount } from '../api/auth'
import { RootState } from '.'

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as IAccount,
  reducers: {
    setAccount: (_state, action: PayloadAction<IAccount>) => {
      return action.payload
    },
    clearAccount: () => {
      return {} as IAccount
    }
  }
})

export const { setAccount, clearAccount } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export const selectRole = (state: RootState) =>
  state.user.isBusiness || undefined
export default userSlice.reducer
