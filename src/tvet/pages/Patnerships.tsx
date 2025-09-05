import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaSearch,
  FaPlus,
  FaFilter,
  FaCheck,
  FaHourglassHalf,
} from "react-icons/fa";

type CompanyStatus = "registered" | "pending";

interface Company {
  id: string;
  name: string;
  industry: string | null;
  registration_date: string | null;
  status: CompanyStatus;
  contact: string | null;
  created_at?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = (p: string) => `${API_BASE}${p}`;

const Partnerships: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  // modal state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    industry: string;
    registration_date: string;
    status: CompanyStatus;
    contact: string;
  }>({
    name: "",
    industry: "",
    registration_date: new Date().toISOString().split("T")[0],
    status: "pending",
    contact: "",
  });

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch(api("/api/companies/status"));
      if (!res.ok) throw new Error("Failed to fetch companies");
      const data = await res.json();
      setCompanies([...data.registered, ...data.pending]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmitCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(api("/api/companies"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add company");
      const saved: Company = await res.json();

      setCompanies((prev) => [saved, ...prev]); // add to top
      setShowForm(false);
      setFormData({
        name: "",
        industry: "",
        registration_date: new Date().toISOString().split("T")[0],
        status: "pending",
        contact: "",
      });
    } catch (e) {
      console.error(e);
      alert("Failed to save company");
    }
  };

  const handleStatusChange = async (companyId: string, newStatus: CompanyStatus) => {
    // optimistic UI
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status: newStatus } : c))
    );

    try {
      const res = await fetch(api(`/api/companies/${companyId}/status`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      // optional: const updated = await res.json();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
      // rollback if error
      setCompanies((prev) =>
        prev.map((c) => (c.id === companyId ? { ...c, status: c.status === "pending" ? "registered" : "pending" } : c))
      );
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      company.name.toLowerCase().includes(s) ||
      (company.industry || "").toLowerCase().includes(s) ||
      (company.contact || "").toLowerCase().includes(s);
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CompanyStatus) =>
    status === "registered" ? "bg-green-600 text-white" : "bg-yellow-600 text-white";

  const registeredCount = companies.filter((c) => c.status === "registered").length;
  const pendingCount = companies.filter((c) => c.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Company Management</h2>
        <p className="text-slate-400">Manage company registrations and track their status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Companies</p>
              <p className="text-2xl font-semibold text-white">{companies.length}</p>
            </div>
            <FaBuilding className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Registered</p>
              <p className="text-2xl font-semibold text-green-400">{registeredCount}</p>
            </div>
            <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
              <FaCheck className="text-white text-xs" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Pending</p>
              <p className="text-2xl font-semibold text-yellow-400">{pendingCount}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-600 rounded-full flex items-center justify-center">
              <FaHourglassHalf className="text-white text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">Companies</h3>
            <p className="text-slate-400 text-sm">View and manage all companies</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            <FaPlus className="mr-2" />
            Add Company
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 p-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
            />
          </div>

          <div className="flex items-center bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
            <FaFilter className="mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700 text-white outline-none"
            >
              <option value="all">All Status</option>
              <option value="registered">Registered</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-slate-400 p-4">Loading companies...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-slate-300 px-4 py-2">Company Name</th>
                  <th className="text-slate-300 px-4 py-2">Industry</th>
                  <th className="text-slate-300 px-4 py-2">Registration Date</th>
                  <th className="text-slate-300 px-4 py-2">Contact</th>
                  <th className="text-slate-300 px-4 py-2">Status</th>
                  <th className="text-slate-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-700">
                    <td className="text-white font-medium px-4 py-2">{company.name}</td>
                    <td className="text-slate-300 px-4 py-2">{company.industry || "—"}</td>
                    <td className="text-slate-300 px-4 py-2">{company.registration_date || "—"}</td>
                    <td className="text-slate-300 px-4 py-2">{company.contact || "—"}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(company.status)}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={company.status}
                        onChange={(e) => handleStatusChange(company.id, e.target.value as CompanyStatus)}
                        className="bg-slate-700 border border-slate-600 text-white text-xs rounded px-2 py-1"
                      >
                        <option value="registered">Registered</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredCompanies.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-slate-400 px-4 py-6 text-center">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Company Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Add New Company</h3>
            <form onSubmit={handleSubmitCompany} className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.name}
                onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                required
                className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              />
              <input
                type="text"
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) => setFormData((s) => ({ ...s, industry: e.target.value }))}
                className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              />
              <input
                type="date"
                value={formData.registration_date}
                onChange={(e) => setFormData((s) => ({ ...s, registration_date: e.target.value }))}
                className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={formData.contact}
                onChange={(e) => setFormData((s) => ({ ...s, contact: e.target.value }))}
                className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData((s) => ({ ...s, status: e.target.value as CompanyStatus }))}
                className="w-full rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              >
                <option value="registered">Registered</option>
                <option value="pending">Pending</option>
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
  );
};

export default Partnerships;
