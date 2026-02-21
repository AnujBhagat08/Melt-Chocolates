import React from "react";
import meltVideo from "../assets/video/melt-video.mp4";

const Parallax = () => {
  return (
    <section className="inner-container h-screen py-20 ">
      {/* 1. यह वो मुख्य 'खिड़की' (Container) है जिसके अंदर वीडियो दिखेगा */}
      <div
        className="h-full w-full rounded-xl overflow-hidden relative"
        style={{ clipPath: "inset(0)" }} // यह जादू है: यह वीडियो को इसी बॉक्स में कैद रखेगा
      >
        {/* 2. वीडियो: इसे 'fixed' ही रखें ताकि 'bg-fixed' वाला इफेक्ट आए */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
        >
          <source src={meltVideo} type="video/mp4" />
        </video>

        {/* 2. ब्लैक ओवरले लेयर (Halka Black Layer) */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Content on top of the video */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="text-white text-7xl font-bold uppercase text-center px-4">
            <span className="text-4xl "> Four Flavors, One Perfect Melt</span>{" "}
            <br />
            <span className="tracking-tighter"> Experience the Melt </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Parallax;
