import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { authReducer } from "./slices/authSlice"

const combinedReducer = combineReducers({
  authReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer,
  })

export const wrapper = createWrapper(makeStore, { debug: true })
