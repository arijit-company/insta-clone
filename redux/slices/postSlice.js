import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  posts: [],
  loading: true,
  searchedData: {
    status: false,
    data: [],
  },
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
    searchPosts: (state, { payload }) => {
      state.searchedData.status = payload.status
      state.searchedData.data = payload.data
    },
  },
})

export const postReducer = postSlice.reducer
// export const { fetchPosts } = postSlice.actions

export const { changeLoading } = postSlice.actions

export const fetchPosts = (data) => async (dispatch) => {
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

export const searchPosts = (data) => (dispatch, getState) => {
  const postsArr = [...getState().postReducer.posts]
  console.log(getState(), postsArr)
  if (data === "") {
    return dispatch(
      postSlice.actions.searchPosts({
        status: false,
        data: [],
      })
    )
  } else {
    let regEx = new RegExp(data.toLowerCase())
    let newPosts = postsArr.filter((post) =>
      regEx.test(post.caption.toLowerCase())
    )
    dispatch(
      postSlice.actions.searchPosts({
        status: true,
        data: newPosts,
      })
    )
  }
}
