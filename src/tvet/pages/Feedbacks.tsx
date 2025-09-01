import { useState } from 'react';
import { FaPlus, FaTimes, FaStar, FaChartLine } from 'react-icons/fa';

interface SkillFeedback {
  id: string;
  skillName: string;
  currentLevel: number;
  desiredLevel: number;
  priority: 'low' | 'medium' | 'high';
  feedback: string;
  trainingNeeded: boolean;
}

const skillCategories = [
  'Technical Skills',
  'Soft Skills',
  'Digital Literacy',
  'Communication',
  'Problem Solving',
  'Leadership',
  'Project Management',
  'Data Analysis'
];

const Feedbacks = () => {
  const [skillsFeedback, setSkillsFeedback] = useState<SkillFeedback[]>([
    {
      id: '1',
      skillName: 'React Development',
      currentLevel: 3,
      desiredLevel: 5,
      priority: 'high',
      feedback: 'Need advanced training in React hooks and state management',
      trainingNeeded: true,
    },
    {
      id: '2',
      skillName: 'Data Analysis',
      currentLevel: 2,
      desiredLevel: 4,
      priority: 'medium',
      feedback: 'Require training in statistical analysis and visualization tools',
      trainingNeeded: true,
    },
  ]);

  const [newSkill, setNewSkill] = useState<{
    skillName: string;
    currentLevel: number;
    desiredLevel: number;
    priority: 'low' | 'medium' | 'high';
    feedback: string;
    trainingNeeded: boolean;
  }>({
    skillName: '',
    currentLevel: 1,
    desiredLevel: 5,
    priority: 'medium',
    feedback: '',
    trainingNeeded: false,
  });

  const [selectedCategory, setSelectedCategory] = useState('');

  const addSkillFeedback = () => {
    if (!newSkill.skillName.trim()) return;

    const skillFeedback: SkillFeedback = {
      id: Date.now().toString(),
      ...newSkill,
    };

    setSkillsFeedback((prev) => [...prev, skillFeedback]);
    setNewSkill({
      skillName: '',
      currentLevel: 1,
      desiredLevel: 5,
      priority: 'medium',
      feedback: '',
      trainingNeeded: false,
    });
  };

  const removeSkillFeedback = (id: string) => {
    setSkillsFeedback((prev) => prev.filter((skill) => skill.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${
          i < level ? 'text-yellow-400' : 'text-slate-500'
        }`}
      />
    ));
  };

  const handleSubmitFeedback = () => {
    console.log('Skills feedback submitted:', skillsFeedback);
    alert('Skills gap feedback submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Skills Gap Feedback
        </h2>
        <p className="text-slate-400">
          Identify skill gaps and provide feedback for training needs
        </p>
      </div>

      {/* Add New Skill Feedback */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white flex items-center text-lg font-semibold">
            <FaPlus className="mr-2" />
            Add Skills Feedback
          </h3>
          <p className="text-slate-400 text-sm">
            Assess current skills and identify training needs
          </p>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm">Skill Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              >
                <option value="">Select a category</option>
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 text-sm">Skill Name</label>
              <input
                type="text"
                value={newSkill.skillName}
                onChange={(e) =>
                  setNewSkill((prev) => ({ ...prev, skillName: e.target.value }))
                }
                placeholder="e.g., React Development, Data Analysis"
                className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 text-sm">Current Level</label>
              <select
                value={newSkill.currentLevel.toString()}
                onChange={(e) =>
                  setNewSkill((prev) => ({
                    ...prev,
                    currentLevel: parseInt(e.target.value),
                  }))
                }
                className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 text-sm">Desired Level</label>
              <select
                value={newSkill.desiredLevel.toString()}
                onChange={(e) =>
                  setNewSkill((prev) => ({
                    ...prev,
                    desiredLevel: parseInt(e.target.value),
                  }))
                }
                className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 text-sm">Priority</label>
              <select
                value={newSkill.priority}
                onChange={(e) =>
                  setNewSkill((prev) => ({
                    ...prev,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  }))
                }
                className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 text-sm">
              Feedback & Training Needs
            </label>
            <textarea
              value={newSkill.feedback}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, feedback: e.target.value }))
              }
              placeholder="Describe the skill gap and specific training requirements..."
              className="w-full mt-1 rounded bg-slate-700 border border-slate-600 text-white px-3 py-2 min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newSkill.trainingNeeded}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  trainingNeeded: e.target.checked,
                }))
              }
              className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-300 text-sm">
              Formal training required
            </span>
          </div>

          <button
            onClick={addSkillFeedback}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FaPlus className="mr-2" /> Add Skill Feedback
          </button>
        </div>
      </div>

      {/* Skills Feedback List */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white flex items-center text-lg font-semibold">
            <FaChartLine className="mr-2" />
            Skills Gap Assessment
          </h3>
          <p className="text-slate-400 text-sm">
            Review and manage identified skill gaps
          </p>
        </div>
        <div className="p-4">
          {skillsFeedback.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              No skills feedback added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {skillsFeedback.map((skill) => (
                <div
                  key={skill.id}
                  className="border border-slate-700 rounded-lg p-4 bg-slate-750"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">
                        {skill.skillName}
                      </h4>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded ${getPriorityColor(
                          skill.priority
                        )}`}
                      >
                        {skill.priority} priority
                      </span>
                    </div>
                    <button
                      onClick={() => removeSkillFeedback(skill.id)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        Current Level
                      </p>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.currentLevel)}
                        <span className="text-slate-300 ml-2">
                          ({skill.currentLevel}/5)
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        Desired Level
                      </p>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.desiredLevel)}
                        <span className="text-slate-300 ml-2">
                          ({skill.desiredLevel}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  {skill.feedback && (
                    <div className="mb-3">
                      <p className="text-sm text-slate-400 mb-1">Feedback</p>
                      <p className="text-slate-300">{skill.feedback}</p>
                    </div>
                  )}

                  {skill.trainingNeeded && (
                    <span className="inline-block text-xs px-2 py-1 border border-blue-600 text-blue-400 rounded">
                      Training Required
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-700" />

      <div className="flex justify-end">
        <button
          onClick={handleSubmitFeedback}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit Skills Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedbacks;
