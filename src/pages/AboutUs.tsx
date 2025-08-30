import React from 'react';
import ThemeToggle from '../common-components/ThemeToggle';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <ThemeToggle />
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-8">We are a team dedicated to providing the best solutions for our users. Learn more about our mission and values here.</p>
    </div>
  );
};

export default AboutUs;
