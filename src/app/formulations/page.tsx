import Link from "next/link";
import { RevealController } from "@/components/RevealController";
import { SplitText } from "@/components/SplitText";
import { FloatingProduct } from "@/components/FloatingProduct";
import { ArrowLeft } from "lucide-react";

export default function FormulationsPage() {
  const formulations = [
    {
      id: "01",
      name: "The Purification Gel",
      type: "CLEANSER",
      ingredients: ["Fermented Rice Water", "Kaolin Clay", "Sake Extract"],
      desc: "A micellar gel that binds to impurities without disrupting the lipid barrier. Cold-fermented over 28 days to preserve active probiotics.",
      image: "/images/cleanse.jfif"
    },
    {
      id: "02",
      name: "The Radiance Serum",
      type: "ACTIVE TREATMENT",
      ingredients: ["Vitamin C Complex", "Reishi Mushroom", "Ashwagandha"],
      desc: "Adaptogenic formula designed to intercept stress signals in the skin while delivering stable, time-released brightening compounds.",
      image: "/images/radiance.jfif"
    },
    {
      id: "03",
      name: "The Barrier Cream",
      type: "LIPID SEALANT",
      ingredients: ["Ceramides NP, AP, EOP", "Squalane", "Colloidal Oatmeal"],
      desc: "A dense, bio-mimetic cream that artificially recreates the skin's protective mantle to lock in hydration and lock out environmental stressors.",
      image: "/images/barrier.jfif"
    },
    {
      id: "04",
      name: "The Eternal Oil",
      type: "NIGHT REPAIR",
      ingredients: ["Blue Tansy", "Rosehip Seed", "Sea Buckthorn"],
      desc: "An intensive overnight cellular repair matrix. Rich in azulene to dramatically reduce inflammation and redness while you sleep.",
      image: "/images/eternal.jfif"
    }
  ];

  return (
    <main className="relative w-full min-h-screen bg-bg text-ink selection:bg-accent selection:text-bg page-enter pb-32">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none p-6 flex justify-between items-start">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <Link href="/" className="font-serif italic text-2xl tracking-wider hover:text-accent transition-colors">AETHERIA.</Link>
          <span className="font-mono text-[10px] tracking-widest text-ink/50">EST. 1978</span>
        </div>
        
        <Link href="/" className="pointer-events-auto flex items-center gap-2 font-mono text-xs tracking-widest text-ink/70 hover:text-accent transition-colors mt-2">
          <ArrowLeft className="w-4 h-4" /> RETURN
        </Link>
      </nav>

      {/* Header */}
      <section className="pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-hairline relative">
        <FloatingProduct size={250} frame={10} opacity={0.15} className="absolute right-0 top-32 mix-blend-screen hidden md:block" />
        <RevealController>
          <div className="font-mono text-xs tracking-widest text-ink/50 mb-8">COMPENDIUM / 47 ACTIVE COMPOUNDS</div>
          <h1 className="font-serif italic text-6xl md:text-8xl leading-none mb-8">
            The <span className="text-accent"><SplitText text="Formulations." delay={200} /></span>
          </h1>
          <p className="font-sans text-sm md:text-base text-ink/70 max-w-2xl leading-relaxed">
            Every drop is cold-pressed and bio-fermented over a 28-day cycle. We utilize 47 active botanical compounds to restore your skin&apos;s natural lipid barrier without the use of synthetics.
          </p>
        </RevealController>
      </section>

      {/* Catalog */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pt-24 flex flex-col gap-32">
        {formulations.map((item, i) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Image Col (Alternating) */}
            <div className={`md:col-span-5 relative aspect-[4/5] bg-ink/5 border border-hairline overflow-hidden group ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
              <RevealController delay={100} className="w-full h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-screen" 
                  style={{ backgroundImage: `url(${item.image})` }} 
                />
              </RevealController>
              <div className="absolute top-4 left-4 bg-bg text-ink font-mono text-[10px] tracking-widest px-3 py-1 rounded-full border border-hairline z-10">
                FORMULA {item.id}
              </div>
            </div>

            {/* Content Col */}
            <div className={`md:col-span-7 flex flex-col justify-center ${i % 2 !== 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <RevealController delay={200}>
                <div className="font-mono text-xs tracking-widest text-accent mb-4">— {item.type}</div>
                <h2 className="font-serif italic text-4xl md:text-5xl mb-6">{item.name}</h2>
                <p className="font-sans text-base text-ink/70 leading-relaxed mb-8 max-w-lg">
                  {item.desc}
                </p>
                
                <div className="flex flex-col gap-4 border-t border-hairline pt-8">
                  <div className="font-mono text-[10px] tracking-widest text-ink/50">KEY ACTIVES</div>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing, j) => (
                      <span key={j} className="text-xs font-mono tracking-wide px-4 py-2 border border-hairline rounded-full text-ink/80 bg-ink/5">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealController>
            </div>
          </div>
        ))}
      </section>
      
      {/* Footer CTA */}
      <section className="mt-32 pt-24 border-t border-hairline text-center px-6">
        <RevealController>
          <h2 className="font-serif italic text-4xl md:text-5xl mb-8">Ready to begin your ritual?</h2>
          <Link href="/" className="inline-flex items-center gap-3 bg-accent text-bg px-8 py-4 rounded-full font-mono text-xs tracking-widest hover:bg-ink transition-colors relative overflow-hidden group">
            <span className="relative z-10">RETURN TO APOTHECARY</span>
          </Link>
        </RevealController>
      </section>
    </main>
  );
}
