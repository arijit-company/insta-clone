import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging"

export const firebaseConfig = {
  apiKey: "AIzaSyBnisxmI2TiaxzxfIwPsfOKapGdhzt0odc",
  authDomain: "nextauth-insta.firebaseapp.com",
  projectId: "nextauth-insta",
  storageBucket: "nextauth-insta.appspot.com",
  messagingSenderId: "890993647053",
  appId: "1:890993647053:web:3298447e67d6d5d6773884",
}

// Initialize Firebase
export const initFirebase = () => {
  return !getApps.length ? initializeApp(firebaseConfig) : getApp()
}

// firestore integration
export const db = getFirestore(initFirebase())

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(initFirebase())

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
    if (getApps.length === 0) {
      initializeApp(firebaseConfig)
      console.log("congih")
    }
    const messaging = getMessaging()
    console.log(permission)
    if (permission === "granted") {
      const FCM_TOKEN = await getToken(messaging, {
        vapidKey:
          "BGOrUcnVxF-sqUMcoM9EbN8jYvCWIn5H0oOGEKn-NM10FafLQR1v-j8HKKUMdsSN8cIQsLulFNDnHp4NBvw8o9o",
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
// export const onMessageListener = () => {
//   if (getApps.length === 0) {
//     initializeApp(firebaseConfig)
//     console.log("congih")
//   }
//   console.log(getApps())
//   const messaging = getMessaging()
//   return new Promise((res) => {
//     messaging.onMessage((payload) => {
//       res(payload)
//     })
//   })
// }
