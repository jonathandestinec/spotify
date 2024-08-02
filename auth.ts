
import NextAuth from "next-auth"
import "next-auth/jwt"
import Spotify from "next-auth/providers/spotify"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Spotify({
        clientId: process.env.AUTH_SPOTIFY_ID,
        clientSecret: process.env.AUTH_SPOTIFY_SECRET,
        authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private'
    })],

    callbacks: {
        jwt({ token, trigger, session, account }) {
            if (trigger === "update") token.name = session.user.name
            if (account?.provider === "spotify") {
                return { ...token, accessToken: account.access_token }
            }
            return token
        },
        async session({ session, token }) {
            if (token?.accessToken) {
                session.accessToken = token.accessToken
            }
            return session
        },
    },
    experimental: {
        enableWebAuthn: true,
    }
})

declare module "next-auth" {
    interface Session {
        accessToken?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
    }
}