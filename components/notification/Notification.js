import React, { useEffect } from "react"
import { cloudMessaging } from "../../utils/firbase"

const Notification = () => {
  const initCloudMessaging = async () => {
    await cloudMessaging()
  }
  useEffect(() => {
    initCloudMessaging()
  }, [])
  return <></>
}

export default Notification
