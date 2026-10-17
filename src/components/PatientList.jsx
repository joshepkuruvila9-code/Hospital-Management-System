import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  FileText, 
  Activity, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

export default function PatientList({ 
  patients, 
  onSelectPatient, 
  onOpenRegisterModal,
  onDischargePatient 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Extract unique departments
  const departments = ['ALL', ...new Set(patients.map(p => p.department))];

  // Filtering logic
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || patient.admissionStatus.toUpperCase() === statusFilter;
    const matchesDept = deptFilter === 'ALL' || patient.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-5">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Patient Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage electronic medical records, patient history, and inpatient stays
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-cyan-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-cyan-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-cyan-600/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, phone, or condition..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Status filters */}
          {['ALL', 'ADMITTED', 'OPD', 'EMERGENCY', 'DISCHARGED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}

          {/* Department dropdown */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'ALL' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Patient Results Count */}
      <div className="text-xs text-slate-500 px-1 flex items-center justify-between">
        <span>Showing <strong>{filteredPatients.length}</strong> of {patients.length} patients</span>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Patient Info</th>
                  <th className="px-4 py-3.5">Status & Bed</th>
                  <th className="px-4 py-3.5">Department & Doctor</th>
                  <th className="px-4 py-3.5">Primary Diagnosis</th>
                  <th className="px-4 py-3.5">Current Vitals</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectPatient(patient)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs border border-slate-200 group-hover:border-cyan-500 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-cyan-600 text-sm">
                            {patient.name}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px] flex items-center gap-2 mt-0.5">
                            <span>{patient.id}</span>
                            <span>•</span>
                            <span className="font-sans">{patient.age}y / {patient.gender}</span>
                            <span>•</span>
                            <span className="font-sans font-semibold text-rose-600">{patient.bloodGroup}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-1 ${
                        patient.admissionStatus === 'Admitted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        patient.admissionStatus === 'Emergency' ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold' :
                        patient.admissionStatus === 'OPD' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {patient.admissionStatus}
                      </span>
                      <div className="text-slate-500 text-[11px]">
                        Bed: <strong className="text-slate-700">{patient.bedNumber}</strong>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-800">{patient.department}</div>
                      <div className="text-slate-400 text-[11px]">{patient.assignedDoctor}</div>
                    </td>

                    <td className="px-4 py-4 max-w-xs">
                      <div className="text-slate-700 font-medium truncate" title={patient.primaryDiagnosis}>
                        {patient.primaryDiagnosis}
                      </div>
                      {patient.allergies && patient.allergies[0] !== 'None' && (
                        <div className="text-rose-600 text-[10px] mt-0.5 font-medium">
                          Allergy: {patient.allergies.join(', ')}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <div className="text-slate-700 font-medium">BP: {patient.vitals?.bp}</div>
                      <div className="text-slate-400 text-[11px]">HR: {patient.vitals?.heartRate} bpm • SpO2: {patient.vitals?.spO2}</div>
                    </td>

                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectPatient(patient)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>EHR</span>
                        </button>

                        {patient.admissionStatus === 'Admitted' && (
                          <button
                            onClick={() => onDischargePatient(patient.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-medium text-xs transition-colors"
                            title="Discharge patient"
                          >
                            Discharge
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => onSelectPatient(patient)}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-sm border border-slate-200 group-hover:border-cyan-500 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {patient.name}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono">
                        {patient.id} • {patient.age}y / {patient.gender}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    patient.admissionStatus === 'Admitted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    patient.admissionStatus === 'Emergency' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    patient.admissionStatus === 'OPD' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {patient.admissionStatus}
                  </span>
                </div>

                <div className="space-y-2 text-xs py-2 border-y border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Diagnosis:</span>
                    <span className="font-medium text-slate-800 text-right">{patient.primaryDiagnosis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-medium text-slate-700">{patient.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bed / Room:</span>
                    <span className="font-semibold text-slate-900">{patient.bedNumber} ({patient.ward})</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-slate-400">BP</div>
                    <div className="font-bold text-slate-800">{patient.vitals?.bp}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Pulse</div>
                    <div className="font-bold text-slate-800">{patient.vitals?.heartRate}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">SpO2</div>
                    <div className="font-bold text-slate-800">{patient.vitals?.spO2}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {patient.phone}
                </span>
                <span className="text-xs font-semibold text-cyan-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Record →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
