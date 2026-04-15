import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supabase Auth Starter",
  description: "Next.js App Router starter with Supabase Auth and Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              Starter
            </Link>
            <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <Link
                className="hover:text-zinc-950 dark:hover:text-white"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:text-zinc-950 dark:hover:text-white"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="hover:text-zinc-950 dark:hover:text-white"
                href="/account"
              >
                Account
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto w-full max-w-5xl px-4 py-6 text-xs text-zinc-600 sm:px-6 dark:text-zinc-400">
            © {new Date().getFullYear()} Starter.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
