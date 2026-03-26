import { useState } from "react";

const skills = [
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Java", slug: "openjdk", color: "#ED8B00" },
  { name: "Node.js", slug: "nodedotjs", color: "#339933" },
  { name: "HTML5", slug: "html5", color: "#E34F26" },
  { name: "CSS3", slug: "css3", color: "#1572B6" },
  { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
  { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
  { name: "Three.js", slug: "threedotjs", color: "#ffffff" },
  { name: "Figma", slug: "figma", color: "#F24E1E" },
  { name: "Git", slug: "git", color: "#F05032" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "AWS", slug: "amazonwebservices", color: "#FF9900" },
  { name: "Firebase", slug: "firebase", color: "#DD2C00" },
  { name: "GraphQL", slug: "graphql", color: "#E10098" },
  { name: "Redux", slug: "redux", color: "#764ABC" },
  { name: "Vite", slug: "vite", color: "#646CFF" },
  { name: "Framer", slug: "framer", color: "#0055FF" },
  { name: "Vercel", slug: "vercel", color: "#ffffff" },
  { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
];

const SkillsShelf = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-16 text-center">
          Skills & Technologies
        </h2>

        {/* macOS Launchpad grid */}
        <div className="relative rounded-3xl border border-white/[0.08] dark:border-white/[0.08] bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
          {/* Frosted glass overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] pointer-events-none" />

          <div className="relative grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8">
            {skills.map((skill, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <div
                  key={skill.slug}
                  className="flex flex-col items-center gap-2 group cursor-default"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Icon container - macOS style rounded square */}
                  <div
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-[22%] flex items-center justify-center transition-all duration-300 ease-out shadow-lg"
                    style={{
                      background: `linear-gradient(145deg, ${skill.color}22, ${skill.color}11)`,
                      border: `1px solid ${skill.color}33`,
                      boxShadow: isHovered
                        ? `0 8px 30px ${skill.color}30, 0 0 0 1px ${skill.color}40`
                        : `0 4px 12px rgba(0,0,0,0.3)`,
                      transform: isHovered ? "scale(1.15) translateY(-4px)" : "scale(1)",
                    }}
                  >
                    {/* Gloss */}
                    <div
                      className="absolute inset-0 rounded-[22%] overflow-hidden pointer-events-none"
                    >
                      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/[0.2] to-transparent" />
                    </div>
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace("#", "")}`}
                      alt={skill.name}
                      className="w-7 h-7 md:w-8 md:h-8 relative z-10 drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Label */}
                  <span className="font-mono text-[10px] md:text-[11px] text-muted-foreground text-center leading-tight truncate max-w-[64px]">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dock-style dots (page indicator) */}
          <div className="flex justify-center gap-1.5 mt-8">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsShelf;
