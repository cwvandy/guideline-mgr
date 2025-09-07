/*
** lib/auth-utils.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

"use server";

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";

export async function login_credentials(email: string, password: string) {
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email and/or password." };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};

export async function logout() {
    try {
        await signOut();
    } catch (error) {
        throw error;
    }
}