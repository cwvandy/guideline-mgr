/*
** utils/fetcher.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import wretch, { Wretch, WretchError } from "wretch";
import { AuthUtils } from "@/utils/auth";

// Extract necessary functions from the AuthUtils utility.
const { handleJWTRefresh, storeToken, getToken } = AuthUtils();

const api = () => {
    return (
        wretch(process.env.NEXT_PUBLIC_BACKEND_URL)
        .auth(`Bearer ${getToken("access")}`) // Initialize authentication with the access token.        
        .catcher(401, async (error: WretchError, request: Wretch) => { // Catch 401 errors to refresh the token and retry the request.
            try {
                // Attempt to refresh the JWT token.
                const { access, refresh } = (await handleJWTRefresh().json()) as { access: string; refresh: string; };
                // Store the new access token.
                storeToken(access, "access");
                // Store the new refresh token.
                storeToken(refresh, "refresh");
                // Replay the original request with the new access token.
                return request
                .auth(`Bearer ${access}`)
                .fetch()
                .unauthorized(() => {
                    window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PATH!);
                }).json();
        } catch (err) {
            window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PATH!);
        }
      })
  );
};

export const fetcher = (url: string): Promise<any> => {
    return api().get(url).json();
};