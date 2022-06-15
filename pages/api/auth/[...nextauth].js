import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "../../../utils/connectDb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/custom/signin",
  },
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: async ({ token }) => {
      console.log(token)
      return token
    },
    session: async ({ session }) => {
      return session
    },
  },
})

// theme: {
//   colorScheme: "auto", // "auto" | "dark" | "light"
//   brandColor: "", // Hex color code
//   logo: "" // Absolute URL to image
// }
