import { createSlice } from '@reduxjs/toolkit'

export const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    config: {},
  },
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload
    },
  },
}) 

export const { setConfig } = DatabaseSlice.actions

export default DatabaseSlice.reducer
