import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging"
import { firebaseConfig } from "./config"

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

// firestore integration
export const db = getFirestore(app)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app)

async function isTokenAvailable() {
  return localStorage.getItem("fcm_token_prac")
}

export const cloudMessaging = async () => {
  const token = await isTokenAvailable()
  if (token !== null) {
    return Promise.resolve({
      status: true,
      token: token,
    })
  }
  try {
    const permission = await Notification.requestPermission()

    const messaging = getMessaging(app)
    console.log(messaging)
    console.log(permission)
    if (permission === "granted") {
      const FCM_TOKEN = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
      })
      if (FCM_TOKEN) {
        localStorage.setItem("fcm_token_prac", FCM_TOKEN)
        return Promise.resolve({
          status: true,
          token: FCM_TOKEN,
        })
      }
    }
  } catch (err) {
    console.log(err, "cloudmessaging error")
    return Promise.resolve({
      status: false,
    })
  }
}
export const onMessageListener = () => {
  const messaging = getMessaging(app)
  console.log(messaging)

  return new Promise((res) => {
    messaging.onMessage((payload) => {
      res(payload)
    })
  })
}
