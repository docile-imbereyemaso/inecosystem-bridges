import React from 'react';
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMessageCircle,
  
  
  FiUsers,
 
  FiPhone
} from 'react-icons/fi';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
  description: string;
}

const TvetSocialCTA: React.FC = () => {
  const socialPlatforms: SocialLink[] = [
    {
      name: 'Facebook',
      icon: FiFacebook,
      url: '#facebook',
      color: 'hover:bg-blue-600',
      description: 'Join our community discussions'
    },
    {
      name: 'Instagram',
      icon: FiInstagram,
      url: '#instagram',
      color: 'hover:bg-pink-600',
      description: 'See student success stories'
    },
    {
      name: 'TikTok',
      icon: FiMessageCircle,
      url: '#tiktok',
      color: 'hover:bg-gray-800',
      description: 'Quick tips & campus life'
    },
    {
      name: 'YouTube',
      icon: FiYoutube,
      url: '#youtube',
      color: 'hover:bg-red-600',
      description: 'Watch program overviews'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: '#linkedin',
      color: 'hover:bg-blue-700',
      description: 'Connect with professionals'
    },
    {
      name: 'WhatsApp',
      icon: FiPhone,
      url: '#whatsapp',
      color: 'hover:bg-green-600',
      description: 'Join TVET support groups'
    },
    {
      name: 'Community',
      icon: FiMessageCircle,
      url: '#community',
      color: 'hover:bg-purple-600',
      description: 'Connect with peers & mentors'
    }
  ];


  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 text-white dark:text-gray-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white dark:bg-gray-200 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 dark:bg-yellow-400 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 dark:from-gray-100 dark:to-yellow-300 bg-clip-text text-transparent">
            Transform Your Future with TVET
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 dark:text-gray-200 max-w-3xl mx-auto">
            Join our vibrant community of young innovators and skilled professionals building extraordinary careers
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-300 dark:text-yellow-400 font-semibold">
            <FiUsers className="text-2xl" />
            <span className="text-lg">Connect • Learn • Grow • Succeed Together</span>
          </div>
        </div>

        {/* Social Media Grid */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-yellow-200 dark:text-yellow-300">
            Follow Us & Stay Inspired
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                className={`group bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 dark:border-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-gray-700/50 ${platform.color} dark:hover:bg-opacity-20 hover:border-white/40 dark:hover:border-gray-600`}
                title={platform.description}
              >
                <platform.icon className="text-3xl md:text-4xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 text-white dark:text-gray-200" />
                <p className="font-semibold text-sm md:text-base mb-1 text-white dark:text-gray-100">{platform.name}</p>
                <p className="text-xs text-gray-200 dark:text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity">
                  {platform.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-yellow-200 dark:text-yellow-300">
            Ready to Start Your TVET Journey?
          </h3>
          
          
          {/* Motivational Footer */}
          <div className="mt-8 p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50 max-w-3xl mx-auto">
            <p className="text-lg font-medium text-center text-yellow-200 dark:text-yellow-300 mb-2">
              "Every expert was once a beginner. Every skilled professional started with a dream."
            </p>
            <p className="text-sm text-gray-200 dark:text-gray-300 text-center">
              Join our growing community of future TVET leaders and innovators 🚀✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvetSocialCTA;