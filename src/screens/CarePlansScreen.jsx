import React, { useState } from 'react';
import { 
  BedDouble, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  User, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { figmaCarePackages } from '../data/figmaData';

export default function CarePlansScreen({ onReservePackage }) {
  const [selectedPlan, setSelectedPlan] = useState(figmaCarePackages[1]); // default to Semi-Private
  const [stayDuration, setStayDuration] = useState(3);
  
  // Patient fields
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [admitDate, setAdmitDate] = useState('2026-10-20');

  const [confirmed, setConfirmed] = useState(false);

  const subtotal = selectedPlan.pricePerDay * stayDuration;
  const insuranceCovered = subtotal * 0.85; // 85% coverage
  const payable = subtotal - insuranceCovered;

  const handleReserve = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please enter patient name and contact phone.');
      return;
    }

    if (onReservePackage) {
      onReservePackage({
        packageName: selectedPlan.name,
        patientName,
        phone: patientPhone,
        department,
        stayDuration,
        admitDate,
        totalEstimate: subtotal,
        copayEstimate: payable
      });
    }
    setConfirmed(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Intro */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          Inpatient Care & Accommodations
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Plan your patient care with clarity.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Compare inpatient recovery suites, dedicated nursing ratios, room amenities, and upfront transparent treatment estimations.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Insurance Pre-Authorization:</strong> Most commercial insurance plans (BlueCross, Aetna, Cigna, Medicare) cover between 80% to 90% of ward and semi-private room rates.
          </span>
        </div>
      </div>

      {confirmed ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Inpatient Suite Reserved!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your reservation for the <strong>{selectedPlan.name}</strong> has been placed for <strong>{patientName}</strong> starting <strong>{admitDate}</strong> ({stayDuration} Days).
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div>Daily Rate: <strong>${selectedPlan.pricePerDay}/day</strong></div>
            <div>Estimated Insurance Benefit: <strong>${insuranceCovered.toFixed(2)}</strong></div>
            <div>Estimated Out-of-Pocket: <strong className="text-blue-700 font-mono text-sm">${payable.toFixed(2)}</strong></div>
          </div>

          <button
            onClick={() => setConfirmed(false)}
            className="px-6 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Select Another Plan
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* 3 Tier Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {figmaCarePackages.map((pkg) => {
              const isSelected = selectedPlan.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden relative ${
                    pkg.recommended
                      ? 'bg-blue-50/40 border-blue-600 ring-2 ring-blue-600/20 shadow-lg'
                      : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="bg-blue-700 text-white text-[11px] font-bold py-1 px-4 text-center tracking-wide">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{pkg.subtitle}</p>
                    </div>

                    <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                      <span className="text-3xl font-black text-slate-900 font-mono">${pkg.pricePerDay}</span>
                      <span className="text-xs text-slate-500 font-medium">/ night</span>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Included Inpatient Amenities:
                      </span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          {feat.included ? (
                            <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                          )}
                          <span className={feat.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(pkg)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {isSelected ? '✓ Selected Plan' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form and Cost Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Reservation Form */}
            <form onSubmit={handleReserve} className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Patient Admission & Reservation Details
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reserving: <strong className="text-blue-700">{selectedPlan.name}</strong> (${selectedPlan.pricePerDay}/night)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Admission Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="Cardiology">Cardiology Care</option>
                    <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                    <option value="Neurology">Neurology Ward</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Maternity Care">Maternity Care</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Expected Admission Date</label>
                  <input
                    type="date"
                    value={admitDate}
                    onChange={(e) => setAdmitDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Estimated Stay (Nights)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={stayDuration}
                    onChange={(e) => setStayDuration(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Pre-admit bed reservation holds for 48 hours</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Reserve Inpatient Bed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right 1 Col: Summary Calculation */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
                <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                  Estimated Care Cost
                </h3>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Suite Type:</span>
                    <span className="font-bold text-slate-900">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nightly Rate:</span>
                    <span className="font-mono font-semibold">${selectedPlan.pricePerDay}.00 / night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Stay:</span>
                    <span className="font-bold text-blue-700">{stayDuration} Nights</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-1 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Accommodation Subtotal:</span>
                    <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Est. Insurance Covered (85%):</span>
                    <span className="font-mono font-bold">-${insuranceCovered.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Estimated Patient Co-Pay:</span>
                    <span className="font-mono text-blue-700 text-base">${payable.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Final bill reflects actual physician visits, diagnostics, and medications administered during stay.
                </div>
              </div>

              {/* Inpatient policy card */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 space-y-2 text-xs">
                <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  Direct Insurance Adjudication
                </h4>
                <p className="text-blue-800 leading-relaxed text-[11px]">
                  Our billing department coordinates directly with your insurance provider for pre-authorization and claims processing.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
