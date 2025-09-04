import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function PrivateSectorProfiles() {

  // FOR COMPANY

  
const [companyData, setCompanyData] = useState({
  name: 'TechCorp Solutions',
  locations: ['New York, NY', 'San Francisco, CA'],
  contacts: [
    { type: 'Email', value: 'contact@techcorp.com' },
    { type: 'Phone', value: '+1 (555) 123-4567' }
  ],
  description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation.',
  offerings: ['Software Development', 'Cloud Solutions', 'Data Analytics', 'Digital Transformation'],
});

const saveCompany = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/companies", {   // <-- should match your backend route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(companyData),  // sending full object
    });

    const result = await response.json();
    if (result.success) {
      alert("Company saved successfully!");
    } else {
      alert("Error saving company: " + result.message);
    }
  } catch (error) {
    console.error("Save error:", error);
  }
};

  


  const [newLocation, setNewLocation] = useState('');
  const [newContact, setNewContact] = useState({ type: '', value: '' });
  const [newOffering, setNewOffering] = useState('');

  const addLocation = () => {
    if (newLocation.trim()) {
      setCompanyData(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (index: number) => {
    setCompanyData(prev => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index)
    }));
  };

  // Add/removeContact functions removed as they are unused

  const addOffering = () => {
    if (newOffering.trim()) {
      setCompanyData(prev => ({
        ...prev,
        offerings: [...prev.offerings, newOffering.trim()]
      }));
      setNewOffering('');
    }
  };

  const removeOffering = (index: number) => {
    setCompanyData(prev => ({
      ...prev,
      offerings: prev.offerings.filter((_, i) => i !== index)
    }));
  };

  const [getCompanies, setGetCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/companies");
        const data = await response.json();
        setGetCompanies(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <PageMeta
        title="INECOSYSTEM BRIDGES"
        description=""
      />
      <PageBreadcrumb pageTitle="Profile" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-2">Company Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your company information and details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90 md:mb-5 md:text-lg">
              Basic Information
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Company Description (Bio)
                </label>
                <textarea
                  value={companyData.description}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                  rows={3}
                  placeholder="Describe your company..."
                />
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90 md:mb-5 md:text-lg">
              Locations
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                {companyData.locations.map((location, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                    <span className="text-sm text-gray-800 dark:text-white/90 break-words">{location}</span>
                    <button
                      onClick={() => removeLocation(index)}
                      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 self-end sm:self-center"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add new location..."
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                  onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                />
                <button
                  onClick={addLocation}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 sm:w-auto w-full"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90 md:mb-5 md:text-lg">
              Contact Information 
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                {companyData.contacts.map((contact, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300 mb-1">
                        {contact.type}
                      </span>
                      <p className="text-sm text-gray-800 dark:text-white/90 break-words">{contact.value}</p>
                    </div>
                   
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newContact.type}
                    onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Contact type (Email, Phone, etc.)"
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                  />
                  <input
                    type="text"
                    value={newContact.value}
                    onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Contact value"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                  />
                
                </div>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90 md:mb-5 md:text-lg">
              What We Offer
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-wrap gap-2">
                {companyData.offerings.map((offering, index) => (
                  <span key={index} className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                    {offering}
                    <button
                      onClick={() => removeOffering(index)}
                      className="ml-1 text-white hover:text-blue-200"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newOffering}
                  onChange={(e) => setNewOffering(e.target.value)}
                  placeholder="Add new offering..."
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                  onKeyPress={(e) => e.key === 'Enter' && addOffering()}
                />
                <button
                  onClick={addOffering}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button  onClick={saveCompany} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}