import React from "react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ReactToast = (...props) => {
  toast.info(<DisplayMsg {...props} />)

  return <ToastContainer />
}

const DisplayMsg = ({ title, body }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  )
}

export default ReactToast
