import React, { useState } from 'react';
import { Link } from 'react-router';

// Type definitions outside the component
type FormDataType = {
  firstName: string;
  lastName: string;
  sector: string;
  email: string;
  phone: string;
  bio: string;
  status: string;
  password: string;
  confirmPassword: string;
};

type ErrorsType = {
  [key: string]: string | undefined;
};

const IndividualSignUp = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    sector: '',
    email: '',
    phone: '',
    bio: '',
    status: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<ErrorsType>({});

  const sectors = [
    'Information Technology',
    'Healthcare',
    'Construction',
    'Manufacturing',
    'Agriculture',
    'Hospitality & Tourism',
    'Finance & Banking',
    'Education',
    'Transportation',
    'Retail & Commerce',
    'Arts & Creative',
    'Other'
  ];

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

  const validateForm = () => {
    const newErrors: ErrorsType = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.sector) newErrors.sector = 'Please select a sector';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.status) newErrors.status = 'Please select your status';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-base-content mb-2">Join Our Platform</h1>
            <p className="text-base-content/70 text-lg">Create your account as an individual or TVET graduate</p>
          </div>

          {/* Form Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-8">
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">First Name *</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                    />
                    {errors.firstName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.firstName}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Last Name *</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                    />
                    {errors.lastName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.lastName}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Sector Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Sector *</span>
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className={`select select-bordered w-full ${errors.sector ? 'select-error' : ''}`}
                  >
                    <option value="">Select your sector</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.sector}</span>
                    </label>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.email}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+250 xxx xxx xxx"
                      className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                    />
                    {errors.phone && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.phone}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Bio</span>
                    <span className="label-text-alt">Optional</span>
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your skills, and experience..."
                    className="textarea textarea-bordered h-24 resize-none w-full"
                    maxLength={300}
                  />
                  <label className="label">
                    <span className="label-text-alt">{formData.bio.length}/300 characters</span>
                  </label>
                </div>

                {/* Status */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Status *</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="student"
                        checked={formData.status === 'student'}
                        onChange={handleInputChange}
                        className="radio radio-primary"
                      />
                      <span className="label-text">Current Student</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="graduate"
                        checked={formData.status === 'graduate'}
                        onChange={handleInputChange}
                        className="radio radio-primary"
                      />
                      <span className="label-text">TVET Graduate</span>
                    </label>
                  </div>
                  {errors.status && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.status}</span>
                    </label>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password *</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.password}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Confirm Password *</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                    />
                    {errors.confirmPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="label-text">
                      I agree to the{' '}
                      <a href="#" className="link link-primary">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="link link-primary">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-8">
                  <button onClick={handleSubmit} className="btn btn-primary btn-lg">
                    Create Account
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-base-content/70">
                    Already have an account?{' '}
                    <Link to="/login" className="link link-primary font-medium">Sign in here</Link>
                   
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualSignUp
