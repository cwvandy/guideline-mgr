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
import { z } from "zod";

const login_form_schema = z.object({

    email: z.string().email().min(5, {
        message: "Please enter a valid email address.",
    }),

    password: z.string().min(2, {
        message: "Invalid password.",
    }),

});

const LoginForm = () => {

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
        var res = await login_credentials(data.email, data.password);
        if (res?.error) {
            // do something with the error
        }
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
                                <Input className="" type="email" placeholder="email" {...field} />
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
                                <Input className="" type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button variant="default" size="lg" type="submit" disabled={!form.formState.isValid} className="cursor-pointer text-md font-bold text-background dark:text-foreground dark:border-foreground transition-transform duration-100 hover:scale-103">
                        <p>Log in</p>
                    </Button>
                </div>

            </form>
        </Form>
    )

}

export { LoginForm };