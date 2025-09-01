import { Building2, Briefcase, GraduationCap, TrendingUp, FileText, Search, Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';

export function Sidebar({ activeSection, setActiveSection }) {
  const navigationItems = [
    { id: 'company-profile', label: 'Company Profile', icon: Building2 },
    { id: 'job-board', label: 'Job Board', icon: Briefcase },
    { id: 'internships', label: 'Internships', icon: GraduationCap },
    { id: 'industry-insights', label: 'Industry Insights', icon: TrendingUp },
    { id: 'contributions', label: 'Contributions', icon: FileText },
  ];

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-sm font-medium">TA</span>
          </div>
          <span className="text-white font-medium">TailAdmin</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search or type command..."
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">MENU</h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mb-6">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">OTHERS</h3>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-slate-600 text-white">MH</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm">Musharof</p>
            <p className="text-slate-400 text-xs truncate">Admin</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}