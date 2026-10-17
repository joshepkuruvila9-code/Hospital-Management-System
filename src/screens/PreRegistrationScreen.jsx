import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Heart, 
  PhoneCall, 
  Check, 
  Send 
} from 'lucide-react';
import { figmaDoctors } from '../data/figmaData';

export default function PreRegistrationScreen({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    bloodGroup: 'O+',
    complaint: '',
    allergies: '',
    department: 'General Medicine',
    preferredDoctor: figmaDoctors[0]?.name || '',
    preferredDate: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    insuranceCarrier: 'BlueCross MedShield',
    policyNumber: '',
    consentTreatment: true,
    consentPrivacy: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert('Please fill out your First Name, Last Name, and Phone number.');
      return;
    }

    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedId(newId);

    const newPatient = {
      id: newId,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      age: formData.dob ? Math.max(1, new Date().getFullYear() - new Date(formData.dob).getFullYear()) : 32,
      gender: formData.gender,
      dob: formData.dob || '1992-05-14',
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyName || 'Next of Kin',
        relation: formData.emergencyRelation || 'Family',
        phone: formData.emergencyPhone || formData.phone,
      },
      admissionStatus: 'OPD',
      department: formData.department,
      assignedDoctor: formData.preferredDoctor || 'Dr. Robert Chen',
      ward: 'Outpatient Clinic',
      bedNumber: 'N/A',
      admissionDate: new Date().toISOString().split('T')[0],
      primaryDiagnosis: formData.complaint || 'Pre-registration Intake',
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : ['None'],
      insurance: {
        provider: formData.insuranceCarrier,
        policyNumber: formData.policyNumber || 'INS-990182',
        coveragePercent: 85,
      },
      vitals: {
        bp: '120/80',
        heartRate: 72,
        temperature: '98.6°F',
        spO2: '99%',
        respiratoryRate: 16,
        lastRecorded: 'Pre-registered online'
      },
      medications: [],
      labReports: [],
      notes: [
        {
          date: new Date().toLocaleString(),
          doctor: 'Registration Desk',
          note: `Pre-registration submitted online. Reason for consultation: ${formData.complaint || 'Checkup'}.`
        }
      ]
    };

    if (onRegisterSuccess) {
      onRegisterSuccess(newPatient);
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Title & Banner */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          Patient Intake & Admission
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          A smoother start to your visit.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Complete your patient registration details, medical background, emergency contacts, and insurance authorization online before arriving at the hospital.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Clock className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Express Check-in:</strong> Pre-registering online bypasses manual paperwork queues and saves up to 20 minutes at the reception desk.
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Pre-Registration Confirmed!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your intake file has been generated and synchronized with our Hospital System. Present your reference code upon arrival at Reception Desk A.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-sm">
            <div className="text-xs text-slate-400 font-sans">Hospital Patient Reference:</div>
            <strong className="text-blue-700 text-xl">{submittedId}</strong>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Register Another Patient
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Left 2 Cols */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-8">
              
              {/* Section 1: Identification */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">1</span>
                  Patient Identification & Demographics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Jonathan"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Edwards"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jonathan.e@example.com"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Residential Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address, City, Postal Code"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Section 2: Medical Background */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">2</span>
                  Presenting Symptoms & Clinical History
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Reason for Hospital Visit / Symptoms</label>
                  <textarea
                    rows={2}
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    placeholder="Describe main discomfort, duration, onset, and previous treatments..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Known Allergies (Medications, Foods, Latex)</label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="e.g. Penicillin, Sulfa, Shellfish (or 'None')"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-rose-700 font-medium"
                  />
                </div>
              </div>

              {/* Section 3: Doctor Preference */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">3</span>
                  Clinical Department & Doctor Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Emergency Care">Emergency Care</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Physician</label>
                    <select
                      name="preferredDoctor"
                      value={formData.preferredDoctor}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    >
                      {figmaDoctors.map(d => (
                        <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Emergency Contact */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">4</span>
                  Emergency Contact / Next of Kin
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Name</label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Edwards"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Relationship</label>
                    <input
                      type="text"
                      name="emergencyRelation"
                      value={formData.emergencyRelation}
                      onChange={handleChange}
                      placeholder="e.g. Spouse, Parent"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Emergency Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 111-2222"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Insurance & Consent */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">5</span>
                  Insurance Carrier & Legal Consent
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      name="insuranceCarrier"
                      value={formData.insuranceCarrier}
                      onChange={handleChange}
                      placeholder="e.g. BlueCross, Aetna, Medicare"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Policy / Member Number</label>
                    <input
                      type="text"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      placeholder="e.g. BC-9812401"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentTreatment"
                      checked={formData.consentTreatment}
                      onChange={handleChange}
                      className="mt-0.5 rounded text-blue-600"
                    />
                    <span>I authorize CarePulse Hospital physicians and nursing staff to administer standard outpatient diagnostic examinations and clinical care.</span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentPrivacy"
                      checked={formData.consentPrivacy}
                      onChange={handleChange}
                      className="mt-0.5 rounded text-blue-600"
                    />
                    <span>I acknowledge the HIPAA privacy disclosure policy and consent to secure electronic health records storage.</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">All submissions encrypted via 256-bit TLS</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Pre-Registration</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Intake Checklist */}
          <div className="space-y-5">
            <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 space-y-3">
              <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                Visit Intake Checklist
              </h3>
              <p className="text-xs text-blue-800">
                Please have the following physical items prepared when arriving at the hospital:
              </p>
              <ul className="text-xs text-blue-900 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Government issued photo ID (Driver's License, National ID, or Passport).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Physical Health Insurance card or digital insurance authorization voucher.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Current prescription bottles or list of daily medications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Prior diagnostic lab films or disc scans from outside facilities.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                Intake Support Assistance
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Need help completing your form or require special wheelchair / accessibility accommodations upon arrival?
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
                Hospital Admitting Line: Ext. 201 <br />
                Dedicated Care Coordinator on duty
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
