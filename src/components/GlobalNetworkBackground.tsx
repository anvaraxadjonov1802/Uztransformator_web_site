import React, { useEffect, useRef } from 'react';

interface NetworkParticle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  isSpark: boolean;
  tint: 'white' | 'blue' | 'cyan';
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mulberry32 = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const particleCountForViewport = (width: number, height: number) => {
  const areaCount = Math.round((width * height) / 16500);
  if (width < 640) return clamp(areaCount, 44, 58);
  if (width < 1024) return clamp(areaCount, 62, 82);
  return clamp(areaCount, 82, 118);
};

export const GlobalNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let particles: NetworkParticle[] = [];
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let pageVisible = !document.hidden;

    const pointerTarget = { x: 0, y: 0 };
    const pointerOffset = { x: 0, y: 0 };

    const buildParticles = () => {
      const random = mulberry32(20260803 + Math.round(width) * 17 + Math.round(height) * 31);
      const count = particleCountForViewport(width, height);

      particles = Array.from({ length: count }, (_, index) => {
        const isSpark = index % 11 === 0 || random() > 0.93;
        const tintRoll = random();
        const tint: NetworkParticle['tint'] =
          tintRoll > 0.91 ? 'cyan' : tintRoll > 0.77 ? 'blue' : 'white';

        return {
          x: random() * width,
          y: random() * height,
          velocityX: (random() - 0.5) * (isSpark ? 0.012 : 0.02),
          velocityY: (random() - 0.5) * (isSpark ? 0.01 : 0.017),
          radius: isSpark ? 1.45 + random() * 1.15 : 0.48 + random() * 1.05,
          opacity: isSpark ? 0.62 + random() * 0.34 : 0.22 + random() * 0.52,
          twinklePhase: random() * Math.PI * 2,
          twinkleSpeed: 0.45 + random() * 1.35,
          isSpark,
          tint,
        };
      });
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.2 : 1.55);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildParticles();
    };

    const scheduleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerTarget.x = (event.clientX / Math.max(1, width) - 0.5) * 14;
      pointerTarget.y = (event.clientY / Math.max(1, height) - 0.5) * 10;
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      lastTime = performance.now();
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };

    const updateParticles = (delta: number) => {
      if (reducedMotion) return;

      const margin = 14;
      for (const particle of particles) {
        particle.x += particle.velocityX * delta;
        particle.y += particle.velocityY * delta;

        if (particle.x < -margin) particle.x = width + margin;
        if (particle.x > width + margin) particle.x = -margin;
        if (particle.y < -margin) particle.y = height + margin;
        if (particle.y > height + margin) particle.y = -margin;
      }
    };

    const pointColor = (particle: NetworkParticle, alpha: number) => {
      if (particle.tint === 'cyan') return `rgba(112,240,255,${alpha})`;
      if (particle.tint === 'blue') return `rgba(158,193,255,${alpha})`;
      return `rgba(242,247,255,${alpha})`;
    };

    const draw = (now: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (!pageVisible) return;

      const delta = Math.min(34, Math.max(0, now - lastTime));
      lastTime = now;
      elapsed += delta / 1000;

      pointerOffset.x += (pointerTarget.x - pointerOffset.x) * 0.025;
      pointerOffset.y += (pointerTarget.y - pointerOffset.y) * 0.025;

      updateParticles(delta);
      context.clearRect(0, 0, width, height);

      const linkDistance = width < 640 ? 105 : width < 1024 ? 125 : 148;
      const maxConnections = width < 640 ? 2 : 3;
      const connectionCounts = new Uint8Array(particles.length);

      context.lineWidth = 0.75;
      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];
        if (connectionCounts[firstIndex] >= maxConnections) continue;

        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          if (
            connectionCounts[firstIndex] >= maxConnections ||
            connectionCounts[secondIndex] >= maxConnections
          ) {
            continue;
          }

          const second = particles[secondIndex];
          const deltaX = first.x - second.x;
          const deltaY = first.y - second.y;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;
          if (distanceSquared > linkDistance * linkDistance) continue;

          const distance = Math.sqrt(distanceSquared);
          const closeness = 1 - distance / linkDistance;
          const lineAlpha = closeness * closeness * 0.15;
          if (lineAlpha < 0.012) continue;

          const firstParallax = 0.32 + first.radius * 0.16;
          const secondParallax = 0.32 + second.radius * 0.16;

          context.beginPath();
          context.moveTo(
            first.x + pointerOffset.x * firstParallax,
            first.y + pointerOffset.y * firstParallax,
          );
          context.lineTo(
            second.x + pointerOffset.x * secondParallax,
            second.y + pointerOffset.y * secondParallax,
          );
          context.strokeStyle = `rgba(72,103,166,${lineAlpha})`;
          context.stroke();

          connectionCounts[firstIndex] += 1;
          connectionCounts[secondIndex] += 1;
        }
      }

      for (const particle of particles) {
        const pulse = reducedMotion
          ? 0.86
          : 0.76 + Math.sin(elapsed * particle.twinkleSpeed + particle.twinklePhase) * 0.24;
        const alpha = clamp(particle.opacity * pulse, 0.08, 0.96);
        const parallax = 0.32 + particle.radius * 0.16;
        const x = particle.x + pointerOffset.x * parallax;
        const y = particle.y + pointerOffset.y * parallax;

        if (particle.isSpark) {
          context.save();
          context.shadowBlur = 9 + particle.radius * 2.5;
          context.shadowColor =
            particle.tint === 'cyan'
              ? 'rgba(0,224,255,0.72)'
              : 'rgba(201,224,255,0.65)';
          context.fillStyle = pointColor(particle, alpha * 0.9);
          context.beginPath();
          context.arc(x, y, particle.radius, 0, Math.PI * 2);
          context.fill();
          context.restore();
        } else {
          context.fillStyle = pointColor(particle, alpha);
          context.beginPath();
          context.arc(x, y, particle.radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    window.addEventListener('resize', scheduleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotionQuery.addEventListener('change', handleMotionPreference);

    resize();
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div className="site-network-background" aria-hidden="true">
      <div className="site-network-base" />
      <canvas ref={canvasRef} className="site-network-canvas" />
      <div className="site-network-ambient" />
      <div className="site-network-vignette" />
    </div>
  );
};
