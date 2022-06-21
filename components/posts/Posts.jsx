import React, { useEffect } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../redux/slices/postSlice"
// import { wrapper } from "../../redux/store"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../utils/firbase"
import Post from "./Post"
import Loader from "../Loader"

const Posts = () => {
  const { posts, loading, searchedData } = useSelector(
    (state) => state.postReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchPosts([{ name: "arijit" }]))
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timeStaps", "desc")),
      (snapshot) => {
        dispatch(fetchPosts(snapshot.docs))
      }
    )
    // const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
    //   console.log(snapshot)
    //   // dispatch(fetchPosts())
    // })

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <div>
      {loading && <Loader />}
      {!loading &&
        !searchedData.status &&
        posts.length > 0 &&
        posts.map((e) => <Post key={e.id} doc={e} />)}

      {searchedData.status &&
        searchedData.data.length > 0 &&
        searchedData.data.map((e) => <Post key={e.id} doc={e} />)}

      {searchedData.status && !searchedData.data.length && (
        <p>No search result found!</p>
      )}
    </div>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(fetchPosts([{ name: "arijit" }]))
//   }
// )

// Posts.getInitialProps = wrapper.getInitialPageProps((store) => () => {
//   console.log("getinitial props")
//   store.dispatch(fetchPosts([{ name: "arijit" }]))
// })

// export default connect((state) => state)(Posts)

export default Posts
