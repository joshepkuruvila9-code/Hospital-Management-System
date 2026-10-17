import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  BedDouble, 
  Stethoscope, 
  Receipt, 
  Activity, 
  ShieldAlert, 
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, patientCount, bedStats }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patient Directory', icon: Users, badge: patientCount },
    { id: 'appointments', label: 'OPD & Appointments', icon: CalendarClock },
    { id: 'wards', label: 'Ward & Bed Manager', icon: BedDouble },
    { id: 'doctors', label: 'Medical Staff', icon: Stethoscope },
    { id: 'billing', label: 'Billing & Invoicing', icon: Receipt },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-900/40">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              CarePulse <span className="text-xs bg-cyan-500/20 text-cyan-400 font-semibold px-1.5 py-0.5 rounded">HMS</span>
            </h1>
            <p className="text-xs text-slate-400">Patient Care System</p>
          </div>
        </div>
      </div>

      {/* Hospital System Status Badge */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </span>
          <span className="font-semibold text-cyan-400">{bedStats?.occupancyRate || '78%'} Beds</span>
        </div>
        <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" 
            style={{ width: `${bedStats?.occupancyRate || 78}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Clinical Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Emergency Desk
        </div>
        <div className="mx-1 p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Triage Hotline</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Emergency Bay: Ext 911 <br />
            2 Critical patients incoming
          </p>
        </div>
      </nav>

      {/* Doctor / Admin User Profile */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold text-sm shadow border border-cyan-500/30">
            JH
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Dr. Jennifer Hayes</div>
            <div className="text-[11px] text-slate-400">Chief Medical Officer</div>
          </div>
        </div>
        <HeartHandshake className="w-4 h-4 text-cyan-400" />
      </div>
    </aside>
  );
}
