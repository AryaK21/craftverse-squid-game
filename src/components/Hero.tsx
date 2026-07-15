"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { Circle, Triangle, Square } from './Shapes';

export const Hero = () => {
  return (
    <section id="home" className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Background X Shapes (Teal & Pink) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] border-[20px] border-[#F62A54] rounded-full blur-[10px] transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[100px] bg-[#F62A54] blur-[8px] transform -rotate-45 -translate-x-1/2 opacity-30" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[100px] bg-[#F62A54] blur-[8px] transform rotate-45 -translate-x-1/2 opacity-30" />
        
        <div className="absolute top-1/2 right-0 w-[600px] h-[100px] bg-[#037A76] blur-[8px] transform -rotate-45 translate-x-1/2 opacity-30" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[100px] bg-[#037A76] blur-[8px] transform rotate-45 translate-x-1/2 opacity-30" />
      </div>

      {/* Massive Glowing Text Background */}
      <motion.div 
        className="absolute z-0 w-full text-center flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-[15vw] leading-[0.8] font-display font-black uppercase tracking-tighter text-transparent"
            style={{
              WebkitTextStroke: '2px #F62A54',
              textShadow: '0 0 20px rgba(246, 42, 84, 0.5), 0 0 40px rgba(246, 42, 84, 0.3)'
            }}>
          CRAFT
        </h1>
        <h1 className="text-[15vw] leading-[0.8] font-display font-black uppercase tracking-tighter text-transparent ml-20"
            style={{
              WebkitTextStroke: '2px #ffffff',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}>
          VERSE
        </h1>
      </motion.div>

      {/* Central Character */}
      <motion.div 
        className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <div className="relative w-[800px] h-[90%] max-h-[1000px]">
          <Image 
            src="/squid_guard_final.png" 
            alt="Squid Game Guard" 
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(246,42,84,0.3)]"
            priority
          />
        </div>
      </motion.div>

      {/* Bottom Floating Elements */}
      <div className="absolute bottom-12 w-full px-12 z-20 flex justify-between items-end pointer-events-none">
        
        {/* Left Card: New Games */}
        <motion.div 
          className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-6 pointer-events-auto"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex -space-x-4">
            <div className="w-12 h-12 bg-[#F62A54] rounded-full flex items-center justify-center border-2 border-black relative z-30">
               <Triangle className="w-6 h-6 text-white opacity-80" />
            </div>
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-black relative z-20">
               <Square className="w-5 h-5 text-white opacity-80" />
            </div>
            <div className="w-12 h-12 bg-[#037A76] rounded-full flex items-center justify-center border-2 border-black relative z-10">
               <Circle className="w-6 h-6 text-white opacity-80" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-display font-bold text-lg">New games</h3>
            <p className="text-gray-400 text-xs font-sans mt-1">People will play for the money</p>
          </div>
        </motion.div>

        {/* Center Circular Scroll Indicator */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="relative w-32 h-32 flex items-center justify-center group cursor-pointer">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity">
              <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="font-sans text-[11px] uppercase tracking-widest fill-white">
                <textPath href="#circlePath" startOffset="0%">
                  What it takes do you have what it takes do you have
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowDown className="text-white w-6 h-6" />
            </div>
          </div>
        </motion.div>

        {/* Right CTA Button */}
        <motion.button 
          className="bg-[#F62A54] hover:bg-[#ff3b66] text-white font-sans font-bold text-lg px-8 py-4 rounded-md pointer-events-auto transition-colors shadow-[0_0_20px_rgba(246,42,84,0.4)]"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Join the Game
        </motion.button>

      </div>
    </section>
  );
};
