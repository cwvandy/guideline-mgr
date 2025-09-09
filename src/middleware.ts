/*
** middleware.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const login_path = process.env.NEXT_PUBLIC_LOGIN_PATH!;
const COOKIE_PREFIX = "Guideline.Manager.";

export async function middleware(request: NextRequest) {

  const cookie_store = await cookies();
  const access_token = cookie_store.get(COOKIE_PREFIX + "accessToken");

  console.log("================MIDDLEWARE================");
  console.log("access_token: ", access_token);
  console.log("request.nextUrl.pathname: ", request.nextUrl.pathname);
  console.log("login_path: ", login_path);
  console.log("==========================================");

  // all routes outside of the login page are protected on Guideline Manager
  if (!access_token && request.nextUrl.pathname !== login_path) {
    //return NextResponse.redirect(new URL(login_path, request.url));
  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$|favicon.ico).*)"],
}