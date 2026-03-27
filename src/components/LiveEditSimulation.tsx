import { useState, useEffect, useCallback } from "react";

const ACTIONS = [
  { action: "Changing heading color...", snippet: 'color: hsl(80, 85%, 65%);' },
  { action: "Adjusting font size...", snippet: 'font-size: clamp(4rem, 12vw, 12rem);' },
  { action: "Editing tagline copy...", snippet: 'letter-spacing: -0.05em;' },
  { action: "Tweaking spacing...", snippet: 'padding: 2rem 0;' },
  { action: "Rounding corners...", snippet: 'border-radius: 12px;' },
  { action: "Moving element...", snippet: '', isDrag: true },
  { action: "Repositioning block...", snippet: '', isDrag: true },
  { action: "Dragging component...", snippet: '', isDrag: true },
];

const LiveEditSimulation = () => {
  const [cursorPos, setCursorPos] = useState({ x: 70, y: 30 });
  const [typing, setTyping] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [dragBox, setDragBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const runEdit = useCallback(() => {
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    const newX = 15 + Math.random() * 70;
    const newY = 20 + Math.random() * 60;
    setCursorPos({ x: newX, y: newY });
    setShowTooltip(false);
    setDragBox(null);

    if (action.isDrag) {
      // Drag simulation
      setTimeout(() => {
        setShowTooltip(true);
        setTooltipText(action.action);
        const boxW = 80 + Math.random() * 60;
        const boxH = 30 + Math.random() * 30;
        setDragBox({ x: newX, y: newY, w: boxW, h: boxH });

        // Move to new position
        const endX = 15 + Math.random() * 70;
        const endY = 20 + Math.random() * 60;
        setTimeout(() => {
          setCursorPos({ x: endX, y: endY });
          setDragBox({ x: endX, y: endY, w: boxW, h: boxH });
        }, 400);

        // Snap back / release
        setTimeout(() => {
          setDragBox(null);
          setShowTooltip(false);
        }, 2200);
      }, 800);
    } else {
      // Type simulation
      setTimeout(() => {
        setShowTooltip(true);
        setTooltipText(action.action);
        setTyping("");
        let i = 0;
        const typeInterval = setInterval(() => {
          i++;
          setTyping(action.snippet.slice(0, i));
          if (i >= action.snippet.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
              setShowTooltip(false);
              setTyping("");
            }, 1200);
          }
        }, 60);
      }, 800);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(runEdit, 5500);
    const timeout = setTimeout(runEdit, 1500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [runEdit]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Drag selection box */}
      {dragBox && (
        <div
          className="absolute border-2 border-primary/60 bg-primary/5 rounded-sm transition-all duration-700 ease-out"
          style={{
            left: `${dragBox.x}%`,
            top: `${dragBox.y}%`,
            width: `${dragBox.w}px`,
            height: `${dragBox.h}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Corner handles */}
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-2 h-2 bg-primary rounded-full`} />
          ))}
        </div>
      )}

      {/* Cursor */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
      >
        <svg width="16" height="20" viewBox="0 0 16 20" className="drop-shadow-lg" fill="none">
          <path d="M1 1L1 17L5.5 12.5L9.5 19L12 17.5L8 11L14 10L1 1Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
        </svg>
        <div className="absolute top-5 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-mono rounded-sm whitespace-nowrap shadow-md">
          Andy
        </div>

        {showTooltip && (
          <div className="absolute top-10 left-0 animate-fade-in">
            <div className="px-3 py-2 bg-card/95 backdrop-blur-sm border border-border rounded-md shadow-xl max-w-[220px]">
              <p className="text-[10px] text-muted-foreground font-mono mb-1">{tooltipText}</p>
              {typing && (
                <div className="font-mono text-[11px] text-primary">
                  {typing}
                  {showCursor && <span className="text-primary">|</span>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveEditSimulation;
