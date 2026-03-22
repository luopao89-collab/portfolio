import React, { useEffect, useRef, useState } from 'react';

export const ScrollSweepRevealText = ({ children, className = '', textClassName = '' }: { children: React.ReactNode, className?: string, textClassName?: string }) => {
  const [trigger, setTrigger] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <span className={`relative z-10 transition-opacity duration-300 ${textClassName} ${trigger ? 'opacity-100 delay-500' : 'opacity-0'}`}>
        {children}
      </span>
      {trigger && (
        <>
          <div 
            className="absolute inset-0 z-20 bg-white animate-sweep-reveal"
            style={{ animationFillMode: 'forwards' }}
          ></div>
          <div 
            className="absolute inset-0 z-30 bg-[#ff2e55] animate-sweep-reveal"
            style={{ animationFillMode: 'forwards', animationDelay: '150ms' }}
          ></div>
        </>
      )}
    </div>
  );
};
