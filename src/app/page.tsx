import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { VideoScrubSection } from "@/components/VideoScrubSection";
import { CoreContent } from "@/components/CoreContent";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden selection:bg-[#F62A54] selection:text-white relative">
      <Navbar />
      <Hero />
      <StatsBar />
      <VideoScrubSection />
      <CoreContent />
      <Footer />
    </main>
  );
}
