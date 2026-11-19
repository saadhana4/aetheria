"use client";
import { useEffect, useState } from "react";

export function ScrollProgress({ chapters = 5 }: { chapters?: number }) {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      
      const currentProgress = window.scrollY / totalScroll;
      setProgress(Math.min(1, Math.max(0, currentProgress)));
      
      const chapter = Math.min(
        chapters,
        Math.max(1, Math.ceil(currentProgress * chapters))
      );
      setActiveChapter(chapter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapters]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-4 mix-blend-difference pointer-events-none">
      <span className="font-mono text-[10px] text-ink tracking-widest opacity-50">
        {activeChapter.toString().padStart(2, "0")}
      </span>
      <div className="h-32 w-[1px] bg-hairline relative">
        <div
          className="absolute top-0 left-0 w-full bg-ink origin-top transition-transform duration-75"
          style={{ transform: `scaleY(${progress})`, height: "100%" }}
        />
      </div>
      <span className="font-mono text-[10px] text-ink tracking-widest opacity-50">
        {chapters.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
