/*
** app/page.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

//import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AuthLogin } from "@/components/auth/sections/auth-login";

export default async function Home() {

  //const session = await auth();
  
  // go to dashboard if the user is already logged in
  //if (session?.user) redirect("/dashboard");

  return (
    <div className="">
      <AuthLogin />
    </div>
  );
}
