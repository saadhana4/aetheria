"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

const MIN_PASSWORD = 8;

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

function isReasonableEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured. Check .env.local.");
      return;
    }
    const emailNorm = normalizeEmail(email);
    if (!emailNorm) {
      setError("Enter an email address.");
      return;
    }
    if (!isReasonableEmail(emailNorm)) {
      setError("That doesn’t look like a valid email. Check for typos or extra spaces.");
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters (Supabase default).`);
      return;
    }
    setLoading(true);
    const supabase = getSupabase();
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const { error: signError } = await supabase.auth.signUp({
      email: emailNorm,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (signError) {
      setError(signError.message ?? "Sign up failed.");
      return;
    }
    setEmail(emailNorm);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="w-full max-w-md animate-fade-up text-center">
        <h1 className="font-serif italic text-4xl md:text-5xl mb-4">Almost there</h1>
        <p className="font-sans text-sm text-ink/70 mb-8 leading-relaxed">
          If email confirmation is enabled for your project, we sent a link to{" "}
          <span className="text-accent">{email}</span>. Open it to activate your account.
        </p>
        <p className="font-mono text-[10px] tracking-widest text-ink/40 uppercase mb-8">
          No email? Check spam, or disable “Confirm email” in Supabase Auth settings for instant access.
        </p>
        <Link
          href="/login"
          className="inline-block bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors"
        >
          BACK TO SIGN IN
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade-up">
      <h1 className="font-serif italic text-4xl md:text-5xl mb-2">Join AETHERIA</h1>
      <p className="font-sans text-sm text-ink/60 mb-10">
        Create an account for consultations and member rituals.
      </p>

      {error && (
        <div className="mb-6 rounded border border-red-500/30 bg-red-500/5 px-4 py-3 text-left text-sm font-sans leading-relaxed text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-widest text-ink/50">
            EMAIL
          </label>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(normalizeEmail(e.target.value))}
            className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-widest text-ink/50">
            PASSWORD
          </label>
          <input
            required
            type="password"
            autoComplete="new-password"
            minLength={MIN_PASSWORD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
          />
          <span className="font-mono text-[9px] text-ink/35 tracking-wider">
            Minimum {MIN_PASSWORD} characters (matches Supabase default)
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              CREATING…
            </>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>
      </form>

      <p className="mt-10 font-mono text-[10px] tracking-widest text-ink/40 uppercase text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:text-ink transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
