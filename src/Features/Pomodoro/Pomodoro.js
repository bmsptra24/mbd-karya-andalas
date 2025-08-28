import { createSlice } from '@reduxjs/toolkit'

export const isTimerRunningSlice = createSlice({
  name: 'isRunningPomodoro',
  initialState: {
    timeRemaining: 0, // in second
    pomodoroStatus: 'stop',
    pomodoroDuration: 0,
    shortBreakDuration: 0,
    longBreakDuration: 0,
    timeRemainingString: '00:00', // in string
    countPomodoro: 0,
  },
  reducers: {
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload
    },
    setPomodoroStatus: (state, action) => {
      state.pomodoroStatus = action.payload
    },
    setPomodoroDuration: (state, action) => {
      state.pomodoroDuration = action.payload
    },
    setShortBreakDuration: (state, action) => {
      state.shortBreakDuration = action.payload
    },
    setLongBreakDuration: (state, action) => {
      state.longBreakDuration = action.payload
    },
    setTimeRemainingString: (state, action) => {
      state.timeRemainingString = action.payload
    },
    setCountPomodoro: (state, action) => {
      state.countPomodoro = action.payload
    },
  },
})

export const {
  setTimeRemaining,
  setPomodoroStatus,
  setPomodoroDuration,
  setShortBreakDuration,
  setLongBreakDuration,
  setTimeRemainingString,
  setCountPomodoro,
} = isTimerRunningSlice.actions

export default isTimerRunningSlice.reducer
