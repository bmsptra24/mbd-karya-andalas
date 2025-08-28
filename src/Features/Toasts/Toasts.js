import { createSlice } from '@reduxjs/toolkit'

export const toastsSlice = createSlice({
  name: 'toast',
  initialState: {
    isLoginSuccess: false,
    isLogoutSuccess: false,
  },
  reducers: {
    setIsLoginSuccess: (state, action) => {
      state.isLoginSuccess = action.payload
    },
    setIsLogoutSuccess: (state, action) => {
      state.isLoginSuccess = action.payload
    },
  },
})

export const { setIsLoginSuccess, setIsLogoutSuccess } = toastsSlice.actions

export default toastsSlice.reducer
