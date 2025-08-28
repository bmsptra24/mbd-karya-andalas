import { configureStore } from '@reduxjs/toolkit'
import pomodoroReducer from '../Features/Pomodoro/Pomodoro'
import homeReducer from '../Features/Home/Home'
import isLoadingReducer from '../Features/Loading/isLoading'
import toastsReducer from '../Features/Toasts/Toasts'
import musicReducer from '../Features/Music/Music'
import databaseReducer from '../Features/Database/Database'

export default configureStore({
  reducer: {
    pomodoro: pomodoroReducer,
    home: homeReducer,
    isLoading: isLoadingReducer,
    toasts: toastsReducer,
    music: musicReducer,
    database: databaseReducer,
  },
})
