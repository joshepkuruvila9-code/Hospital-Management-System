import React from 'react';
import { 
  Search, 
  Bell, 
  UserPlus, 
  Hospital, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onOpenRegisterModal,
  emergencyCount = 1 
}) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-xs">
      {/* Left: Global Search & Hospital Branch */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by name, ID (e.g. PAT-1001), phone, or diagnosis..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 text-slate-800 placeholder-slate-400 transition-all"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 whitespace-nowrap">
          <Hospital className="w-3.5 h-3.5 text-cyan-600" />
          <span>Central Wing (Main)</span>
        </div>
      </div>

      {/* Right: Date/Time, Alert, and New Patient Button */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 border-r border-slate-200 pr-4">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{today}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Shift: Morning (07:00 - 15:00)
          </span>
        </div>

        {/* Emergency Alert indicator */}
        {emergencyCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{emergencyCount} ER Active</span>
          </div>
        )}

        <button 
          title="Notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>

        {/* Register Patient CTA */}
        <button
          onClick={onOpenRegisterModal}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm shadow-cyan-600/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Patient</span>
        </button>
      </div>
    </header>
  );
}
