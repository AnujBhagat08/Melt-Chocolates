import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../SmoothScroll";

// Assets
import Cocoa from "../assets/images/dark-cocoa.png"; // Ensure paths are correct
import Caramel from "../assets/images/crispy-caramel.png";
import Almond from "../assets/images/almond-crunch.png";
import Bite1 from "../assets/images/orange-zest-milk.png";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HowItMade = () => {
  useGSAP(() => {
    // 1. HERO REVEAL: Cinematic Entry
    const heroTL = gsap.timeline();
    heroTL.from(".hero-line", {
      y: 150,
      skewY: 10,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
    });

    // 2. ASYMMETRIC SCROLL: Smooth movement for text and image
    const sections = gsap.utils.toArray(".process-section");
    sections.forEach((section) => {
      const img = section.querySelector(".process-img");
      const text = section.querySelector(".process-text");
      const bgText = section.querySelector(".bg-text");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
        },
      });

      tl.from(bgText, { xPercent: 40, opacity: 0, ease: "none" })
        .from(
          img,
          {
            scale: 0.6,
            y: 200,
            rotate: 5,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .from(
          text,
          {
            y: 50,
            opacity: 0,
            filter: "blur(8px)",
            ease: "power2.out",
          },
          "-=0.6",
        );
    });
  });

  const storySteps = [
    {
      id: "01",
      title: "Harvest",
      desc: "Sourcing only the rarest Ghanaian beans for unparalleled depth.",
      img: Cocoa,
      bg: "ORIGIN",
    },
    {
      id: "02",
      title: "Roast",
      desc: "A delicate dance with fire, unlocking hidden floral symphonies.",
      img: Almond,
      bg: "FIRE",
    },
    {
      id: "03",
      title: "Blend",
      desc: "Where silken caramel meets hand-harvested sea salt.",
      img: Caramel,
      bg: "SILK",
    },
    {
      id: "04",
      title: "Snap",
      desc: "The signature snap that defines a true Melt masterpiece.",
      img: Bite1,
      bg: "MELT",
    },
  ];

  return (
    <SmoothScroll>
      <Header />
      {/* Changed background to Beige and text to Deep Brown */}
      <main className="bg-[#F5F5DC] text-[#3d2b1f] selection:bg-orange selection:text-white">
        {/* CINEMATIC HERO */}
        <section className="h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="overflow-hidden">
            <h1 className="hero-line text-[12vw] font-black uppercase leading-none tracking-tighter text-[#3d2b1f]">
              Creation
            </h1>
          </div>
          <div className="overflow-hidden mt-[-2vw]">
            <p className="hero-line text-orange font-serif italic text-3xl md:text-5xl">
              is an art form.
            </p>
          </div>
        </section>

        {/* ASYMMETRIC PROCESS SECTIONS */}
        {storySteps.map((step, i) => (
          <section
            key={i}
            className="process-section h-screen relative flex items-center justify-center overflow-hidden bg-[#F5F5DC] border-b border-[#3d2b1f]/5"
          >
            {/* Massive Background Text (Soft Contrast for Beige Mode) */}
            <div className="bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <h2 className="text-[25vw] font-black text-brown/8 tracking-tighter uppercase leading-none">
                {step.bg}
              </h2>
            </div>

            <div className="max-w-7xl mx-auto w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
              {/* CONTENT SIDE */}
              <div className="process-text order-2 md:order-1 space-y-6">
                <span className="text-orange font-bold text-xl md:text-2xl tracking-[10px] block uppercase">
                  Step {step.id}
                </span>
                <h3 className="text-6xl md:text-9xl font-bold tracking-tight text-[#3d2b1f] leading-none">
                  {step.title}
                </h3>
                <p className="text-xl md:text-2xl text-[#3d2b1f]/60 font-light max-w-md leading-relaxed border-l-2 border-orange/30 pl-8">
                  {step.desc}
                </p>
              </div>

              {/* IMAGE SIDE */}
              <div className="order-1 md:order-2 flex justify-center items-center">
                <div className="relative group">
                  {/* Subtle shadow/glow adjusted for light background */}
                  <div className="absolute inset-0 bg-orange/5 blur-[100px] rounded-full scale-125 transition-all duration-700 group-hover:bg-orange/15"></div>
                  <img
                    src={step.img}
                    className="process-img w-75 md:w-120 drop-shadow-[0_30px_60px_rgba(61,43,31,0.2)] will-change-transform transform hover:scale-105 transition-transform duration-1000"
                    alt={step.title}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* MODERN OUTRO */}
        <section className="h-screen flex flex-col items-center justify-center text-center bg-[#f0f0d8]">
          <div className="space-y-4">
            <h4 className="text-4xl font-light opacity-40 tracking-[10px] uppercase text-[#3d2b1f]">
              End of Story
            </h4>
            <h2 className="text-[8vw] font-black text-[#3d2b1f] leading-none uppercase tracking-tighter">
              Purely Made.
            </h2>
          </div>
          <button className="mt-16 px-16 py-6 bg-[#3d2b1f] text-[#F5F5DC] text-xl font-bold uppercase tracking-[8px] hover:bg-orange hover:shadow-2xl transition-all duration-500 active:scale-95">
            <Link to="/">Explore Now</Link>
          </button>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default HowItMade;
