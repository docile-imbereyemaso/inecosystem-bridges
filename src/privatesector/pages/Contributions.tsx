import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiEye,
  FiFileText,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

interface Contribution {
  id: string;
  title: string;
  type: "Research Report" | "Industry Analysis" | "Skills Assessment" | "Market Study" | "Other";
  description: string;
  author: string;
  dateCreated: string;
  status: "Draft" | "Under Review" | "Published" | "Archived";
  tags: string[];
  fileUrl?: string;
}

const Contributions = () => {
 
// DISPLAYING INTERNSHIPS

  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCompanies = async () => {
      setLoading(true);
      try {
      const response = await fetch("http://localhost:5000/api/getContribution", {
        method: "GET", // Changed from GET to POST
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setContributions(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setContributions([]); // Set empty array to prevent map error
    }finally{
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContribution, setEditingContribution] = useState<Contribution | null>(null);
  const [formData, setFormData] = useState<Partial<Contribution>>({
    title: "",
    type: "Research Report",
    description: "",
    author: "",
    status: "Draft",
    tags: [],
    fileUrl: "",
  });
  const [newTag, setNewTag] = useState("");

  const openDialog = (contribution?: Contribution) => {
    if (contribution) {
      setEditingContribution(contribution);
      setFormData(contribution);
    } else {
      setEditingContribution(null);
      setFormData({
        title: "",
        type: "Research Report",
        description: "",
        author: "",
        status: "Draft",
        tags: [],
        fileUrl: "",
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingContribution(null);
    setNewTag("");
  };

  const addTag = () => {
    if (newTag.trim() && formData.tags) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };
 const saveContribution = async () => {
    // Validate required fields
    if (!formData.title || !formData.author) {
      alert("Title and author are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contributions", {
        method: editingContribution ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dateCreated: editingContribution
            ? formData.dateCreated
            : new Date().toISOString().split("T")[0],
          tags: formData.tags || [],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setContributions((prev) =>
          editingContribution
            ? prev.map((c) => (c.id === result.contribution.id ? result.contribution : c))
            : [...prev, result.contribution]
        );
        closeDialog();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save contribution");
      }
    } catch (error: any) {
      console.error("Error saving contribution:", error);
      alert(error.message || "Failed to save contribution");
    }
    closeDialog();
  };
  const deleteContribution = (id: string) => {
    setContributions((prev) => prev.filter((c) => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-600";
      case "Under Review":
        return "bg-yellow-600";
      case "Published":
        return "bg-green-600";
      case "Archived":
        return "bg-slate-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl mb-2">Contributions</h1>
          <p className="text-slate-400">
            Manage reports, research, and industry contributions
          </p>
        </div>
        <button
          onClick={() => openDialog()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Contribution
        </button>
      </div>

      {/* Contributions List */}
      <div className="grid gap-4">
        {loading ? (
  <div>Loading Contributions...</div>
) : (contributions.map((contribution) => (
          <div
            key={contribution.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white text-lg">{contribution.title}</h3>
                  <span
                    className={`text-white text-sm px-2 py-1 rounded ${getStatusColor(
                      contribution.status
                    )}`}
                  >
                    {contribution.status}
                  </span>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <FiFileText /> {contribution.type}
                  </span>
                  <span className="border border-slate-600 text-slate-300 text-sm px-2 py-1 rounded flex items-center gap-1">
                    <FiUser /> {contribution.author}
                  </span>
                  <span className="border border-slate-600 text-slate-300 text-sm px-2 py-1 rounded flex items-center gap-1">
                    <FiCalendar />{" "}
                    {new Date(contribution.dateCreated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {contribution.fileUrl && (
                  <>
                    <button
                      onClick={() => window.open(contribution.fileUrl, "_blank")}
                      className="text-green-400 hover:text-green-300"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => window.open(contribution.fileUrl, "_blank")}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FiDownload />
                    </button>
                  </>
                )}
                <button
                  onClick={() => openDialog(contribution)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => deleteContribution(contribution.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <p className="text-slate-400 mb-4">{contribution.description}</p>

            {contribution.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {contribution.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-slate-600 text-slate-300 text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )))}
      </div>

      {/* No Contributions */}
      {contributions.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <FiFileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-slate-400 text-lg mb-2">No contributions yet</h3>
          <p className="text-slate-500 mb-4">
            Start adding reports, research papers, and other valuable
            contributions.
          </p>
          <button
            onClick={() => openDialog()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FiPlus /> Add First Contribution
          </button>
        </div>
      )}

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-slate-800 border border-slate-700 text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingContribution ? "Edit Contribution" : "Add Contribution"}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2"
                />
              </div>

              {/* Type & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as Contribution["type"],
                      }))
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2"
                  >
                    <option>Research Report</option>
                    <option>Industry Analysis</option>
                    <option>Skills Assessment</option>
                    <option>Market Study</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as Contribution["status"],
                      }))
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2"
                  >
                    <option>Draft</option>
                    <option>Under Review</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="block text-slate-300 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 min-h-32"
                />
              </div>

              {/* File URL */}
              <div>
                <label className="block text-slate-300 mb-1">File URL</label>
                <input
                  type="text"
                  value={formData.fileUrl || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fileUrl: e.target.value }))
                  }
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2"
                  placeholder="https://example.com/document.pdf"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="ml-1 hover:text-red-300"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={addTag}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 rounded border border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveContribution}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingContribution ? "Update Contribution" : "Add Contribution"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributions;

