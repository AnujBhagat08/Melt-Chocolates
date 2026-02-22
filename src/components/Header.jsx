import React from "react";
import Logo from "../assets/images/logo.png";
import Gift from "../assets/images/colored-gift.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Header = () => {
  useGSAP(() => {
    gsap.from("header", {
      y: "-25%",
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  return (
    <header className="sticky top-0 z-20 flex items-stretch justify-between gap-5 max-w-7xl m-auto p-6">
      <div className="flex items-center justify-between bg-white rounded-xl w-full px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Melt Chocolate" className="max-w-36" />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-9 font-medium tracking-tight">
            <li>
              <Link to="/">Flavors</Link>
            </li>
            <li>
              <Link to="/our-story">Our Story</Link>
            </li>
            <li>
              <Link to="/how-its-made">How it’s Made</Link>
            </li>
            <li>
              <Link to="/gift" className="flex items-center gap-2">
                Gifting
                <img src={Gift} alt="Gift" className="max-w-11 pb-2" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* CTA */}
      <Link
        to="/"
        className="flex items-center justify-center bg-white rounded-xl text-nowrap px-4 py-3 font-medium gap-3"
      >
        Explore Flavors
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="32"
            height="32"
            rx="16"
            transform="matrix(-1 0 0 1 32 0)"
            fill="#FF6B57"
          />
          <path
            d="M23 16H9M23 16L17 22M23 16L17 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </header>
  );
};

export default Header;
