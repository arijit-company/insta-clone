import React from "react"

const Post = ({ doc }) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col m-4 shadow-lg rounded-md p-4">
        <p className="text-lg mb-2 font-medium text-orange-600">
          {doc.caption}
        </p>
        <div>
          <img src={doc.image} alt="img" className="rounded-md" />
        </div>
      </div>
    </>
  )
}

export default Post
