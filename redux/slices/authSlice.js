import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {},
  isAuthenticated: false,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logOutUser: (state) => {
      state.isAuthenticated = false
      state.user = {}
    },
  },
})

export const { signInUser, logOutUser } = authSlice.actions

export const authReducer = authSlice.reducer
