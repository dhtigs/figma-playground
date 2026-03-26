const skills = [
  [
    { name: "React", slug: "react", color: "#61DAFB" },
    { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
    { name: "Python", slug: "python", color: "#3776AB" },
    { name: "Java", slug: "openjdk", color: "#ED8B00" },
    { name: "Node.js", slug: "nodedotjs", color: "#339933" },
    { name: "HTML5", slug: "html5", color: "#E34F26" },
    { name: "CSS3", slug: "css3", color: "#1572B6" },
  ],
  [
    { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
    { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
    { name: "Three.js", slug: "threedotjs", color: "#ffffff" },
    { name: "Figma", slug: "figma", color: "#F24E1E" },
    { name: "Git", slug: "git", color: "#F05032" },
    { name: "Docker", slug: "docker", color: "#2496ED" },
    { name: "MongoDB", slug: "mongodb", color: "#47A248" },
    { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  ],
  [
    { name: "AWS", slug: "amazonwebservices", color: "#FF9900" },
    { name: "Firebase", slug: "firebase", color: "#DD2C00" },
    { name: "GraphQL", slug: "graphql", color: "#E10098" },
    { name: "Redux", slug: "redux", color: "#764ABC" },
    { name: "Vite", slug: "vite", color: "#646CFF" },
    { name: "Framer", slug: "framer", color: "#0055FF" },
    { name: "Vercel", slug: "vercel", color: "#ffffff" },
    { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
  ],
];

const getIconUrl = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;

const SkillIcon = ({ skill }: { skill: (typeof skills)[0][0] }) => (
  <div className="group shrink-0 flex flex-col items-center relative">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm flex items-center justify-center border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.15] to-transparent rounded-t-2xl" />
      </div>
      <img
        src={getIconUrl(skill.slug, skill.color)}
        alt={skill.name}
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative z-10 drop-shadow-lg"
        loading="lazy"
      />
    </div>
    <span className="font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
      {skill.name}
    </span>
  </div>
);

const GlassShelf = ({ row }: { row: (typeof skills)[0] }) => (
  <div className="relative mt-[-12px]" style={{ perspective: "800px" }}>
    {/* Shelf surface */}
    <div
      className="relative h-5 rounded-sm"
      style={{
        transformOrigin: "bottom center",
        transform: "rotateX(20deg)",
        background:
          "linear-gradient(180deg, rgba(220,225,230,0.15) 0%, rgba(230,233,237,0.25) 50%, rgba(240,242,244,0.35) 100%)",
        boxShadow:
          "0 2px 1px rgba(89,108,124,0.15), 0 4px 0 rgba(160,175,188,0.12), 0 12px 16px -6px rgba(0,0,0,0.2)",
      }}
    >
      {/* Reflections inside shelf */}
      <div
        className="absolute left-0 right-0 flex items-start justify-center gap-4 sm:gap-6 md:gap-8 px-4"
        style={{ top: "12px", bottom: 0 }}
      >
        {row.map((skill, i) => (
          <div
            key={i}
            className="shrink-0 w-16 sm:w-20 md:w-24 h-full"
          >
            <div
              className="w-full h-full"
              style={{
                transform: "scaleY(-1) rotateX(-8deg)",
                transformOrigin: "center center",
                borderRadius: "0 0 35% 35%",
                opacity: 0.2,
                filter: "blur(1.5px)",
                backgroundImage: `url(${getIconUrl(skill.slug, skill.color)})`,
                backgroundSize: "40% auto",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
    {/* Edge highlight */}
    <div
      className="absolute left-[1%] right-[1%] top-full h-px"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.15) 100%)",
      }}
    />
  </div>
);

const SkillsShelf = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-20 text-center">
          Skills & Technologies
        </h2>

        <div className="flex flex-col gap-10">
          {skills.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-col items-center">
              <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap px-4 pb-2">
                {row.map((skill, i) => (
                  <SkillIcon key={i} skill={skill} />
                ))}
              </div>
              <GlassShelf row={row} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShelf;
