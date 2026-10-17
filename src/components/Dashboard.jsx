import React from 'react';
import { 
  Users, 
  BedDouble, 
  Activity, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  UserCheck, 
  ShieldAlert,
  Stethoscope,
  HeartPulse,
  Sparkles
} from 'lucide-react';

export default function Dashboard({ 
  patients, 
  appointments, 
  wards, 
  doctors,
  onSelectPatient, 
  onOpenRegisterModal,
  setActiveTab 
}) {
  const totalPatients = patients.length;
  const admittedCount = patients.filter(p => p.admissionStatus === 'Admitted').length;
  const opdCount = patients.filter(p => p.admissionStatus === 'OPD').length;
  const emergencyCount = patients.filter(p => p.admissionStatus === 'Emergency').length;
  const dischargedCount = patients.filter(p => p.admissionStatus === 'Discharged').length;

  // Calculate bed occupancy
  const allBeds = wards.flatMap(w => w.beds);
  const totalBeds = allBeds.length;
  const occupiedBeds = allBeds.filter(b => b.status === 'Occupied').length;
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100);

  const stats = [
    {
      title: 'Total Active Patients',
      value: totalPatients,
      sub: `${admittedCount} in-ward, ${opdCount} outpatient`,
      icon: Users,
      trend: '+12% this week',
      color: 'bg-blue-500/10 text-blue-600 border-blue-200',
    },
    {
      title: 'Bed Occupancy Rate',
      value: `${occupancyPercentage}%`,
      sub: `${occupiedBeds} of ${totalBeds} beds occupied`,
      icon: BedDouble,
      trend: `${totalBeds - occupiedBeds} available`,
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
    },
    {
      title: 'OPD Queue Today',
      value: appointments.length,
      sub: `${appointments.filter(a => a.status === 'Completed').length} consultations done`,
      icon: Calendar,
      trend: 'Avg wait: 14 mins',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Emergency Triage',
      value: emergencyCount,
      sub: '2 High-Priority Bay cases',
      icon: AlertTriangle,
      trend: 'Trauma Bay 1 active',
      color: 'bg-rose-500/10 text-rose-600 border-rose-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white rounded-2xl p-6 shadow-md border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Hospital Live Intelligence
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            CarePulse Patient Care Command Center
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Real-time inpatient monitoring, clinical vitals tracking, outpatient triage queue, and electronic health records.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('patients')}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors"
          >
            View All Patients
          </button>
          <button
            onClick={onOpenRegisterModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold shadow-md shadow-cyan-500/20 transition-colors"
          >
            + New Admission
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
                <span className="text-xs font-medium text-slate-500">{stat.trend}</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                <span>{stat.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Recent Admissions & Live Inpatients */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-cyan-600" />
                  Recent Patient Admissions & Inpatients
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Click any patient to view EHR medical record and vitals</p>
              </div>
              <button 
                onClick={() => setActiveTab('patients')}
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                Full List <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {patients.slice(0, 5).map((patient) => (
                <div 
                  key={patient.id}
                  onClick={() => onSelectPatient(patient)}
                  className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm border border-slate-200 group-hover:border-cyan-500 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm group-hover:text-cyan-600 transition-colors">
                          {patient.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">({patient.id})</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          patient.admissionStatus === 'Admitted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          patient.admissionStatus === 'Emergency' ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold' :
                          patient.admissionStatus === 'OPD' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {patient.admissionStatus}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{patient.age}y / {patient.gender}</span>
                        <span>•</span>
                        <span className="font-medium text-slate-700">{patient.department}</span>
                        <span>•</span>
                        <span className="text-slate-500">Bed: {patient.bedNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vitals summary chip */}
                  <div className="hidden sm:flex items-center gap-4 text-right">
                    <div className="text-xs">
                      <div className="font-semibold text-slate-800">BP: {patient.vitals?.bp}</div>
                      <div className="text-slate-400">Pulse: {patient.vitals?.heartRate} bpm</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Bed Occupancy Snapshot */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
              <span>Department Bed Utilization</span>
              <button 
                onClick={() => setActiveTab('wards')}
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Manage All Wards
              </button>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wards.map((ward) => {
                const occupied = ward.beds.filter(b => b.status === 'Occupied').length;
                const percentage = Math.round((occupied / ward.totalBeds) * 100);
                return (
                  <div key={ward.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-semibold text-slate-800">{ward.name}</span>
                      <span className="text-xs font-bold text-slate-600">{occupied}/{ward.totalBeds} Beds</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage > 85 ? 'bg-rose-500' :
                          percentage > 60 ? 'bg-amber-500' : 'bg-cyan-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Floor: {ward.floor}</span>
                      <span className="font-semibold text-slate-700">{percentage}% Capacity</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): OPD Appointment Queue & On-Duty Doctors */}
        <div className="space-y-6">
          {/* Today's OPD Queue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                Live OPD Queue Today
              </h3>
              <button 
                onClick={() => setActiveTab('appointments')}
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700"
              >
                View Queue
              </button>
            </div>

            <div className="space-y-3">
              {appointments.slice(0, 4).map((apt) => (
                <div 
                  key={apt.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-900">{apt.patientName}</span>
                    <span className="font-mono text-cyan-700 font-semibold">{apt.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{apt.doctorName}</span>
                    <span className={`px-2 py-0.5 rounded-md font-medium text-[10px] ${
                      apt.status === 'In Progress' ? 'bg-emerald-100 text-emerald-800' :
                      apt.status === 'Waiting' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Physicians on Shift */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-cyan-600" />
                Attending Physicians
              </h3>
              <span className="text-xs text-slate-400">{doctors.length} on roster</span>
            </div>

            <div className="space-y-3">
              {doctors.slice(0, 4).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center border border-slate-200">
                      {doc.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.specialty}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      doc.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      doc.status === 'In Emergency' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {doc.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{doc.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
