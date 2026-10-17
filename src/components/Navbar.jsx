import React from 'react';
import { 
  HeartPulse, 
  PhoneCall, 
  ShieldAlert, 
  Calendar, 
  UserCheck, 
  Lock, 
  Menu, 
  X,
  Stethoscope,
  Activity,
  Layers
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'doctors', label: 'Find a Doctor' },
    { id: 'consultation', label: 'Book Consultation' },
    { id: 'preregistration', label: 'Pre-Registration' },
    { id: 'labs', label: 'Lab Results' },
    { id: 'careplans', label: 'Care & Room Plans' },
    { id: 'pharmacy', label: 'Pharmacy', badge: cartCount > 0 ? cartCount : null },
    { id: 'billing', label: 'Billing & Payment' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Header */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Emergency Alert & Hospital Desk */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-rose-400 font-semibold bg-rose-950/60 border border-rose-800/60 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Emergency Trauma: 911 / Ext. 100</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>General Helpdesk: +1 (800) 456-CARE</span>
            </div>
          </div>

          {/* Right: Hospital Staff / EHR Switcher & Language */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-400">Main Campus: Central Pavilion</span>
            <button
              onClick={() => setActivePage('staff')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                activePage === 'staff'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Clinical Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Hospital Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-blue-800/30 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1">
              CarePulse
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                Hospital
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Healthcare & Patient Management</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  active
                    ? 'text-blue-700 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setActivePage('consultation')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Visit</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                activePage === link.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setActivePage('staff');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-slate-900 text-white"
            >
              Staff Portal
            </button>
            <button
              onClick={() => {
                setActivePage('consultation');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-blue-700 text-white"
            >
              Book Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
