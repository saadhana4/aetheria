"use client";

/**
 * Publishable keys often break GoTrue email/password flows.
 * Auth expects the legacy anon JWT (eyJ…) from Dashboard → API.
 */
export function PublishableKeyNotice() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!key.startsWith("sb_publishable_")) return null;

  return (
    <div className="mb-8 rounded border border-accent/40 bg-accent/10 px-4 py-3 text-left">
      <p className="font-mono text-[10px] tracking-widest text-accent uppercase mb-2">
        API key notice
      </p>
      <p className="font-sans text-sm leading-relaxed text-ink/85">
        You are using a <strong className="text-ink">publishable</strong> key. Email
        sign-in / sign-up usually needs the <strong className="text-ink">anon JWT</strong>{" "}
        (<code className="text-accent/90">eyJ…</code>) instead. In Supabase:{" "}
        <strong className="text-ink">Project Settings → API</strong>, copy{" "}
        <strong className="text-ink">anon public</strong>, put it in{" "}
        <code className="font-mono text-xs text-ink/70">.env.local</code> as{" "}
        <code className="font-mono text-xs text-ink/70">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        , then restart <code className="font-mono text-xs text-ink/70">npm run dev</code>.
      </p>
    </div>
  );
}
