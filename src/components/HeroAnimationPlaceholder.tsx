import React, { useEffect, useRef } from 'react';

interface HeroAnimationPlaceholderProps {
  videoSrc?: string;
  className?: string;
}

export const HeroAnimationPlaceholder: React.FC<HeroAnimationPlaceholderProps> = ({
  videoSrc,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoSrc) return; // If video exists, don't run canvas animation

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing high-voltage grid network
    const nodeCount = Math.min(45, Math.floor(width / 35));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      const gridSize = 80;
      ctx.strokeStyle = 'rgba(15, 91, 255, 0.04)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle electrical connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        nodeA.pulse += 0.03;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = dist < 80 ? 1.2 : 0.6;
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Draw node
        const nodeGlow = Math.sin(nodeA.pulse) * 1.5 + nodeA.radius;
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, Math.max(0.5, nodeGlow), 0, Math.PI * 2);
        ctx.fillStyle = nodeA.radius > 2 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(15, 91, 255, 0.7)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw energy wave line across center
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(15, 91, 255, 0.15)';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 10) {
        const y = height * 0.5 + Math.sin(x * 0.005 + time) * 40 + Math.cos(x * 0.01 - time * 0.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [videoSrc]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc} type="video/webm" />
        </video>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full object-cover block" />
      )}

      {/* Dark overlay gradients for crisp readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#020308]/75 to-[#020308]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020308]/40 to-[#020308]" />
    </div>
  );
};
