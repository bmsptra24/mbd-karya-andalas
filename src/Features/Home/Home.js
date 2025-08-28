import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    menu: false,
    toDoList: false,
    note: false,
    blurting: false,
    flashCard: false,
    feynman: false,
    music: false,
    search: false,
    pomodoro: false,
    rank: false,
    setting: false,
    help: false,
    quote: false,
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload
    },
    setToDoList: (state, action) => {
      state.toDoList = action.payload
    },
    setNote: (state, action) => {
      state.note = action.payload
    },
    setBlurting: (state, action) => {
      state.blurting = action.payload
    },
    setFlashCard: (state, action) => {
      state.flashCard = action.payload
    },
    setFeynman: (state, action) => {
      state.feynman = action.payload
    },
    setMusic: (state, action) => {
      state.music = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setPomodoro: (state, action) => {
      state.pomodoro = action.payload
    },
    setRank: (state, action) => {
      state.rank = action.payload
    },
    setSetting: (state, action) => {
      state.setting = action.payload
    },
    setHelp: (state, action) => {
      state.help = action.payload
    },
    setQuote: (state, action) => {
      state.quote = action.payload
    },
  },
})

export const {
  setMenu,
  setToDoList,
  setNote,
  setBlurting,
  setFlashCard,
  setFeynman,
  setMusic,
  setSearch,
  setPomodoro,
  setSetting,
  setRank,
  setHelp,
  setQuote,
} = homeSlice.actions

export default homeSlice.reducer
