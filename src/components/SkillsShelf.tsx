const skills = [
  // Row 1 - Languages & Core
  [
    { name: "React", icon: "⚛️", color: "#61DAFB", bg: "from-[#1a1a2e] to-[#20232a]" },
    { name: "TypeScript", icon: "TS", color: "#3178C6", bg: "from-[#1e3a5f] to-[#0d2137]", isText: true },
    { name: "JavaScript", icon: "JS", color: "#F7DF1E", bg: "from-[#3a3a0a] to-[#2a2a05]", isText: true },
    { name: "Python", icon: "🐍", color: "#3776AB", bg: "from-[#1a2e4a] to-[#0f1e33]" },
    { name: "Java", icon: "☕", color: "#ED8B00", bg: "from-[#3a2a0a] to-[#2a1f05]" },
    { name: "Node.js", icon: "⬢", color: "#339933", bg: "from-[#0a2a0a] to-[#051f05]" },
    { name: "HTML5", icon: "</>", color: "#E34F26", bg: "from-[#3a1a0a] to-[#2a0f05]", isText: true },
    { name: "CSS3", icon: "#", color: "#1572B6", bg: "from-[#0a1a3a] to-[#050f2a]", isText: true },
  ],
  // Row 2 - Frameworks & Tools
  [
    { name: "Next.js", icon: "N", color: "#ffffff", bg: "from-[#1a1a1a] to-[#0a0a0a]", isText: true },
    { name: "Tailwind", icon: "🌊", color: "#06B6D4", bg: "from-[#0a2a3a] to-[#051f2a]" },
    { name: "Three.js", icon: "△", color: "#ffffff", bg: "from-[#1a1a1a] to-[#111]", isText: true },
    { name: "Figma", icon: "◈", color: "#F24E1E", bg: "from-[#3a1a1a] to-[#2a0f0f]", isText: true },
    { name: "Git", icon: "⑂", color: "#F05032", bg: "from-[#3a1515] to-[#2a0a0a]", isText: true },
    { name: "Docker", icon: "🐳", color: "#2496ED", bg: "from-[#0a1a3a] to-[#050f2a]" },
    { name: "MongoDB", icon: "🍃", color: "#47A248", bg: "from-[#0a2a15] to-[#051f0a]" },
    { name: "PostgreSQL", icon: "🐘", color: "#4169E1", bg: "from-[#1a1a3a] to-[#0f0f2a]" },
  ],
  // Row 3 - More Skills
  [
    { name: "AWS", icon: "☁️", color: "#FF9900", bg: "from-[#3a2a0a] to-[#2a1f05]" },
    { name: "Firebase", icon: "🔥", color: "#FFCA28", bg: "from-[#3a3a0a] to-[#2a2a05]" },
    { name: "GraphQL", icon: "◇", color: "#E10098", bg: "from-[#3a0a2a] to-[#2a051f]", isText: true },
    { name: "Redux", icon: "⟳", color: "#764ABC", bg: "from-[#2a1a3a] to-[#1f0f2a]", isText: true },
    { name: "Vite", icon: "⚡", color: "#646CFF", bg: "from-[#1a1a3a] to-[#0f0f2a]" },
    { name: "Framer", icon: "▸", color: "#0055FF", bg: "from-[#0a1a3a] to-[#050f2a]", isText: true },
    { name: "Vercel", icon: "▲", color: "#ffffff", bg: "from-[#1a1a1a] to-[#0a0a0a]", isText: true },
    { name: "Supabase", icon: "⚡", color: "#3ECF8E", bg: "from-[#0a2a1a] to-[#051f0f]" },
  ],
];

const SkillIcon = ({ skill }: { skill: typeof skills[0][0] }) => (
  <div className="group flex flex-col items-center gap-2">
    <div
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${skill.bg} flex items-center justify-center shadow-lg shadow-black/40 border border-white/[0.08] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
    >
      {/* Gloss overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-2xl" />
      </div>
      <span
        className={`relative z-10 ${skill.isText ? "font-bold text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}
        style={{ color: skill.color }}
      >
        {skill.icon}
      </span>
    </div>
    <span className="font-mono text-[10px] md:text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {skill.name}
    </span>
  </div>
);

const GlassShelf = () => (
  <div className="w-full h-[6px] rounded-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent relative mt-1">
    {/* Shelf reflection */}
    <div className="absolute top-full left-[10%] right-[10%] h-8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-b-full blur-sm" />
  </div>
);

const SkillsShelf = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground mb-16 text-center">
          Skills & Technologies
        </h2>

        <div className="flex flex-col gap-12">
          {skills.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-col items-center">
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap px-4">
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
