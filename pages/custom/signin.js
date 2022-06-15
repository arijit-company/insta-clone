import { getProviders, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const SignIn = ({ providers }) => {
  const { status } = useSession()
  const { push, query, back } = useRouter()
  const redirectUrl = query.callbackUrl || "/"

  const [emailInput, setEmailInput] = useState("")

  const emailLogin = () => {}

  useEffect(() => {
    if (status === "authenticated") {
      push(redirectUrl)
    }
  }, [status])
  return (
    <>
      <div onClick={() => back()} className="m-5 p-3 cursor-pointer">
        back
      </div>
      <div className="flex items-center justify-center">
        {status === "loading" ? (
          <div>loading...</div>
        ) : status === "unauthenticated" ? (
          <div className="p-3 shadow-lg rounded-md">
            <div className="py-2">
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={emailInput}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="you@example.com"
                />
              </label>
              <button
                className="bg-sky-600 hover:bg-sky-700 m-3 p-3 text-white rounded-lg"
                onClick={emailLogin}
              >
                Login with email
              </button>
              <hr />
              <p>or</p>
            </div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="py-2">
                <button
                  onClick={() => signIn(provider.id)}
                  className="p-2 bg-blue-500 flex items-center justify-center rounded-md text-white"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>Already signed in , redirecting...</div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignIn
