import { createSlice } from '@reduxjs/toolkit'

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    isGeneratingGpt: false,
  },
  reducers: {
    setIsGeneratingGpt: (state, action) => {
      state.isGeneratingGpt = action.payload
    },
  },
})

export const { setIsGeneratingGpt } = isLoadingSlice.actions

export default isLoadingSlice.reducer
