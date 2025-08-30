import React from 'react';
import ThemeToggle from '../common-components/ThemeToggle';

const Home: React.FC = () => {
  return (
    <div className="bg-amber-300 dark:bg-gray-900 dark:text-white min-h-screen justify-center items-center flex">
      <ThemeToggle />

   
    </div>
  );
};

export default Home;
