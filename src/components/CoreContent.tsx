"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Users, Star, Trophy, ArrowRight } from 'lucide-react';
import { Square, Triangle, Circle } from './Shapes';

// Counter component for animating numbers
const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef} className="font-display font-bold tabular-nums" />;
};

export const CoreContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for background shapes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-transparent overflow-hidden py-32 px-6 md:px-20 text-white">
      {/* Parallax Background Shapes */}
      <motion.div className="absolute top-[10%] left-[5%] opacity-10" style={{ y: y1, rotate: rotate1 }}>
        <Square className="w-48 h-48" />
      </motion.div>
      <motion.div className="absolute bottom-[20%] right-[5%] opacity-10" style={{ y: y2, rotate: rotate2 }}>
        <Circle className="w-64 h-64" />
      </motion.div>
      <motion.div className="absolute top-[60%] left-[40%] opacity-10" style={{ y: y1, rotate: rotate2 }}>
        <Triangle className="w-40 h-40" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-40">
        
        {/* What is Craftverse */}
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideLeftVariants}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[#F62A54] mb-8 flex items-center gap-4">
            <Triangle className="w-8 h-8 md:w-12 md:h-12" /> What is Craftverse?
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-sans">
            Craftverse is not just an event; it's a survival of the most creative minds. 
            A high-stakes design and development hackathon where only the most innovative ideas make it to the final round. 
            Step into the arena and prove your worth.
          </p>
        </motion.section>

        {/* Success Story 1.0 */}
        <motion.section 
          id="rules"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerVariants}
        >
          <motion.h2 variants={slideLeftVariants} className="text-3xl md:text-5xl font-display font-bold text-[#037A76] mb-12 flex items-center gap-4">
            <Circle className="w-8 h-8 md:w-12 md:h-12" /> The Legacy of 1.0
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Users size={40} className="text-[#F62A54]" />, count: 1500, label: "Participants" },
              { icon: <Trophy size={40} className="text-[#037A76]" />, count: 50, label: "Winning Teams" },
              { icon: <Star size={40} className="text-white" />, count: 200, label: "Projects Built" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={scaleUpVariants}
                className="bg-black/50 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:border-[#F62A54] transition-colors duration-300"
              >
                <div className="mb-6">{stat.icon}</div>
                <div className="text-5xl font-display font-bold mb-2">
                  <Counter to={stat.count} />+
                </div>
                <div className="text-xl text-gray-400 font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Craftverse Squid Game Theme (Hover Reveal) */}
        <motion.section 
          id="games"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUpVariants}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F62A54] to-[#037A76] rounded-3xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="relative bg-[#111] border-2 border-gray-800 p-6 sm:p-12 md:p-24 rounded-3xl overflow-hidden transition-all duration-700 group-hover:border-[#F62A54]">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-widest">
                  Squid Game
                </h2>
                <p className="text-2xl text-gray-300 font-sans mb-8">
                  The stakes have reached their peak. The rules are absolute. 
                  Will you eliminate the bugs, or will you be eliminated?
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center gap-4">
                <Circle className="w-16 h-16 opacity-50 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" />
                <Triangle className="w-16 h-16 opacity-50 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" style={{ animationDelay: '100ms' }} />
                <Square className="w-16 h-16 opacity-50 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" style={{ animationDelay: '200ms' }} />
              </div>
            </div>
            {/* Reveal text on hover */}
            <div className="absolute inset-0 bg-[#F62A54] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
              <h3 className="text-6xl md:text-8xl font-display font-black text-black uppercase tracking-[0.2em] transform scale-90 group-hover:scale-100 transition-transform duration-500">
                Survival
              </h3>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUpVariants}
          className="text-center pb-20"
        >
          <button className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-transparent overflow-hidden rounded-full animate-pulse-slow">
            <div className="absolute inset-0 w-full h-full border-4 border-[#F62A54] rounded-full group-hover:bg-[#F62A54] transition-colors duration-300" />
            <span className="relative z-10 text-3xl font-display font-bold text-[#F62A54] group-hover:text-black transition-colors duration-300 uppercase tracking-widest">
              Enter The Game
            </span>
            <ArrowRight className="relative z-10 text-[#F62A54] group-hover:text-black transition-colors duration-300 w-8 h-8 transform group-hover:translate-x-2" />
          </button>
        </motion.section>

      </div>
    </div>
  );
};
