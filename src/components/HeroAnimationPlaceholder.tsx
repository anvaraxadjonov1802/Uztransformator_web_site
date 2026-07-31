import React, { useEffect, useRef } from 'react';

interface HeroAnimationPlaceholderProps {
  videoMp4Src?: string;
  videoWebmSrc?: string;
  posterSrc?: string;
  className?: string;
}

export const HeroAnimationPlaceholder: React.FC<HeroAnimationPlaceholderProps> = ({
  videoMp4Src,
  videoWebmSrc,
  posterSrc,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasVideo = Boolean(videoMp4Src || videoWebmSrc);

  useEffect(() => {
    if (hasVideo) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodeCount = Math.min(36, Math.floor(width / 42));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.5 + 0.7,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15,91,255,0.32)';
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [hasVideo]);

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#020308] ${className}`}>
      {hasVideo ? (
        <video
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          className="h-full w-full object-contain object-center sm:object-cover"
          aria-hidden="true"
        >
          {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
          {videoMp4Src && <source src={videoMp4Src} type="video/mp4" />}
        </video>
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full object-cover" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#020308]/28 via-transparent to-[#020308]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(2,3,8,0.28)_72%,#020308_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020308] to-transparent" />
    </div>
  );
};
