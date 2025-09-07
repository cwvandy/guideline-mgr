import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
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
                    if (data) return data;
                } catch (error) {
                    //console.error(error);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // TODO token rotation
            return { ...token, ...user };
        },
        async session({ session, token }) {
            return session;
        },
    },
})