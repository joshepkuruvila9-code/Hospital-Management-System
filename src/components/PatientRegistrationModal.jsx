import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  ShieldCheck, 
  Heart, 
  AlertCircle, 
  Check, 
  Stethoscope, 
  BedDouble 
} from 'lucide-react';

export default function PatientRegistrationModal({ 
  isOpen, 
  onClose, 
  onRegisterPatient,
  doctors,
  wards 
}) {
  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    admissionStatus: 'Admitted', // Admitted, OPD, Emergency
    department: 'Cardiology',
    assignedDoctor: doctors[0]?.name || 'Dr. Robert Chen',
    ward: wards[0]?.name || 'Cardiology Care',
    bedNumber: 'CCU-02',
    primaryDiagnosis: '',
    allergies: '',
    insuranceProvider: 'BlueCross MedShield',
    policyNumber: '',
    coveragePercent: 80,
    bp: '120/80',
    heartRate: '75',
    temperature: '98.6°F',
    spO2: '98%',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // If dob changes, calculate approximate age
      ...(name === 'dob' && value ? {
        age: Math.max(1, new Date().getFullYear() - new Date(value).getFullYear())
      } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out the patient name and phone number.');
      return;
    }

    const newPatient = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      age: parseInt(formData.age, 10) || 30,
      gender: formData.gender,
      dob: formData.dob || '1995-01-01',
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: formData.address || 'Standard City Address',
      emergencyContact: {
        name: formData.emergencyContactName || 'Family Contact',
        relation: formData.emergencyContactRelation || 'Relative',
        phone: formData.emergencyContactPhone || formData.phone,
      },
      admissionStatus: formData.admissionStatus,
      department: formData.department,
      assignedDoctor: formData.assignedDoctor,
      ward: formData.admissionStatus === 'Admitted' ? formData.ward : 'Outpatient Clinic',
      bedNumber: formData.admissionStatus === 'Admitted' ? formData.bedNumber : 'N/A',
      admissionDate: new Date().toISOString().split('T')[0],
      primaryDiagnosis: formData.primaryDiagnosis || 'Preliminary Observation',
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : ['None'],
      insurance: {
        provider: formData.insuranceProvider,
        policyNumber: formData.policyNumber || `INS-${Math.floor(100000 + Math.random() * 900000)}`,
        coveragePercent: parseInt(formData.coveragePercent, 10) || 80,
      },
      vitals: {
        bp: formData.bp || '120/80',
        heartRate: parseInt(formData.heartRate, 10) || 75,
        temperature: formData.temperature || '98.6°F',
        spO2: formData.spO2 || '98%',
        respiratoryRate: 18,
        lastRecorded: 'Triage Intake',
      },
      medications: [],
      labReports: [],
      notes: [
        {
          date: new Date().toLocaleString(),
          doctor: formData.assignedDoctor,
          note: `Patient registered and admitted under ${formData.department}. Presenting complaint: ${formData.primaryDiagnosis || 'Observation'}.`
        }
      ]
    };

    onRegisterPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">New Patient Admission & Registration</h2>
              <p className="text-xs text-slate-400">Step {step} of 3 • Electronic Intake</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button 
            type="button"
            onClick={() => setStep(1)} 
            className={`py-2.5 px-3 text-center border-b-2 transition-colors ${step === 1 ? 'border-cyan-600 text-cyan-700 bg-white' : 'border-transparent text-slate-500'}`}
          >
            1. Demographics
          </button>
          <button 
            type="button"
            onClick={() => setStep(2)} 
            className={`py-2.5 px-3 text-center border-b-2 transition-colors ${step === 2 ? 'border-cyan-600 text-cyan-700 bg-white' : 'border-transparent text-slate-500'}`}
          >
            2. Medical & Ward
          </button>
          <button 
            type="button"
            onClick={() => setStep(3)} 
            className={`py-2.5 px-3 text-center border-b-2 transition-colors ${step === 3 ? 'border-cyan-600 text-cyan-700 bg-white' : 'border-transparent text-slate-500'}`}
          >
            3. Insurance & Vitals
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* STEP 1: Personal & Demographics */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jonathan Edwards"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-rose-600"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Residential Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, City, Postal Code"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block mb-2">Emergency Contact</span>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                  <input
                    type="text"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                    placeholder="Relationship (e.g. Spouse)"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="Contact Phone"
                    className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Medical & Ward Allocation */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Admission Status</label>
                  <select
                    name="admissionStatus"
                    value={formData.admissionStatus}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                  >
                    <option value="Admitted">Inpatient (Admitted to Ward)</option>
                    <option value="OPD">Outpatient (OPD Consultation)</option>
                    <option value="Emergency">Emergency Triage (ER)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Emergency Care">Emergency Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Attending Physician / Doctor</label>
                <select
                  name="assignedDoctor"
                  value={formData.assignedDoctor}
                  onChange={handleChange}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              {formData.admissionStatus === 'Admitted' && (
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-cyan-50/60 border border-cyan-100">
                  <div>
                    <label className="text-xs font-semibold text-cyan-900 block mb-1">Ward</label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-cyan-200 rounded-xl p-2"
                    >
                      {wards.map(w => (
                        <option key={w.id} value={w.name}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-cyan-900 block mb-1">Assigned Bed Number</label>
                    <input
                      type="text"
                      name="bedNumber"
                      value={formData.bedNumber}
                      onChange={handleChange}
                      placeholder="e.g. CCU-02"
                      className="w-full text-xs bg-white border border-cyan-200 rounded-xl p-2 font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Diagnosis / Chief Complaint</label>
                <textarea
                  name="primaryDiagnosis"
                  rows={2}
                  value={formData.primaryDiagnosis}
                  onChange={handleChange}
                  placeholder="e.g. Chest pain radiating to left shoulder, acute dyspnea"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Known Allergies (comma separated)</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g. Penicillin, Shellfish, Latex"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-rose-700"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Insurance & Initial Triage Vitals */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Insurance & Billing Coverage</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Policy Number</label>
                    <input
                      type="text"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      placeholder="POL-882910"
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Coverage Ratio %</label>
                    <input
                      type="number"
                      name="coveragePercent"
                      value={formData.coveragePercent}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Intake Vitals</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Blood Pressure</label>
                    <input
                      type="text"
                      name="bp"
                      value={formData.bp}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      name="heartRate"
                      value={formData.heartRate}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Temperature</label>
                    <input
                      type="text"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">SpO2 Oxygen</label>
                    <input
                      type="text"
                      name="spO2"
                      value={formData.spO2}
                      onChange={handleChange}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-xs font-bold shadow-md shadow-cyan-600/30 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Complete Admission</span>
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
