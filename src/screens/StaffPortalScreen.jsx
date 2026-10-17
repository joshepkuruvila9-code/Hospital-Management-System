import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  BedDouble, 
  Stethoscope, 
  Activity, 
  ArrowLeft,
  UserPlus
} from 'lucide-react';

import Dashboard from '../components/Dashboard';
import PatientList from '../components/PatientList';
import PatientDetailModal from '../components/PatientDetailModal';
import PatientRegistrationModal from '../components/PatientRegistrationModal';
import AppointmentsQueue from '../components/AppointmentsQueue';
import BedManagement from '../components/BedManagement';
import DoctorsList from '../components/DoctorsList';

export default function StaffPortalScreen({ 
  patients, 
  doctors, 
  appointments, 
  wards, 
  onRegisterPatient,
  onDischargePatient,
  onAddNote,
  onAddPrescription,
  onUpdateVitals,
  onUpdateAppointmentStatus,
  onAddAppointment,
  onUpdateBedStatus,
  onReturnHome
}) {
  const [internalTab, setInternalTab] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Staff Switcher Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Hospital Clinical Management & EHR</h2>
              <span className="text-[10px] bg-cyan-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                Staff Only
              </span>
            </div>
            <p className="text-xs text-slate-400">Electronic Health Records, Bed Matrix & Clinical Operations</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Admit Inpatient</span>
          </button>
          <button
            onClick={onReturnHome}
            className="flex-1 sm:flex-initial px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Portal</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        {[
          { id: 'dashboard', label: 'Clinical Overview', icon: LayoutDashboard },
          { id: 'patients', label: 'EHR Patient Records', icon: Users, badge: patients.length },
          { id: 'appointments', label: 'Live OPD Queue', icon: CalendarClock },
          { id: 'wards', label: 'Ward & Bed Matrix', icon: BedDouble },
          { id: 'doctors', label: 'Physician Roster', icon: Stethoscope },
        ].map(tab => {
          const Icon = tab.icon;
          const active = internalTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setInternalTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Screen */}
      <div>
        {internalTab === 'dashboard' && (
          <Dashboard
            patients={patients}
            appointments={appointments}
            wards={wards}
            doctors={doctors}
            onSelectPatient={(p) => setSelectedPatient(p)}
            onOpenRegisterModal={() => setIsRegisterOpen(true)}
            setActiveTab={setInternalTab}
          />
        )}

        {internalTab === 'patients' && (
          <PatientList
            patients={patients}
            onSelectPatient={(p) => setSelectedPatient(p)}
            onOpenRegisterModal={() => setIsRegisterOpen(true)}
            onDischargePatient={onDischargePatient}
          />
        )}

        {internalTab === 'appointments' && (
          <AppointmentsQueue
            appointments={appointments}
            doctors={doctors}
            onUpdateAppointmentStatus={onUpdateAppointmentStatus}
            onAddAppointment={onAddAppointment}
          />
        )}

        {internalTab === 'wards' && (
          <BedManagement
            wards={wards}
            patients={patients}
            onUpdateBedStatus={onUpdateBedStatus}
            onAssignPatientToBed={(wardId, bedId, patient) => {
              onUpdateBedStatus(wardId, bedId, 'Occupied', patient.name);
            }}
          />
        )}

        {internalTab === 'doctors' && (
          <DoctorsList
            doctors={doctors}
            onSelectDoctor={(doc) => alert(`Physician: ${doc.name} (${doc.room})`)}
          />
        )}
      </div>

      {/* EHR Patient Record Modal */}
      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onAddNote={onAddNote}
          onAddPrescription={onAddPrescription}
          onUpdateVitals={onUpdateVitals}
        />
      )}

      {/* Admission Modal */}
      {isRegisterOpen && (
        <PatientRegistrationModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onRegisterPatient={onRegisterPatient}
          doctors={doctors}
          wards={wards}
        />
      )}
    </div>
  );
}
