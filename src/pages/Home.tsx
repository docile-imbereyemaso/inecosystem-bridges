import React from 'react';

import Navbar from '../common-components/Navbar';
import HeroSection from './otherpages/HeroSection';
import MainSection from './MainSection';

const Home: React.FC = () => {
  return (
    <div className=" min-h-screen bg-[#E4F8E2] dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-[url('/images/background-image.png')] bg-cover bg-no-repeat
   bg-center min-h-screen mt-2 bg-gradient-to-r from-indigo-400/40 to-slate-500/50 dark:bg-gray-600/50 bg-blend-multiply transition duration-300 pt-10">
      <Navbar />

      <HeroSection />
     
      </div>
      
     <MainSection/>
    </div>
  );
};

export default Home;
