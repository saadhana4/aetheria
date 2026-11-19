import Link from "next/link";
import { HeroCanvas } from "@/components/HeroCanvas";
import { RevealController } from "@/components/RevealController";
import { SplitText } from "@/components/SplitText";
import { FloatingProduct } from "@/components/FloatingProduct";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CountUp } from "@/components/CountUp";
import { BookingWrapper } from "@/components/BookingWrapper";
import { ArrowRight, Leaf, Droplets, Wind, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg page-enter">
      {/* SCROLL PROGRESS */}
      <ScrollProgress chapters={7} />
      
      {/* FILM GRAIN — above content, never captures clicks */}
      <div className="film-grain pointer-events-none fixed inset-0 z-[220] opacity-[0.03] mix-blend-overlay" />

      {/* NAV — above hero/canvas so links and BOOK stay clickable */}
      <nav className="fixed top-0 left-0 w-full z-[200] mix-blend-difference pointer-events-none p-6 flex justify-between items-start">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <span className="font-serif italic text-2xl tracking-wider">AETHERIA.</span>
          <span className="font-mono text-[10px] tracking-widest text-ink/50">EST. 1978</span>
        </div>
        
        <div className="hidden md:flex gap-12 font-mono text-xs tracking-widest pointer-events-auto mt-2 items-center">
          <a href="#rituals" className="hover:text-accent transition-colors">01 RITUALS</a>
          <a href="#philosophy" className="hover:text-accent transition-colors">02 PHILOSOPHY</a>
          <a href="#formulations" className="hover:text-accent transition-colors">03 FORMULATIONS</a>
          <a href="#visit" className="hover:text-accent transition-colors">04 VISIT</a>
          <Link href="/login" className="relative z-[1] cursor-pointer hover:text-accent transition-colors">
            SIGN IN
          </Link>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href="/login"
            className="relative z-[1] cursor-pointer md:hidden font-mono text-[10px] tracking-widest text-ink/80 hover:text-accent transition-colors"
          >
            SIGN IN
          </Link>
          <BookingWrapper>
            <button className="flex items-center gap-3 bg-accent text-bg px-5 py-2.5 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors relative overflow-hidden group">
              <span className="relative z-10">BOOK</span>
              <div className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse-dot relative z-10" />
            </button>
          </BookingWrapper>
        </div>
      </nav>

      {/* CART BUBBLE */}
      <div className="fixed bottom-6 right-6 z-[200] pointer-events-auto mix-blend-difference hidden md:block">
        <button className="w-16 h-16 rounded-full border border-ink/20 flex items-center justify-center font-mono text-[10px] tracking-widest hover:border-accent transition-colors backdrop-blur-sm">
          CART (0)
        </button>
      </div>

      {/* 01 HERO */}
      <HeroCanvas />

      {/* 02 PHILOSOPHY */}
      <section id="philosophy" className="relative py-32 md:py-48 px-6 md:px-12 border-t border-hairline overflow-hidden">
        <FloatingProduct size={300} frame={45} opacity={0.08} className="-right-20 top-20" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-3 hidden md:block">
            {/* Kept empty to maintain the editorial offset and embrace negative space */}
          </div>
          
          <div className="md:col-span-9 flex flex-col gap-24 relative z-10">
            <RevealController>
              <p className="font-serif italic text-2xl md:text-4xl leading-relaxed max-w-4xl drop-cap">
                The skin is not a surface to be corrected, but an ecosystem to be cultivated. We reject the violence of synthetics. Instead, we return to the slow, precise alchemy of cold-pressed bio-fermentation.
              </p>
            </RevealController>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-hairline pt-12">
              <RevealController delay={100}>
                <div className="flex flex-col gap-4">
                  <Droplets className="w-5 h-5 text-accent" />
                  <div className="font-sans text-sm font-medium">Bio-Fermented</div>
                  <div className="font-mono text-xs text-ink/50">28-day cycle</div>
                </div>
              </RevealController>
              <RevealController delay={200}>
                <div className="flex flex-col gap-4">
                  <Wind className="w-5 h-5 text-accent" />
                  <div className="font-sans text-sm font-medium">Cold-Pressed</div>
                  <div className="font-mono text-xs text-ink/50">Never heated</div>
                </div>
              </RevealController>
              <RevealController delay={300}>
                <div className="flex flex-col gap-4">
                  <Leaf className="w-5 h-5 text-accent" />
                  <div className="font-sans text-sm font-medium">Botanical</div>
                  <div className="font-mono text-xs text-ink/50">47 active compounds</div>
                </div>
              </RevealController>
              <RevealController delay={400}>
                <div className="flex flex-col gap-4">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <div className="font-sans text-sm font-medium">Compostable</div>
                  <div className="font-mono text-xs text-ink/50">Zero waste</div>
                </div>
              </RevealController>
            </div>
          </div>
        </div>
      </section>

      {/* 03 RITUALS */}
      <section id="rituals" className="relative py-32 md:py-48 px-6 md:px-12 border-t border-hairline bg-bg">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          <RevealController>
            <h2 className="font-serif italic text-5xl md:text-7xl leading-tight text-center md:text-left">
              Three vessels.<br/>
              <span className="text-accent"><SplitText text="One ritual." delay={200} /></span>
            </h2>
          </RevealController>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                step: "01",
                label: "CLEANSE",
                numeral: "I",
                price: "$48",
                name: "The Purification",
                desc: "Micellar gel with fermented rice water",
                pills: ["Rice", "Sake", "Kaolin"],
                image: "/images/cleanse.jfif"
              },


              {
                step: "02",
                label: "TREAT",
                numeral: "II",
                price: "$86",
                name: "The Radiance",
                desc: "Active vitamin C and adaptogenic reishi",
                pills: ["Reishi", "Vit C", "Ashwagandha"],
                image: "/images/radiance.jfif"
              },

              {
                step: "03",
                label: "SEAL",
                numeral: "III",
                price: "$72",
                name: "The Barrier",
                desc: "Ceramide-rich lipid restoration cream",
                pills: ["Ceramides", "Squalane", "Oat"],
                image: "/images/barrier.jfif"
              }

            ].map((item, i) => (
              <RevealController key={i} delay={i * 200}>
                <div className="flex flex-col group cursor-pointer h-full">
                  <div className="relative aspect-square mb-8 overflow-hidden bg-ink/5 border border-hairline group-hover:border-accent/50 transition-colors">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-screen" 
                      style={{ backgroundImage: `url(${item.image})` }} 
                    />

                    <div className="absolute top-4 left-4 bg-bg text-ink font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border border-hairline group-hover:border-accent/30 transition-colors">
                      STEP {item.step}
                    </div>
                    <div className="absolute bottom-4 left-4 font-mono text-xs tracking-widest text-ink/70">
                      — {item.label}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-4 font-mono text-sm">
                    <span className="text-ink/50">{item.numeral}</span>
                    <span className="text-gold">{item.price}</span>
                  </div>
                  
                  <h3 className="font-serif italic text-2xl mb-2 group-hover:text-accent transition-colors">{item.name}</h3>
                  <p className="font-sans text-sm text-ink/70 mb-6 min-h-[40px]">{item.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.pills.map((pill, j) => (
                      <span key={j} className="text-xs font-mono tracking-wide px-3 py-1 border border-hairline rounded-full text-ink/60 bg-ink/5">
                        {pill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex items-center font-mono text-xs tracking-widest text-accent hover-underline w-max">
                    DISCOVER <ArrowRight className="ml-2 w-3 h-3 inline" />
                  </div>
                </div>
              </RevealController>
            ))}
          </div>
        </div>
      </section>

      {/* 04 METRICS */}
      <section className="relative py-24 border-y border-hairline bg-bg text-ink overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-2 md:col-span-4 mb-8 md:mb-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 pointer-events-none opacity-10 font-serif italic text-5xl md:text-8xl whitespace-nowrap text-center">
            True beauty is the sum of its precision.
          </div>
          
          {[
            { value: 28, suffix: "d", label: "FERMENT CYCLE", desc: "Cold bio-fermentation" },
            { value: 47, suffix: "", label: "ACTIVE COMPOUNDS", desc: "Per formula" },
            { value: 0, suffix: "%", label: "SYNTHETICS", desc: "100% botanical" },
            { value: 1978, suffix: "", label: "FOUNDED", desc: "Three generations" }
          ].map((metric, i) => (
            <RevealController key={i} delay={i * 150} className="relative z-10 flex flex-col items-center md:items-start">
              <div className="font-serif text-5xl md:text-6xl text-accent mb-4 drop-shadow-sm">
                <CountUp end={metric.value} suffix={metric.suffix} />
              </div>
              <div className="font-mono text-xs tracking-widest mb-2 font-bold">{metric.label}</div>
              <div className="font-sans text-sm text-ink/70">{metric.desc}</div>
            </RevealController>
          ))}
        </div>
      </section>

      {/* 05 TESTIMONIAL */}
      <section className="relative min-h-[60vh] flex items-center py-32 px-6 md:px-12 overflow-hidden">
        <FloatingProduct size={500} frame={100} opacity={0.06} className="-left-40 top-1/2 -translate-y-1/2 mix-blend-screen" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealController>
            <div className="font-serif text-8xl text-accent leading-none h-12 mb-8 select-none opacity-80">“</div>
            <h3 className="font-serif italic text-3xl md:text-5xl leading-snug mb-16 px-4">
              My skin stopped performing. Then I stopped performing for it — <span className="text-accent inline-block"><SplitText text="I just listened." /></span>
            </h3>
            <div className="flex flex-col items-center gap-2 font-mono tracking-widest">
              <span className="text-sm">DR. ISABELLE MOREAU</span>
              <span className="text-[10px] text-ink/50">BIOCHEMIST · PARIS · FOUNDER</span>
            </div>
          </RevealController>
        </div>
      </section>

      {/* 06 FORMULATIONS */}
      <section id="formulations" className="relative py-32 md:py-48 px-6 md:px-12 border-t border-hairline bg-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 flex flex-col justify-between">
            <RevealController>
              <h2 className="font-serif italic text-5xl md:text-6xl leading-tight mb-8">
                Rooted in <span className="text-accent">biology</span>.<br/>
                Refined for <span className="text-accent">sensitivity.</span>
              </h2>
            </RevealController>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {[
              { num: "01", title: "Bio-Fermentation", desc: "28-day cold fermentation. Living probiotics preserved." },
              { num: "02", title: "Lipid Barrier", desc: "Ceramide-rich. Restores moisture equilibrium." },
              { num: "03", title: "Adaptogens", desc: "Ashwagandha + reishi. Stress-response skincare." },
              { num: "04", title: "Zero Waste", desc: "Glass refill system. Compostable packaging." }
            ].map((item, i) => (
              <RevealController key={i} delay={i * 150} className="group cursor-default relative">
                <div className="absolute -left-6 top-0 w-[1px] h-full bg-hairline hidden sm:block" />
                <div className="font-mono text-accent text-sm mb-4">[{item.num}]</div>
                <h4 className="font-sans text-xl mb-3 relative inline-block group-hover:text-accent transition-colors duration-300">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                </h4>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">{item.desc}</p>
              </RevealController>
            ))}
          </div>
        </div>
      </section>

      {/* 07 FINAL CTA */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-32 px-6 border-t border-hairline overflow-hidden bg-bg">
        <FloatingProduct size={250} frame={150} opacity={0.15} className="right-[10%] top-[20%]" />
        <FloatingProduct size={180} frame={210} opacity={0.1} className="left-[15%] bottom-[20%]" />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <RevealController>
            <h2 className="font-serif italic text-6xl md:text-8xl leading-none mb-12 drop-shadow-xl">
              One drop.<br/>
              <span className="text-accent"><SplitText text="You'll feel it." delay={300} /></span>
            </h2>
          </RevealController>
          
          <RevealController delay={200}>
            <div className="font-mono text-xs tracking-widest text-ink/50 mb-12 border border-hairline px-6 py-2 rounded-full inline-block backdrop-blur-sm">
              APOTHECARY HOURS: TUE-SAT, 10AM - 7PM
            </div>
          </RevealController>
          
          <RevealController delay={300} className="flex flex-col sm:flex-row items-center gap-6">
            <BookingWrapper>
              <button className="bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors flex items-center group relative overflow-hidden">
                <span className="relative z-10">BOOK CONSULTATION</span>
                <ArrowRight className="relative z-10 ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </BookingWrapper>
            <Link href="/formulations" className="font-mono text-xs tracking-widest text-ink/70 hover:text-ink hover-underline transition-colors mt-4 sm:mt-0">
              DISCOVER FORMULATIONS
            </Link>
          </RevealController>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="visit" className="relative bg-bg pt-24 pb-12 px-6 md:px-12 border-t border-hairline">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="flex flex-col items-start gap-8">
              <div className="font-serif italic text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-none pr-4 select-none">
                aetheria<span className="text-accent">.</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest text-ink/50 mb-2">VISIT</span>
                <span className="font-sans text-sm text-ink/80 leading-loose">
                  14 Rue de Bretagne<br/>
                  75003 Paris<br/>
                  France
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest text-ink/50 mb-2">CONTACT</span>
                <a href="#" className="font-sans text-sm text-ink/80 hover:text-accent hover-underline w-max transition-colors">bonjour@aetheria.com</a>
                <a href="#" className="font-sans text-sm text-ink/80 hover:text-accent hover-underline w-max transition-colors">+33 1 42 77 00 00</a>
              </div>
              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <span className="font-mono text-xs tracking-widest text-ink/50 mb-2">NEWSLETTER</span>
                <form className="flex border-b border-hairline pb-2 group focus-within:border-accent transition-colors">
                  <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none font-sans text-sm w-full placeholder:text-ink/30" required />
                  <button type="submit" className="font-mono text-[10px] tracking-widest text-accent hover:text-ink transition-colors whitespace-nowrap pl-2">
                    SUBSCRIBE →
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-hairline gap-4 font-mono text-[10px] tracking-widest text-ink/40">
            <div>© {new Date().getFullYear()} AETHERIA. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-ink transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-ink transition-colors">TERMS</a>
              <a href="#" className="hover:text-ink transition-colors">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
