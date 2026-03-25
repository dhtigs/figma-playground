import ScrollStack from "./ScrollStack";
import { ScrollStackItem } from "./ScrollStack";
import project1Img from "@/assets/project-1.jpg";
import project2Img from "@/assets/project-2.jpg";
import project3Img from "@/assets/project-3.jpg";

const projects = [
  {
    tags: "PRODUCT DESIGN, SUBSCRIPTION PLATFORM",
    title: "Home Maintenance\nSubscription Platform",
    description:
      "Turn home maintenance from something homeowners react to into a relationship they rely on — guided, proactive, and built to grow with them over time.",
    stats: [
      { value: "Double\nDigit", label: "SUBSCRIPTION GROWTH" },
      { value: "Measurable", label: "RETENTION LIFT" },
    ],
    image: project1Img,
    cta: "VIEW CASE STUDY",
  },
  {
    tags: "UI/UX DESIGN, FINTECH",
    title: "Investment Portfolio\nMobile Dashboard",
    description:
      "Reimagining personal finance with an intuitive dark-themed interface that makes complex portfolio management feel effortless and engaging.",
    stats: [
      { value: "4.8★", label: "APP STORE RATING" },
      { value: "120%", label: "USER ENGAGEMENT" },
    ],
    image: project2Img,
    cta: "VIEW CASE STUDY",
  },
  {
    tags: "E-COMMERCE, BRAND DESIGN",
    title: "Sustainable Fashion\nE-Commerce Redesign",
    description:
      "A ground-up redesign for a sustainable fashion brand, focusing on storytelling, earth-toned aesthetics, and a seamless shopping experience.",
    stats: [
      { value: "38%", label: "CONVERSION INCREASE" },
      { value: "2.5x", label: "AVG SESSION TIME" },
    ],
    image: project3Img,
    cta: "VIEW CASE STUDY",
  },
];

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[0];
}) => (
  <div className="bg-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
    {/* Left side - info */}
    <div className="p-8 lg:p-12 flex flex-col justify-between">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground mb-6 uppercase">
          {project.tags}
        </p>
        <h3 className="font-display font-bold text-2xl lg:text-4xl leading-tight text-foreground whitespace-pre-line mb-6">
          {project.title}
        </h3>
        <p className="font-display text-sm lg:text-base text-muted-foreground leading-relaxed max-w-md">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex gap-12 mt-8 mb-8">
          {project.stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display font-bold text-xl lg:text-3xl text-foreground whitespace-pre-line leading-tight">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="font-mono text-sm tracking-widest text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group uppercase"
        >
          {project.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>

    {/* Right side - image */}
    <div className="relative overflow-hidden bg-secondary/30">
      <img
        src={project.image}
        alt={project.title.replace("\n", " ")}
        loading="lazy"
        width={800}
        height={600}
        className="w-full h-full object-cover object-top"
      />
    </div>
  </div>
);

const FeaturedWork = () => {
  return (
    <section id="work" className="px-8 pb-0">
      {/* Section header */}
      <div className="mb-2 flex items-baseline gap-4">
        <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tighter text-foreground uppercase">
          FEATURED{" "}
          <span className="text-outline">WORK</span>
        </h2>
      </div>

      <ScrollStack>
        {projects.map((project, i) => (
          <ScrollStackItem key={i}>
            <ProjectCard project={project} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default FeaturedWork;
