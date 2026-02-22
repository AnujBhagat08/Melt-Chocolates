import { useState, useRef } from "react"; // Added hooks
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../SmoothScroll";

// Assets
import Caramel from "../assets/images/crispy-caramel.png";
import Almond from "../assets/images/almond-crunch.png";
import Orange from "../assets/images/orange-zest-milk.png";
import Stamp from "../assets/images/stamp.png";

gsap.registerPlugin(ScrollTrigger);

const GiftPage = () => {
  // --- FUNCTIONALITY STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const giftGridRef = useRef(null); // Ref for scrolling to gifts

  // For saving user message
  const [isSaved, setIsSaved] = useState(false);

  const scrollToGifts = () => {
    giftGridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save Message
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSaved(false);
    }, 2200);
  };

  useGSAP(() => {
    // 1. HERO: Elegant Split-Reveal
    const heroTL = gsap.timeline();
    heroTL
      .from(".hero-main-img", {
        scale: 1.5,
        filter: "blur(30px)",
        opacity: 0,
        duration: 2,
        ease: "expo.out",
      })
      .from(
        ".hero-text-line",
        {
          y: 100,
          skewY: 7,
          stagger: 0.1,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1.5",
      );

    // 2. STICKY TEXT REVEAL
    gsap.utils.toArray(".reveal-section").forEach((section) => {
      gsap.from(section.querySelector(".reveal-content"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        y: 150,
        opacity: 0,
        filter: "blur(10px)",
      });
    });

    // 3. FLOATING PARALLAX
    gsap.to(".bg-parallax-stamp", {
      y: -200,
      rotate: 45,
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });
  });

  const collections = [
    {
      num: "01",
      category: "For Her",
      title: "THE MUSE",
      desc: "A curated box of silk and salt, designed for the woman who appreciates the finer whispers of cocoa.",
      img: Caramel,
      align: "left",
    },
    {
      num: "02",
      category: "For Family",
      title: "THE KINSHIP",
      desc: "Large-format assortments meant for shared stories and late-night laughter around the table.",
      img: Almond,
      align: "right",
    },
    {
      num: "03",
      category: "For Him",
      title: "THE AVANT",
      desc: "Bold, zesty, and unapologetic. Dark chocolate notes for the man who dares to taste the edge.",
      img: Orange,
      align: "left",
    },
  ];

  return (
    <SmoothScroll>
      <Header />
      <main className="bg-[#F5F5DC] text-[#3d2b1f] selection:bg-orange selection:text-white overflow-hidden relative">
        {/* PARALLAX DECORATION */}
        <img
          src={Stamp}
          className="bg-parallax-stamp absolute top-[20%] right-[-5%] w-80 opacity-[0.03] pointer-events-none"
          alt=""
        />
        <img
          src={Stamp}
          className="bg-parallax-stamp absolute top-[60%] left-[-10%] w-96 opacity-[0.03] pointer-events-none rotate-90"
          alt=""
        />

        {/* HERO */}
        <section className="h-screen flex flex-col items-center justify-center text-center relative px-6">
          <div className="relative z-10">
            <div className="overflow-hidden">
              <h1 className="hero-text-line text-[12vw] font-black uppercase leading-none tracking-tighter">
                Gifting
              </h1>
            </div>
            <div className="overflow-hidden mt-[-2vw]">
              <h1 className="hero-text-line text-[12vw] font-black uppercase leading-none tracking-tighter text-orange italic font-serif font-light">
                Elegance
              </h1>
            </div>
          </div>
          <img
            src={Stamp}
            className="hero-main-img w-87.5 md:w-137.5 absolute z-0 opacity-10 "
            alt=""
          />
          <p className="mt-12 text-xl md:text-2xl tracking-[0.5em] uppercase font-light opacity-60">
            The Art of the Gesture
          </p>
        </section>

        {/* EDITORIAL COLLECTIONS (Scroll Target added here) */}
        <section
          ref={giftGridRef}
          className="py-20 md:py-40 space-y-40 md:space-y-80"
        >
          {collections.map((item, i) => (
            <div
              key={i}
              className={`reveal-section flex flex-col ${item.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between px-10 md:px-32 relative`}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-[#3d2b1f]/5 blur-[80px] rounded-full scale-125 group-hover:bg-orange/10 transition-all duration-1000"></div>
                <img
                  src={item.img}
                  className="w-full max-w-[500px] mx-auto drop-shadow-2xl will-change-transform transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000"
                  alt={item.title}
                />
              </div>

              <div
                className={`reveal-content w-full md:w-[40%] mt-20 md:mt-0 space-y-8 z-10`}
              >
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-12 bg-orange"></span>
                  <span className="text-orange font-bold tracking-[0.4em] text-sm uppercase">
                    {item.category}
                  </span>
                </div>
                <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter text-[#3d2b1f]">
                  {item.title}
                </h2>
                <p className="text-xl md:text-2xl text-[#3d2b1f]/60 font-light leading-relaxed border-l border-orange/30 pl-8">
                  {item.desc}
                </p>
                <div className="pt-8">
                  <button
                    onClick={scrollToGifts}
                    className="group relative text-2xl font-bold uppercase tracking-widest overflow-hidden"
                  >
                    <span className="relative z-10">Personalize</span>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>
              </div>

              <span className="absolute top-0 opacity-[0.03] text-[30vw] font-black pointer-events-none select-none -z-10">
                {item.num}
              </span>
            </div>
          ))}
        </section>

        {/* PERSONAL MESSAGE ATELIER */}
        <section className="min-h-screen bg-[#3d2b1f] text-beige flex flex-col items-center justify-center text-center p-10 relative overflow-hidden">
          <div className="max-w-4xl space-y-12 z-10">
            <h3 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">
              Words <br /> as{" "}
              <span className="text-orange italic font-serif">Sweet</span>
            </h3>
            <p className="text-xl md:text-3xl font-light text-beige/50 leading-relaxed max-w-2xl mx-auto">
              Your message is hand-scribed on heavy-stock vellum paper and
              sealed with a traditional Melt wax stamp.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-20 py-6 bg-orange text-white text-xl font-bold uppercase tracking-[10px] hover:bg-white hover:text-[#3d2b1f] transition-all duration-500 shadow-2xl active:scale-95"
            >
              Craft Your Note
            </button>
          </div>
          <img
            src={Stamp}
            className="absolute bottom-[-10%] right-[-5%] w-80 opacity-10 rotate-12"
            alt=""
          />
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="h-screen flex flex-col items-center justify-center bg-[#F5F5DC] text-[#3d2b1f]">
          <h2 className="text-7xl md:text-[14vw] font-black uppercase leading-none tracking-tighter mb-16">
            SEND <br /> <span className="text-orange">PURE</span> JOY.
          </h2>
          <button
            onClick={scrollToGifts}
            className="px-24 py-8 bg-[#3d2b1f] text-white text-2xl font-bold uppercase tracking-[12px] shadow-2xl hover:bg-orange transition-all duration-700 rounded-sm"
          >
            Discover Gifts
          </button>
        </section>
      </main>

      {/* --- PERSONALIZATION MODAL --- */}
      {/* --- PERSONALIZATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
          <div className="bg-[#F5F5DC] w-full max-w-2xl p-12 rounded-[40px] shadow-2xl relative border border-[#3d2b1f]/10 overflow-hidden">
            {/* SUCCESS OVERLAY (The Wax Seal Slam Effect) */}
            {isSaved && (
              <div className="absolute inset-0 z-50 bg-[#F5F5DC] flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  {/* Background Glow that appears on impact */}
                  <div className="impact-glow absolute inset-0 bg-orange/40 blur-3xl rounded-full scale-0 opacity-0 transition-all duration-300"></div>

                  {/* The Stamp: Scaled up initially, then slams down */}
                  <img
                    src={Stamp}
                    className="seal-impact w-40 relative z-10 opacity-0"
                    style={{ transform: "scale(4) translateY(-100px)" }}
                    alt="Sealed"
                    onLoad={(e) => {
                      // Slam Animation Logic
                      gsap.to(e.target, {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "expo.inOut",
                        onComplete: () => {
                          // Shake effect on impact
                          gsap.to(".seal-impact", {
                            x: 2,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.05,
                          });
                          gsap.to(".impact-glow", {
                            scale: 1.5,
                            opacity: 1,
                            duration: 0.3,
                          });
                        },
                      });
                    }}
                  />
                </div>
                <h3 className="text-3xl font-serif italic text-[#3d2b1f] mt-4">
                  Message{" "}
                  <span className="text-orange font-black not-italic uppercase tracking-widest block text-4xl">
                    Sealed
                  </span>
                </h3>
              </div>
            )}

            {/* --- Rest of the Modal (No changes here) --- */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-3xl font-light text-[#3d2b1f] z-10"
            >
              ✕
            </button>

            <span className="text-orange font-bold tracking-widest text-xs uppercase mb-4 block">
              The Vellum Note
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#3d2b1f] mb-8 leading-none">
              Write Your Heart Out
            </h2>

            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full h-48 bg-[#ede8d0] border-none p-8 rounded-[30px] text-[#3d2b1f] text-xl italic font-serif resize-none"
              placeholder="Type your personal message here..."
            ></textarea>

            <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm opacity-50 italic max-w-[200px]">
                Hand-scribed with gold-flecked ink.
              </p>
              <button
                onClick={handleSave}
                className="w-full md:w-auto px-12 py-5 bg-[#3d2b1f] text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-orange transition-all duration-500 shadow-xl"
              >
                Save & Seal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </SmoothScroll>
  );
};

export default GiftPage;
