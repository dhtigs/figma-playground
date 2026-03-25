import { useEffect, useRef, useState } from "react";

interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollStackItem = ({ children, className = "" }: ScrollStackItemProps) => {
  return <div className={className}>{children}</div>;
};

interface ScrollStackProps {
  children: React.ReactNode;
}

const ScrollStack = ({ children }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const items = Array.isArray(children) ? children : [children];
  const itemCount = items.length;

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScroll = rect.height - windowH;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyle = (index: number) => {
    const segmentSize = 1 / itemCount;
    const cardProgress = (scrollProgress - index * segmentSize) / segmentSize;
    const clampedProgress = Math.max(0, Math.min(1, cardProgress));

    // Each card starts below and scales up, then stays
    const isActive = scrollProgress >= index * segmentSize;
    const translateY = isActive ? 0 : (1 - clampedProgress) * 100;
    const scale = isActive ? 1 - (itemCount - 1 - index) * 0.02 : 0.95;
    const opacity = isActive ? 1 : 0;

    // Cards that are already scrolled past get pushed up slightly
    const pastProgress = scrollProgress - (index + 1) * segmentSize;
    const pushUp = pastProgress > 0 ? Math.min(pastProgress * 150, 30) : 0;
    const scaleDown = pastProgress > 0 ? Math.max(1 - pastProgress * 0.08, 0.92) : 1;

    return {
      transform: `translateY(${translateY - pushUp}px) scale(${isActive ? scaleDown : scale})`,
      opacity,
      zIndex: index + 1,
      transition: "transform 0.1s linear, opacity 0.3s ease",
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(itemCount + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-end justify-center overflow-hidden pb-8">
        <div className="relative w-full max-w-[1400px]" style={{ height: '75vh' }}>
          {items.map((child, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-full"
              style={{
                ...getCardStyle(i),
                marginTop: `${i * 8}px`, // slight offset for depth
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
