import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMessageCircle,
  FiSend,
  FiUser,
  FiUsers,
  FiMinimize2,
  FiMaximize2,
  FiX,
  FiArrowUp,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: 'student' | 'private-sector' | 'general';
}

interface QuickAction {
  id: string;
  text: string;
  category: 'student' | 'private-sector' | 'general';
  icon: React.ComponentType<{ className?: string }>;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm your TVET AI Assistant. I'm here to help bridge the gap between students, private sector, and TVET institutions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'student' | 'private-sector' | 'general'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      text: 'Why should I choose TVET?',
      category: 'student',
      icon: FiUsers
    },
    {
      id: '2',
      text: 'Career opportunities after TVET',
      category: 'student',
      icon: FiUsers
    },
    {
      id: '3',
      text: 'How to partner with TVET institutions?',
      category: 'private-sector',
      icon: FiUsers
    },
    {
      id: '4',
      text: 'Skills development programs',
      category: 'private-sector',
      icon: FiArrowUp
    },
    {
      id: '5',
      text: 'TVET enrollment process',
      category: 'student',
      icon: FiCheckCircle
    },
    {
      id: '6',
      text: 'Industry collaboration benefits',
      category: 'private-sector',
      icon: FiUsers
    }
  ];

  const categories = [
    { id: 'general', label: 'General', icon: FiMessageCircle, color: 'bg-blue-500' },
    { id: 'student', label: 'Student', icon: FiUsers, color: 'bg-green-500' },
    { id: 'private-sector', label: 'Private Sector', icon: FiUsers, color: 'bg-purple-500' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage: string, category: string): string => {
    const responses = {
      student: {
        'why should i choose tvet': "TVET offers practical, hands-on skills that are directly applicable in the workforce. You'll gain:\n\n✅ Industry-relevant skills\n✅ Shorter study duration\n✅ High employment rates\n✅ Entrepreneurship opportunities\n✅ Direct pathway to skilled jobs\n\nMany TVET graduates find employment faster than university graduates!",
        'career opportunities': "TVET opens doors to numerous career paths:\n\n🔧 Technical trades (electrician, plumber, mechanic)\n💼 Business & entrepreneurship\n🏥 Healthcare support roles\n🏗️ Construction & engineering\n💻 IT & digital skills\n🍳 Hospitality & tourism\n\nMany careers offer excellent growth potential and competitive salaries!",
        'enrollment process': "Getting started with TVET is straightforward:\n\n1️⃣ Research programs that match your interests\n2️⃣ Check entry requirements\n3️⃣ Submit application with required documents\n4️⃣ Attend interviews/assessments if required\n5️⃣ Complete enrollment and payment\n\nNeed help finding the right program? I can guide you!"
      },
      'private-sector': {
        'partner with tvet': "Partnering with TVET institutions offers mutual benefits:\n\n🤝 **Partnership Options:**\n• Curriculum development collaboration\n• Internship & apprenticeship programs\n• Equipment donations/sponsorship\n• Guest lectures & mentoring\n• Job placement partnerships\n\n📈 **Benefits:**\n• Access to skilled workforce\n• Reduced training costs\n• Corporate social responsibility\n• Innovation opportunities",
        'skills development': "We offer comprehensive skills development programs:\n\n🎯 **Custom Training Programs:**\n• Employee upskilling\n• New technology adaptation\n• Leadership development\n• Industry-specific certifications\n\n💡 **Benefits for Your Business:**\n• Improved productivity\n• Reduced turnover\n• Enhanced competitiveness\n• Future-ready workforce",
        'collaboration benefits': "Industry-TVET collaboration creates win-win outcomes:\n\n🏢 **For Private Sector:**\n• Pipeline of skilled workers\n• Reduced recruitment costs\n• Influence on curriculum design\n• Tax incentives & CSR benefits\n\n🎓 **For Students:**\n• Real-world experience\n• Job guarantee opportunities\n• Industry mentorship\n• Updated skill sets"
      }
    };

    const categoryResponses = responses[category as keyof typeof responses];
    if (categoryResponses) {
      for (const [key, response] of Object.entries(categoryResponses)) {
        if (userMessage.toLowerCase().includes(key.toLowerCase())) {
          return response;
        }
      }
    }

    // Default responses
    const defaultResponses = [
      "That's a great question! TVET (Technical and Vocational Education and Training) is designed to provide practical skills for immediate employment. What specific aspect would you like to know more about?",
      "I'd be happy to help you understand how TVET can benefit you or your organization. Could you provide more details about your specific situation?",
      "TVET is transforming lives and businesses across the country. Let me know if you'd like information about programs, partnerships, or career opportunities!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      category: selectedCategory
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage, selectedCategory),
        sender: 'bot',
        timestamp: new Date(),
        category: selectedCategory
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    setSelectedCategory(action.category);
    setInputMessage(action.text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">Feel free to ask our in ecosystem AI chatbot</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group relative"
        >
          <FiMessageCircle className="w-10 h-10 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
        <div className="mt-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg shadow-lg max-w-xs">
          <p className="text-sm font-medium">TVET AI Assistant</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Get answers about TVET programs & partnerships</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-screen w-full px-2 py-8 z-50 transition-all duration-300`}>
      <div className={`w-full max-w-md sm:max-w-lg md:max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiUser className="w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">TVET AI Assistant</h3>
                <p className="text-sm text-blue-100">Connecting Students & Industry</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <FiMaximize2 className="w-4 h-4" /> : <FiMinimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Selector */}
          {!isMinimized && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-white text-gray-800'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <category.icon className="w-3 h-3" />
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {!isMinimized && (
          <>
            {/* Home Link */}
            <div className="flex justify-end px-4 pt-2">
              <Link to="/" className="text-xs text-blue-600 dark:text-blue-300 underline hover:text-blue-800 dark:hover:text-blue-400 transition-colors">← Back to Home</Link>
            </div>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-xs`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions
                  .filter(action => selectedCategory === 'general' || action.category === selectedCategory)
                  .slice(0, 3)
                  .map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.text}
                    </button>
                  ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask about ${selectedCategory === 'student' ? 'TVET programs & careers' : selectedCategory === 'private-sector' ? 'partnerships & collaboration' : 'TVET opportunities'}...`}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-600 dark:disabled:to-gray-600 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed group"
                >
                  <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;