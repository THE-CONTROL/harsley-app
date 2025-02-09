import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema, User } from "./lib/definitions";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Credentials({
        credentials: {
            email: { type: "email", label: "Email", required: true, placeholder: "example@mail.com" },
            password: { type: "password", label: "Password", required: true, placeholder: "********" }
        },
        authorize: async (credentials) => {
            let user = null

            //validate credentials
            const parsedCredentials = signInSchema.safeParse(credentials)

            if (!parsedCredentials.success) {
                console.error("Invalid credentials", parsedCredentials.error.errors)
                return null
            }

            //get user
            user = {
                id: "1",
                name: "Iyen Paul",
                email: "iyenpaul@gmail.com",
                role: "admin"
            }

            if (!user) {
                return null
            }

            return user as User
        }
    })],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user
            const { pathname } = nextUrl
            if (pathname.startsWith("/auth") && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl))
            } 

            return  !!auth
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as "string"
                token.role = user.role as "string"
            }
            if (trigger === "update" && session) {            
                token = { ...token, ...session }
            }
            return token
        },
        session({ session, token }) {
            session.user = token.user as  AdapterUser & User ;
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
})
