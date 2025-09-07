/*
** auth.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { logout } from "@/lib/auth-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const response = await axios({
                        url: process.env.AUTH_BACKEND_URL + "auth/login/",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json ",
                        },
                        data: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });
                    const data = response.data;
                    if (data) {
                        return data;
                    }
                } catch (error) {
                    //console.error(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access = user.access;
                token.refresh = user.refresh;
                token.user = user.user;
                token.id = user.id!;
            }
            // TODO token rotation
            return token;
        },
        async session({ session, token }) {
            session.user.access = token.access;
            session.user.refresh = token.refresh;
            session.user.pk = token.user?.pk;
            session.user.email = token.user?.email!;
            session.user.name = token.user?.first_name! + " " + token.user?.last_name!;
            session.user.first_name = token.user?.first_name;
            session.user.last_name = token.user?.last_name;
            session.user.phone_number = token.user?.phone_number;
            session.user.user_type = token.user?.user_type;
            session.user.id = token.id;
            return session;
        },
        authorized: async ({ auth, request: { nextUrl } }) => {
            const is_logged_in = !!auth?.user;
            const is_authorized = (auth?.user.user_type == "manager") || (auth?.user.user_type == "support");
            // redirect if the user is not logged in or, if they are, they aren't an authorized user type
            if (is_logged_in && is_authorized) return true; 
            return false;
        },        
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/",
    },
})

type UserType = "guide" | "client" | "manager" | "support" | "supplier";
interface BackendUser {
    pk?: number;
    email?: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string;
    user_type?: UserType;
}

declare module "next-auth" {
    interface Session {
        user: User & {
            access: string,
            refresh?: string,
            expires_at?: number,
            pk?: number;
            first_name?: string,
            last_name?: string,
            phone_number?: string;
            user_type?: UserType;            
        };
    }
    interface User {
        access: string,
        refresh?: string,
        expires_at?: number,
        user?: BackendUser,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        access: string,
        refresh?: string,
        expires_at?: number,
        user?: BackendUser,
    }
}