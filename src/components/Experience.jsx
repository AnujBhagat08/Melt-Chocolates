import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ExperienceSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sectionRef = useRef();

  useGSAP(() => {
    // Reveal links on scroll
    gsap.from(".exp-item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".exp-item",
        start: "top 90%",
      },
    });
  }, { scope: sectionRef });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Kinetic "Fly-away" animation for email
      gsap.to(".mail-icon", {
        x: 300, y: -150, rotate: 45, opacity: 0, duration: 1, ease: "power4.in"
      });
    }
  };

  const experiences = ["Taste Journey", "Texture & Melt", "Ingredients", "Process"];

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 border-t border-white/10">
      
      {/* EXPERIENCE OPTIONS */}
      <div className="space-y-10">
        <h3 className="text-sm font-bold tracking-[0.4em] uppercase opacity-40">Experience</h3>
        <div className="flex flex-col space-y-4">
          {experiences.map((item, i) => (
            <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`} 
               className="exp-item text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-orange hover:translate-x-4 transition-all duration-500">
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* MODERN NEWSLETTER */}
      <div className="newsletter-card bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[40px] border border-white/10 relative overflow-hidden group">
        {isSubscribed ? (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <h4 className="text-3xl font-serif italic text-orange">Welcome to the inner circle.</h4>
            <p className="mt-2 opacity-50 uppercase tracking-widest text-xs">Stay melted.</p>
          </div>
        ) : (
          <>
            <div className="mail-icon mb-8 text-orange">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-4xl font-black uppercase tracking-tighter mb-4">Melt in your <span className="text-orange italic font-serif lowercase">inbox.</span></h4>
            <p className="opacity-40 mb-10 max-w-xs font-light">Get early access to secret drops and artisan stories.</p>
            <form onSubmit={handleSubscribe} className="relative group/form">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl outline-none focus:border-orange transition-all placeholder:opacity-20"
                required
              />
              <button type="submit" className="absolute right-0 bottom-4 text-orange font-bold uppercase tracking-widest text-xs group-hover/form:translate-x-2 transition-transform">
                Join →
              </button>
            </form>
          </>
        )}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange/10 blur-[80px] rounded-full"></div>
      </div>
    </div>
  );
};

export default ExperienceSection;
