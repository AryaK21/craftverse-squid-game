"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { VideoScrubSection } from "@/components/VideoScrubSection";
import { CoreContent } from "@/components/CoreContent";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

const FRAME_COUNT = 192;

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    const TOTAL_ASSETS = FRAME_COUNT + 1; // 192 frames + 1 main hero image

    const padZero = (num: number, size: number) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };

    const handleAssetLoad = () => {
      loadedCount++;
      setProgress((loadedCount / TOTAL_ASSETS) * 100);
      if (loadedCount === TOTAL_ASSETS) {
        setPreloadedImages(images);
        // Small delay to let the progress bar hit 100% smoothly
        setTimeout(() => {
          setImagesLoaded(true);
        }, 600);
      }
    };

    // 1. Preload the hero guard character image to prevent pop-in lag
    const guardImg = new Image();
    guardImg.src = "/squid_guard_final.png";
    guardImg.onload = handleAssetLoad;
    guardImg.onerror = handleAssetLoad; // fallback in case image fails

    // 2. Preload video frames (maintaining strict order)
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${padZero(i, 4)}.jpg`;
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad; // fallback in case frame fails
      images.push(img); // Push synchronously to ensure order is preserved perfectly
    }
  }, []);

  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden selection:bg-[#F62A54] selection:text-white relative">
      {/* Cinematic Loading Buffer Screen */}
      <AnimatePresence mode="wait">
        {!imagesLoaded && (
          <LoadingScreen progress={progress} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Navbar isReady={imagesLoaded} />
      <Hero isReady={imagesLoaded} />
      <StatsBar />
      <VideoScrubSection images={preloadedImages} imagesLoaded={imagesLoaded} />
      <CoreContent />
      <Footer />
    </main>
  );
}
