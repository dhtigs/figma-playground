import { useState, Suspense, lazy } from "react";

const Lanyard = lazy(() => import("./Lanyard"));

const partners = [
  {
    name: "LOWE'S",
    sector: "ENTERPRISE RETAIL",
    description: "Redesigned the digital shopping experience for one of America's largest home improvement retailers.",
  },
  {
    name: "DRIVECENTRIC",
    sector: "SAAS / AUTOMOTIVE",
    description: "Built a modern dealer platform that transforms how automotive sales teams connect with customers.",
  },
  {
    name: "PUMA",
    sector: "DIGITAL RETAIL",
    description: "Crafted immersive digital storefronts blending athletic performance with streetwear culture.",
  },
  {
    name: "PAYPAL",
    sector: "GLOBAL FINTECH",
    description: "Simplified complex payment flows into intuitive experiences for millions of global users.",
  },
  {
    name: "TESLA",
    sector: "AUTOMOTIVE / ENERGY",
    description: "Designed owner-facing interfaces that make managing electric vehicles and energy products seamless.",
  },
];

const WorkedWith = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="px-8 py-16">
      {/* Header */}
      <div className="mb-4 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2">
        <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tighter text-foreground uppercase">
          WORKED{" "}
          <span className="text-outline">WITH</span>
        </h2>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Enterprise & Global Partners
        </p>
      </div>

      <div className="flex gap-0">
        {/* Lanyard - only on large screens */}
        <div className="hidden xl:block w-[400px] h-[600px] flex-shrink-0 -ml-4">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="font-mono text-xs text-muted-foreground animate-pulse">Loading 3D...</div>
            </div>
          }>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </Suspense>
        </div>

        {/* Partner list */}
        <div className="flex-1">
          {/* Column headers */}
          <div className="flex items-center justify-between py-4 border-b border-border">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Partner</span>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Sector</span>
          </div>

          {partners.map((partner, i) => (
            <div
              key={i}
              className="group border-b border-border py-6 transition-colors duration-300 cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-display font-bold text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tighter uppercase transition-all duration-300 ${
                    hoveredIndex === i
                      ? "text-primary"
                      : "text-outline-thin"
                  }`}
                >
                  {partner.name}
                </h3>
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {partner.sector}
                </span>
              </div>

              {/* Description - reveals on hover */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  hoveredIndex === i ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <p className="font-display text-sm text-muted-foreground max-w-xl">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkedWith;
