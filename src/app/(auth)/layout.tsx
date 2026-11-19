import type { Metadata } from "next";
import Link from "next/link";
import { PublishableKeyNotice } from "@/components/PublishableKeyNotice";

export const metadata: Metadata = {
  title: "Account — AETHERIA",
  description: "Sign in or create an AETHERIA account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg">
      <div className="film-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay" />
      <header className="relative z-10 border-b border-hairline px-6 py-6 md:px-12">
        <Link
          href="/"
          className="font-serif italic text-2xl tracking-wider text-ink hover:text-accent transition-colors"
        >
          AETHERIA.
        </Link>
        <p className="font-mono text-[10px] tracking-widest text-ink/50 mt-1">
          EST. 1978
        </p>
      </header>
      <div className="relative z-10 mx-auto flex w-full max-w-md min-h-[calc(100vh-5.5rem)] flex-col items-stretch justify-center px-6 py-16 md:max-w-lg md:px-12">
        <PublishableKeyNotice />
        {children}
      </div>
    </div>
  );
}
