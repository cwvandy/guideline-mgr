/*
** middleware.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$|favicon.ico).*)"],
}