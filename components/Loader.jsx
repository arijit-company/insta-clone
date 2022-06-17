import React from "react"

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/[.07]">
      <div>
        <img src="images/spin.gif" alt="img" className="w-10" />
      </div>
    </div>
  )
}

export default Loader
