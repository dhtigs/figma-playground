import { useState, useRef, useCallback } from "react";

const SNAP_MESSAGES = [
  "Hands off my sketch! ✏️",
  "That's not a Figma layer 😤",
  "Stop moving my doodles!",
  "I drew that there on purpose",
  "Auto-layout says NO 🔒",
  "My whiteboard, my rules",
  "Ctrl+Z incoming... 😎",
  "Don't reorganize my brain!",
];

interface DraggableDoodleProps {
  children: React.ReactNode;
  className?: string;
  floatDelay?: number;
}

const DraggableDoodle = ({ children, className = "", floatDelay = 0 }: DraggableDoodleProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnappingBack, setIsSnappingBack] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showBorder, setShowBorder] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, scale: 1 });
  const hasMoved = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setMessage(null);
    setIsSnappingBack(false);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isResizing) return;
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setOffset({ x: startOffset.current.x + dx, y: startOffset.current.y + dy });
  }, [isDragging, isResizing]);

  const snapBack = useCallback(() => {
    setIsSnappingBack(true);
    const msg = SNAP_MESSAGES[Math.floor(Math.random() * SNAP_MESSAGES.length)];
    setMessage(msg);
    setTimeout(() => {
      setOffset({ x: 0, y: 0 });
      setScale(1);
    }, 50);
    setTimeout(() => {
      setIsSnappingBack(false);
      setMessage(null);
    }, 2500);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (hasMoved.current) snapBack();
  }, [isDragging, snapBack]);

  const handleResizeDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setMessage(null);
    setIsSnappingBack(false);
    resizeStart.current = { x: e.clientX, scale };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [scale]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - resizeStart.current.x;
    const newScale = Math.max(0.5, Math.min(2.5, resizeStart.current.scale + dx / 150));
    setScale(newScale);
  }, [isResizing]);

  const handleResizeUp = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);
    if (Math.abs(scale - 1) > 0.05) snapBack();
  }, [isResizing, scale, snapBack]);

  const floatStyle = {
    animationDelay: `${floatDelay}s`,
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowBorder(true)}
      onMouseLeave={() => { if (!isDragging && !isResizing) setShowBorder(false); }}
    >
      {/* Selection border */}
      {(showBorder || isDragging || isResizing || isSnappingBack) && (
        <div
          className="absolute -inset-3 border border-dashed border-muted-foreground/30 rounded-sm pointer-events-none z-10"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
        />
      )}

      {/* Resize handle - bottom right */}
      {(showBorder || isResizing) && (
        <div
          className="absolute -bottom-4 -right-4 w-3 h-3 bg-accent border border-accent-foreground/30 rounded-sm cursor-nwse-resize z-20 hover:scale-125 transition-transform"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
          }}
          onPointerDown={handleResizeDown}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeUp}
        />
      )}

      {/* Snap-back message */}
      {message && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-accent text-accent-foreground text-xs font-mono rounded-sm animate-fade-in whitespace-nowrap">
          {message}
        </div>
      )}

      {/* Main content */}
      <div
        className={`cursor-grab active:cursor-grabbing animate-float-gentle ${className}`}
        style={{
          ...floatStyle,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: isSnappingBack ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : (isDragging || isResizing ? "none" : undefined),
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

export default DraggableDoodle;
