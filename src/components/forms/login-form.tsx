/*
** components/forms/login-form.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

"use client";

import { login_credentials } from "@/lib/auth-utils"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { LuBrain } from "react-icons/lu";

const login_form_schema = z.object({

    email: z.string().email({
        message: "Please enter a valid email address.",
    }),

    password: z.string().min(2, {
        message: "Invalid password.",
    }),

});

const LoginForm = () => {

    const [error, setError] = useState("");
    const [is_thinking, setIsThinking] = useState(false);

    // Define the form
    const form = useForm<z.infer<typeof login_form_schema>>({
        resolver: zodResolver(login_form_schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    // What to do when submitted
    async function onSubmit(data: z.infer<typeof login_form_schema>) {
        setError("");
        setIsThinking(true);
        var res = await login_credentials(data.email, data.password);
        if (res?.error) {
            setError(res.error);
        }
        setIsThinking(false);
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
                    <Button variant="default" size="lg" type="submit" disabled={!form.formState.isValid} className="cursor-pointer text-sm font-semibold text-background  transition-transform duration-100 hover:scale-103">
                        <LuBrain className="text-highlight opacity-0 me-2" />
                        <p>Log in</p>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}>
                            <LuBrain className={`text-highlight ms-2 ${is_thinking ? 'opacity-100' : 'opacity-0'}`} />
                        </motion.div>
                    </Button>
                </div>

                {error && 
                    <p className="text-sm">{error}</p>
                }

            </form>
        </Form>
    )

}

export { LoginForm };