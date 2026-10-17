import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  Plus, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  PhoneCall,
  User,
  Stethoscope
} from 'lucide-react';

export default function AppointmentsQueue({ 
  appointments, 
  doctors, 
  onUpdateAppointmentStatus, 
  onAddAppointment 
}) {
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New appointment form state
  const [newApt, setNewApt] = useState({
    patientName: '',
    doctorName: doctors[0]?.name || '',
    department: 'General Medicine',
    time: '11:00 AM',
    type: 'Consultation',
    triage: 'Standard',
  });

  const filteredAppointments = appointments.filter(apt => {
    const matchesDept = filterDept === 'ALL' || apt.department.includes(filterDept);
    const matchesStatus = filterStatus === 'ALL' || apt.status === filterStatus;
    return matchesDept && matchesStatus;
  });

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!newApt.patientName) return;

    onAddAppointment({
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      patientId: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: newApt.patientName,
      doctorName: newApt.doctorName,
      department: newApt.department,
      time: newApt.time,
      date: new Date().toISOString().split('T')[0],
      type: newApt.type,
      triage: newApt.triage,
      status: 'Waiting',
      room: doctors.find(d => d.name === newApt.doctorName)?.room || 'Room 101',
    });

    setNewApt({
      patientName: '',
      doctorName: doctors[0]?.name || '',
      department: 'General Medicine',
      time: '11:00 AM',
      type: 'Consultation',
      triage: 'Standard',
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-600" />
            Outpatient (OPD) & Appointment Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time consultation triage, token queue calling, and physician scheduling
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-cyan-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Triage & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Waiting', 'In Progress', 'Scheduled', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          Total Queue: <strong>{filteredAppointments.length}</strong> patients
        </div>
      </div>

      {/* Appointments List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((apt) => (
          <div 
            key={apt.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header with Time and Status */}
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-1 rounded-lg">
                  {apt.time}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    apt.triage === 'Urgent' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {apt.triage}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    apt.status === 'In Progress' ? 'bg-emerald-100 text-emerald-800' :
                    apt.status === 'Waiting' ? 'bg-amber-100 text-amber-800' :
                    apt.status === 'Completed' ? 'bg-slate-200 text-slate-700' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>

              {/* Patient Name & Details */}
              <h3 className="font-bold text-slate-900 text-base">{apt.patientName}</h3>
              <div className="text-xs text-slate-400 font-mono mb-3">Token: {apt.id} • {apt.type}</div>

              {/* Doctor & Location Info */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{apt.doctorName}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>{apt.department}</span>
                  <span className="font-semibold text-slate-700">{apt.room}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Advance Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {apt.status === 'Waiting' && (
                <button
                  onClick={() => onUpdateAppointmentStatus(apt.id, 'In Progress')}
                  className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call to Room</span>
                </button>
              )}

              {apt.status === 'In Progress' && (
                <button
                  onClick={() => onUpdateAppointmentStatus(apt.id, 'Completed')}
                  className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Finish Consultation</span>
                </button>
              )}

              {apt.status === 'Scheduled' && (
                <button
                  onClick={() => onUpdateAppointmentStatus(apt.id, 'Waiting')}
                  className="w-full py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs transition-colors"
                >
                  Check In Patient
                </button>
              )}

              {apt.status === 'Completed' && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 w-full justify-center py-1">
                  <CheckCircle2 className="w-4 h-4" /> Consultation Concluded
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Book OPD / Clinic Appointment</h3>
            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samantha Miller"
                  value={newApt.patientName}
                  onChange={e => setNewApt({...newApt, patientName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor & Room</label>
                <select
                  value={newApt.doctorName}
                  onChange={e => {
                    const doc = doctors.find(d => d.name === e.target.value);
                    setNewApt({
                      ...newApt, 
                      doctorName: e.target.value,
                      department: doc?.specialty || 'General Medicine'
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Appointment Time</label>
                  <input
                    type="text"
                    value={newApt.time}
                    onChange={e => setNewApt({...newApt, time: e.target.value})}
                    placeholder="10:30 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Triage Priority</label>
                  <select
                    value={newApt.triage}
                    onChange={e => setNewApt({...newApt, triage: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Critical</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold shadow-xs"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
