import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Emergency */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CarePulse Hospital</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Comprehensive quaternary healthcare, patient management, outpatient consultations, and 24/7 level 1 trauma emergency center.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-rose-400 font-bold text-[11px]">24/7 Emergency Ambulance</div>
              <div className="text-white font-mono font-bold text-sm">Call 911 or (555) 911-CARE</div>
            </div>
          </div>

          {/* Col 2: Patient Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Patient Services
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActivePage('doctors')} className="hover:text-cyan-400 transition-colors">
                  Find a Specialist Doctor
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('consultation')} className="hover:text-cyan-400 transition-colors">
                  Schedule Clinical Consultation
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('labs')} className="hover:text-cyan-400 transition-colors">
                  Diagnostic & Lab Test Reports
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('preregistration')} className="hover:text-cyan-400 transition-colors">
                  Online Pre-Admission Intake
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('careplans')} className="hover:text-cyan-400 transition-colors">
                  Inpatient Ward & Bed Packages
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('pharmacy')} className="hover:text-cyan-400 transition-colors">
                  Hospital Pharmacy Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('billing')} className="hover:text-cyan-400 transition-colors">
                  Pay Hospital Invoices Online
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Departments */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Key Specialties
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>Interventional Cardiology & CCU</li>
              <li>Orthopedic Surgery & Joint Replacement</li>
              <li>Pediatric & Neonatal Intensive Care</li>
              <li>Neurology & Neurosurgical Suite</li>
              <li>Trauma Bay & Emergency Medicine</li>
              <li>Oncology & Infusion Therapy</li>
              <li>Minimally Invasive General Surgery</li>
            </ul>
          </div>

          {/* Col 4: Campus Locations & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Main Hospital Campus
            </h4>
            <div className="flex items-start gap-2 text-[11px]">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>750 Medical Center Boulevard, Metro Healthcare District, Boston, MA</span>
            </div>
            <div className="flex items-start gap-2 text-[11px]">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Emergency Center: Open 24/7, 365 Days <br />Outpatient Clinics: Mon - Sat 07:00 - 20:00</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>JCI Accredited & HIPAA Secure</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} CarePulse Hospital Healthcare System. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Patient Rights</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Healthcare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
