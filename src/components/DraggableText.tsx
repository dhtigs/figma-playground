import { useState, useRef, useCallback, useEffect } from "react";

const SNAP_BACK_MESSAGES = [
  "Don't change this 😤",
  "Hey! That's my layout!",
  "Nice try, designer 😏",
  "This isn't Figma, buddy",
  "Put that back! 🫠",
  "I spent hours on this...",
  "Stop rearranging my stuff!",
  "Auto-layout is ON 🔒",
  "Read-only, sorry not sorry",
  "Ctrl+Z activated 😎",
  "The design system says no",
  "My pixel-perfect placement!",
];

interface DraggableTextProps {
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
}

const DraggableText = ({ children, className = "", cursorLabel }: DraggableTextProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSnappingBack, setIsSnappingBack] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showDragHint, setShowDragHint] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setMessage(null);
    setIsSnappingBack(false);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setOffset({
      x: startOffset.current.x + dx,
      y: startOffset.current.y + dy,
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (hasMoved.current) {
      setIsSnappingBack(true);
      const msg = SNAP_BACK_MESSAGES[Math.floor(Math.random() * SNAP_BACK_MESSAGES.length)];
      setMessage(msg);
      setTimeout(() => {
        setOffset({ x: 0, y: 0 });
      }, 50);
      setTimeout(() => {
        setIsSnappingBack(false);
        setMessage(null);
      }, 2500);
    }
  }, [isDragging]);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setShowDragHint(true)}
      onMouseLeave={() => setShowDragHint(false)}
    >
      {/* Drag hint */}
      {showDragHint && !isDragging && !message && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-foreground text-background font-mono text-xs tracking-widest uppercase rounded-sm animate-fade-in whitespace-nowrap">
          Drag to move
        </div>
      )}

      {/* Dashed selection border */}
      {(showDragHint || isDragging || isSnappingBack) && (
        <div
          className="absolute -inset-4 border border-dashed border-muted-foreground/40 rounded-sm pointer-events-none z-10"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        />
      )}

      {/* Cursor label */}
      {cursorLabel && (isDragging || isSnappingBack) && (
        <div
          className="absolute -bottom-6 right-0 z-30 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-mono rounded-sm pointer-events-none"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        >
          {cursorLabel}
        </div>
      )}

      {/* Snap-back message */}
      {message && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 bg-accent text-accent-foreground text-sm font-mono rounded-sm animate-fade-in whitespace-nowrap">
          {message}
        </div>
      )}

      {/* Main draggable content */}
      <div
        className={`cursor-grab active:cursor-grabbing ${className}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableText;
