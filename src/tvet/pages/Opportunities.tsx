import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Opportunity {
  id: string;
  name: string;
  company: string;
  sector: string;
  level: string;
  location: string;
  salary: string;
  positions: number;
  description: string;
  requirements: string[];
  start_date: string;
  end_date: string;
  duration: string;
  status: string;
  applicants: number;
}

interface OpportunityForm {
  name: string;
  company_id: string;
  sector: string;
  level: string;
  location: string;
  salary: string;
  positions: number;
  description: string;
  requirements: string;
  start_date: string;
  end_date: string;
  duration: string;
  status: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = (p: string) => `${API_BASE}${p}`;

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<OpportunityForm>({
    name: "",
    company_id: "",
    sector: "",
    level: "",
    location: "",
    salary: "",
    positions: 1,
    description: "",
    requirements: "",
    start_date: "",
    end_date: "",
    duration: "",
    status: "Active",
  });

  //seach opportunties by name 
  // Filter opportunities by name only
const filtered = opportunities.filter((opp) =>
  opp.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  // Fetch opportunities
  const fetchOpportunities = async () => {
    try {
      const res = await fetch(api("/api/opportunities"));
      if (!res.ok) throw new Error("Failed to fetch opportunities");
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(api("/api/opportunities"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements
            .split(",")
            .map((r) => r.trim()),
        }),
      });
      if (!res.ok) throw new Error("Failed to add opportunity");
      const saved = await res.json();
      setOpportunities((prev) => [saved, ...prev]);
      setShowForm(false);
      setFormData({
        name: "",
        company_id: "",
        sector: "",
        level: "",
        location: "",
        salary: "",
        positions:"",
        description: "",
        requirements: "",
        start_date: "",
        end_date: "",
        duration: "",
        status: "Active",
      });
    } catch (err) {
      console.error(err);
    }
  };

 

  return (
    <div className="flex h-full">
      {/* Sidebar placeholder */}
      

      {/* Main content */}
      <div className="flex-1 p-4 space-y-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Opportunities
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Explore various opportunities available for you.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            <FaPlus className="mr-2" /> Add Opportunity
          </button>
        </div>

        {/* Search */}
     
<div className="relative w-full max-w-md">
  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
  <input
    type="text"
    placeholder="Search opportunities..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4 py-2 rounded bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white w-full border border-gray-300 dark:border-slate-600"
  />
</div>


        {/* Opportunities List */}
        <div className="space-y-4">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="bg-gray-50 dark:bg-slate-800 p-4 rounded border border-gray-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {opp.name}
                  </p>
                  <p className="text-gray-600 dark:text-slate-400 text-sm">
                    {opp.company}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-400">
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-400">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-400">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-slate-300">
                <span>Sector: {opp.sector}</span>
                <span>Level: {opp.level}</span>
                <span>Positions: {opp.positions}</span>
                <span>Location: {opp.location}</span>
                <span>Salary: {opp.salary}</span>
                <span>Duration: {opp.duration}</span>
                <span>Status: {opp.status}</span>
                <span>Applicants: {opp.applicants}</span>
                <span></span>
              </div>
              <p className="mt-2 text-gray-700 dark:text-slate-300">
                {opp.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {opp.requirements?.map((req, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded border border-gray-300 dark:border-slate-600 text-xs"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Opportunity Modal */}
        {showForm && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-white text-lg font-semibold mb-4">
                Add New Opportunity
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
  <input
    placeholder="Opportunity Name"
    value={formData.name}
    onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Company Name"
    value={formData.company_id}
    onChange={(e) => setFormData((s) => ({ ...s, company_id: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Sector"
    value={formData.sector}
    onChange={(e) => setFormData((s) => ({ ...s, sector: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Level"
    value={formData.level}
    onChange={(e) => setFormData((s) => ({ ...s, level: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    type="number"
    placeholder="Positions"
    value={formData.positions}
    onChange={(e) => setFormData((s) => ({ ...s, positions: Number(e.target.value) }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Location"
    value={formData.location}
    onChange={(e) => setFormData((s) => ({ ...s, location: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <textarea
    placeholder="Description"
    value={formData.description}
    onChange={(e) => setFormData((s) => ({ ...s, description: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Requirements (comma separated)"
    value={formData.requirements}
    onChange={(e) => setFormData((s) => ({ ...s, requirements: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    type="date"
    value={formData.start_date}
    onChange={(e) => setFormData((s) => ({ ...s, start_date: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    type="date"
    value={formData.end_date}
    onChange={(e) => setFormData((s) => ({ ...s, end_date: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Duration"
    value={formData.duration}
    onChange={(e) => setFormData((s) => ({ ...s, duration: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <input
    placeholder="Salary"
    value={formData.salary}
    onChange={(e) => setFormData((s) => ({ ...s, salary: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  />

  <select
    value={formData.status}
    onChange={(e) => setFormData((s) => ({ ...s, status: e.target.value }))}
    className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>

  <div className="flex justify-end space-x-2">
    <button
      type="button"
      onClick={() => setShowForm(false)}
      className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Save
    </button>
  </div>
</form>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
