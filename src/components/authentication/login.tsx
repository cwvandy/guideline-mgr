/*
** components/authentication/login.tsx
**
** Copyright (C) 2025 • GDLN, LLC • All Rights Reserved
*/

import { LoginForm } from "@/components/forms/login-form";

const AuthenticationLogin = () => {
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <a href="/">
            <img src="/GLMBadgeLight.svg" alt="Guideline Manager" className="h-14 w-auto dark:hidden" />
            <img src="/GLMBadgeDark.svg" alt="Guideline Manager" className="h-14 w-auto hidden dark:block" />
          </a>
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            <LoginForm />
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Restricted access only.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AuthenticationLogin };
