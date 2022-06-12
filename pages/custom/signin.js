import { getProviders, signIn } from "next-auth/react"
import React, { useEffect } from "react"
import Layout from "../../layouts/Layout"

const SignIn = ({ providers }) => {
  useEffect(() => {
    console.log(providers)
  }, [])
  return (
    <>
      <Layout>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </Layout>
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
