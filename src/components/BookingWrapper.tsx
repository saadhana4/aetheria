"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";


export function BookingWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured. Copy .env.example to .env.local and set your project URL and anon key."
      );
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      preferred_date: formData.get("preferred_date"),
    };

    try {
      const { error: supabaseError } = await getSupabase()
        .from("bookings")
        .insert([bookingData]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 3000);
    } catch (err: unknown) {
      console.error("Booking error:", err);
      const message = err instanceof Error ? err.message : "Failed to submit booking request. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="bg-bg border border-hairline p-8 md:p-12 w-full max-w-lg relative z-10 text-ink animate-fade-up shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-ink/50 hover:text-accent transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="font-serif italic text-4xl mb-2">
          Book a Consultation
        </h2>
        <p className="font-sans text-sm text-ink/70 mb-8">
          Experience our 28-day bio-fermentation process.
        </p>

        {submitted ? (
          <div className="font-mono text-accent text-sm py-12 text-center tracking-widest">
            REQUEST RECEIVED.<br />
            WE WILL CONTACT YOU SHORTLY.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest text-ink/50">
                FULL NAME
              </label>
              <input
                required
                type="text"
                name="full_name"
                className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest text-ink/50">
                EMAIL ADDRESS
              </label>
              <input
                required
                type="email"
                name="email"
                className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-widest text-ink/50">
                PREFERRED DATE
              </label>
              <input
                required
                type="date"
                name="preferred_date"
                className="bg-transparent border-b border-hairline outline-none font-sans text-sm pb-2 focus:border-accent transition-colors text-ink"
                style={{ colorScheme: "dark" }}
              />
            </div>

            {error && (
              <div className="font-mono text-[10px] tracking-widest text-red-500 uppercase">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors w-full text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                "SUBMIT REQUEST"
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="inline-block cursor-pointer pointer-events-auto"
      >
        {children}
      </div>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
