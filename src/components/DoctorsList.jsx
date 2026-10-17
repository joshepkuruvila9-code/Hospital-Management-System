import React from 'react';
import { 
  Stethoscope, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function DoctorsList({ doctors, onSelectDoctor }) {
  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-cyan-600" />
            Medical Staff & Attending Specialists
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active clinical roster, on-call schedules, surgery allocations, and duty rooms
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
          {doctors.length} Physicians Active Today
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map(doc => (
          <div 
            key={doc.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-cyan-900/20">
                    {doc.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                    <div className="text-xs text-cyan-600 font-medium">{doc.specialty}</div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  doc.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  doc.status === 'In Emergency' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {doc.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned Room:</span>
                  <span className="font-semibold text-slate-800">{doc.room}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Inpatients in Care:</span>
                  <span className="font-bold text-cyan-700">{doc.activePatients} Patients</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shift Hours:</span>
                  <span className="text-slate-700">07:00 - 15:00</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{doc.id}</span>
              <button 
                onClick={() => alert(`Connecting to ${doc.name} at ${doc.room}`)}
                className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-semibold text-xs transition-colors"
              >
                Page Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
