import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { authReducer } from "./slices/authSlice"
import { postReducer } from "./slices/postSlice"

const combinedReducer = combineReducers({
  authReducer,
  postReducer,
})

const reducer = (state, action) => {
  // console.log(state)
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      postReducer: {
        posts: [
          ...action.payload.postReducer.posts,
          ...state.postReducer.posts,
        ],
      }, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

export const wrapper = createWrapper(makeStore, { debug: true })
