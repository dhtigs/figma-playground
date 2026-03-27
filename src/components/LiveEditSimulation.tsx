import { useState, useEffect, useCallback } from "react";

const EDITS = [
  { id: "color", label: "color", target: "heading", action: "Changing heading color...", duration: 2200 },
  { id: "font", label: "font-size", target: "subtitle", action: "Adjusting font size...", duration: 1800 },
  { id: "text", label: "text", target: "tagline", action: "Editing tagline copy...", duration: 2500 },
  { id: "spacing", label: "padding", target: "layout", action: "Tweaking spacing...", duration: 1600 },
  { id: "border", label: "border-radius", target: "badge", action: "Rounding corners...", duration: 2000 },
];

const CODE_SNIPPETS = [
  'font-weight: 800;',
  'letter-spacing: -0.05em;',
  'color: hsl(80, 85%, 65%);',
  'text-transform: uppercase;',
  'opacity: 0.9;',
  'padding: 2rem 0;',
  'border: 1px solid rgba(255,255,255,0.1);',
];

const LiveEditSimulation = () => {
  const [cursorPos, setCursorPos] = useState({ x: 70, y: 30 });
  const [typing, setTyping] = useState("");
  const [typingFull, setTypingFull] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [phase, setPhase] = useState<"move" | "type" | "pause">("pause");

  const runEdit = useCallback(() => {
    const edit = EDITS[Math.floor(Math.random() * EDITS.length)];
    const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];

    // Phase 1: Move cursor
    const newX = 15 + Math.random() * 70;
    const newY = 20 + Math.random() * 60;
    setPhase("move");
    setCursorPos({ x: newX, y: newY });
    setShowTooltip(false);

    setTimeout(() => {
      // Phase 2: Show tooltip and type
      setPhase("type");
      setShowTooltip(true);
      setTooltipText(edit.action);
      setTypingFull(snippet);
      setTyping("");

      let i = 0;
      const typeInterval = setInterval(() => {
        i++;
        setTyping(snippet.slice(0, i));
        if (i >= snippet.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setPhase("pause");
            setShowTooltip(false);
            setTyping("");
          }, 1200);
        }
      }, 60);
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(runEdit, 5500);
    const timeout = setTimeout(runEdit, 1500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [runEdit]);

  // Blink cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Fake cursor */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
      >
        {/* Cursor arrow */}
        <svg width="16" height="20" viewBox="0 0 16 20" className="drop-shadow-lg" fill="none">
          <path d="M1 1L1 17L5.5 12.5L9.5 19L12 17.5L8 11L14 10L1 1Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
        </svg>

        {/* Cursor label */}
        <div className="absolute top-5 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-mono rounded-sm whitespace-nowrap shadow-md">
          Andy
        </div>

        {/* Tooltip with typing */}
        {showTooltip && (
          <div className="absolute top-10 left-0 animate-fade-in">
            <div className="px-3 py-2 bg-card/95 backdrop-blur-sm border border-border rounded-md shadow-xl max-w-[220px]">
              <p className="text-[10px] text-muted-foreground font-mono mb-1">{tooltipText}</p>
              <div className="font-mono text-[11px] text-primary">
                {typing}
                {showCursor && <span className="text-primary">|</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveEditSimulation;
