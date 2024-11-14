import { configureStore } from '@reduxjs/toolkit'

import stateReducer from './state'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    state: stateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
