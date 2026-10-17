import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  Heart, 
  Thermometer, 
  Wind, 
  Droplets, 
  Pill, 
  FileCheck, 
  Clock, 
  User, 
  Phone, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  Printer, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function PatientDetailModal({ 
  patient, 
  onClose, 
  onAddNote, 
  onAddPrescription,
  onUpdateVitals 
}) {
  const [activeTab, setActiveTab] = useState('vitals'); // 'vitals', 'medications', 'labs', 'demographics'
  
  // Note form state
  const [newNote, setNewNote] = useState('');
  const [doctorName, setDoctorName] = useState('Dr. Robert Chen');
  
  // Prescription form state
  const [showAddMed, setShowAddMed] = useState(false);
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  // Vitals form state
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [vitalsData, setVitalsData] = useState(patient?.vitals || {});

  if (!patient) return null;

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(patient.id, {
      date: new Date().toLocaleString(),
      doctor: doctorName,
      note: newNote,
    });
    setNewNote('');
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    if (!medName || !dosage) return;
    onAddPrescription(patient.id, {
      name: medName,
      dosage,
      frequency: frequency || 'Once daily',
      status: 'Active',
    });
    setMedName('');
    setDosage('');
    setFrequency('');
    setShowAddMed(false);
  };

  const handleSaveVitals = (e) => {
    e.preventDefault();
    onUpdateVitals(patient.id, {
      ...vitalsData,
      lastRecorded: 'Just now',
    });
    setIsEditingVitals(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-6 shrink-0 flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-900/50">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white tracking-tight">{patient.name}</h2>
                <span className="font-mono text-xs bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-md border border-slate-700">
                  {patient.id}
                </span>
                <span className="text-xs bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-md border border-rose-500/30">
                  {patient.bloodGroup}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
                <span>{patient.age} years old ({patient.dob})</span>
                <span>•</span>
                <span>{patient.gender}</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">Ward: {patient.ward} (Bed {patient.bedNumber})</span>
                <span>•</span>
                <span>Doctor: {patient.assignedDoctor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Print Medical Summary"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Allergy Warning Banner */}
        {patient.allergies && patient.allergies[0] !== 'None' && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 flex items-center gap-2 text-rose-800 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Documented Allergies: <strong>{patient.allergies.join(', ')}</strong></span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50/70 shrink-0">
          {[
            { id: 'vitals', label: 'Vitals & Clinical Notes', icon: Activity },
            { id: 'medications', label: 'Prescriptions & Meds', icon: Pill, count: patient.medications?.length },
            { id: 'labs', label: 'Diagnostics & Labs', icon: FileCheck, count: patient.labReports?.length },
            { id: 'demographics', label: 'Insurance & Demographics', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  active
                    ? 'border-cyan-600 text-cyan-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-200 text-slate-600'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Vitals & Clinical Progress Notes */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              {/* Vitals Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    Current Physiologic Vitals
                    <span className="text-[11px] text-slate-400 font-normal">
                      (Last checked: {patient.vitals?.lastRecorded})
                    </span>
                  </h3>
                  <button
                    onClick={() => setIsEditingVitals(!isEditingVitals)}
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                  >
                    {isEditingVitals ? 'Cancel' : 'Update Vitals'}
                  </button>
                </div>

                {isEditingVitals ? (
                  <form onSubmit={handleSaveVitals} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600">Blood Pressure</label>
                      <input 
                        type="text" 
                        value={vitalsData.bp || ''} 
                        onChange={e => setVitalsData({...vitalsData, bp: e.target.value})} 
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium"
                        placeholder="120/80" 
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600">Heart Rate (bpm)</label>
                      <input 
                        type="number" 
                        value={vitalsData.heartRate || ''} 
                        onChange={e => setVitalsData({...vitalsData, heartRate: e.target.value})} 
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium" 
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600">Temperature</label>
                      <input 
                        type="text" 
                        value={vitalsData.temperature || ''} 
                        onChange={e => setVitalsData({...vitalsData, temperature: e.target.value})} 
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium"
                        placeholder="98.6°F" 
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600">SpO2 Oxygen</label>
                      <input 
                        type="text" 
                        value={vitalsData.spO2 || ''} 
                        onChange={e => setVitalsData({...vitalsData, spO2: e.target.value})} 
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium"
                        placeholder="98%" 
                      />
                    </div>
                    <div className="flex items-end">
                      <button 
                        type="submit" 
                        className="w-full py-2 bg-cyan-600 text-white font-semibold text-xs rounded-lg hover:bg-cyan-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Droplets className="w-4 h-4 text-rose-500" />
                        <span>Blood Pressure</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{patient.vitals?.bp}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Target range</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span>Heart Rate</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{patient.vitals?.heartRate} <span className="text-xs font-normal text-slate-400">bpm</span></div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Normal Sinus</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Thermometer className="w-4 h-4 text-amber-500" />
                        <span>Temperature</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{patient.vitals?.temperature}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Tympanic</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Wind className="w-4 h-4 text-cyan-500" />
                        <span>Blood Oxygen (SpO2)</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{patient.vitals?.spO2}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Adequate</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor Clinical Notes Timeline */}
              <div className="pt-2">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    Physician Clinical Progress Notes
                  </span>
                </h3>

                {/* Add note box */}
                <form onSubmit={handleSaveNote} className="mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="font-semibold text-slate-700">Author:</span>
                    <select 
                      value={doctorName} 
                      onChange={e => setDoctorName(e.target.value)}
                      className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-700"
                    >
                      <option value="Dr. Robert Chen">Dr. Robert Chen (Cardiology)</option>
                      <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (General)</option>
                      <option value="Dr. David Kim">Dr. David Kim (Orthopedics)</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Enter clinical observations, daily progress assessment, or treatment orders..."
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!newNote.trim()}
                      className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      Add Note
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3">
                  {patient.notes?.map((n, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-900">{n.doctor}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Medications */}
          {activeTab === 'medications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Active Inpatient Medication Orders</h3>
                  <p className="text-xs text-slate-400">Prescribed pharmaceuticals, dosage, and delivery schedule</p>
                </div>
                <button
                  onClick={() => setShowAddMed(!showAddMed)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Prescribe Medicine</span>
                </button>
              </div>

              {showAddMed && (
                <form onSubmit={handleSavePrescription} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Medication Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lisinopril" 
                      value={medName} 
                      onChange={e => setMedName(e.target.value)} 
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Dosage</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 10mg" 
                      value={dosage} 
                      onChange={e => setDosage(e.target.value)} 
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Frequency</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Once daily morning" 
                      value={frequency} 
                      onChange={e => setFrequency(e.target.value)} 
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs" 
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button type="submit" className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs rounded-lg">
                      Confirm
                    </button>
                    <button type="button" onClick={() => setShowAddMed(false)} className="px-3 py-2 bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Medicine</th>
                      <th className="px-4 py-3">Dose</th>
                      <th className="px-4 py-3">Administration Schedule</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {patient.medications?.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                          <Pill className="w-3.5 h-3.5 text-cyan-600" />
                          {med.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">{med.dosage}</td>
                        <td className="px-4 py-3 text-slate-600">{med.frequency}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {med.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Diagnostics & Labs */}
          {activeTab === 'labs' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Laboratory & Diagnostic Imaging Reports</h3>
                <p className="text-xs text-slate-400">Pathology, radiology, and biochemical evaluation history</p>
              </div>

              <div className="space-y-3">
                {patient.labReports?.map((lab, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{lab.test}</span>
                        <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {lab.id}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Finding: <strong className="text-slate-800">{lab.result}</strong>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Conducted: {lab.date}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lab.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Demographics & Insurance */}
          {activeTab === 'demographics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-cyan-800">
                  Contact & Next of Kin
                </h4>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 block">Residential Address:</span>
                    <span className="font-medium text-slate-800">{patient.address}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Patient Phone:</span>
                    <span className="font-medium text-slate-800">{patient.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Emergency Contact:</span>
                    <span className="font-semibold text-slate-900">{patient.emergencyContact?.name} ({patient.emergencyContact?.relation})</span>
                    <div className="text-slate-600 font-mono">{patient.emergencyContact?.phone}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-cyan-800">
                  Medical Insurance & Coverage
                </h4>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-slate-400 block">Payer / Insurance Provider:</span>
                    <span className="font-semibold text-slate-900">{patient.insurance?.provider}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Policy / Member ID:</span>
                    <span className="font-mono text-slate-800 font-semibold">{patient.insurance?.policyNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Coverage Ratio:</span>
                    <span className="font-bold text-emerald-600">{patient.insurance?.coveragePercent}% Hospital Bill Covered</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Admitted on: <strong>{patient.admissionDate}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
          >
            Close EHR
          </button>
        </div>

      </div>
    </div>
  );
}
