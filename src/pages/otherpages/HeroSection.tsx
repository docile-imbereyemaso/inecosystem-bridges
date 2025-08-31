import { FaArrowDown } from "react-icons/fa6";
import { useState } from "react";

const HeroSection = () => {
    const [isScrolling, setIsScrolling] = useState(false);

        const smoothScrollTo = (targetPosition: number, duration: number = 1500) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
            let startTime: number | null = null;

        // Custom easing function for ultra-smooth animation
            const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

            const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                setIsScrolling(false);
                // Trigger mission section animation after scroll completes
                const missionSection = document.getElementById('mission-section');
                if (missionSection) {
                    missionSection.classList.add('animate-pulse');
                    setTimeout(() => {
                        missionSection.classList.remove('animate-pulse');
                    }, 1000);
                }
            }
        };

        requestAnimationFrame(animation);
    };

        const scrollToMission = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (isScrolling) return; // Prevent multiple clicks during scroll
        
        setIsScrolling(true);
        
        // Find the mission section
        const missionSection = document.getElementById('mission-section') || 
                              document.querySelector('[data-section="mission"]');
        
        if (missionSection) {
            const offsetTop = missionSection.offsetTop - 100; // Better offset
            smoothScrollTo(offsetTop, 1800); // 1.8 second smooth scroll
        } else {
            setIsScrolling(false);
        }
    };

    return (
        <>
            <div className="grid place-items-center min-h-screen">
                <div className="text-center space-y-4">
                    <button 
                        onClick={scrollToMission}
                        disabled={isScrolling}
                        className={`group relative overflow-hidden btn btn-info dark:bg-indigo-800/60 dark:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 transform ${
                            isScrolling 
                                ? 'scale-95 opacity-75 cursor-not-allowed' 
                                : 'hover:scale-110 hover:shadow-2xl animate-bounce hover:animate-none'
                        } focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-indigo-600`}
                    >
                        {/* Animated background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Button content */}
                        <span className="relative z-10 flex items-center space-x-3">
                            <span className="text-lg">
                                {isScrolling ? 'Scrolling...' : 'Get Started'}
                            </span>
                            <FaArrowDown className={`text-xl transition-all duration-300 ${
                                isScrolling 
                                    ? 'animate-bounce' 
                                    : 'group-hover:translate-y-2 group-hover:text-yellow-300'
                            }`} />
                        </span>

                        {/* Ripple effect on click */}
                        {isScrolling && (
                            <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
                        )}
                    </button>

                   
                </div>
            </div>
        </>
    );
};

export default HeroSection;