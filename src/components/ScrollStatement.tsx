import { useEffect, useRef, useState } from "react";

const STATEMENTS = [
  "I design for those who",
  "dare to stand out from",
  "the ordinary crowd.",
];

const ScrollStatement = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [editingLabel, setEditingLabel] = useState("");

  const editLabels = [
    "content → editing...",
    "typography → adjusting...",
    "layout → perfecting...",
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setVisibleIndex((prev) => Math.max(prev, idx));

            // Trigger selection effect after reveal
            setTimeout(() => {
              setSelectedIndex(idx);
              setShowCursor(true);
              setEditingLabel(editLabels[idx] || editLabels[0]);
              setCursorPos({
                x: entry.boundingClientRect.right - entry.boundingClientRect.width * 0.15,
                y: entry.boundingClientRect.bottom + 10,
              });
            }, 600);

            // Remove selection after a bit
            setTimeout(() => {
              setSelectedIndex((prev) => (prev === idx ? -1 : prev));
              if (idx === STATEMENTS.length - 1) {
                setTimeout(() => setShowCursor(false), 500);
              }
            }, 2200);
          }
        });
      },
      { threshold: 0.6, rootMargin: "0px" }
    );

    const items = section.querySelectorAll("[data-index]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 py-32 relative"
    >
      {/* Section number */}
      <span className="font-mono text-sm text-primary tracking-widest mb-8">
        01
      </span>

      {STATEMENTS.map((text, i) => (
        <div
          key={i}
          data-index={i}
          className="relative"
          style={{
            opacity: visibleIndex >= i ? 1 : 0,
            transform: visibleIndex >= i ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            transitionDelay: `${i * 0.15}s`,
          }}
        >
          {/* Figma selection box */}
          {selectedIndex === i && (
            <>
              {/* Layer label */}
              <div className="absolute -top-7 left-0 z-20 flex items-center gap-1 animate-fade-in">
                <span className="bg-accent/80 text-accent-foreground font-mono text-[11px] px-2 py-0.5 rounded-sm tracking-wide">
                  p / Statement 0{i + 1}
                </span>
              </div>

              {/* Selection border with handles */}
              <div className="absolute -inset-3 border-[1.5px] border-dashed border-accent rounded-sm pointer-events-none z-10 animate-fade-in">
                {/* Corner handles */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-[1px]" />
                {/* Edge midpoint handles */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-accent rounded-[1px]" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-accent rounded-[1px]" />
              </div>
            </>
          )}

          <p className="font-display font-medium text-[clamp(1.8rem,5vw,4rem)] leading-tight text-foreground text-center select-none">
            {text}
          </p>
        </div>
      ))}

      {/* Floating cursor with editing label */}
      {showCursor && selectedIndex >= 0 && (
        <div
          className="fixed z-50 pointer-events-none animate-fade-in"
          style={{
            left: "60%",
            top: "55%",
          }}
        >
          {/* Cursor arrow */}
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            className="drop-shadow-lg"
          >
            <path
              d="M0 0L16 12L8 12L6 20L0 0Z"
              fill="hsl(var(--accent))"
            />
          </svg>
          {/* Label */}
          <div className="ml-4 -mt-1 bg-foreground/90 text-background font-mono text-xs px-3 py-1.5 rounded-sm whitespace-nowrap backdrop-blur-sm">
            {editingLabel}
          </div>
        </div>
      )}

      {/* "You" cursor on the right */}
      {showCursor && (
        <div
          className="fixed z-50 pointer-events-none animate-fade-in"
          style={{
            right: "15%",
            top: "60%",
          }}
        >
          <svg
            width="14"
            height="18"
            viewBox="0 0 16 20"
            fill="none"
            className="drop-shadow-lg"
          >
            <path
              d="M0 0L16 12L8 12L6 20L0 0Z"
              fill="hsl(var(--foreground))"
            />
          </svg>
          <div className="ml-3 -mt-1 bg-foreground text-background font-mono text-xs px-2 py-1 rounded-sm">
            You
          </div>
        </div>
      )}
    </section>
  );
};

export default ScrollStatement;
