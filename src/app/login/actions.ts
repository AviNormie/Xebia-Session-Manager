"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

async function getRedirectBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) return `${proto}://${host}`;
  return getSiteUrl();
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/account");
}

export async function signUpWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return;

  const supabase = await createSupabaseServerClient();
  const redirectBaseUrl = await getRedirectBaseUrl();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${redirectBaseUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    redirect("/account");
  }

  // If Supabase is configured to require email confirmation, signUp won't create a session.
  // In the "auto sign-in after sign up" setup, we can sign in immediately with password.
  const signInAttempt = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInAttempt.error) {
    redirect(
      `/login?notice=${encodeURIComponent(
        "Your account was created. If email confirmations are enabled in Supabase, you may need to confirm your email before signing in.",
      )}`,
    );
  }

  redirect("/account");
}

export async function signInWithOAuth(provider: "google") {
  const supabase = await createSupabaseServerClient();
  const redirectBaseUrl = await getRedirectBaseUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${redirectBaseUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect(data.url);
}

export async function signInWithGoogle() {
  return signInWithOAuth("google");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

