/*
** lib/types.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

export type UserType = "guide" | "client" | "manager" | "support" | "supplier" | "unknown";

export interface BackendUser {
    pk?: number;
    email?: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string;
    user_type?: UserType;
}