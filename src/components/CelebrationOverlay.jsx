import { useEffect, useRef } from "react";

export default function CelebrationOverlay({ score, onClose }) {
  const canvasRef = useRef(null);
  const stopRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const colors = ["#fde047", "#60a5fa", "#34d399", "#fb7185", "#f472b6", "#f59e0b", "#a78bfa"];

    const burst = (x, y) => {
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 2 + Math.random() * 3.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[(i + Math.floor(Math.random() * colors.length)) % colors.length],
          life: 60 + Math.random() * 30,
        });
      }
    };

    let last = performance.now();
    let spawnTimer = 0;

    const tick = (now) => {
      if (stopRef.current) return;
      const dt = Math.min(32, now - last) / 16.6667;
      last = now;
      spawnTimer += dt;

      ctx.fillStyle = "rgba(15,23,42,0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (spawnTimer >= 12) {
        spawnTimer = 0;
        burst(Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
              Math.random() * canvas.height * 0.4 + canvas.height * 0.1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.04 * dt;
        p.vx *= 0.995; p.vy *= 0.995;
        p.alpha = Math.max(0, p.life / 90);
        if (p.alpha <= 0) particles.splice(i, 1);
      }

      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => (stopRef.current = true), 4000);

    return () => {
      stopRef.current = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 backdrop-blur-sm">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative bg-slate-950 border border-slate-700 rounded-xl p-5 text-center shadow-2xl">
        <div className="text-4xl leading-none mb-2">🎆</div>
        <h2 className="m-0 text-2xl font-bold">Congratulations!</h2>
        <p className="mt-1 mb-3">You scored: <strong>{score}</strong></p>
        <button
          className="px-4 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
