import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Mail, FolderKanban, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: 'Total Visitors', value: '12,450', change: '+12%', icon: Users, color: 'text-auroraBlue', bg: 'bg-auroraBlue/10' },
  { label: 'Resume Downloads', value: '342', change: '+5%', icon: FileText, color: 'text-tealAccent', bg: 'bg-tealAccent/10' },
  { label: 'Unread Messages', value: '8', change: '2 new', icon: Mail, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { label: 'Active Projects', value: '5', change: 'Updated', icon: FolderKanban, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="font-display font-bold text-3xl text-white">Overview</h2>
        <p className="text-slate-400 font-sans mt-1">Welcome back, Yeswanth. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-3xl text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 font-sans text-sm">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts / Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placeholder for Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 p-6 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 min-h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-semibold text-lg text-white">Visitor Traffic</h3>
            <select className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-auroraBlue">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
            <p className="text-slate-500 font-mono text-sm">Analytics Chart Placeholder</p>
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-6 rounded-3xl glass-panel bg-slate-900/60 border border-white/10 min-h-[400px]"
        >
          <h3 className="font-display font-semibold text-lg text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { msg: 'New message from John Doe', time: '10 mins ago', icon: Mail, color: 'text-auroraBlue' },
              { msg: 'Resume downloaded', time: '2 hours ago', icon: FileText, color: 'text-tealAccent' },
              { msg: 'Project "nDMatrix" updated', time: 'Yesterday', icon: FolderKanban, color: 'text-emerald-400' },
              { msg: 'New visitor from USA', time: 'Yesterday', icon: Users, color: 'text-rose-400' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-1 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-200 font-medium">{activity.msg}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
