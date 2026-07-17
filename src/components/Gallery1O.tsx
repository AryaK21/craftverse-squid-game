"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';

const CHAPTERS = [
  {
    id: 'bts',
    label: 'Chapter 01',
    title: 'BEHIND THE BUILD',
    subtitle: 'The arena was built by the players.',
    photos: [
      { src: '/gallery/photo-09.jpeg', caption: 'Prop Making', rot: -5, x: 4, y: 18 },
      { src: '/gallery/photo-10.jpeg', caption: 'Setup Day', rot: 3, x: 32, y: 13 },
      { src: '/gallery/photo-11.jpeg', caption: 'Last Night Prep', rot: -3, x: 58, y: 16 },
      { src: '/gallery/photo-12.jpeg', caption: 'The Details', rot: 6, x: 16, y: 52 },
      { src: '/gallery/photo-13.jpeg', caption: 'Game On', rot: -2, x: 46, y: 55 },
    ],
    strings: [
      { x1: 13, y1: 35, x2: 40, y2: 30 },
      { x1: 40, y1: 30, x2: 68, y2: 34 },
      { x1: 25, y1: 72, x2: 56, y2: 75 },
      { x1: 40, y1: 30, x2: 25, y2: 72 },
    ],
  },
  {
    id: 'floor',
    label: 'Chapter 02',
    title: 'THE ARENA WAS REAL',
    subtitle: '30 hours. No shortcuts.',
    photos: [
      { src: '/gallery/photo-03.jpeg', caption: 'Floor Opens', rot: 2, x: 3, y: 15 },
      { src: '/gallery/photo-04.jpeg', caption: 'Round 1 Begins', rot: -4, x: 31, y: 12 },
      { src: '/gallery/photo-07.jpeg', caption: 'Mentor Review', rot: 5, x: 58, y: 16 },
      { src: '/gallery/photo-08.jpeg', caption: '3AM Still Coding', rot: -3, x: 14, y: 53 },
      { src: '/gallery/photo-14.jpeg', caption: 'The Hustle', rot: 3, x: 47, y: 56 },
    ],
    strings: [
      { x1: 12, y1: 33, x2: 39, y2: 30 },
      { x1: 39, y1: 30, x2: 67, y2: 34 },
      { x1: 22, y1: 73, x2: 57, y2: 76 },
      { x1: 67, y1: 34, x2: 57, y2: 76 },
    ],
  },
  {
    id: 'winners',
    label: 'Chapter 03',
    title: 'SURVIVORS CROWNED',
    subtitle: 'Only the best made it out.',
    photos: [
      { src: '/gallery/photo-01.jpeg', caption: 'The Team', rot: -3, x: 4, y: 16 },
      { src: '/gallery/photo-02.jpeg', caption: 'Final Round', rot: 4, x: 34, y: 12 },
      { src: '/gallery/photo-05.jpeg', caption: 'Award Ceremony', rot: -5, x: 60, y: 18 },
      { src: '/gallery/photo-06.jpeg', caption: 'The Champions', rot: 2, x: 20, y: 54 },
    ],
    strings: [
      { x1: 13, y1: 35, x2: 42, y2: 30 },
      { x1: 42, y1: 30, x2: 70, y2: 36 },
      { x1: 29, y1: 75, x2: 42, y2: 30 },
    ],
  },
];

interface PolaroidProps {
  src: string;
  caption: string;
  rot: number;
  x: number;
  y: number;
  index: number;
  isActive: boolean;
}

const Polaroid = ({ src, caption, rot, x, y, index, isActive }: PolaroidProps) => (
  <motion.div
    className="absolute cursor-pointer"
    style={{ left: `${x}%`, top: `${y}%`, rotate: rot, zIndex: index }}
    initial={{ opacity: 0, scale: 0.7, y: 30 }}
    animate={
      isActive
        ? { opacity: 1, scale: 1, y: 0, rotate: rot }
        : { opacity: 0, scale: 0.7, y: 30 }
    }
    transition={{ delay: index * 0.12, duration: 0.55, ease: 'easeOut' }}
    whileHover={{ scale: 1.08, rotate: 0, zIndex: 30, transition: { duration: 0.2 } }}
  >
    <div
      className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
      style={{ padding: '8px 8px 32px 8px', width: '170px' }}
    >
      <div className="relative overflow-hidden" style={{ width: '154px', height: '130px', background: '#111' }}>
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover"
          sizes="154px"
        />
        {/* Scan-line overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(246,42,84,0.04) 3px, rgba(246,42,84,0.04) 4px)',
          }}
        />
        {/* Pink tint on hover via CSS */}
        <div className="absolute inset-0 bg-[#F62A54] opacity-0 hover:opacity-10 transition-opacity pointer-events-none" />
      </div>
      <p
        className="text-black text-center font-sans uppercase tracking-widest mt-2"
        style={{ fontSize: '9px', fontWeight: 600 }}
      >
        {caption}
      </p>
    </div>
  </motion.div>
);

export const Gallery1O = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1920);
  const [activeChapter, setActiveChapter] = useState(-1);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to horizontal translation (0 → -2 × window width)
  const x = useTransform(scrollYProgress, [0, 1], [0, -windowWidth * 2]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveChapter(Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length)));
  });

  return (
    // Total scroll height = 3 chapters × 120vh each
    <section ref={containerRef} className="relative w-full" style={{ height: '360vh' }}>
      <div className="sticky top-0 w-full overflow-hidden bg-black" style={{ height: '100vh' }}>

        {/* ── Top bar ────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5">
          {/* Title */}
          <div>
            <div
              className="text-[#F62A54] font-sans uppercase font-bold"
              style={{ fontSize: '9px', letterSpacing: '0.45em' }}
            >
              Classified Archive
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-widest mt-0.5">
              CraftVerse <span className="text-[#F62A54]">1.0</span>
            </h2>
          </div>

          {/* Chapter dots */}
          <div className="flex items-center gap-3">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.id}
                className="transition-all duration-300"
                style={{
                  width: activeChapter === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeChapter === i ? '#F62A54' : 'rgba(246,42,84,0.25)',
                  boxShadow: activeChapter === i ? '0 0 8px #F62A54' : 'none',
                }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hidden md:flex gap-8">
            {[['30+', 'Finalist Teams'], ['₹50K', 'Prize Pool'], ['100+', 'Colleges']].map(
              ([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-white font-display font-bold text-lg leading-none">{val}</div>
                  <div
                    className="text-gray-500 font-sans uppercase mt-1"
                    style={{ fontSize: '9px', letterSpacing: '0.3em' }}
                  >
                    {label}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Horizontal strip ───────────────────────────────── */}
        <motion.div className="flex h-full" style={{ x, width: '300vw' }}>
          {CHAPTERS.map((ch, ci) => {
            const isActive = activeChapter === ci;
            return (
              <div
                key={ch.id}
                className="relative flex-shrink-0 overflow-hidden flex flex-col"
                style={{ width: '100vw', height: '100vh' }}
              >
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(rgba(246,42,84,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(246,42,84,0.025) 1px, transparent 1px)',
                    backgroundSize: '70px 70px',
                  }}
                />

                {/* Chapter heading */}
                <motion.div
                  className="relative z-20 px-6 md:px-10 flex-shrink-0"
                  style={{ paddingTop: '88px' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="text-[#F62A54]/50 font-sans uppercase font-bold mb-1"
                    style={{ fontSize: '9px', letterSpacing: '0.5em' }}
                  >
                    {ch.label}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-widest">
                    {ch.title}
                  </h3>
                  <p className="text-gray-500 font-sans text-sm mt-2 italic tracking-widest">
                    {ch.subtitle}
                  </p>
                </motion.div>

                {/* Polaroid board */}
                <div className="relative flex-1 w-full z-10">
                  {/* SVG red-string connections inside the board so it is relative to the board */}
                  <svg
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ width: '100%', height: '100%' }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {ch.strings.map((s, si) => (
                      <motion.path
                        key={si}
                        d={`M${s.x1} ${s.y1} L${s.x2} ${s.y2}`}
                        stroke="#F62A54"
                        strokeWidth="0.25"
                        strokeDasharray="0.6 0.6"
                        fill="none"
                        opacity={0.55}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                          isActive
                            ? { pathLength: 1, opacity: 0.55 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        transition={{ delay: si * 0.25 + 0.6, duration: 0.7 }}
                      />
                    ))}
                  </svg>

                  {ch.photos.map((photo, pi) => (
                    <Polaroid
                      key={pi}
                      {...photo}
                      index={pi}
                      isActive={isActive}
                    />
                  ))}
                </div>

                {/* "CRAFTVERSE 1.0" watermark bottom-right */}
                <div
                  className="absolute bottom-8 right-8 font-display font-black uppercase text-white/5 pointer-events-none select-none z-0"
                  style={{ fontSize: 'clamp(32px, 8vw, 96px)', letterSpacing: '-0.02em' }}
                >
                  CRAFTVERSE
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Scroll hint ────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-600 font-sans uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.4em' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span>scroll to explore</span>
          <span>▶</span>
        </motion.div>
      </div>
    </section>
  );
};
