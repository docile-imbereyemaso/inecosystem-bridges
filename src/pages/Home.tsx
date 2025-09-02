import React, { useEffect } from 'react';

import Navbar from '../common-components/Navbar';
import HeroSection from './otherpages/HeroSection';
import MainSection from './MainSection';
import Topnav from '../common-components/Topnav.tsx';
import FooterComponent from './FooterComponent.tsx';
const Home: React.FC = () => {


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
    <div className=" min-h-screen bg-[#E4F8E2] dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-[url('/images/background-image.png')] bg-cover bg-no-repeat
   bg-center min-h-screen mt-2 bg-gradient-to-r from-indigo-400/40 to-slate-500/50 dark:bg-gray-600/50 bg-blend-multiply transition duration-300 pt-10">
      <div id='navigation' className="hidden fixed z-10 w-full">
      <Topnav />
      </div>
      
      <Navbar />

      <HeroSection />
     
      </div>
      
     <MainSection/>

     <FooterComponent/>
    </div>

  );
  
};

export default Home;