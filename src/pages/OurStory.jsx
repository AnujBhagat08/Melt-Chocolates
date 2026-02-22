import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../SmoothScroll";

// Images
import Bite1 from "../assets/images/bite-1.png";
import Caramel from "../assets/images/crispy-caramel.png";
import Orange from "../assets/images/orange-zest-milk.png";
import Cocoa from "../assets/images/dark-cocoa.png";
import Almond from "../assets/images/almond-crunch.png";
import Stamp from "../assets/images/stamp.png";

gsap.registerPlugin(ScrollTrigger);

const StoryPage = () => {
  useGSAP(() => {
    // 1. HERO REVEAL: Text pops up with a bounce and image scales down from massive to normal
    const heroTL = gsap.timeline();
    heroTL
      .from(".hero-title span", {
        y: 100,
        rotateX: -90,
        stagger: 0.1,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      })
      .from(
        ".hero-image",
        {
          scale: 2,
          filter: "blur(20px)",
          opacity: 0,
          duration: 1.5,
        },
        "-=0.8",
      );

    // 2. PARALLAX SECTION: Images move at different speeds while scrolling
    gsap.to(".parallax-bg", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".story-origin",
        scrub: true,
      },
    });

    // 3. LAYERED PINNING: Text stays fixed while images slide over it
    ScrollTrigger.create({
      trigger: ".pin-section",
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
    });

    gsap.from(".pin-card", {
      y: 400,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".pin-section",
        start: "top 40%",
        scrub: 1,
      },
    });

    // 4. STAMP REVEAL: High impact "thud" effect
    gsap.from(".final-seal", {
      scale: 4,
      rotate: -45,
      opacity: 0,
      scrollTrigger: {
        trigger: ".story-end",
        start: "top 70%",
        end: "top 50%",
        scrub: 0.5,
      },
    });
  });

  return (
    <SmoothScroll>
      <Header />
      <main className="bg-beige  overflow-hidden">
        {/* HERO SECTION: The Grand Entrance */}
        <section className="hero-section h-50% flex flex-col items-center justify-center relative">
          <h1 className="hero-title text-[12vw] font-black leading-none uppercase flex overflow-hidden">
            {"PURE".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char}
              </span>
            ))}
          </h1>
          <img
            src={Caramel}
            className="hero-image w-75 z-10 drop-shadow-[0_0_50px_rgba(255,150,50,0.3)]"
            alt=""
          />
          <h2 className="text-2xl tracking-[15px] uppercase mt-5 font-light opacity-60">
            Indulgence
          </h2>
        </section>

        {/* ORIGIN SECTION: Parallax Storytelling */}
        <section className="story-origin relative py-40 px-10">
          <div className="parallax-bg absolute top-0 right-0 opacity-50 pointer-events-none">
            <img src={Cocoa} className="w-125" alt="" />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="z-10">
              <span className="text-orange font-mono tracking-widest block mb-4 uppercase">
                The Genesis
              </span>
              <h2 className="text-7xl text-brown font-bold mb-8">
                It all started with a single craving.
              </h2>
              <p className="text-xl leading-relaxed text-beige/70">
                When pure cocoa butter meets hand-selected caramel, it’s not
                just a taste—it’s an awakening. No artificial fillers, no
                compromises. Just raw, unadulterated soul in every bite.
              </p>
            </div>
            <div className="relative w-auto h-20% overflow-hidden rounded-2xl">
              <img src={Bite1} className="w-auto h-20% " alt="" />
            </div>
          </div>
        </section>

        {/* PIN SECTION: The "Craft" Gallery */}
        <section className="pin-section h-screen flex flex-col items-center justify-center bg-beige ">
          <h3 className="text-4xl font-light uppercase tracking-widest mb-20 opacity-30">
            The Artisan Palette
          </h3>
          <div className="flex gap-10">
            {[Almond, Cocoa, Orange, Caramel].map((img, i) => (
              <div
                key={i}
                className="pin-card bg-beige p-8 rounded-xl border border-white/5 hover:border-black/50 transition-colors duration-500"
              >
                <img src={img} className="w-64 drop-shadow-2xl" alt="Product" />
                <h4 className="text-center mt-6 text-xl font-bold tracking-widest uppercase">
                  Blend {i + 1}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* END SECTION: The Final Seal */}
        <section className="story-end h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange/20 blur-[150px] rounded-full scale-150"></div>
            <img
              src={Stamp}
              className="final-seal w-56 relative z-10 cursor-pointer active:scale-95 transition-transform"
              alt="Melt Seal"
            />
          </div>
          <h2 className="text-6xl text-brown font-black mt-16 tracking-tighter uppercase">
            This is Melt.
          </h2>
          <p className="text-2xl font-light italic text-black mt-4">
            Crafted for the few who know the difference.
          </p>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default StoryPage;
