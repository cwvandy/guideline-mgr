/*
** utils/auth.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import wretch from "wretch";
import Cookies from "js-cookie";

// Time cookie is stored before it is automatically deleted (in days). this 
// defines how long our session can be kept alive.
const COOKIE_LIFETIME = 7

// A string to append on our cookie names to avoid overwrites by other websites.
const COOKIE_PREFIX = "Guideline.Manager.";

// Base API setup for making HTTP requests
const api = wretch(process.env.NEXT_PUBLIC_BACKEND_URL).accept("application/json");

// Set up default cookie attributes.
//    expires: When the cookie will be removed.
//     domain: Indicating a valid domain where the cookie should be visible.
//     secure: Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//   sameSite: Allowing to control whether the browser is sending a cookie along with cross-site requests.
// const cookies = Cookies.withAttributes({ expires: 7, domain: '.guidelineguides.com', secure: true, sameSite: 'Lax' });
const cookies = Cookies.withAttributes({ expires: COOKIE_LIFETIME });

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
    // TODO: encrypt
    //const sensitiveInfo = "mySecretData";
    //const encryptionKey = "yourSecretKey"; // Keep this secure!
    //const encryptedInfo = encryptData(sensitiveInfo, encryptionKey);
    //Cookies.set('encrypted_cookie', encryptedInfo, { expires: 7, secure: true, sameSite: 'Lax' });
    console.log("===> STORING ", COOKIE_PREFIX + type + "Token");
    console.log("===> VALUE ", token);
    cookies.set(COOKIE_PREFIX + type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string) => {
    // TODO: decrypt
    //const retrievedEncryptedInfo = Cookies.get('encrypted_cookie');
    //if (retrievedEncryptedInfo) {
    //    const decryptedInfo = decryptData(retrievedEncryptedInfo, encryptionKey);
    //    console.log("Decrypted data:", decryptedInfo);
    //}    
    console.log("===> GETTING ", COOKIE_PREFIX + type + "Token");
    console.log("===> VALUE ", cookies.get(COOKIE_PREFIX + type + "Token"));
    return cookies.get(COOKIE_PREFIX + type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
};

/**
 * Sends a POST request to create a new user account with the provided info.
 * @param {string} email
 * @param {string} password1
 * @param {string} password2
 * @param {string} first_name
 * @param {string} last_name
 * @returns user details (see backend)
 */
const register = (email: string, password1: string, password2: string, first_name: string, last_name: string) => {
    return api.post({ email, password1, password2, first_name, last_name }, "auth/register/");
};

/**
 * Send a POST request to authenticate a user by email and password, 
 * expecting to receive JWT tokens on successful authentication.
 * @param {string} email 
 * @param {string} password 
 * @returns access, refresh, user
 */
const login_credentials = (email: string, password: string) => {
    console.log("===> AUTH LOGIN_CREDENTIALS");
    return api.post({ email, password }, "auth/login/");
};

/**
 * Send a POST request to log a user out by sending the refresh token 
 * to the backend, where it will be invalidated and blacklisted.
 * @returns status
 */
const logout = () => {
    console.log("===> AUTH LOGOUT");
    const refresh_token = getToken("refresh");
    return api.post({ refresh: refresh_token }, "auth/logout/");
};

/**
 * Send a POST request with the refresh token to obtain a new access token, 
 * ensuring the user remains authenticated without re-entering credentials.
 * @returns access, refresh, expiration
 */
const handleJWTRefresh = () => {
    console.log("===> AUTH HANDLEJWTREFRESH");
    const refresh_token = getToken("refresh");
    return api.post({ refresh: refresh_token }, "auth/token/refresh/");
};

/**
 * Send a POST request to initiate the password reset process by sending a 
 * user's email to the backend, which then sends a password reset link to
 * the email address.
 * @param {string} email 
 * @returns status
 */
const resetPassword = (email: string) => {
    return api.post({ email }, "auth/password/reset/");
};

/**
 * Sends a POST request with a new password, confirmation of the new password, 
 * token, and user ID to validate and update a user's password.
 * @param new_password 
 * @param re_new_password 
 * @param token 
 * @param uid 
 * @returns 
 */
const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
) => {
    // FIXME these data params may be incorrectly named (expecially the passwords, which should probably be password1 and password2)
    return api.post({ uid, token, new_password, re_new_password }, "auth/password/reset/confirm/");
};

export const AuthUtils = () => {
  return {
    getToken,
    storeToken,
    removeTokens,
    //register,
    login_credentials,
    logout,
    handleJWTRefresh,
    resetPassword,
    resetPasswordConfirm,
  };
};