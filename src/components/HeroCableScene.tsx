import React from 'react';

interface HeroCableSceneProps {
  className?: string;
}

export const HeroCableScene: React.FC<HeroCableSceneProps> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-transparent ${className}`}
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero/uztransformator-hero-poster.webp"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.94] mix-blend-screen [filter:contrast(1.08)_saturate(1.06)]"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 112% 96% at 50% 50%, black 58%, rgba(0,0,0,0.96) 74%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 112% 96% at 50% 50%, black 58%, rgba(0,0,0,0.96) 74%, transparent 100%)',
        }}
      >
        <source src="/assets/hero/uztransformator-cables-clean.webm" type="video/webm" />
        <source src="/assets/hero/uztransformator-cables-clean.mp4" type="video/mp4" />
      </video>

      {/* Title legibility without covering the global animated background. */}
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#020308]/24 blur-[74px]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020308]/16 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020308]/34 to-transparent" />
    </div>
  );
};
