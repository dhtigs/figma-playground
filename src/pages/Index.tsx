import DraggableText from "@/components/DraggableText";
import LiveClock from "@/components/LiveClock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6">
        <span className="font-mono text-sm font-bold tracking-wider uppercase">Andy Reff</span>
        <LiveClock />
        <div className="flex gap-8">
          <a href="#work" className="font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">Work</a>
          <a href="#about" className="font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors">About</a>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 pb-24">
        {/* Tagline top */}
        <DraggableText cursorLabel="You">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground text-center">
            Navigating the unknown, pixel by pixel.
          </p>
        </DraggableText>

        {/* Big name - filled */}
        <DraggableText cursorLabel="You" className="mt-4">
          <h1 className="font-display font-bold text-[clamp(4rem,12vw,12rem)] leading-[0.9] tracking-tighter text-foreground text-center select-none">
            ANDY
          </h1>
        </DraggableText>

        {/* Big name - outlined */}
        <DraggableText cursorLabel="Andy Reff">
          <h1 className="font-display font-bold text-[clamp(4rem,12vw,12rem)] leading-[0.9] tracking-tighter text-outline text-center select-none">
            REFF
          </h1>
        </DraggableText>

        {/* Tagline bottom */}
        <DraggableText cursorLabel="You">
          <p className="font-mono text-lg text-muted-foreground text-center mt-4 italic">
            Navigating the unknown, pixel by pixel
          </p>
        </DraggableText>
      </main>

      {/* Ask my work button */}
      <div className="fixed bottom-8 right-8">
        <button className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-bold rounded-full tracking-wider hover:scale-105 transition-transform shadow-lg shadow-primary/20">
          ✦ Ask my work ⌘K
        </button>
      </div>

      {/* Awwwards badge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-foreground text-background px-2 py-6 font-mono text-xs tracking-widest uppercase writing-mode-vertical flex flex-col items-center gap-2">
          <span className="font-bold text-base">W.</span>
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.2em]">Nominee</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
