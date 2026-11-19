"use client";
import { useEffect, useState } from "react";

export function FloatingProduct({
  size = 200,
  frame = 1,
  opacity = 0.2,
  className = "",
}: {
  size?: number;
  frame?: number;
  opacity?: number;
  className?: string;
}) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.05);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const frameStr = frame.toString().padStart(4, "0");
  const imgSrc = `/frames/frame_${frameStr}.jpg`;

  return (
    <div
      className={`absolute pointer-events-none animate-float ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `translateY(${offsetY}px)`,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
