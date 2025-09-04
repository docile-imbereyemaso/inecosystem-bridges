import React, { useState } from 'react';

type FormDataType = {
  companyName: string;
  companyRepresentative: string;
  location: string;
  companyBio: string;
  email: string;
  phoneNumber: string;
  sector: string;
  offerings: string[];
  password: string;
  confirmPassword: string;
};

type ErrorsType = {
  [key: string]: string | undefined;
};
import { FiPlus, FiX, FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState<FormDataType>({
    companyName: '',
    companyRepresentative: '',
    location: '',
    companyBio: '',
    email: '',
    phoneNumber: '',
    sector: '',
    offerings: [''],
    password: '',
    confirmPassword: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: ErrorsType) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleOfferingChange = (index: number, value: string) => {
    const newOfferings = [...formData.offerings];
    newOfferings[index] = value;
    setFormData((prev: FormDataType) => ({
      ...prev,
      offerings: newOfferings
    }));
  };

  const addOffering = () => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      offerings: [...prev.offerings, '']
    }));
  };

  const removeOffering = (index: number) => {
    if (formData.offerings.length > 1) {
      const newOfferings = formData.offerings.filter((_, i) => i !== index);
      setFormData((prev: FormDataType) => ({
        ...prev,
        offerings: newOfferings
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Validate file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);
        setErrors((prev: ErrorsType) => ({ ...prev, document: '' }));
      } else {
        setErrors((prev: ErrorsType) => ({ ...prev, document: 'Please upload a PDF, DOC, or DOCX file' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: ErrorsType = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyRepresentative.trim()) newErrors.companyRepresentative = 'Company representative is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.companyBio.trim()) newErrors.companyBio = 'Company bio is required';
    if (!formData.sector.trim()) newErrors.sector = 'Sector is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (formData.offerings.some((offer: string) => !offer.trim())) newErrors.offerings = 'All offering fields must be filled';
    if (!uploadedFile) newErrors.document = 'Official company document is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { ...formData, document: uploadedFile });
      alert('Company registration submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-300 mb-2">
            Join INECOSYSTEM
          </h1>
          <p className="text-lg text-gray-300">
            Register your company and become part of our innovative ecosystem
          </p>
        </div>

        {/* Registration Form */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body p-8">
            <div className="space-y-6">
              {/* Company Information Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Company Information
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Company Name *</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className={`input input-bordered w-full ${errors.companyName ? 'input-error' : 'focus:input-primary'}`}
                    />
                    {errors.companyName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.companyName}</span>
                      </label>
                    )}
                  </div>

                  {/* Sector */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Sector *</span>
                    </label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      className={`select select-bordered w-full ${errors.sector ? 'select-error' : 'focus:select-primary'}`}
                    >
                      <option value="">Select sector</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Construction">Construction</option>
                      <option value="ICT">ICT</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Mining">Mining</option>
                      <option value="Tourism">Tourism</option>
                      <option value="Transport & Logistics">Transport & Logistics</option>
                      <option value="Energy">Energy</option>
                      <option value="Finance">Finance</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.sector && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.sector}</span>
                      </label>
                    )}
                  </div>

                  {/* Company Representative */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Company Representative *</span>
                    </label>
                    <input
                      type="text"
                      name="companyRepresentative"
                      value={formData.companyRepresentative}
                      onChange={handleInputChange}
                      placeholder="Full name of representative"
                      className={`input input-bordered w-full ${errors.companyRepresentative ? 'input-error' : 'focus:input-primary'}`}
                    />
                    {errors.companyRepresentative && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.companyRepresentative}</span>
                      </label>
                    )}
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Location *</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className={`input input-bordered w-full ${errors.location ? 'input-error' : 'focus:input-primary'}`}
                    />
                    {errors.location && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.location}</span>
                      </label>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@example.com"
                      className={`input input-bordered w-full ${errors.email ? 'input-error' : 'focus:input-primary'}`}
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.email}</span>
                      </label>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-control lg:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium">Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : 'focus:input-primary'}`}
                    />
                    {errors.phoneNumber && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.phoneNumber}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Company Bio */}
                <div className="form-control mt-6">
                  <label className="label">
                    <span className="label-text font-medium">Company Bio *</span>
                  </label>
                    <textarea
                      name="companyBio"
                      value={formData.companyBio}
                      onChange={handleInputChange}
                      placeholder="Tell us about your company, its mission, and what makes it unique..."
                      rows={4}
                      className={`textarea textarea-bordered w-full ${errors.companyBio ? 'textarea-error' : 'focus:textarea-primary'}`}
                    />
                  {errors.companyBio && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.companyBio}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Services Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  What We Offer
                </h2>
                
                <div className="space-y-3">
                  {formData.offerings.map((offering, index) => (
                    <div key={index} className="form-control">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={offering}
                          onChange={(e) => handleOfferingChange(index, e.target.value)}
                          placeholder={`what we offer ${index + 1}`}
                          className="input input-bordered flex-1 focus:input-primary"
                        />
                        {formData.offerings.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeOffering(index)}
                            className="btn btn-outline btn-error btn-square"
                          >
                            <FiX size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addOffering}
                    className="btn btn-outline btn-primary"
                  >
                    <FiPlus size={20} />
                    Add Another Offering
                  </button>
                  
                  {errors.offerings && (
                    <div className="text-error text-sm">{errors.offerings}</div>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Official Documentation
                </h2>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Upload Company Document *</span>
                    <span className="label-text-alt">PDF, DOC, or DOCX only</span>
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    />
                    
                    {uploadedFile && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <FiUpload size={16} className="text-green-600" />
                        <span className="text-sm text-green-700">{(uploadedFile as File).name}</span>
                      </div>
                    )}
                  </div>
                  
                  {errors.document && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.document}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Security Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Account Security
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`input input-bordered w-full pr-12 ${errors.password ? 'input-error' : 'focus:input-primary'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.password}</span>
                      </label>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Confirm Password *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className={`input input-bordered w-full pr-12 ${errors.confirmPassword ? 'input-error' : 'focus:input-primary'}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg"
                >
                  Register Company
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account? 
            <a href="#" className="link link-primary ml-1">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;