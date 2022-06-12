import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
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
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
})

// theme: {
//   colorScheme: "auto", // "auto" | "dark" | "light"
//   brandColor: "", // Hex color code
//   logo: "" // Absolute URL to image
// }
