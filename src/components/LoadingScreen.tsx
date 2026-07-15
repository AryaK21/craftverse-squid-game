"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-12 mb-12">
        {/* Circle Neon */}
        <motion.div 
          className="w-16 h-16 rounded-full border-4 border-[#037A76] flex items-center justify-center"
          style={{ boxShadow: '0 0 15px #037A76, inset 0 0 10px #037A76' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Triangle Neon */}
        <motion.div 
          className="w-16 h-16 flex items-center justify-center relative"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <svg width="64" height="64" viewBox="0 0 100 100" className="drop-shadow-[0_0_8px_#F62A54]">
            <polygon points="50,15 90,85 10,85" stroke="#F62A54" strokeWidth="6" fill="none" />
          </svg>
        </motion.div>

        {/* Square Neon */}
        <motion.div 
          className="w-16 h-16 border-4 border-white flex items-center justify-center"
          style={{ boxShadow: '0 0 15px #fff, inset 0 0 10px #fff' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
      </div>

      <div className="flex flex-col items-center gap-4 w-64">
        <h3 className="font-display tracking-[0.3em] uppercase text-xs text-gray-400 font-bold">
          Preloading System Arena
        </h3>
        
        {/* Loading Progress Bar */}
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#F62A54] to-[#037A76]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        <span className="font-sans text-xs tracking-wider text-gray-500 tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </motion.div>
  );
};
