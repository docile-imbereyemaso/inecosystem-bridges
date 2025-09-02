import { useState } from 'react';
import { FiChevronRight, FiUsers, FiClock, FiDollarSign, FiAward, FiPlay, FiCheckCircle, FiArrowRight, FiBookOpen, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import TVETSuccessStories from './TVETSuccessStories';
import TvetSocialCTA from './TvetSocialCTA';

const Tvetmattersection = () => {
  const [activeTab, setActiveTab] = useState('digital');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

 

  type Program = { name: string; duration: string; placement: string; salary: string };
  type ProgramsObject = {
    [key: string]: {
      title: string;
      programs: Program[];
    };
  };
  const programs: ProgramsObject = {
    digital: {
      title: "Digital & Tech Skills",
      programs: [
        { name: "Software Development", duration: "18 months", placement: "92%", salary: "$15,000-25,000" },
        { name: "Cybersecurity", duration: "12 months", placement: "88%", salary: "$18,000-28,000" },
        { name: "Digital Marketing", duration: "8 months", placement: "85%", salary: "$12,000-22,000" },
        { name: "Web Design", duration: "10 months", placement: "90%", salary: "$14,000-24,000" }
      ]
    },
    green: {
      title: "Green Jobs",
      programs: [
        { name: "Renewable Energy", duration: "15 months", placement: "94%", salary: "$16,000-26,000" },
        { name: "Sustainable Agriculture", duration: "12 months", placement: "89%", salary: "$13,000-20,000" },
        { name: "Environmental Technology", duration: "18 months", placement: "87%", salary: "$17,000-27,000" },
        { name: "Green Building", duration: "20 months", placement: "91%", salary: "$18,000-28,000" }
      ]
    },
    healthcare: {
      title: "Healthcare",
      programs: [
        { name: "Nursing Assistant", duration: "10 months", placement: "96%", salary: "$14,000-22,000" },
        { name: "Medical Technology", duration: "15 months", placement: "93%", salary: "$16,000-25,000" },
        { name: "Pharmacy Technology", duration: "12 months", placement: "90%", salary: "$15,000-23,000" },
        { name: "Elderly Care", duration: "8 months", placement: "94%", salary: "$12,000-19,000" }
      ]
    },
    manufacturing: {
      title: "Advanced Manufacturing",
      programs: [
        { name: "Robotics Technology", duration: "16 months", placement: "91%", salary: "$17,000-28,000" },
        { name: "3D Printing & Design", duration: "12 months", placement: "88%", salary: "$15,000-25,000" },
        { name: "Quality Control", duration: "10 months", placement: "93%", salary: "$14,000-22,000" },
        { name: "Industrial Maintenance", duration: "14 months", placement: "89%", salary: "$16,000-24,000" }
      ]
    }
  };

  const partners = [
    "MTN Rwanda", "Bank of Kigali", "Equity Bank", "Airtel Rwanda", 
    "COGEBANQUE", "Inyange Industries", "Crystal Ventures", "Simba Telecom"
  ];

  const faqs = [
    {
      question: "Will employers respect my TVET qualification?",
      answer: "Absolutely! Our industry partners actively recruit TVET graduates because they have the practical skills employers need. Many of our graduates are promoted faster than university graduates because they can start contributing immediately."
    },
    {
      question: "Can I still go to university later if I want?",
      answer: "Yes! Many universities now recognize TVET qualifications for advanced standing. You can also pursue part-time degree programs while working. Some of our graduates earn their degrees while already established in their careers."
    },
    {
      question: "What if I don't know which program to choose?",
      answer: "We offer career counseling and aptitude testing to help you find the right fit. You can also attend our 'Try Before You Apply' workshops where you get hands-on experience in different programs."
    },
    {
      question: "How much will it cost?",
      answer: "TVET programs cost 60-80% less than university degrees. We offer scholarships, payment plans, and many programs include paid internships. Most students graduate debt-free and start earning immediately."
    },
    {
      question: "Are there opportunities for girls in technical fields?",
      answer: "Absolutely! We actively encourage female participation and provide support programs. Many of our top graduates are women, and employers are actively seeking to diversify their technical teams."
    }
  ];

  return (
  <div className="min-h-screen bg-white dark:bg-gray-900">
       
      {/* Hero Section */}
  <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white dark:text-gray-100 overflow-hidden">
  <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Future Starts Here:<br />
              <span className="text-yellow-400 dark:text-yellow-300">Discover Why TVET Matters</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200">
              Get job-ready skills, earn while you learn, and launch a successful career in high-demand industries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-colors flex items-center justify-center">
          Explore TVET Programs <FiArrowRight className="ml-2 h-5 w-5" />
        </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 dark:hover:bg-gray-800 dark:hover:text-white transition-colors flex items-center justify-center">
                <FiPlay className="mr-2 h-5 w-5" /> Watch Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why TVET Section */}
  <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why TVET is Your Smart Choice
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get ahead with practical skills that employers actually need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Fast Track to Employment</h3>
              <p className="text-gray-600 dark:text-gray-300">Graduate job-ready in 6 months to 2 years vs. 4+ years</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Earn While Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">Apprenticeship opportunities and paid training programs</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">High Demand Skills</h3>
              <p className="text-gray-600 dark:text-gray-300">Focus on industries actively hiring graduates</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Lower Debt, Higher ROI</h3>
              <p className="text-gray-600 dark:text-gray-300">Cost-effective education with immediate returns</p>
            </div>
          </div>
        </div>
      </div>

    

      <TVETSuccessStories />

      {/* Industry Partnerships Section */}
  <div className="py-16  dark:bg-gray-800 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Industry Partnerships & Job Guarantees
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our graduates are hired by Rwanda's leading companies
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-2">85%</div>
                <p className="text-gray-600">Graduates employed within 6 months</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-300 mb-2">$18K</div>
                <p className="text-gray-600">Average starting salary</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-300 mb-2">200+</div>
                <p className="text-gray-600">Partner companies hiring our graduates</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow text-center font-medium text-gray-700 dark:text-gray-200">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Section */}
  <div className="py-16 dark:bg-gray-900 bg-slate-500/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Programs That Matter
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose from high-demand, future-ready programs
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(programs).map(([key, program]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {program.title}
              </button>
            ))}
          </div>
          <div className="bg-gray-800 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-6 dark:text-gray-100">{programs[activeTab].title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs[activeTab].programs.map((program: Program, index: number) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:bg-gray-900">
                    <h4 className="text-xl font-semibold mb-3 dark:text-gray-100">{program.name}</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="font-medium dark:text-gray-200">{program.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Job Placement</p>
                        <p className="font-medium text-green-600 dark:text-green-300">{program.placement}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Salary Range</p>
                        <p className="font-medium dark:text-gray-200">{program.salary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
  <div className="py-16 bg-gray-800 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Compare Your Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how TVET stacks up against traditional university education
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full dark:bg-gray-900">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Aspect</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 dark:text-blue-300">TVET</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 dark:text-gray-300">University</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 font-medium dark:text-gray-200">Time to Graduate</td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-300 font-semibold">6 months - 2 years</td>
                    <td className="px-6 py-4 text-center dark:text-gray-200">4-6 years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium dark:text-gray-200">Average Cost</td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-300 font-semibold">$2,000-5,000</td>
                    <td className="px-6 py-4 text-center dark:text-gray-200">$10,000-25,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium dark:text-gray-200">Employment Rate</td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-300 font-semibold">85-95%</td>
                    <td className="px-6 py-4 text-center dark:text-gray-200">65-75%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium dark:text-gray-200">Learning Style</td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-300 font-semibold">Hands-on, Practical</td>
                    <td className="px-6 py-4 text-center dark:text-gray-200">Theory-based</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium dark:text-gray-200">Earning While Learning</td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-300 font-semibold">
                      <FiCheckCircle className="h-5 w-5 text-green-500 dark:text-green-300 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center dark:text-gray-200">Limited opportunities</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 text-center">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Both paths are valuable - choose what fits your goals and learning style
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
  <div className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Getting Started is Easy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple steps to launch your career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBookOpen className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100 text-black">1. Choose Your Program</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose your preferred sector and find what interests you most</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="h-8 w-8 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100 text-black">2. Get Accepted</h3>
              <p className="text-gray-600 dark:text-gray-300">Experience better learning process - we grow as we work</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBriefcase className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-100 text-black">3. Start Your Career</h3>
              <p className="text-gray-600 dark:text-gray-300">Graduate job-ready and begin earning immediately</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow text-center">
              <h4 className="font-semibold mb-2 dark:text-gray-100">Financial Support</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Scholarships, grants, and flexible payment plans available</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow text-center">
              <h4 className="font-semibold mb-2 dark:text-gray-100">No Barriers</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Open to all backgrounds - passion matters more than grades</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow text-center">
              <h4 className="font-semibold mb-2 dark:text-gray-100">Campus Tours</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Visit our modern facilities virtually or in person</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow text-center">
              <h4 className="font-semibold mb-2 dark:text-gray-100">Parent Support</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Information sessions to address family concerns</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
  <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get answers to common concerns about TVET education
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-indigo-600 dark:bg-gray-900 rounded-lg shadow">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-indigo-900 "
                >
                  <span className="font-medium">{faq.question}</span>
                  <FiChevronRight className={`h-5 w-5 transition-transform ${expandedFAQ === index ? 'rotate-90' : ''}`} />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-900 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>


      <TvetSocialCTA/>
    </div>
  );
};

export default Tvetmattersection;