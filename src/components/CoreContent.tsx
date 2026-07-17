"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Square, Triangle, Circle } from './Shapes';

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
        
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideLeftVariants}
          className="max-w-3xl relative"
        >
          {/* Translucent backdrop blur card */}
          <div className="absolute inset-0 bg-[#037A76] rounded-3xl blur-xl opacity-5" />
          <div className="relative bg-black/60 backdrop-blur-md border border-gray-800/60 p-8 sm:p-12 rounded-3xl transition-all duration-300 hover:border-[#037A76]/40 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F62A54] mb-6 flex items-center gap-4">
              <Triangle className="w-8 h-8 md:w-10 md:h-10" /> What is Craftverse?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
              Craftverse is not just an event; it's a survival of the most creative minds. 
              A high-stakes design and development hackathon where only the most innovative ideas make it to the final round. 
              Step into the arena and prove your worth.
            </p>
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
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-[#F62A54]/60 uppercase tracking-[0.3em] absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 transform scale-95 group-hover:scale-100 transition-all duration-500"
                style={{ textShadow: '0 0 15px rgba(246,42,84,0.3)' }}
              >
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
              REGISTER NOW
            </span>
            <ArrowRight className="relative z-10 text-[#F62A54] group-hover:text-black transition-colors duration-300 w-8 h-8 transform group-hover:translate-x-2" />
          </button>
        </motion.section>

      </div>
    </div>
  );
};
