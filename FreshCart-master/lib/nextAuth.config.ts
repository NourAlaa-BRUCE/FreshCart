import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: " Fresh Cart",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                })
                const data = await res.json()
                console.log("data from config file", data);
                if (data.message === "success") {
                    const decoded = JSON.parse(atob(data.token.split(".")[1]))
                    console.log("decoded iddddddd", decoded);
                    return {
                        email: data.user.email,
                        name: data.user.name,
                        token: data.token,
                        id: decoded.id
                    }
                }
                return null;
                
            }
        })
    ],
    callbacks: {
        jwt(params) {
            console.log("params>>>>>>>>>>.", params);
            if (params.user) {
                params.token.token = params.user.token
                params.token.id = params.user.id
            }
            return params.token
        },
        session(params) {
            return params.session
        }
    },
    session: {
        maxAge: 60 * 60 * 24
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.BETTER_AUTH_SECRET

}



declare module "next-auth" {
  interface User {
    token: string
    id: string
  }

  interface Session {
    user: {
      id: string
      token: string
      name?: string | null
      email?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string
    id?: string
  }
}