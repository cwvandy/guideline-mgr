/*
** components/auth/forms/auth-login-form.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { AuthUtils } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuBrain } from "react-icons/lu";
import { motion } from "framer-motion";

const login_form_schema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(2, {
        message: "Invalid password.",
    }),
});

const AuthLoginForm = () => {

    const [status, setStatus] = useState<"success" | "error" | "loading" | "idle">("idle");
    const [error, setError] = useState("");

    // Define the form
    const form = useForm<z.infer<typeof login_form_schema>>({
        resolver: zodResolver(login_form_schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter();
    const { login_credentials, storeToken } = AuthUtils();

    // What to do when submitted
    const onSubmit = (data: z.infer<typeof login_form_schema>) => {
        setStatus("loading");
        login_credentials(data.email, data.password).json((json) => {
            console.log("success");
            setStatus("success");
            storeToken(json.access, "access");
            storeToken(json.refresh, "refresh");
            router.push('/dashboard');
        }).catch((err) => {
            console.log("error");
            setStatus("error");
            setError(err.json.non_field_errors);
            form.setError("root", { type: "manual", message: err.json.non_field_errors });
        });
    }

    // Form layout
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="" type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="" type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button variant="default" size="lg" type="submit" disabled={status === "loading" || !form.formState.isValid} className="cursor-pointer text-sm font-semibold text-background transition-transform duration-100 hover:scale-103">
                        {status === "loading" ? "Logging in..." : "Log in"}
                        {status === "loading" ? 
                            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}>
                                <LuBrain className="text-highlight ms-2" />
                            </motion.div>
                            : ""}
                    </Button>
                </div>

                {status === "error" && 
                    <div className="">
                        <p className="text-sm">{error}</p>
                        <Link href="/auth/password/reset-password" className="">
                            Forgot password?
                        </Link>
                    </div>
                }

            </form>
        </Form>
    )

}

export { AuthLoginForm };