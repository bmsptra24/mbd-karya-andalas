import { createSlice } from '@reduxjs/toolkit'

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    isPlaying: false,
    playAudio: "stop",
  },
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setPlayAudio: (state, action) => {
      state.playAudio = action.payload
    },
  },
})

export const { setIsPlaying, setPlayAudio } = musicSlice.actions

export default musicSlice.reducer
