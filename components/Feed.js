import React from "react"
import CreatePost from "./posts/CreatePost"
import Posts from "./posts/Posts"
import Stories from "./Stories"

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <section>
        <Stories />
        <CreatePost />
      </section>
      <section>
        <Posts />
      </section>
    </main>
  )
}

export default Feed
