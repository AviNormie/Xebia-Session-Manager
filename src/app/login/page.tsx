import {
  signInWithGoogle,
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from "./actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  const error = sp.error ? decodeURIComponent(sp.error) : null;
  const notice = sp.notice ? decodeURIComponent(sp.notice) : null;
  const user = data.user;

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:px-6 sm:py-14">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-10 dark:border-white/10 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
          {user
            ? `Signed in as ${user.email ?? user.id}`
            : "Use OAuth or email + password."}
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/20 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        ) : null}

        {notice ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-100">
            {notice}
          </div>
        ) : null}

        {user ? (
          <form className="mt-8" action={signOut}>
            <button className="inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
              Sign out
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <form action={signInWithGoogle}>
              <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-zinc-950 hover:bg-zinc-50 sm:px-6 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="h-[18px] w-[18px] shrink-0"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.197 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.958 3.042l5.657-5.657C34.012 6.053 29.256 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917Z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691 12.88 19.51C14.659 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.958 3.042l5.657-5.657C34.012 6.053 29.256 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.154 0 9.824-1.977 13.368-5.197l-6.19-5.238C29.153 35.091 26.715 36 24 36c-5.176 0-9.62-3.318-11.283-7.946l-6.524 5.026C9.505 39.556 16.227 44 24 44Z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a11.97 11.97 0 0 1-4.125 5.565l.003-.002 6.19 5.238C36.988 39.148 44 34 44 24c0-1.341-.138-2.651-.389-3.917Z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-black/10 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
                  or
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:bg-zinc-900 dark:focus:ring-zinc-700"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-white/10 dark:bg-zinc-900 dark:focus:ring-zinc-700"
                  placeholder="••••••••"
                />
              </div>
              <button
                formAction={signInWithPassword}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Sign in
              </button>
              <button
                formAction={signUpWithPassword}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-zinc-950 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                Create account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

