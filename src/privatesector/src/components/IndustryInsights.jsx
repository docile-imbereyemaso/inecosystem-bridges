import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

export function IndustryInsights() {
  const [insights, setInsights] = useState([
    {
      id: '1',
      title: 'AI and Machine Learning Skills Shortage',
      sector: 'Technology',
      skillsGapSuggestion: 'Increase training programs in Python, TensorFlow, and data science fundamentals. Partner with universities to create specialized AI curricula.',
      priority: 'High',
      dateCreated: '2024-01-15',
      tags: ['AI', 'Machine Learning', 'Python', 'Data Science']
    },
    {
      id: '2',
      title: 'Digital Marketing Evolution',
      sector: 'Marketing',
      skillsGapSuggestion: 'Focus on social media analytics, content creation tools, and data-driven marketing strategies. Emphasize hands-on experience with marketing automation platforms.',
      priority: 'Medium',
      dateCreated: '2024-01-10',
      tags: ['Digital Marketing', 'Analytics', 'Social Media', 'Automation']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    sector: '',
    skillsGapSuggestion: '',
    priority: 'Medium',
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const openDialog = (insight = null) => {
    if (insight) {
      setEditingInsight(insight);
      setFormData(insight);
    } else {
      setEditingInsight(null);
      setFormData({
        title: '',
        sector: '',
        skillsGapSuggestion: '',
        priority: 'Medium',
        tags: []
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingInsight(null);
    setNewTag('');
  };

  const addTag = () => {
    if (newTag.trim() && formData.tags) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  };

  const saveInsight = () => {
    if (editingInsight) {
      setInsights(prev => prev.map(insight => 
        insight.id === editingInsight.id 
          ? { ...formData, id: editingInsight.id, dateCreated: editingInsight.dateCreated }
          : insight
      ));
    } else {
      const newInsight = {
        ...formData,
        id: Date.now().toString(),
        dateCreated: new Date().toISOString().split('T')[0],
        tags: formData.tags || []
      };
      setInsights(prev => [...prev, newInsight]);
    }
    closeDialog();
  };

  const deleteInsight = (id) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Medium':
        return <TrendingUp className="w-4 h-4" />;
      case 'Low':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Low':
        return 'bg-green-600';
      default:
        return 'bg-yellow-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl mb-2">Industry Insights</h1>
          <p className="text-slate-400">Track industry trends and skills gap analysis</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Insight
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingInsight ? 'Edit Insight' : 'Add New Insight'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Title</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter insight title..."
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Sector</Label>
                  <Select
                    value={formData.sector || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Priority</Label>
                  <Select
                    value={formData.priority || 'Medium'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Skills Gap Suggestion</Label>
                <Textarea
                  value={formData.skillsGapSuggestion || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, skillsGapSuggestion: e.target.value }))}
                  placeholder="Describe the skills gap and provide suggestions for addressing it..."
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-32"
                />
              </div>

              <div>
                <Label className="text-slate-300">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.tags?.map((tag, index) => (
                    <Badge key={index} className="bg-blue-600 text-white pr-1">
                      {tag}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTag(index)}
                        className="ml-1 h-auto p-0 hover:bg-blue-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Cancel
                </Button>
                <Button onClick={saveInsight} className="bg-blue-600 hover:bg-blue-700">
                  {editingInsight ? 'Update Insight' : 'Add Insight'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-lg">{insight.title}</h3>
                    <Badge className={`${getPriorityColor(insight.priority)} text-white flex items-center gap-1`}>
                      {getPriorityIcon(insight.priority)}
                      {insight.priority}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-purple-600">{insight.sector}</Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {new Date(insight.dateCreated).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(insight)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteInsight(insight.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-slate-300 mb-2">Skills Gap Analysis & Suggestions</h4>
                <p className="text-slate-400 leading-relaxed">{insight.skillsGapSuggestion}</p>
              </div>

              {insight.tags.length > 0 && (
                <div>
                  <h4 className="text-slate-300 mb-2">Related Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {insight.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {insights.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-slate-400 text-lg mb-2">No insights yet</h3>
            <p className="text-slate-500 mb-4">Start tracking industry trends and skills gaps to build valuable insights.</p>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add First Insight
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}