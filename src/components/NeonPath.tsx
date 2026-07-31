import React from 'react';

interface NeonPathProps {
  svgPath?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  strokeWidth?: number;
  duration?: number; // Animation duration in seconds
  reverse?: boolean;
}

export const NeonPath: React.FC<NeonPathProps> = ({
  svgPath = 'M 20,20 L 380,20 L 440,180 L 20,180 Z',
  width = '100%',
  height = '100%',
  className = '',
  strokeWidth = 2,
  duration = 8,
  reverse = false,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={`absolute pointer-events-none overflow-visible z-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Neon Gradient Definition */}
        <linearGradient id="neonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#0F5BFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7000FF" stopOpacity="0.6" />
        </linearGradient>

        <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dim Base Path (Background Guideline) */}
      <path
        d={svgPath}
        fill="none"
        stroke="rgba(15, 91, 255, 0.15)"
        strokeWidth={strokeWidth}
      />

      {/* Moving Electric Pulse Segment */}
      <path
        d={svgPath}
        fill="none"
        stroke="url(#neonGlowGrad)"
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
        filter="url(#neonBlur)"
        className="animate-stroke-travel"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      />
    </svg>
  );
};
