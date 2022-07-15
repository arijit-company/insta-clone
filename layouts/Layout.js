import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { connect, useDispatch, useSelector } from "react-redux"
// import { bindActionCreators } from "redux"
import { logOutUser, signInUser } from "../redux/slices/authSlice"
import { cloudMessaging, onMessageListener } from "../utils/firbase"
import ReactToast from "../components/notification/ReactToast"

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const session = useSession()

  const [notiShow, setNotishow] = useState(false)
  const [notibody, setNotiBody] = useState({
    title: "",
    body: "",
  })

  useEffect(() => {
    firebaseInit()
    async function firebaseInit() {
      try {
        await cloudMessaging()
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log(payload, "onMessageListener")
      })
      .catch((err) => console.log(err, "onMessageListener useEffect"))
  }, [])

  useEffect(() => {
    if (
      session.data &&
      session.status === "authenticated" &&
      !isAuthenticated
    ) {
      dispatch(signInUser(session.data))
    }
    if (session.status === "unauthenticated" && isAuthenticated) {
      dispatch(logOutUser())
    }
  }, [session])
  return (
    <>
      <Header session={session} />
      <div className="p-3">{children}</div>
      {notiShow && <ReactToast {...notibody} />}
    </>
  )
}
// export async function getStaticProps(ctx) {
//   const session = await getSession(ctx)
//   console.log(session)
//   return {
//     props: {
//       session,
//     },
//   }
// }

const mapStateToProps = (state) => {
  // console.log(state)
  return state
}

export default connect(mapStateToProps)(Layout)
