import DraggableDoodle from "./DraggableDoodle";

const HeroDoodles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-20">
      {/* React sketch icon - top left */}
      <div className="absolute top-[15%] left-[8%] pointer-events-auto">
        <DraggableDoodle floatDelay={0}>
          <svg className="w-20 h-20 text-muted-foreground/35 rotate-[-12deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="50" cy="50" rx="44" ry="18" />
            <ellipse cx="50" cy="50" rx="44" ry="18" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="44" ry="18" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <path d="M7 48 Q8 52 6 50" opacity="0.5" />
            <path d="M93 52 Q92 48 94 50" opacity="0.5" />
          </svg>
        </DraggableDoodle>
      </div>

      {/* Python sketch icon - top right */}
      <div className="absolute top-[12%] right-[12%] pointer-events-auto">
        <DraggableDoodle floatDelay={1.2}>
          <svg className="w-18 h-18 text-muted-foreground/35 rotate-[8deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '4.5rem', height: '4.5rem' }}>
            <path d="M50 8 C30 8 20 16 20 28 L20 40 L50 40 L50 44 L16 44 C8 44 4 52 4 64 C4 76 12 82 20 82 L30 82 L30 68 C30 60 36 54 44 54 L56 54 C64 54 70 48 70 40 L70 28 C70 16 62 8 50 8Z" />
            <path d="M50 92 C70 92 80 84 80 72 L80 60 L50 60 L50 56 L84 56 C92 56 96 48 96 36 C96 24 88 18 80 18 L70 18 L70 32 C70 40 64 46 56 46 L44 46 C36 46 30 52 30 60 L30 72 C30 84 38 92 50 92Z" />
            <circle cx="36" cy="24" r="4" fill="currentColor" opacity="0.6" />
            <circle cx="64" cy="76" r="4" fill="currentColor" opacity="0.6" />
          </svg>
        </DraggableDoodle>
      </div>

      {/* Java sketch icon - bottom left */}
      <div className="absolute bottom-[22%] left-[6%] pointer-events-auto">
        <DraggableDoodle floatDelay={2.4}>
          <svg className="w-16 h-16 text-muted-foreground/35 rotate-[5deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 30 L25 70 Q25 85 50 85 Q75 85 75 70 L75 30" />
            <path d="M75 40 Q90 40 90 52 Q90 64 75 64" />
            <path d="M38 24 Q40 16 38 8" />
            <path d="M50 22 Q52 14 50 6" />
            <path d="M62 24 Q64 16 62 8" />
            <line x1="22" y1="30" x2="78" y2="30" />
          </svg>
        </DraggableDoodle>
      </div>

      {/* Database sketch icon - bottom right */}
      <div className="absolute bottom-[18%] right-[8%] pointer-events-auto">
        <DraggableDoodle floatDelay={0.8}>
          <svg className="w-16 h-16 text-muted-foreground/35 rotate-[-6deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="50" cy="22" rx="35" ry="14" />
            <path d="M15 22 L15 78 Q15 92 50 92 Q85 92 85 78 L85 22" />
            <path d="M15 42 Q15 56 50 56 Q85 56 85 42" />
            <path d="M15 62 Q15 76 50 76 Q85 76 85 62" />
          </svg>
        </DraggableDoodle>
      </div>

      {/* TypeScript sketch icon - middle left */}
      <div className="absolute top-[55%] left-[12%] pointer-events-auto">
        <DraggableDoodle floatDelay={1.8}>
          <svg className="w-14 h-14 text-muted-foreground/35 rotate-[-3deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="8" width="84" height="84" rx="8" />
            <line x1="20" y1="42" x2="48" y2="42" />
            <line x1="34" y1="42" x2="34" y2="72" />
            <path d="M60 46 Q60 42 66 42 L74 42 Q80 42 80 48 Q80 54 72 54 L68 54 Q60 54 60 60 Q60 66 66 66 L74 66 Q80 66 80 62" />
          </svg>
        </DraggableDoodle>
      </div>

      {/* Handwritten HTML snippets */}
      <div className="absolute top-[20%] right-[22%] pointer-events-auto">
        <DraggableDoodle floatDelay={0.5}>
          <span className="font-handwriting text-muted-foreground/25 text-lg rotate-[-4deg] whitespace-nowrap block">
            {'<h1>andy reff</h1>'}
          </span>
        </DraggableDoodle>
      </div>

      <div className="absolute bottom-[28%] left-[20%] pointer-events-auto">
        <DraggableDoodle floatDelay={1.5}>
          <span className="font-handwriting text-muted-foreground/25 text-base rotate-[3deg] whitespace-nowrap block">
            {'<div class="portfolio">'}
          </span>
        </DraggableDoodle>
      </div>

      <div className="absolute top-[38%] right-[6%] pointer-events-auto">
        <DraggableDoodle floatDelay={2.0}>
          <span className="font-handwriting text-muted-foreground/25 text-base rotate-[6deg] whitespace-nowrap block">
            {'<p>hello world</p>'}
          </span>
        </DraggableDoodle>
      </div>

      <div className="absolute bottom-[35%] right-[20%] pointer-events-auto">
        <DraggableDoodle floatDelay={0.3}>
          <span className="font-handwriting text-muted-foreground/25 text-lg rotate-[-2deg] whitespace-nowrap block">
            {'</body>'}
          </span>
        </DraggableDoodle>
      </div>

      <div className="absolute top-[45%] left-[22%] pointer-events-auto">
        <DraggableDoodle floatDelay={1.0}>
          <span className="font-handwriting text-muted-foreground/20 text-sm rotate-[2deg] whitespace-nowrap block">
            {'<script src="magic.js"/>'}
          </span>
        </DraggableDoodle>
      </div>

      <div className="absolute top-[70%] right-[15%] pointer-events-auto">
        <DraggableDoodle floatDelay={2.2}>
          <span className="font-handwriting text-muted-foreground/20 text-sm rotate-[-5deg] whitespace-nowrap block">
            {'/* todo: ship it */'}
          </span>
        </DraggableDoodle>
      </div>
    </div>
  );
};

export default HeroDoodles;
