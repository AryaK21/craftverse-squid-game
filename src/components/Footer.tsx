"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Check, Copy } from 'lucide-react';
import { Circle, Triangle, Square } from './Shapes';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "hello@craftverse.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-[#020202] text-white py-20 px-6 border-t border-gray-900 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        
        {/* Branding */}
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-[#F62A54]">
            Craftverse
          </h2>
          <div className="flex gap-2">
            <Circle className="w-6 h-6" />
            <Triangle className="w-6 h-6" />
            <Square className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Contact Links */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Email with Copy */}
          <button 
            onClick={handleCopy}
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <div className="p-3 bg-gray-900 rounded-full group-hover:bg-[#F62A54] group-hover:-translate-y-1 transition-all duration-300">
              {copied ? <Check size={20} /> : <Mail size={20} />}
            </div>
            <span className="font-sans text-lg">{email}</span>
            <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Phone */}
          <a href="tel:+1234567890" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <div className="p-3 bg-gray-900 rounded-full group-hover:bg-[#037A76] group-hover:-translate-y-1 transition-all duration-300">
              <Phone size={20} />
            </div>
            <span className="font-sans text-lg">+1 (234) 567-890</span>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <div className="p-3 bg-gray-900 rounded-full group-hover:bg-white group-hover:text-black group-hover:-translate-y-1 transition-all duration-300">
              <InstagramIcon />
            </div>
            <span className="font-sans text-lg">@craftverse</span>
          </a>

        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-16 text-center text-gray-600 font-sans text-sm relative z-10">
        &copy; {new Date().getFullYear()} Craftverse. All rights reserved. Let the games begin.
      </motion.div>

      {/* Decorative Background Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#F62A54] opacity-5 blur-[100px] pointer-events-none" />
    </motion.footer>
  );
};
