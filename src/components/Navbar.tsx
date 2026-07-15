"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <motion.nav 
      className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center">
        <h1 className="font-display font-bold text-xl uppercase leading-tight tracking-wider text-[#F62A54]">
          Craftverse
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-sans tracking-wide">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">About</a>
        <a href="#" className="hover:text-white transition-colors">Games</a>
        <a href="#" className="hover:text-white transition-colors">Rules</a>
        <a href="#" className="hover:text-white transition-colors">FAQs</a>
      </div>

      <div>
        <button className="bg-[#034A46] hover:bg-[#037A76] text-white px-6 py-2.5 rounded-md font-sans text-sm font-medium transition-colors">
          Create account
        </button>
      </div>
    </motion.nav>
  );
};
