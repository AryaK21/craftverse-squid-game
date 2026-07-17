"use client";

import React, { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useInView,
} from 'framer-motion';

const INNER_DOMAINS = [
  { name: 'AI & ML', color: '#F62A54' },
  { name: 'Cyber Security', color: '#037A76' },
  { name: 'FinTech', color: '#F62A54' },
  { name: 'EdTech', color: '#037A76' },
  { name: 'AR/VR & Gaming', color: '#F62A54' },
];

const OUTER_DOMAINS = [
  { name: 'Space Tech', color: '#037A76' },
  { name: 'Healthcare & MedTech', color: '#ffffff' },
  { name: 'Smart Cities & IoT', color: '#F62A54' },
  { name: 'Sustainability & Climate Tech', color: '#037A76' },
  { name: 'Robotics & Automation', color: '#ffffff' },
  { name: 'Open Innovation', color: '#F62A54' },
];

const INNER_R = 320;
const OUTER_R = 510;
const TILT = 0.36; // y-axis compression → ellipse gives 3-D depth illusion

interface PlanetProps {
  name: string;
  color: string;
  totalInRing: number;
  indexInRing: number;
  radius: number;
  speed: number; // rad / sec
  isVisible: boolean;
}

const Planet = ({
  name,
  color,
  totalInRing,
  indexInRing,
  radius,
  speed,
  isVisible,
}: PlanetProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0.4);
  const scale = useMotionValue(0.7);

  const startAngle = (indexInRing / totalInRing) * Math.PI * 2;

  useEffect(() => {
    if (!isVisible) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = (now - startTime) / 1000;
      const angle = startAngle + t * speed;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      x.set(cosA * radius);
      y.set(sinA * radius * TILT);
      const depth = (sinA + 1) / 2;
      opacity.set(0.3 + depth * 0.7);
      scale.set(0.65 + depth * 0.35);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1.5"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity,
        scale,
      }}
    >
      {/* Planet dot */}
      <div
        className="rounded-full flex-shrink-0"
        style={{
          width: '10px',
          height: '10px',
          background: color,
          boxShadow: `0 0 8px ${color}, 0 0 18px ${color}50`,
        }}
      />
      {/* Always-visible label */}
      <div
        className="whitespace-nowrap font-sans font-bold uppercase pointer-events-none"
        style={{
          fontSize: '8px',
          letterSpacing: '0.25em',
          color,
          textShadow: `0 0 8px ${color}80`,
        }}
      >
        {name}
      </div>
    </motion.div>
  );
};

export const Domains = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="w-full py-24 md:py-32 bg-transparent text-white">
      {/* Section heading */}
      <motion.div
        className="text-center mb-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="text-[#F62A54] font-sans uppercase font-bold"
          style={{ fontSize: '9px', letterSpacing: '0.5em' }}
        >
          Innovation Arena
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mt-3">
          Choose Your Domain
        </h2>
        <p
          className="text-gray-500 font-sans mt-4"
          style={{ fontSize: '13px', letterSpacing: '0.3em' }}
        >
          11 battlegrounds. One winner.
        </p>
      </motion.div>

      {/* ── Orbit system (hidden on small screens) ─────────── */}
      <div ref={ref} className="hidden md:flex relative items-center justify-center" style={{ height: '900px' }}>
        {/* Decorative orbit ellipses */}
        <svg
          className="absolute pointer-events-none"
          style={{
            width: '1200px',
            height: '600px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ellipse
            cx={600} cy={300}
            rx={INNER_R} ry={INNER_R * TILT}
            fill="none"
            stroke="rgba(246,42,84,0.08)"
            strokeWidth="1"
          />
          <ellipse
            cx={600} cy={300}
            rx={OUTER_R} ry={OUTER_R * TILT}
            fill="none"
            stroke="rgba(3,122,118,0.08)"
            strokeWidth="1"
          />
        </svg>

        {/* Central sun */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="flex items-center justify-center rounded-full border-2 border-[#F62A54]"
            style={{
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle, rgba(246,42,84,0.18), black)',
              boxShadow: '0 0 40px rgba(246,42,84,0.6), 0 0 80px rgba(246,42,84,0.2)',
            }}
          >
            <span className="font-display font-black text-[#F62A54] text-center uppercase leading-tight" style={{ fontSize: '15px', letterSpacing: '0.12em' }}>
              CRAFT<br />VERSE
            </span>
          </div>
        </motion.div>

        {/* Orbiting planets — origin at dead center */}
        <div className="absolute" style={{ width: 0, height: 0 }}>
          {INNER_DOMAINS.map((d, i) => (
            <Planet
              key={d.name}
              {...d}
              totalInRing={INNER_DOMAINS.length}
              indexInRing={i}
              radius={INNER_R}
              speed={0.42}
              isVisible={isInView}
            />
          ))}
          {OUTER_DOMAINS.map((d, i) => (
            <Planet
              key={d.name}
              {...d}
              totalInRing={OUTER_DOMAINS.length}
              indexInRing={i}
              radius={OUTER_R}
              speed={0.24}
              isVisible={isInView}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile grid fallback ───────────────────────────── */}
      <div className="md:hidden grid grid-cols-2 gap-3 px-6 mt-4">
        {[...INNER_DOMAINS, ...OUTER_DOMAINS].map((d) => (
          <motion.div
            key={d.name}
            className="border rounded-lg p-3 text-center"
            style={{ borderColor: `${d.color}25`, background: `${d.color}08` }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="font-sans uppercase font-semibold"
              style={{ fontSize: '10px', letterSpacing: '0.25em', color: d.color }}
            >
              {d.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint text */}
      <p
        className="hidden md:block text-center text-gray-700 font-sans uppercase mt-8"
        style={{ fontSize: '9px', letterSpacing: '0.4em' }}
      >
        Hover a planet to reveal its domain
      </p>
    </section>
  );
};
