import { useState } from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";



const companyStatusData = [
  { name: "Registered", value: 12, color: "#10b981" },
  { name: "Pending", value: 8, color: "#f59e0b" },
  { name: "Under Review", value: 3, color: "#3b82f6" },
];

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [activeTab, setActiveTab] = useState("skills");

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`);
    alert("Report generated successfully! Check your downloads folder.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Statistics Analysis
          </h2>
          <p className="text-slate-400">
            Comprehensive analytics and reporting dashboard
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Period Select */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-40 bg-slate-700 border border-slate-600 text-white p-2 rounded"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>

          {/* Report Select */}
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="w-48 bg-slate-700 border border-slate-600 text-white p-2 rounded"
          >
            <option value="overview">Overview Report</option>
            <option value="skills">Skills Analysis</option>
            <option value="companies">Company Report</option>
            <option value="training">Training Report</option>
            <option value="opportunities">Opportunities Report</option>
          </select>

          {/* Generate Button */}
          <button
            onClick={generateReport}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FaDownload className="mr-2" /> Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 p-4 rounded">
          <p className="text-sm text-slate-400">Total Users</p>
          <p className="text-2xl font-semibold text-white">1,234</p>
          <p className="text-xs text-green-400">+12% from last month</p>
          <FaUsers className="h-8 w-8 text-blue-500 mt-2" />
        </div>

        <div className="bg-slate-800 border border-slate-700 p-4 rounded">
          <p className="text-sm text-slate-400">Training Completed</p>
          <p className="text-2xl font-semibold text-white">856</p>
          <p className="text-xs text-green-400">+8% from last month</p>
          <FaGraduationCap className="h-8 w-8 text-green-500 mt-2" />
        </div>

        <div className="bg-slate-800 border border-slate-700 p-4 rounded">
          <p className="text-sm text-slate-400">Job Placements</p>
          <p className="text-2xl font-semibold text-white">342</p>
          <p className="text-xs text-green-400">+15% from last month</p>
          <FaArrowTrendUp className="h-8 w-8 text-yellow-500 mt-2" />
        </div>

        <div className="bg-slate-800 border border-slate-700 p-4 rounded">
          <p className="text-sm text-slate-400">Avg. Satisfaction</p>
          <p className="text-2xl font-semibold text-white">4.5</p>
          <p className="text-xs text-green-400">+0.2 from last month</p>
          <FaChartBar className="h-8 w-8 text-purple-500 mt-2" />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex bg-slate-800 border border-slate-700 rounded overflow-hidden">
          {["skills", "companies", "training", "opportunities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-white ${
                activeTab === tab ? "bg-blue-600" : ""
              }`}
            >
              {tab === "skills" && "Skills Analysis"}
              {tab === "companies" && "Company Status"}
              {tab === "training" && "Training Progress"}
              {tab === "opportunities" && "Opportunities"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "skills" && (
            <div className="bg-slate-800 border border-slate-700 p-4 rounded">
              <h3 className="text-white mb-2">Skills Gap Analysis</h3>
              <div className="text-slate-400">Chart unavailable. Please install 'recharts' for visualization.</div>
            </div>
          )}

          {activeTab === "companies" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 p-4 rounded">
                <h3 className="text-white mb-2">Company Registration Status</h3>
                <div className="text-slate-400">Chart unavailable. Please install 'recharts' for visualization.</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 rounded">
                <h3 className="text-white mb-2">Registration Summary</h3>
                {companyStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-700 rounded mb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white">{item.name}</span>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
                <p className="text-sm text-slate-400 mt-2">
                  Total Companies:{" "}
                  {companyStatusData.reduce((sum, item) => sum + item.value, 0)}
                </p>
              </div>
            </div>
          )}

          {activeTab === "training" && (
            <div className="bg-slate-800 border border-slate-700 p-4 rounded">
              <h3 className="text-white mb-2">Training Progress</h3>
              <div className="text-slate-400">Chart unavailable. Please install 'recharts' for visualization.</div>
            </div>
          )}

          {activeTab === "opportunities" && (
            <div className="bg-slate-800 border border-slate-700 p-4 rounded">
              <h3 className="text-white mb-2">Opportunities & Placements</h3>
              <div className="text-slate-400">Chart unavailable. Please install 'recharts' for visualization.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
