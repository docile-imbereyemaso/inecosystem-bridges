import React, {  useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiExternalLink, FiBell } from 'react-icons/fi';
import Navbar from '../common-components/Navbar';
import FooterComponent from './FooterComponent';



const TVETBridgePlatform = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  const [jobListings, setJobs] = useState<jobListings[]>([]);

  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCompanies = async () => {
      setLoading(true);
      try {
      const response = await fetch("http://localhost:5000/api/jobsData", {
        method: "GET", // Changed from GET to POST
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setJobs([]); // Set empty array to prevent map error
    }finally{
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);


  const organizations = [
    {
      id: 1,
      name: "Anthropic",
      logo: "AI",
      sector:"Technical sector",
      location:"Kigali, Nyarugenge",
      size:"50+ employees",
      focus:"Regional focus",
      description: "AI research and product company, with teams working on alignment, policy, and security",
      openRoles: "what we offer (software development skills, networking skills , computer maintenance)"
    },
    {
      id: 2,
      name: "Rwanda Skills Initiative",
      logo: "RSI",
      sector:"Technical sector",
      location:"Kigali, Nyarugenge",
      size:"50+ employees",
      focus:"Regional focus",
      description: "Leading skills development organization focusing on youth empowerment and industry partnerships",
      openRoles: "what we offer (software development skills, networking skills , computer maintenance)"
    },
    {
      id: 3,
      name: "East African Skills Hub",
      logo: "EASH",
      sector:"Technical sector",
      location:"Kigali, Nyarugenge",
      size:"50+ employees",
      focus:"Regional focus",
      description: "Regional hub for technical and vocational skills training across East Africa",
      openRoles: "what we offer (software development skills, networking skills , computer maintenance)"
    }
  ];

  const opportunities = [
    {
      id: 1,
      title: "Recurring Fellowships",
      icon: "📈",
      sector:"Technical sector",
      status:"Student",
      level:"Bachelor's degree",
      tags: ["Career development", "Multiple experience levels"],
      count: "220 fellowships",
      updated: "Updated 1 day ago"
    },
    {
      id: 2,
      title: "Challenges and Prizes Related to Skills Development",
      icon: "🏆",
      sector:"Technical sector",
      status:"Student",
      level:"Multi levels",
      count: "45 challenges",
      updated: "Updated 3 days ago"
    },
    {
      id: 3,
      title: "Industry Partnerships Program",
      icon: "🤝",
      sector:"Technical sector",
      status:"Graduates",
      level:"Bachelor's degree",
      count: "32 partnerships",
      updated: "Updated 2 days ago"
    },
    {
      id: 4,
      title: "TVET Scholarships & Grants",
      icon: "🎓",
      sector:"Technical sector",
      status:"Student",
      level:"Entry level(TVET secondary schools graduates",
      count: "78 opportunities",
      updated: "Updated 1 week ago"
    }
  ];

  type TabButtonProps = {
    id: string;
    label: string;
    isActive: boolean;
    onClick: (id: string) => void;
  };

  const TabButton: React.FC<TabButtonProps> = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium transition-all duration-200 ${
        isActive 
          ? 'text-gray-900 border-b-2 border-cyan-500 bg-white' 
          : 'text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  const JobsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Keywords"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-700 focus:border-cyan-500 dark:focus:border-cyan-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 bg-cyan-500 dark:bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-800 transition-colors">
            <FiBell className="w-4 h-4" />
            Search your Dream job
          </button>
        </div>
      

            
      </div>
      <div className="flex items-center justify-between">
        <div className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">705</span> roles
        </div>
        
      </div>
      <div className="space-y-4">
        {loading ? (
  <div>Loading jobs...</div>
) : (jobListings.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-700 dark:to-blue-800 rounded-lg flex items-center justify-center text-white font-bold">
                {job.name.split(" ").map((s) => s[0]).join(" ")}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer">
                      {job.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{job.company}</p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                     <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                       {job.sector}
                     </span>
                     <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                       {job.experience}
                     </span>
                   </div>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {job.timeAgo}
                  </div>
                  
                </div>
              </div>
            </div>
            
            <a href="#" className="text-cyan-500 hover:underline block px-3 py-2 bg-slate-800 w-fit mt-3 rounded-lg font-semibold transition hover:bg-slate-800/90 duration-300 dark:bg-indigo-500">View job details</a>
          </div>
        )))}
      </div>
    </div>
  );

  const PrivateSectorTab = () => (
    <div className="space-y-6">
      <div className="dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sectors that we operate in</label>
             <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-700 focus:border-cyan-500 dark:focus:border-cyan-700 bg-gray-400 dark:bg-gray-800">
              <option>Select sector</option>
              <option>Agriculture and Food Technology</option>
              <option>Automotive Technology</option>
              <option>Business and Commerce</option>
              <option>Construction and Building Technology</option>
              <option>Electrical and Electronics</option>
              <option>Engineering Technology</option>
              <option>Healthcare and Medical Technology</option>
              <option>Hospitality and Tourism</option>
              <option>Information and Communication Technology (ICT)</option>
              <option>Manufacturing and Production</option>
              <option>Maritime and Fisheries</option>
              <option>Mechanical Technology</option>
              <option>Renewable Energy and Environmental Technology</option>
              <option>Textile and Garment Technology</option>
              <option>Transportation and Logistics</option>
              <option>Beauty and Cosmetology</option>
              <option>Culinary Arts and Food Services</option>
              <option>Home Economics and Family Studies</option>
              <option>Media and Creative Arts</option>
              <option>Mining and Metallurgy</option>
            </select>
          </div>
          
       
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">58</span> private sector Partnership
        </div>
        
      </div>

      <div className="space-y-4">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {org.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{org.name}</h3>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {org.sector}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {org.location}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {org.size}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                          {org.focus}
                        </span>
                      </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{org.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{org.openRoles}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                      <FiExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
             <div className='mt-3'>
              <a href="#" className="text-gray-100 bg-indigo-700 px-5 py-2 font-semibold rounded-md hover:bg-indigo-800 transform hover:scale-[1.09] transition duration-200 block w-fit  ease-in-out"> Visit them</a>

             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OtherOpportunitiesTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In this section we've collected 300+ opportunities that aren't quite a fit our main board – including lists of courses, organisations, internships and other resources. These primarily focus on skill-building and career development, though also contain opportunities to help solve pressing global problems.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          We keep these lists up to date and appreciate any suggestions for additions and feedback. If you have any,{' '}
          <a 
            href="mailto:feedback@yourcompany.com?subject=Feedback&body=Hi,%0A%0AI would like to provide feedback about:%0A%0A"
            className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 underline"
          >
            let us know!
          </a>
        </p>
      </div>
           <div className="dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sectors that you are interested in </label>
             <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-700 focus:border-cyan-500 dark:focus:border-cyan-700 bg-gray-400 dark:bg-gray-800">
              <option>Select sector</option>
              <option>Agriculture and Food Technology</option>
              <option>Automotive Technology</option>
              <option>Business and Commerce</option>
              <option>Construction and Building Technology</option>
              <option>Electrical and Electronics</option>
              <option>Engineering Technology</option>
              <option>Healthcare and Medical Technology</option>
              <option>Hospitality and Tourism</option>
              <option>Information and Communication Technology (ICT)</option>
              <option>Manufacturing and Production</option>
              <option>Maritime and Fisheries</option>
              <option>Mechanical Technology</option>
              <option>Renewable Energy and Environmental Technology</option>
              <option>Textile and Garment Technology</option>
              <option>Transportation and Logistics</option>
              <option>Beauty and Cosmetology</option>
              <option>Culinary Arts and Food Services</option>
              <option>Home Economics and Family Studies</option>
              <option>Media and Creative Arts</option>
              <option>Mining and Metallurgy</option>
            </select>
          </div>
          
       
        </div>
      </div>

     

      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-2xl">
                {opportunity.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{opportunity.title}</h3>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {opportunity.sector}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {opportunity.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-indigo-400 dark:bg-amber-500 text-white dark:text-blue-200">
                        {opportunity.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{opportunity.count}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.updated}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                      <FiExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );



  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div  className="sticky top-5 z-10">
           <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTab === 'jobs' && 'Jobs'}
            {activeTab === 'private-sector' && 'Private Sector Partners'}
            {activeTab === 'opportunities' && 'Other Opportunities'}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {activeTab === 'jobs' && (
              <>Get connected to private sectors <span className="text-cyan-500 dark:text-cyan-400">Work and Grow</span> with your career.</>
            )}
            {activeTab === 'private-sector' && (
              <>Places with roles that could be particularly promising for <span className="text-cyan-500 dark:text-cyan-400">helping skills go well</span>.</>
            )}
            {activeTab === 'opportunities' && (
              <>Additional lists of top opportunities for skill-building and career development.</>
            )}
          </p>
        </div>
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <TabButton 
              id="jobs" 
              label="Search Jobs" 
              isActive={activeTab === 'jobs'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="private-sector" 
              label="Explore Private Sector" 
              isActive={activeTab === 'private-sector'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="opportunities" 
              label="Other Opportunities" 
              isActive={activeTab === 'opportunities'} 
              onClick={setActiveTab} 
            />
          </div>
        </div>
        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'jobs' && <JobsTab />}
          {activeTab === 'private-sector' && <PrivateSectorTab />}
          {activeTab === 'opportunities' && <OtherOpportunitiesTab />}
        </div>
      </div>


      <FooterComponent/>
    </div>
  );
};

export default TVETBridgePlatform;