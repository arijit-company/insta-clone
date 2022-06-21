// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js")
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js"
)

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBnisxmI2TiaxzxfIwPsfOKapGdhzt0odc",
  authDomain: "nextauth-insta.firebaseapp.com",
  projectId: "nextauth-insta",
  storageBucket: "nextauth-insta.appspot.com",
  messagingSenderId: "890993647053",
  appId: "1:890993647053:web:3298447e67d6d5d6773884",
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// import { getMessaging, getToken, onMessage } from "firebase/messaging"
// import { onBackgroundMessage } from "firebase/messaging/sw"
// import { firebaseApp } from "./utils/firbase"

// export const foreGroundMsg = () => {
//   return new Promise((res) => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received. ", payload)
//       res(payload)
//     })
//   })
// }

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   )
//   // Customize notification here
//   const notificationTitle = "Background Message Title"
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })
