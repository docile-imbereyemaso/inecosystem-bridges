import React, { useEffect } from 'react';
import Navbar from '../common-components/Navbar';
import Tvetmattersection from './Tvetmattersection';
import FooterComponent from './FooterComponent';


const Tvetmatters: React.FC = () => {
  useEffect(() => {
    const nav = document.getElementById("navigation");

    const handleScroll = () => {
      if (!nav) return;
      const scroll = window.scrollY;
      if (scroll < 100) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#E4F8E2] dark:bg-gray-900 transition-colors duration-300">
  {/* Inline styles removed. Move custom styles to a CSS or Tailwind config if needed. */}
      {/* Hero Video Section */}
  <div className="relative w-full min-h-screen h-screen overflow-hidden flex flex-col justify-center">
        {/* Video Background with Low Brightness Filter */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video absolute inset-0 w-full h-full object-cover opacity-60 brightness-[0.3] contrast-110 saturate-75 blur-[0.5px]"
          style={{
            filter: 'brightness(0.3) contrast(1.1) saturate(0.75) blur(0.5px)'
          }}
        >
          <source src="/video/image.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Primary Dark Overlay for depth */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

        {/* Gradient Overlay for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#E4F8E2]/90 dark:to-gray-900/90"></div>

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>

       

        {/* Main Navbar - Always visible on hero section */}
        <div className="absolute top-0 left-0 w-full z-40 bg-transparent">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <Navbar />
          </div>
        </div>

        {/* Optional: Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pt-16 sm:pt-24">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
            <button
              className="w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-6 text-base sm:text-lg rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out bg-slate-800 dark:hover:bg-slate-800/50 animate-bounce"
              onClick={() => {
                const mainContent = document.getElementById('main-content-section');
                if (mainContent) {
                  mainContent.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Let's explore now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="main-content-section" className="relative z-10">
        <Tvetmattersection />
      </div>

      <FooterComponent/>
    </div>
  );
};

export default Tvetmatters;