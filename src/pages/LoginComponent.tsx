import { useState } from 'react';
import { Link } from 'react-router';
import { FiUser, FiHome, FiBook, FiEye, FiEyeOff, FiMail, FiLock, FiChevronDown } from 'react-icons/fi';

const LoginComponent = () => {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const userTypes = [
    {
      id: 'student',
      label: 'Student / Individual',
      icon: FiUser,
      color: 'from-blue-500 to-cyan-500',
      description: 'Access learning opportunities and career development resources',
      canRegister: true,
      registrationLink: '/IndividualSignUp'
    },
    {
      id: 'private',
      label: 'Private Sector',
      icon: FiHome,
      color: 'from-green-500 to-emerald-500',
      description: 'Connect with talent and invest in skills development',
      canRegister: true,
      registrationLink: '/register/private-sector'
    },
    {
      id: 'tvet',
      label: 'TVET Institution',
      icon: FiBook,
      color: 'from-purple-500 to-indigo-500',
      description: 'Manage programs and connect with industry partners',
      canRegister: false,
      registrationLink: null
    }
  ];

  const currentUserType = userTypes.find(type => type.id === userType);
  if (!currentUserType) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { userType, ...formData });
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google login for:', userType);
    // Handle Google OAuth login
  };

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setIsDropdownOpen(false);
  };


  const getRegistrationText = () => {
    switch (userType) {
      case 'student':
        return 'Create Individual Account';
      case 'private':
        return 'Register your Private Sector here';
      case 'tvet':
        return null;
      default:
        return 'Register here';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-md">
        {/* Home Button at Top */}
        <div className="mb-3 text-center">
          <Link to="/" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-medium transition-colors text-sm animate-pulse">
                  
          </Link>
        </div>

        {/* Logo and Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl mb-2 shadow-lg">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            INECOSYSTEM
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Community Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
          {/* User Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              I am signing in as:
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {currentUserType.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentUserType.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 bg-gradient-to-r ${currentUserType.color} rounded-lg flex items-center justify-center`}>
                    <currentUserType.icon className="text-white text-lg" />
                  </div>
                  <FiChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-10">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleUserTypeSelect(type.id)}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        type.id === userType ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      } ${type.id === userTypes[0].id ? 'rounded-t-xl' : ''} ${
                        type.id === userTypes[userTypes.length - 1].id ? 'rounded-b-xl' : ''
                      }`}
                    >
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {type.description}
                        </div>
                      </div>
                      <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center ml-3`}>
                        <type.icon className="text-white text-lg" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Google Sign In */}
          <div className="mb-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className={`w-full bg-gradient-to-r ${currentUserType.color} hover:shadow-lg text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800`}
            >
              Sign In to {currentUserType.label} Portal
            </button>

            {/* Registration Section */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              {currentUserType.canRegister ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                      <Link
                        to={currentUserType.registrationLink || '#'}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
                      >
                        {getRegistrationText()}
                      </Link>
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    TVET Institution Access
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                    Institution accounts are created by administrators. Contact support if you need access.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
            Empowering future-ready talent by strengthening collaboration between 
            TVET institutions, the private sector, and industries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;