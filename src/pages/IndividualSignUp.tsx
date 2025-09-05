import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";

const sectors = [
  "Technology",
  "Healthcare",
  "Education",
  "Construction",
  "Manufacturing",
  "Finance",
  "Retail",
  "Tourism",
  "Agriculture",
  "Energy",
];

const skillOptions = [
  "React",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "SQL",
  "HTML/CSS",
  "Node.js",
  "TypeScript",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Go",
  "Project Management",
  "Data Analysis",
  "Digital Marketing",
  "Graphic Design",
  "Nursing",
  "Teaching",
  "Accounting",
  "Sales",
  "Customer Service",
];

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSectorToggle = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (skills.length === 0) newErrors.skills = "At least one skill is required";
    if (selectedSectors.length === 0) newErrors.sectors = "At least one sector is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for API
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        skills: skills,
        sectors: selectedSectors,
        password: formData.password
      };
      
      // Send data to your API endpoint
      const response = await fetch("http://localhost:5000/api/individualsignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Registration successful
        alert("Registration successful!"); // Redirect to login page
      } else {
        // Handle errors from server
        setErrors({ submit: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
        Sign Up - INECOSYSTEM BRIDGES
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Create your account on INECOSYSTEM BRIDGES
      </p>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Create Your Account
        </h3>
        
        {errors.submit && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 dark:bg-gray-800 dark:text-white ${
                    errors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 dark:bg-gray-800 dark:text-white ${
                    errors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border px-4 py-3 dark:bg-gray-800 dark:text-white ${
                    errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
              Security
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border px-4 py-3 dark:bg-gray-800 dark:text-white ${
                      errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border px-4 py-3 dark:bg-gray-800 dark:text-white ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
              Skills *
            </h4>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 flex items-center space-x-2 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:bg-blue-300 dark:hover:bg-blue-700 rounded-full p-1"
                    aria-label="Remove skill"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {errors.skills && (
              <p className="mt-1 text-xs text-red-500 mb-4">{errors.skills}</p>
            )}

            <div className="flex space-x-2 max-w-md">
              <select
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded"
              >
                <option value="">Add a skill...</option>
                {skillOptions
                  .filter((skill) => !skills.includes(skill))
                  .map((skill) => (
                    <option key={skill} value={skill} className="text-gray-800 dark:text-white">
                      {skill}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={addSkill}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center"
              >
                <FaCheck className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interested Sectors */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
              Interested Sectors *
            </h4>

            {errors.sectors && (
              <p className="mt-1 text-xs text-red-500 mb-4">{errors.sectors}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sectors.map((sector) => (
                <button
                  type="button"
                  key={sector}
                  onClick={() => handleSectorToggle(sector)}
                  className={`text-sm px-3 py-2 rounded border ${
                    selectedSectors.includes(sector)
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 border-blue-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Selected:</p>
              {selectedSectors.map((sector, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}