import { useSession } from "next-auth/react"
import React, { useEffect } from "react"
import Header from "../components/Header"
import { connect, useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { signInUser } from "../redux/slices/authSlice"

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const session = useSession()
  useEffect(() => {
    if (!isAuthenticated) {
      if (session.data) {
        dispatch(signInUser(session.data))
      }
    }
  }, [session, dispatch, isAuthenticated])
  return (
    <>
      <Header session={undefined} />
      {children}
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
