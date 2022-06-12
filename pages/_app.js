import { SessionProvider } from "next-auth/react"
import { wrapper } from "../redux/store"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default wrapper.withRedux(MyApp)
