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

const SkillIcon = ({ skill }: { skill: (typeof skills)[0][0] }) => (
  <div className="group flex flex-col items-center gap-2 relative">
    {/* Main icon */}
    <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm flex items-center justify-center border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
      {/* Inner gloss */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.15] to-transparent rounded-t-2xl" />
      </div>
      <img
        src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace("#", "")}`}
        alt={skill.name}
        className="w-8 h-8 md:w-9 md:h-9 relative z-10 drop-shadow-lg"
        loading="lazy"
      />
    </div>

    {/* Reflection (flipped, faded) */}
    <div className="w-16 h-10 md:w-[72px] md:h-12 rounded-2xl overflow-hidden opacity-[0.15] pointer-events-none -mt-1 transition-all duration-300 group-hover:opacity-[0.25]" style={{ transform: "scaleY(-1)" }}>
      <div className="w-full h-full bg-gradient-to-br from-white/[0.06] to-transparent flex items-center justify-center rounded-2xl">
        <img
          src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace("#", "")}`}
          alt=""
          className="w-8 h-8 md:w-9 md:h-9 opacity-60 blur-[0.5px]"
          loading="lazy"
        />
      </div>
      {/* Fade mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
    </div>

    {/* Label */}
    <span className="font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-1">
      {skill.name}
    </span>
  </div>
);

const GlassShelf = () => (
  <div className="relative w-full max-w-4xl mx-auto -mt-8">
    {/* Glass shelf surface */}
    <div className="h-[3px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent rounded-full" />
    {/* Shelf edge highlight */}
    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-[1px]" />
    {/* Shelf glow underneath */}
    <div className="h-6 bg-gradient-to-b from-white/[0.02] to-transparent mx-[15%] blur-sm" />
  </div>
);

const SkillsShelf = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-20 text-center">
          Skills & Technologies
        </h2>

        <div className="flex flex-col gap-6">
          {skills.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-col items-center">
              <div className="flex justify-center gap-5 md:gap-8 flex-wrap px-4 pb-3">
                {row.map((skill, i) => (
                  <SkillIcon key={i} skill={skill} />
                ))}
              </div>
              <GlassShelf />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShelf;
