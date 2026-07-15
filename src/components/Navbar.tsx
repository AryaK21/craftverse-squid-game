"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ isReady }: { isReady: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: "easeInOut" as const } },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" as const } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#games", label: "Games" },
    { href: "#rules", label: "Rules" },
    { href: "#faqs", label: "FAQs" }
  ];

  return (
    <>
      <motion.nav 
        className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center">
          <h1 className="font-display font-bold text-lg md:text-xl uppercase leading-tight tracking-wider text-[#F62A54]">
            Craftverse
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-sans tracking-wide">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu} 
          className="flex md:hidden text-white focus:outline-none z-50 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-white md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.href} 
                href={link.href} 
                custom={idx}
                variants={linkVariants}
                onClick={toggleMenu}
                className="text-2xl font-display tracking-widest uppercase hover:text-[#F62A54] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
