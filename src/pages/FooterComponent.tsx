import React, { useState } from 'react';
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const FooterComponent = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing:', { fullName, email });
    setFullName('');
    setEmail('');
  };

  const partners = [
    "Rwanda TVET Board",
    
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Section - Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">INECOSYSTEM</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 leading-relaxed">
              INECOSYSTEM empowers future-ready talent by strengthening collaboration between 
              TVET institutions, the private sector, and industries. The platform raises TVET 
              awareness, bridges the skills gap, and drives sustainable growth for individuals 
              and businesses alike.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
            
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors"
              >
                <FiInstagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Center Section - Partners */}
          <div>
            <h3 className="text-white dark:text-gray-200 font-medium mb-6">Our partners</h3>
            <div className="space-y-3">
              {partners.map((partner, index) => (
                <div key={index} className="text-gray-400 dark:text-gray-500 text-sm hover:text-gray-300 dark:hover:text-gray-400 cursor-pointer transition-colors">
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-white dark:text-gray-200 font-medium mb-6">Get our updates</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full names"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 dark:focus:border-gray-700 text-sm"
              />
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 dark:focus:border-gray-700 text-sm"
              />
              
              <button
                onClick={handleSubscribe}
                className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm"
              >
                Subscribe now!
              </button>
            </div>
          </div>
        </div>

     
      </div>
    </footer>
  );
};

export default FooterComponent;