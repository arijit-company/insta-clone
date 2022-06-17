import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  posts: [],
  loading: true,
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPosts: (state, { payload }) => {
      state.posts = payload
    },
    changeLoading: (state, { payload }) => {
      state.loading = payload
    },
    searchPosts: (state, { payload }) => {},
  },
})

export const postReducer = postSlice.reducer
// export const { fetchPosts } = postSlice.actions

export const { changeLoading } = postSlice.actions

export const fetchPosts = (data) => async (dispatch, getState) => {
  const newData = data.map((e) => {
    return {
      ...e.data(),
      id: e.id,
    }
  })
  dispatch(postSlice.actions.fetchPosts(newData))
  setTimeout(() => {
    dispatch(postSlice.actions.changeLoading(false))
  }, 1000)
}
