import { useEffect, useRef, useState } from "react";

const STATEMENTS = [
  "I design for those who",
  "dare to stand out from",
  "the ordinary crowd.",
];

const editLabels = [
  "content → editing...",
  "typography → adjusting...",
  "layout → perfecting...",
];

const ScrollStatement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showCursors, setShowCursors] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const raw = (windowH - rect.top) / (windowH + rect.height);
      const progress = Math.max(0, Math.min(1, raw));
      setScrollProgress(progress);

      // Determine which statement line to "select" based on progress
      const lineProgress = progress * 3;
      const idx = Math.min(Math.floor(lineProgress), STATEMENTS.length - 1);
      if (progress > 0.15 && progress < 0.85) {
        setSelectedIndex(idx);
        setShowCursors(true);
      } else {
        setSelectedIndex(-1);
        setShowCursors(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Box expansion: starts as a small line, expands to full size
  const expandProgress = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.35));
  const boxWidth = 20 + expandProgress * 80; // 20% to 100%
  const boxHeight = 4 + expandProgress * 96; // starts as thin line
  const boxOpacity = Math.min(1, scrollProgress * 5);

  // Text reveal: each line appears sequentially
  const getLineOpacity = (i: number) => {
    const lineStart = 0.2 + i * 0.15;
    return Math.max(0, Math.min(1, (scrollProgress - lineStart) / 0.12));
  };
  const getLineTranslate = (i: number) => {
    const lineStart = 0.2 + i * 0.15;
    const p = Math.max(0, Math.min(1, (scrollProgress - lineStart) / 0.12));
    return (1 - p) * 30;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[150vh] flex items-center justify-center px-8 py-32 relative"
    >
      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Section number */}
        <span
          className="font-mono text-sm text-primary tracking-widest mb-6"
          style={{
            opacity: Math.min(1, scrollProgress * 4),
            transform: `translateY(${(1 - Math.min(1, scrollProgress * 4)) * 15}px)`,
            transition: "none",
          }}
        >
          01
        </span>

        {/* Expanding box */}
        <div
          className="relative border border-dashed border-accent/60 rounded-sm flex flex-col items-center justify-center overflow-hidden"
          style={{
            width: `${boxWidth}%`,
            minHeight: `${boxHeight}px`,
            maxHeight: "280px",
            opacity: boxOpacity,
            transition: "none",
          }}
        >
          {/* Figma layer label */}
          {expandProgress > 0.3 && (
            <div
              className="absolute -top-7 left-0 z-20"
              style={{
                opacity: Math.min(1, (expandProgress - 0.3) * 3),
              }}
            >
              <span className="bg-accent/80 text-accent-foreground font-mono text-[11px] px-2 py-0.5 rounded-sm tracking-wide">
                p / Statement 0{Math.max(1, selectedIndex + 1)}
              </span>
            </div>
          )}

          {/* Corner handles */}
          {expandProgress > 0.5 && (
            <>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-accent rounded-[1px]" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-accent rounded-[1px]" />
            </>
          )}

          {/* Text lines */}
          <div className="px-8 py-10 flex flex-col items-center gap-1">
            {STATEMENTS.map((text, i) => (
              <p
                key={i}
                className={`font-display font-medium text-[clamp(1.8rem,5vw,3.5rem)] leading-tight text-center select-none ${
                  selectedIndex === i ? "text-foreground" : "text-foreground"
                }`}
                style={{
                  opacity: getLineOpacity(i),
                  transform: `translateY(${getLineTranslate(i)}px)`,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Floating cursor - editor */}
        {showCursors && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              right: "5%",
              top: "45%",
              opacity: showCursors ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
              <path d="M0 0L16 12L8 12L6 20L0 0Z" fill="hsl(var(--accent))" />
            </svg>
            <div className="ml-4 -mt-1 bg-foreground/90 text-background font-mono text-xs px-3 py-1.5 rounded-sm whitespace-nowrap backdrop-blur-sm">
              {editLabels[Math.max(0, selectedIndex)]}
            </div>
          </div>
        )}

        {/* "You" cursor */}
        {showCursors && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              right: "0%",
              top: "65%",
              opacity: showCursors ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <svg width="14" height="18" viewBox="0 0 16 20" fill="none" className="drop-shadow-lg">
              <path d="M0 0L16 12L8 12L6 20L0 0Z" fill="hsl(var(--foreground))" />
            </svg>
            <div className="ml-3 -mt-1 bg-foreground text-background font-mono text-xs px-2 py-1 rounded-sm">
              You
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollStatement;
