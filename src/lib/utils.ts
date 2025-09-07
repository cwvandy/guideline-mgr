/*
** lib/utils.ts
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
