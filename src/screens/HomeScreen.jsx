import React from 'react';
import { 
  Users, 
  CalendarClock, 
  FileText, 
  Pill, 
  BedDouble, 
  Receipt, 
  UserPlus, 
  ShieldAlert, 
  Clock, 
  PhoneCall, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Sparkles,
  Building2,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';

export default function HomeScreen({ setActivePage }) {
  const serviceCards = [
    {
      id: 'doctors',
      title: 'Find a Doctor',
      desc: 'Browse senior consultants, review credentials, and select your physician.',
      icon: Stethoscope,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      action: 'Browse Specialists'
    },
    {
      id: 'consultation',
      title: 'Book a Consultation',
      desc: 'Schedule in-person clinic appointments or secure telehealth video calls.',
      icon: CalendarClock,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      action: 'Book Appointment'
    },
    {
      id: 'labs',
      title: 'Lab & Diagnostics',
      desc: 'Access verified pathology reports, imaging scans, and test results.',
      icon: FileText,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      action: 'View Lab Reports'
    },
    {
      id: 'pharmacy',
      title: 'Online Pharmacy',
      desc: 'Order prescribed medications with bedside hospital delivery or home courier.',
      icon: Pill,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      action: 'Order Medicine'
    },
    {
      id: 'careplans',
      title: 'Inpatient & Wards',
      desc: 'Compare hospital room packages, nursing care ratios, and amenities.',
      icon: BedDouble,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      action: 'View Room Plans'
    },
    {
      id: 'billing',
      title: 'Billing & Insurance',
      desc: 'Check itemized hospital statements, view insurance co-pay, and pay bills.',
      icon: Receipt,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      action: 'Pay Hospital Bill'
    },
    {
      id: 'preregistration',
      title: 'Pre-Admission Intake',
      desc: 'Fast-track your hospital visit by completing paperwork and consent online.',
      icon: UserPlus,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      action: 'Start Pre-Intake'
    },
    {
      id: 'staff',
      title: 'Clinical Operations EHR',
      desc: 'Access physician order entries, bed matrix, and live triage queues.',
      icon: Activity,
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      action: 'Open Clinical EHR'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            CarePulse Integrated Healthcare Portal
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Your healthcare, all in one place.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Find the right doctor, book clinical consultations, review lab results, order pharmacy medications, and manage your hospital billing effortlessly.
          </p>
        </div>

        {/* Blue Emergency Alert Strip */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-blue-900 font-medium">
            <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0" />
            <span>
              <strong>Immediate emergency attention required?</strong> Call our 24/7 trauma response hotline at <strong>911</strong> or proceed directly to our Level 1 Emergency Bay.
            </span>
          </div>
          <button 
            onClick={() => setActivePage('staff')}
            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-blue-700 text-white font-bold text-[11px] hover:bg-blue-800 transition-colors"
          >
            Check ER Status →
          </button>
        </div>
      </section>

      {/* Main Grid + Sidebar Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: 8 Quick Access Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">Patient Services & Portals</h2>
            <span className="text-xs text-slate-400 font-medium">Select a service to proceed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => setActivePage(service.id)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${service.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-slate-300 group-hover:text-blue-600 transition-colors">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                    <span>{service.action}</span>
                    <span className="text-[11px] font-normal text-slate-400">Online 24/7</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Hospital Info Cards & Hours */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-3xl shadow-md space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Hospital Visiting Hours</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="border-b border-white/10 pb-2">
                <div className="font-bold text-white">General Inpatient Wards</div>
                <div className="text-slate-300 text-[11px] mt-0.5">Morning: 10:00 AM - 12:00 PM</div>
                <div className="text-slate-300 text-[11px]">Evening: 04:30 PM - 07:30 PM</div>
              </div>

              <div className="border-b border-white/10 pb-2">
                <div className="font-bold text-white">Intensive Care Units (ICU / CCU)</div>
                <div className="text-slate-300 text-[11px] mt-0.5">Direct Family Only • 11:00 AM - 12:00 PM</div>
                <div className="text-slate-300 text-[11px]">Evening: 05:00 PM - 06:00 PM</div>
              </div>

              <div>
                <div className="font-bold text-white">Trauma & Emergency Center</div>
                <div className="text-emerald-400 font-semibold text-[11px] mt-0.5">Open 24 Hours • 7 Days a Week</div>
              </div>
            </div>
          </div>

          {/* Need help box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              Patient Helpdesk & Concierge
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions regarding appointments, medical records, or insurance coverage? Our clinical navigators are available to assist.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="text-slate-500 text-[11px]">Direct Support Line</div>
              <div className="text-slate-900 font-bold font-mono text-sm">+1 (800) 456-CARE</div>
            </div>
            <button
              onClick={() => setActivePage('consultation')}
              className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Contact Hospital Desk
            </button>
          </div>
        </div>

      </section>

      {/* Hospital Pillars Photo Gallery from Figma */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">
            Committed to Exceptional Patient Outcomes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Combining advanced medical technology with personalized, compassionate bedside nursing care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" 
                alt="Patient Reception & Care" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-base">Compassionate Patient Care</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Dedicated nursing teams delivering continuous physiological monitoring and patient-centric recovery plans in serene ward environments.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80" 
                alt="Expert Physicians & Diagnostics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-base">Multi-Disciplinary Specialists</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Board-certified physicians across cardiology, orthopedic surgery, neurology, pediatrics, and emergency trauma medicine.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs group">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=600&q=80" 
                alt="Modern Medical Facilities" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-base">State-of-the-Art Facilities</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Modern clinical operating theaters, rapid automated pathology testing, advanced 3T MRI, and digital patient record infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Command Center & Hospital Operations Banner */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-cyan-600" />
            Central Hospital Command Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            24/7 Clinical Telemetry & Patient Flow Coordination
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our hospital operations team tracks bed availability, emergency ambulance arrivals, critical lab values, and surgical room turnover in real time to guarantee zero delays in patient admissions.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-time bed telemetry and automated ICU transition alerts</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Seamless electronic health record integration across all clinical departments</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Guaranteed triage wait times under 15 minutes for urgent outpatient cases</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActivePage('staff')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore Clinical Staff Operations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" 
            alt="Hospital Command Monitoring Center" 
            className="w-full h-72 object-cover"
          />
        </div>
      </section>

      {/* 3 Impact Stat Cards from Figma Bottom */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
          <div className="text-3xl font-black text-blue-700 tracking-tight">98.4%</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Patient Satisfaction Rate</div>
          <p className="text-[11px] text-slate-500 mt-1">Verified patient feedback and clinical recovery metrics across all wards</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
          <div className="text-3xl font-black text-cyan-700 tracking-tight">24/7/365</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Emergency & ICU Readiness</div>
          <p className="text-[11px] text-slate-500 mt-1">Full surgical on-call teams and trauma resuscitation suites</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
          <div className="text-3xl font-black text-indigo-700 tracking-tight">250+</div>
          <div className="text-xs font-bold text-slate-800 mt-1">Attending Physicians & Specialists</div>
          <p className="text-[11px] text-slate-500 mt-1">Dedicated healthcare experts practicing modern evidence-based medicine</p>
        </div>
      </section>
    </div>
  );
}
