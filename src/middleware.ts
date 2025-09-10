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
  const refresh_token = cookie_store.get(COOKIE_PREFIX + "refreshToken");
  const type_token = cookie_store.get(COOKIE_PREFIX + "userTypeToken");

  console.log("================MIDDLEWARE================");
  console.log("access_token: ", access_token?.value);
  console.log("refresh_token: ", refresh_token?.value);
  console.log("request.nextUrl.pathname: ", request.nextUrl.pathname);
  console.log("type_token: ", type_token?.value);
  console.log("==========================================");

  if (request.nextUrl.pathname != login_path) { // all routes outside of the login page are protected
    if ((!access_token) || // user is not logged in
       (!type_token) || // don't know user type
       (!((type_token?.value === "manager") || (type_token?.value === "support")))) { // wrong user type
        cookie_store.delete(COOKIE_PREFIX + "accessToken"); // clear cookies
        cookie_store.delete(COOKIE_PREFIX + "refreshToken");
        cookie_store.delete(COOKIE_PREFIX + "userTypeToken");
        return NextResponse.redirect(new URL(login_path, request.url)); // redirect to login
    }
  }

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.svg$|.*\\.png$|favicon.ico).*)"],
}