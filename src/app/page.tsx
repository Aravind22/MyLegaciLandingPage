import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Comparison from "@/components/Comparison";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import WaitlistCTA from "@/components/WaitlistCTA";
import CustomCursor from "@/components/CustomCursor";
import MobileStickyBar from "@/components/MobileStickyBar";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Trust />
        <Comparison />
        <Founder />
        <Pricing />
        <WaitlistCTA />
      </main>
      <MobileStickyBar />
    </>
  );
}
