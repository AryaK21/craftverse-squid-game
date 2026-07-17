"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const DAYS = [
  {
    day: '01',
    label: 'Day One',
    color: '#F62A54',
    events: [
      { time: '10:00 AM', event: 'Inauguration Ceremony' },
      { time: '12:00 PM', event: 'Round 1 Begins' },
      { time: '2:00 PM', event: 'Lunch' },
      { time: '3:00 PM', event: 'Coding & Evaluation' },
      { time: '6:00 PM', event: 'High Tea & Games' },
      { time: '8:00 PM', event: 'Dinner' },
      { time: 'Overnight', event: 'Coding Marathon' },
    ],
  },
  {
    day: '02',
    label: 'Day Two',
    color: '#037A76',
    events: [
      { time: '8:00 AM', event: 'Evaluation Round 2' },
      { time: 'Morning', event: 'Breakfast & Coding' },
      { time: 'Afternoon', event: 'Interactive Activities' },
      { time: 'Afternoon', event: 'Mentor Sessions' },
      { time: '5:00 PM', event: 'Evaluation Round 3' },
      { time: 'Evening', event: 'Feedback & Improvements' },
      { time: '8:00 PM', event: 'Dinner & Overnight Coding' },
    ],
  },
  {
    day: '03',
    label: 'Day Three',
    color: '#ffffff',
    events: [
      { time: '8:00 AM', event: 'Final Evaluation' },
      { time: '11:00 AM', event: 'Final Submission' },
      { time: '12:00 PM', event: 'Closing Ceremony' },
      { time: 'Afternoon', event: 'Prize Distribution 🏆' },
    ],
  },
];

interface FlipCardProps {
  day: (typeof DAYS)[0];
  index: number;
  isInView: boolean;
}

const FlipCard = ({ day, index, isInView }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="w-full cursor-pointer"
      style={{ height: '400px', perspective: '1200px' }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ delay: index * 0.18, duration: 0.65, ease: 'easeOut' }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Flip container */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Front ─────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: `1px solid ${day.color}30`,
            background: `radial-gradient(circle at 30% 30%, ${day.color}12, rgba(0,0,0,0.95))`,
          }}
        >
          {/* Big day number */}
          <div
            className="font-display font-black leading-none select-none"
            style={{
              fontSize: '110px',
              color: day.color,
              textShadow: `0 0 50px ${day.color}60, 0 0 100px ${day.color}20`,
              letterSpacing: '-0.04em',
            }}
          >
            {day.day}
          </div>

          {/* Label */}
          <div
            className="font-sans uppercase font-bold mt-2"
            style={{ fontSize: '10px', letterSpacing: '0.6em', color: day.color }}
          >
            {day.label}
          </div>

          {/* Tap hint */}
          <div
            className="absolute bottom-8 font-sans uppercase text-gray-700"
            style={{ fontSize: '9px', letterSpacing: '0.4em' }}
          >
            tap for schedule
          </div>

          {/* Corner shape decoration */}
          <div
            className="absolute top-6 right-6 opacity-20"
            style={{
              width: '32px',
              height: '32px',
              border: `3px solid ${day.color}`,
              borderRadius: index === 0 ? '0' : index === 1 ? '50%' : '0',
              transform: index === 0 ? 'rotate(0deg)' : index === 1 ? '' : 'rotate(45deg)',
            }}
          />
          <div
            className="absolute bottom-6 left-6 opacity-10"
            style={{
              width: '48px',
              height: '48px',
              border: `3px solid ${day.color}`,
              borderRadius: index === 0 ? '0' : index === 1 ? '50%' : '0',
              transform: index === 0 ? 'rotate(15deg)' : index === 1 ? '' : 'rotate(20deg)',
            }}
          />
        </div>

        {/* ── Back ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-2xl p-7 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: `1px solid ${day.color}30`,
            background: 'rgba(5,5,5,0.98)',
          }}
        >
          <div
            className="font-sans uppercase font-bold mb-5"
            style={{ fontSize: '9px', letterSpacing: '0.5em', color: day.color }}
          >
            {day.label} — Schedule
          </div>

          <div className="space-y-3">
            {day.events.map((ev, i) => (
              <div key={i} className="flex gap-4 items-start border-b border-gray-900 pb-3">
                <div
                  className="font-sans flex-shrink-0"
                  style={{ fontSize: '10px', color: day.color, minWidth: '76px', letterSpacing: '0.05em' }}
                >
                  {ev.time}
                </div>
                <div className="text-gray-300 font-sans" style={{ fontSize: '12px' }}>
                  {ev.event}
                </div>
              </div>
            ))}
          </div>

          {/* Tap to flip back */}
          <div
            className="mt-6 text-center text-gray-700 font-sans uppercase"
            style={{ fontSize: '9px', letterSpacing: '0.4em' }}
          >
            tap to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Roadmap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="w-full py-24 md:py-32 px-6 md:px-20 text-white">
      <div className="max-w-6xl mx-auto">
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
            Mission Roadmap
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mt-3">
            48 Hours. 3 Days.
          </h2>
          <p className="text-gray-500 font-sans text-sm mt-4" style={{ letterSpacing: '0.3em' }}>
            One outcome: survive.
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DAYS.map((day, i) => (
            <FlipCard key={day.day} day={day} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.p
          className="text-center text-gray-700 font-sans uppercase mt-10"
          style={{ fontSize: '9px', letterSpacing: '0.4em' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          Click each card to reveal the full schedule
        </motion.p>
      </div>
    </section>
  );
};
