"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const PRIZES = [
  { rank: 'Winner', amount: '₹60,000', color: '#FFD700' },
  { rank: '1st Runner-Up', amount: '₹25,000', color: '#C0C0C0' },
  { rank: '2nd Runner-Up', amount: '₹15,000', color: '#CD7F32' },
  { rank: 'Consolation (×2)', amount: '₹10,000', color: '#F62A54' },
  { rank: 'Games & Quiz', amount: '₹5,000', color: '#037A76' },
];

export const PrizeVault = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [phase, setPhase] = useState(0); // 0 closed → 1 dial → 2 door open → 3 prizes

  useEffect(() => {
    if (!isInView) return;
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 1400);
    const t2 = setTimeout(() => setPhase(3), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-20 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="text-[#F62A54] font-sans uppercase font-bold"
            style={{ fontSize: '9px', letterSpacing: '0.5em' }}
          >
            What You're Playing For
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mt-3">
            The Prize Vault
          </h2>
        </motion.div>

        <div ref={ref} className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          {/* ── Vault illustration ──────────────────────────── */}
          <div
            className="flex-shrink-0 relative"
            style={{ width: '220px', height: '280px', perspective: '1000px' }}
          >
            {/* Vault body (back plate) */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
                border: '3px solid #333',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.6)',
              }}
            />

            {/* Inner glow when open */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ boxShadow: '0 0 50px rgba(246,42,84,0.35), inset 0 0 30px rgba(246,42,84,0.08)' }}
            />

            {/* Vault door that swings open */}
            <motion.div
              className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-6"
              style={{
                background: 'linear-gradient(160deg, #2a2a2a, #141414)',
                border: '3px solid #444',
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
              animate={phase >= 2 ? { rotateY: -82 } : { rotateY: 0 }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Engraving border rings */}
              <div className="absolute inset-3 rounded-lg border border-[#555] pointer-events-none" />
              <div className="absolute inset-6 rounded-lg border border-[#444]/50 pointer-events-none" />

              {/* Combination dial */}
              <motion.div
                className="relative flex items-center justify-center rounded-full border-4 border-[#555]"
                style={{
                  width: '72px',
                  height: '72px',
                  background: 'radial-gradient(circle at 35% 35%, #555, #1a1a1a)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.05)',
                }}
                animate={phase >= 1 ? { rotate: [0, 270, 180, 360] } : { rotate: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                {/* Tick marks */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#777]"
                    style={{
                      width: '2px',
                      height: '8px',
                      top: '4px',
                      left: 'calc(50% - 1px)',
                      transformOrigin: '1px 32px',
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  />
                ))}
                {/* Indicator needle */}
                <div
                  className="absolute bg-[#F62A54] rounded-sm"
                  style={{ width: '3px', height: '16px', top: '4px', left: 'calc(50% - 1.5px)' }}
                />
                {/* Center cap */}
                <div className="w-4 h-4 rounded-full bg-[#333] border-2 border-[#555]" />
              </motion.div>

              {/* Label */}
              <div
                className="text-gray-500 font-sans uppercase tracking-widest"
                style={{ fontSize: '8px', letterSpacing: '0.5em' }}
              >
                SECURE VAULT
              </div>

              {/* Handle bar */}
              <div className="flex items-center">
                <div
                  className="rounded-full"
                  style={{
                    width: '52px',
                    height: '18px',
                    background: 'linear-gradient(90deg, #333, #555, #333)',
                    border: '2px solid #666',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Prize rows ───────────────────────────────────── */}
          <div className="flex-1 w-full">
            <div className="space-y-5">
              {PRIZES.map((prize, i) => (
                <motion.div
                  key={prize.rank}
                  className="flex items-center justify-between pb-5 border-b border-gray-900"
                  initial={{ opacity: 0, x: 50 }}
                  animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: i * 0.13, duration: 0.5, ease: 'easeOut' }}
                >
                  <div>
                    <div
                      className="font-sans uppercase font-medium text-gray-400"
                      style={{ fontSize: '11px', letterSpacing: '0.3em' }}
                    >
                      {prize.rank}
                    </div>
                  </div>
                  <motion.div
                    className="font-display font-black text-2xl md:text-3xl"
                    style={{
                      color: prize.color,
                      textShadow: `0 0 24px ${prize.color}70`,
                    }}
                    initial={{ scale: 0.8 }}
                    animate={phase >= 3 ? { scale: 1 } : { scale: 0.8 }}
                    transition={{ delay: i * 0.13 + 0.1, type: 'spring', stiffness: 200 }}
                  >
                    {prize.amount}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <motion.div
              className="flex items-center justify-between mt-8 pt-6 border-t-2 border-[#F62A54]/30"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: PRIZES.length * 0.13 + 0.3, duration: 0.5 }}
            >
              <div
                className="text-white font-display font-bold uppercase tracking-widest"
                style={{ fontSize: '14px' }}
              >
                Total Prize Pool
              </div>
              <div
                className="font-display font-black text-3xl md:text-4xl text-[#F62A54]"
                style={{ textShadow: '0 0 30px rgba(246,42,84,0.8)' }}
              >
                ₹1,15,000
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
