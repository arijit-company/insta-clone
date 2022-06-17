import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import React, { useState } from "react"
import { db, storage } from "../../utils/firbase"
// import { useSession } from "next-auth/react"
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"

const CreatePost = () => {
  const [inputFile, setInputFile] = useState(null)
  const [caption, setCaption] = useState("")
  // const { data: session , status: authStatus} = useSession()
  const { user, isAuthenticated } = useSelector((state) => state.authReducer)
  const [isLoading, setIsLoading] = useState(false)

  const inputFileChanged = (e) => {
    const reader = new FileReader()
    if (e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setInputFile(readerEvent.target.result.split(",")[1])
    }
  }

  const resetState = () => {
    setInputFile(null)
    setCaption("")
    setIsLoading(false)
  }

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Please Sign in First",
        text: "After that you can post😊",
        showCloseButton: true,
      })
      return
    }

    if (caption === "" || !inputFile) {
      Swal.fire({
        icon: "error",
        title: "Please fill all fields",
        text: "After that you can post😊",
        showCloseButton: true,
        confirmButtonText: "Got it",
      })
      return
    }

    setIsLoading(true)

    try {
      const dataRef = await addDoc(collection(db, "posts"), {
        username: user?.user?.name,
        caption,
        profileImg: user?.user?.image,
        timeStaps: serverTimestamp(),
      })

      // adding image on the previous submitted post
      // 1. first creating a StorageReference of where we are posting and which collection is linked with this
      const imageReference = ref(storage, `posts/${dataRef.id}/image`)
      // 2. then upload the file as base64 on firebase storage
      await uploadString(imageReference, inputFile, "base64")
      // 3. creating a downloadable url from that storage image
      const downloadUrl = await getDownloadURL(imageReference)
      // 4. updating the actual post collection on database
      await updateDoc(doc(db, "posts", dataRef.id), {
        image: downloadUrl,
      })
    } catch (err) {
      console.log(err, "something wrong happend while uploading")
    } finally {
      resetState()
    }
  }
  return (
    <>
      <div className="flex items-center justify-center flex-col m-4 shadow-lg rounded-md p-4">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none my-2"
          type="text"
          placeholder="Write Caption..."
          aria-label="Full name"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></input>
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            {/* <img
            className="h-16 w-16 object-cover rounded-full"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
            alt="Current profile photo"
          /> */}
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              onChange={inputFileChanged}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              accept="image/*"
            />
          </label>
        </div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 my-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={handleSubmit}
        >
          {isLoading ? "upLoading..." : "Submit"}
        </button>
      </div>
    </>
  )
}

export default CreatePost
