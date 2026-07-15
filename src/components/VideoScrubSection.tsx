"use client";

import React, { useRef, useEffect } from 'react';

const FRAME_COUNT = 192;

interface VideoScrubProps {
  images: HTMLImageElement[];
  imagesLoaded: boolean;
}

export const VideoScrubSection = ({ images, imagesLoaded }: VideoScrubProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollPosRef.current = Math.max(0, Math.min(1, scrollPosition / maxScroll));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let requestRef: number;

    const drawFrame = (frameIndex: number) => {
      const img = images[frameIndex - 1];
      if (img && img.complete) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
    };

    // Keep size updated
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(currentFrameRef.current));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial render of first frame
    drawFrame(1);

    const updateCanvas = () => {
      // Interpolate target frame index smoothly
      targetFrameRef.current = 1 + scrollPosRef.current * (FRAME_COUNT - 1);
      
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(frameDiff) > 0.05) {
        // Easing
        currentFrameRef.current += frameDiff * 0.12;
        drawFrame(Math.round(currentFrameRef.current));
      }
      
      requestRef = requestAnimationFrame(updateCanvas);
    };

    requestRef = requestAnimationFrame(updateCanvas);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef);
    };
  }, [imagesLoaded, images]);

  return (
    <>
      {/* Canvas wrapper sits fixed behind everything globally */}
      <div ref={containerRef} className="fixed inset-0 w-full h-screen z-[-1] overflow-hidden bg-black pointer-events-none">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover opacity-55 transition-opacity duration-500"
          style={{ opacity: imagesLoaded ? 0.55 : 0 }}
        />
        {/* Softer Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
      </div>
    </>
  );
};
