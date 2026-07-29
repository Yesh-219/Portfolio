import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Briefcase, Code2, 
  Award, FileText, Mail, Settings, LogOut, Menu, X 
} from 'lucide-react';

const ADMIN_LINKS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard },
  { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { path: '/admin/experience', label: 'Experience', icon: Briefcase },
  { path: '/admin/skills', label: 'Skills', icon: Code2 },
  { path: '/admin/certificates', label: 'Certificates', icon: Award },
  { path: '/admin/resume', label: 'Resume', icon: FileText },
  { path: '/admin/messages', label: 'Messages', icon: Mail },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement actual logout logic here (clear tokens, etc.)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-300">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass-panel bg-slate-900/95 border-r border-white/10 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10 justify-between">
          <div className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-auroraBlue flex items-center justify-center text-white text-sm">
              YK
            </div>
            Admin
          </div>
          <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {ADMIN_LINKS.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/admin'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-auroraBlue/20 text-auroraBlue font-medium shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 shrink-0 glass-panel bg-slate-900/50 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-white/10" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-white" />
            </button>
            <h1 className="font-display font-semibold text-lg text-white hidden sm:block">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono font-medium tracking-wide">Live</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yeswanth" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative">
          
          {/* Subtle Background Aurora */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-auroraBlue/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
