"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackError = searchParams.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured. Check .env.local.");
      return;
    }
    setLoading(true);
    const supabase = getSupabase();
    const emailNorm = email.trim().toLowerCase();
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: emailNorm,
      password,
    });
    setLoading(false);
    if (signError) {
      setError(signError.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md animate-fade-up">
      <h1 className="font-serif italic text-4xl md:text-5xl mb-2">Welcome back</h1>
      <p className="font-sans text-sm text-ink/60 mb-10">
        Sign in to continue your rituals.
      </p>

      {(callbackError || error) && (
        <div className="mb-6 rounded border border-red-500/30 bg-red-500/5 px-4 py-3 text-left text-sm font-sans leading-relaxed text-red-300">
          {callbackError === "callback"
            ? "Email link expired or invalid. Try again."
            : error}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              SIGNING IN…
            </>
          ) : (
            "SIGN IN"
          )}
        </button>
      </form>

      <p className="mt-10 font-mono text-[10px] tracking-widest text-ink/40 uppercase text-center">
        New here?{" "}
        <Link href="/signup" className="text-accent hover:text-ink transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="font-mono text-xs tracking-widest text-ink/50">LOADING…</div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
