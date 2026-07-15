import React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';

export const Circle = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="45" stroke="#F62A54" strokeWidth="10" />
  </motion.svg>
);

export const Triangle = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <polygon points="50,10 90,90 10,90" stroke="#037A76" strokeWidth="10" strokeLinejoin="round" />
  </motion.svg>
);

export const Square = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="10" y="10" width="80" height="80" stroke="#ffffff" strokeWidth="10" strokeLinejoin="round" />
  </motion.svg>
);
