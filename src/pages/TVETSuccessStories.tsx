import { useEffect, useRef } from 'react';
import { FiStar, FiPlay, FiExternalLink, FiTrendingUp, FiMapPin, FiClock, FiAward, FiBriefcase } from 'react-icons/fi';

const TVETSuccessStories = () => {
  // 2 stories per sector, carefully curated for maximum impact
  const featuredStories = [
    // Construction Sector
    {
      id: 1,
      name: "Jean Baptiste Uwimana",
      age: 26,
      program: "Civil Engineering Technology",
      company: "RDB Construction Ltd",
      quote: "TVET completely transformed my understanding of construction. The hands-on training with real equipment and industry mentors gave me skills that employers desperately needed. What amazed me most was how quickly I could apply classroom theory to actual construction sites. Within months, I was leading small teams and solving complex structural problems.",
      extendedStory: "Starting as a high school graduate with no clear direction, Jean Baptiste discovered his passion for construction during a TVET open day. The 18-month program combined theoretical knowledge with intensive practical training. He worked on real construction projects, learned to read blueprints, and mastered modern construction techniques. His final project involved designing and overseeing the construction of a community center.",
      background: "High school graduate with no technical experience",
      progression: "Apprentice → Site Supervisor → Project Manager",
      salary: "850K RWF/month",
      sector: "Construction",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=construction-story-1",
      impact: "Led construction of 15+ residential projects, trained 25+ apprentices",
      skills: ["Blueprint Reading", "Project Management", "Quality Control", "Team Leadership"],
      certification: "Rwanda Construction Board Certified"
    },
    {
      id: 2,
      name: "Grace Mukamana",
      age: 24,
      program: "Plumbing & Water Systems",
      company: "Water Solutions Rwanda",
      quote: "Breaking into plumbing as a woman wasn't easy, but TVET gave me both the technical skills and confidence I needed. The comprehensive training covered everything from basic pipe fitting to complex water treatment systems. Now I lead installation teams and mentor other women entering the field. The practical approach meant I was job-ready from day one.",
      extendedStory: "Grace overcame societal expectations and family doubts to pursue plumbing. Her TVET program included advanced water system design, environmental sustainability, and business management. She completed internships with major construction firms and learned from experienced female professionals who became her mentors. Her graduation project involved designing a water recycling system for a local school.",
      background: "Primary school graduate, worked in family farming",
      progression: "Student → Junior Plumber → Lead Installation Specialist",
      salary: "750K RWF/month",
      sector: "Construction",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=construction-story-2",
      impact: "Installed water systems for 200+ homes, mentored 15+ women in trades",
      skills: ["Water System Design", "Pipe Installation", "Team Leadership", "Quality Testing"],
      certification: "Master Plumber License - Rwanda Water Board"
    },
    
    // ICT & Technology Sector
    {
      id: 3,
      name: "David Mugisha",
      age: 25,
      program: "Software Development",
      company: "Andela Rwanda",
      quote: "TVET's coding bootcamp was intense but incredibly rewarding. Unlike traditional computer science programs, we focused on building real applications from week one. The curriculum covered modern frameworks, agile development, and collaborative coding practices. The industry partnerships meant we worked on actual client projects, giving us invaluable experience before graduation.",
      extendedStory: "David ran a small computer café before discovering TVET's software development program. The intensive 12-month bootcamp covered full-stack development, mobile app creation, and software engineering best practices. He collaborated with international development teams, contributed to open-source projects, and built a portfolio of applications that impressed employers. His capstone project was a mobile banking app for rural communities.",
      background: "Computer café operator with basic computer skills",
      progression: "Student → Junior Developer → Software Engineer",
      salary: "1.4M RWF/month",
      sector: "ICT & Tech",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=ict-story-1",
      impact: "Developed 8+ mobile applications, trained 30+ junior developers",
      skills: ["Full-Stack Development", "Mobile Apps", "Database Design", "Agile Methods"],
      certification: "AWS Certified Developer Associate"
    },
    {
      id: 4,
      name: "Rebecca Uwimana",
      age: 22,
      program: "Digital Media & Creative Technology",
      company: "Creative Hub Rwanda",
      quote: "The digital media program exceeded every expectation. We learned cutting-edge design software, video production, and digital marketing strategies. But more importantly, we developed creative problem-solving skills and learned to understand client needs. The program's emphasis on both technical skills and creative thinking prepared me to lead campaigns for international brands.",
      extendedStory: "Rebecca always loved art but didn't see a clear career path until she discovered TVET's digital media program. The comprehensive curriculum included graphic design, video production, digital marketing, and user experience design. She worked with real clients throughout her studies, building a professional portfolio while still learning. Her final project involved creating a complete brand identity and marketing campaign for a local startup.",
      background: "Art student with passion but no professional training",
      progression: "Student → Junior Designer → Creative Director",
      salary: "1.1M RWF/month",
      sector: "ICT & Tech",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=creative-story-1",
      impact: "Designed campaigns for 40+ brands, increased client revenue by 60%",
      skills: ["Graphic Design", "Video Production", "Brand Strategy", "Digital Marketing"],
      certification: "Adobe Certified Expert - Creative Suite"
    },

    // Energy Sector
    {
      id: 5,
      name: "Samuel Nshuti",
      age: 28,
      program: "Renewable Energy Technology",
      company: "GigaWatt Global",
      quote: "Rwanda's commitment to renewable energy created incredible opportunities, and TVET prepared me to seize them. The program covered solar, wind, and hydroelectric systems, but also energy storage and grid integration. We worked with real renewable energy installations, learning maintenance, troubleshooting, and system optimization. The hands-on experience was invaluable.",
      extendedStory: "Samuel started as an electrical apprentice but saw the future in renewable energy. His TVET program included advanced solar panel installation, energy storage systems, and grid integration technology. He completed internships with major energy companies and worked on rural electrification projects. His capstone involved designing and implementing a complete solar microgrid for a rural health center.",
      background: "Electrical apprentice with basic electrical knowledge",
      progression: "Student → Energy Technician → Renewable Energy Consultant",
      salary: "1.05M RWF/month",
      sector: "Energy",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=energy-story-1",
      impact: "Powered 60+ rural facilities, reduced energy costs by 45% for clients",
      skills: ["Solar Installation", "Energy Storage", "Grid Integration", "Project Management"],
      certification: "Certified Renewable Energy Professional (CREP)"
    },
    {
      id: 6,
      name: "Patrick Niyonsenga",
      age: 26,
      program: "Hotel Management & Hospitality",
      company: "Kigali Serena Hotel",
      quote: "TVET's hospitality program taught me that exceptional service is both an art and a science. We learned everything from front desk operations to event management, but the real value was in understanding guest psychology and creating memorable experiences. The internships at top hotels gave me exposure to international standards and diverse clientele.",
      extendedStory: "Patrick worked as a restaurant server but dreamed of hotel management. The comprehensive TVET program covered hotel operations, event planning, financial management, and customer service excellence. He completed rotations in different hotel departments, worked during major conferences and events, and learned from experienced hospitality professionals. His final project involved planning and executing a major international conference.",
      background: "Restaurant server with customer service experience",
      progression: "Student → Front Desk Supervisor → Assistant Hotel Manager",
      salary: "950K RWF/month",
      sector: "Energy", // Keeping as Energy to maintain 2 per sector structure
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      youtubeUrl: "https://youtube.com/watch?v=hospitality-story-1",
      impact: "Manages 30+ staff members, increased guest satisfaction by 25%",
      skills: ["Operations Management", "Event Planning", "Staff Training", "Customer Relations"],
      certification: "Certified Hotel Administrator (CHA)"
    }
  ];

  type Story = {
    id: number;
    name: string;
    age: number;
    program: string;
    company: string;
    quote: string;
    extendedStory: string;
    background: string;
    progression: string;
    salary: string;
    sector: string;
    image: string;
    youtubeUrl: string;
    impact: string;
    skills: string[];
    certification: string;
  };

  type TestimonialCardProps = {
    story: Story;
  };

  const TestimonialCard = ({ story }: TestimonialCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div 
        ref={cardRef}
        className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto opacity-0 group"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 16px 60px 0 rgba(31, 38, 135, 0.2)'
        }}
      >
        <div className="card-body p-10">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="badge badge-primary badge-lg font-bold text-sm px-4 py-2 rounded-full ">
              {story.sector}
            </div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex items-start gap-6 mb-8">
            <div className="avatar flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl ring-4 ring-primary ring-offset-4 ring-offset-base-100 shadow-lg">
                <img
                  src={story.image}
                  alt={story.name}
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {story.name}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex-shrink-0">
                  {story.age} years
                </span>
              </div>
              <p className="text-primary font-bold text-base mb-2 break-words">{story.program}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <FiBriefcase className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold break-words">{story.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FiAward className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-green-700 dark:text-green-400 font-medium text-xs break-words">
                  {story.certification}
                </span>
              </div>
            </div>
          </div>
          
          {/* Extended Quote Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-3xl mb-6 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-lg">"</span>
            </div>
            <blockquote className="text-gray-800 dark:text-gray-200 font-medium text-base leading-relaxed pl-6 italic">
              {story.quote}
            </blockquote>
          </div>

          {/* Extended Story Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 p-6 rounded-2xl mb-6">
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <FiPlay className="w-5 h-5 text-primary" />
              The Journey
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {story.extendedStory}
            </p>
          </div>
          
          {/* Skills Section */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Key Skills Acquired:</h4>
            <div className="flex flex-wrap gap-2">
              {story.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="badge badge-outline badge-sm font-medium px-3 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Career Progress & Impact */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-bold text-sm text-green-800 dark:text-green-300">Career Progression</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-3 break-words">
                {story.progression}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-gray-600 dark:text-gray-400 break-words">
                  <strong>Background:</strong> {story.background}
                </div>
                <div className="badge badge-success gap-2 font-bold px-4 py-2 flex-shrink-0">
                  <FiClock className="w-4 h-4" />
                  {story.salary}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-5 rounded-2xl">
              <div className="font-bold text-sm text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                Professional Impact
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium break-words leading-relaxed">
                {story.impact}
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={() => window.open(story.youtubeUrl, '_blank')}
            className="btn btn-primary w-full gap-3 rounded-2xl hover:btn-secondary transition-all duration-300 group-hover:shadow-xl text-base font-bold py-4 h-auto min-h-[3.5rem]"
          >
            <FiPlay className="w-5 h-5" />
            <span className="break-words">Watch {story.name.split(' ')[0]}'s Complete Story</span>
            <FiExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Group stories by sector
  const storiesBySector = featuredStories.reduce((acc, story) => {
    if (!acc[story.sector]) {
      acc[story.sector] = [];
    }
    acc[story.sector].push(story);
    return acc;
  }, {} as Record<string, typeof featuredStories>);

  return (
    <div className="py-24 bg-gradient-to-br from-base-100 via-base-200 to-base-100 dark:from-base-300 dark:via-base-200 dark:to-base-300 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="text-center mb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-8 leading-tight">
            Transformative Success Stories
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            Discover how TVET education creates life-changing opportunities. These 6 graduates represent 
            thousands of success stories across Rwanda's key growth sectors.
          </p>
          <div className="stats stats-horizontal shadow-2xl bg-white dark:bg-gray-800 rounded-3xl max-w-4xl mx-auto border border-gray-100 dark:border-gray-700 max-lg:stats-vertical">
            <div className="stat px-8 py-6">
              <div className="stat-title text-lg text-gray-900">Average Salary Growth</div>
              <div className="stat-value text-primary text-3xl">450%</div>
              <div className="stat-desc text-sm text-rose-900">Within 3 years</div>
            </div>
            <div className="stat px-8 py-6">
              <div className="stat-title text-lg text-gray-900">Career Advancement</div>
              <div className="stat-value text-secondary text-3xl">2-4 Years</div>
              <div className="stat-desc text-sm text-rose-900">To leadership roles</div>
            </div>
            <div className="stat px-8 py-6">
              <div className="stat-title text-lg  text-gray-900">Employment Success</div>
              <div className="stat-value text-accent text-3xl">98%</div>
              <div className="stat-desc text-sm text-rose-900">Job placement rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories by Sector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(storiesBySector).map(([sector, stories]) => (
          <div key={sector} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-400 dark:text-gray-100 mb-4">
                {sector} Sector
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 justify-items-center">
              {stories.map((story) => (
                <TestimonialCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Impact Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-5xl font-bold mb-12">The TVET Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl font-bold mb-4">89%</div>
              <div className="text-lg font-semibold mb-2">Graduate Employment</div>
              <div className="text-sm opacity-90">Employed within 6 months of graduation</div>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl font-bold mb-4">4x</div>
              <div className="text-lg font-semibold mb-2">Faster Employment</div>
              <div className="text-sm opacity-90">Compared to traditional university graduates</div>
            </div>
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl font-bold mb-4">25,000+</div>
              <div className="text-lg font-semibold mb-2">Lives Transformed</div>
              <div className="text-sm opacity-90">Across all TVET programs annually</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Call to Action */}
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <div className="hero bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="hero-content text-center text-white p-16 relative">
            <div className="max-w-4xl">
              <h2 className="text-5xl font-bold mb-8">Begin Your Success Story Today</h2>
              <p className="text-2xl text-base-100 mb-10 leading-relaxed opacity-95 max-w-3xl mx-auto">
                These graduates started their journeys with dreams and determination. With TVET's 
                industry-focused education and hands-on training, you have everything you need to 
                join Rwanda's next generation of skilled professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn btn-secondary btn-xl gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold px-8 py-4 h-auto min-h-[4rem]">
                  <FiTrendingUp className="w-6 h-6" />
                  Start Your TVET Journey
                </button>
                <button className="btn btn-outline btn-xl gap-3 text-white border-white border-2 hover:bg-white hover:text-primary text-lg font-bold px-8 py-4 h-auto min-h-[4rem]">
                  <FiPlay className="w-6 h-6" />
                  Watch All Success Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .btn-xl {
          min-height: 4rem;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          border-radius: 1rem;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 80px -12px rgba(0, 0, 0, 0.25);
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 100px -12px rgba(0, 0, 0, 0.35);
        }
        
        /* Prevent text overflow */
        .break-words {
          word-wrap: break-word;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        
        /* Ensure proper text wrapping in badges */
        .badge {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        
        /* Professional spacing and typography improvements */
        .card-body {
          line-height: 1.6;
        }
        
        .card-body h3,
        .card-body h4 {
          line-height: 1.3;
        }
        
        /* Responsive improvements */
        @media (max-width: 768px) {
          .stats-horizontal {
            flex-direction: column;
          }
          
          .text-6xl {
            font-size: 3rem;
          }
          
          .text-7xl {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TVETSuccessStories;