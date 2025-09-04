import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { useState } from "react";
import { FaTimes, FaPlus, FaEdit } from "react-icons/fa";

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

export default function UserProfiles() {
  const [profile] = useState({
    firstName: "Musharof",
    lastName: "Chowdhury",
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    bio: "Team Manager",
  });

  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([
    "Technology",
    "Healthcare",
  ]);

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

  return (
    <>
      <PageMeta
        title="INECOSYSTEM BRIDGES"
        description=""
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      First Name
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {profile.firstName}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Last Name
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {profile.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email address
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {profile.phone}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Bio
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {profile.bio}
                    </p>
                  </div>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                <FaEdit /> Edit
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                  Skills
                </h4>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 flex items-center space-x-2 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:bg-blue-300 dark:hover:bg-blue-700 rounded-full p-1"
                        aria-label="Remove skill"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

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
                    onClick={addSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center"
                  >
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                <FaEdit /> Edit
              </button>
            </div>
          </div>

          {/* Interested Sectors */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                  Interested Sectors
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {sectors.map((sector) => (
                    <button
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

              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}