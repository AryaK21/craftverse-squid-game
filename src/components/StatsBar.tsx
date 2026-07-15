"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const StatsBar = () => {
  const stats = [
    { value: "1.65B+", label: "Hours Streamed in 28 Days" },
    { value: "94", label: "Country's Top Ranked" },
    { value: "$900M+", label: "Value for Netflix" },
    { value: "142M", label: "Households Watched" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full bg-black/60 backdrop-blur-md py-16 px-8 border-t border-[#222]">
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-wide">
              {stat.value}
            </h2>
            <p className="text-gray-400 font-sans text-sm tracking-widest font-medium uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
