"use client";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "./SplitText";

const TOTAL_FRAMES = 214;

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let loaded = 0;
    const frames: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(4, "0");
      img.src = `/frames/frame_${num}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedFrames(loaded);
        if (loaded / TOTAL_FRAMES >= 0.8 && !isReady) {
          setIsReady(true);
        }
      };
      frames.push(img);
    }
    framesRef.current = frames;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !isReady) return;

    const render = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      if (canvas.width !== innerWidth * dpr || canvas.height !== innerHeight * dpr) {
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let p = 0;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const end = rect.height - innerHeight;
        p = -rect.top / end;
        p = Math.max(0, Math.min(1, p));
        setProgress(p); 
      }

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      timeRef.current += 0.016; 
      
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(p * TOTAL_FRAMES)
      );
      
      const img = framesRef.current[frameIndex];
      
      if (img && img.complete) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        const rotateY = mouseRef.current.x * -3 * (Math.PI / 180);
        ctx.rotate(rotateY); 
        
        const bobY = Math.sin(timeRef.current * 2) * 3 * dpr;
        ctx.translate(mouseRef.current.x * 20 * dpr, (mouseRef.current.y * 20 * dpr) + bobY);

        const margin = 0.9;
        const scaleX = (canvas.width * margin) / img.width;
        const scaleY = (canvas.height * margin) / img.height;
        const scale = Math.min(scaleX, scaleY);
        
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        
        ctx.drawImage(
          img,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  const eyebrowOpacity = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.2);
  const headlineOpacity = progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.15);
  
  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center z-50 text-accent font-mono text-sm">
            COMPOUNDING [ {Math.round((loadedFrames / TOTAL_FRAMES) * 100)}% ]
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: isReady ? 1 : 0,
            filter: "contrast(1.12) brightness(1.02) saturate(1.08)",
            WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
            maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(196,154,108,0.15),transparent_70%)] animate-pulse-dot rounded-full" />
        </div>

        {/* Bottom Credits */}
        <div className="absolute bottom-6 left-6 z-10 font-mono text-xs tracking-widest text-ink/70">
          FRESH / DAILY COMPOUNDING
        </div>

        {/* Vertical Side Rails */}
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center z-10 font-mono text-[10px] tracking-widest text-ink/50 whitespace-nowrap">
          AETHERIA · PARIS · 1978 · BOTANICA
        </div>
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center z-10 font-mono text-[10px] tracking-widest text-ink/50 whitespace-nowrap">
          FOR. SCROLL — HYDRATE — RENEW — ETERNAL
        </div>

        {/* Central Typography */}
        <div className="relative z-20 flex flex-col items-center text-center pointer-events-none px-4 mt-[10vh]">
          <div 
            className="font-mono text-xs md:text-sm tracking-[0.3em] mb-8 text-ink/80 transition-opacity duration-300"
            style={{ opacity: eyebrowOpacity }}
          >
            — THE RITUAL OF SKIN —
          </div>
          
          <h1 
            className="font-serif italic text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8 drop-shadow-2xl"
            style={{ opacity: headlineOpacity, transform: `translateY(${progress * -50}px)` }}
          >
            <span className="text-ink mix-blend-difference">Become </span>
            <span className="text-accent relative inline-block">
              <SplitText text="Radiance." delay={500} stagger={50} />
            </span>
          </h1>
          
          <p 
            className="font-sans text-sm md:text-base font-light tracking-wide max-w-md text-ink/70 mix-blend-difference"
            style={{ opacity: headlineOpacity, transform: `translateY(${progress * -30}px)` }}
          >
            Cold-pressed. Bio-fermented. Centuries of botanical wisdom.
          </p>
        </div>
      </div>
    </div>
  );
}
