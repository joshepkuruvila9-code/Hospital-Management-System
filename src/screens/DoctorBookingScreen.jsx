import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Phone, 
  ArrowRight,
  Info
} from 'lucide-react';
import { figmaDoctors } from '../data/figmaData';

export default function DoctorBookingScreen({ onBookSuccess }) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(figmaDoctors[0]);
  
  // Appointment settings
  const [visitType, setVisitType] = useState('in_person'); // 'in_person' or 'telehealth'
  const [selectedDate, setSelectedDate] = useState('2026-10-19');
  const [selectedTime, setSelectedTime] = useState(figmaDoctors[0].timeSlots[0]);
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const departments = ['ALL', 'Cardiology', 'Pediatrics', 'Neurology', 'Orthopedics'];

  const filteredDoctors = figmaDoctors.filter(doc => {
    const matchesDept = selectedDept === 'ALL' || doc.department === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please enter your full name and phone number.');
      return;
    }

    const newAppointment = {
      id: `APT-${Math.floor(200 + Math.random() * 800)}`,
      patientId: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      time: selectedTime,
      date: selectedDate,
      type: visitType === 'in_person' ? 'In-Person Consultation' : 'Telehealth Video',
      triage: 'Standard',
      status: 'Scheduled',
      room: selectedDoctor.room,
    };

    if (onBookSuccess) {
      onBookSuccess(newAppointment);
    }
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Intro */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          Physician Directory & Appointments
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Choose your doctor. Plan your visit.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Search by specialty, clinical experience, or hospital location. Read physician credentials and schedule your hospital consultation in minutes.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Telehealth Available:</strong> Video consultations are conducted over our secure, HIPAA-compliant patient video portal.
          </span>
        </div>
      </div>

      {bookingConfirmed ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Consultation Scheduled!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your appointment with <strong>{selectedDoctor.name}</strong> has been booked for <strong>{selectedDate} at {selectedTime}</strong>. An SMS confirmation and digital calendar invite has been sent.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div>Patient: <strong>{patientName}</strong></div>
            <div>Location: <strong>{visitType === 'in_person' ? selectedDoctor.room : 'Secure Telehealth Portal'}</strong></div>
            <div>Consultation Fee: <strong>${selectedDoctor.fee.toFixed(2)}</strong> (Co-pay: ${selectedDoctor.insuranceCopay.toFixed(2)})</div>
          </div>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="px-6 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Book Another Consultation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols): Doctor Cards + Slot Selection + Patient Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find by doctor name, specialty, or condition..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedDept === dept
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept === 'ALL' ? 'All Specialties' : dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Cards Horizontal Carousel / Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                <span>Select Attending Physician ({filteredDoctors.length} available)</span>
                <span>Click card to choose</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDoctor?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setSelectedTime(doc.timeSlots[0]);
                      }}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start gap-3.5 mb-3">
                          <img 
                            src={doc.image} 
                            alt={doc.name} 
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200 shrink-0" 
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                              {isSelected && (
                                <span className="bg-blue-700 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-blue-700 font-medium">{doc.title}</div>
                            <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-1">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span className="font-bold">{doc.rating}</span>
                              <span className="text-slate-400">({doc.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{doc.room}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>Next: {doc.nextAvailable}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 font-mono">${doc.fee.toFixed(2)}</span>
                        <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                          {isSelected ? '✓ Selected' : 'Choose Doctor →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Appointment Schedule Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Schedule Visit with {selectedDoctor.name}
              </h3>

              {/* In-Person vs Telehealth Toggle */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Visit Format</label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setVisitType('in_person')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'in_person'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>In-Person Clinic Visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitType('telehealth')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'telehealth'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Telehealth Video Call</span>
                  </button>
                </div>
              </div>

              {/* Day selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              {/* Time slot pills */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Available Time Slots ({selectedDoctor.name})
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedTime === slot
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Details Form */}
            <form onSubmit={handleConfirm} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Patient Booking Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Jonathan Edwards"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="jonathan.e@example.com"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Reason for Consultation / Symptoms</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your symptoms or reason for scheduling..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm & Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Sticky Summary Card */}
          <div className="space-y-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4 sticky top-24">
              <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Consultation Summary
              </h3>

              {/* Doctor Details */}
              <div className="flex items-center gap-3">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{selectedDoctor.name}</div>
                  <div className="text-xs text-blue-700 font-medium">{selectedDoctor.department}</div>
                </div>
              </div>

              {/* Slot details */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-semibold text-slate-900">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Format:</span>
                  <span className="font-semibold text-slate-900">
                    {visitType === 'in_person' ? 'In-Person Clinic Visit' : 'Telehealth Video'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room / Link:</span>
                  <span className="font-medium text-slate-700">
                    {visitType === 'in_person' ? selectedDoctor.room : 'Encrypted Web Video'}
                  </span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Physician Consultation Fee:</span>
                  <span className="font-mono font-medium">${selectedDoctor.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Insurance Estimated Deduction:</span>
                  <span className="font-mono font-medium">-${(selectedDoctor.fee - selectedDoctor.insuranceCopay).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Patient Co-Pay:</span>
                  <span className="font-mono text-blue-700 text-base">${selectedDoctor.insuranceCopay.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Free cancellation up to 24 hours prior to appointment time. Co-pay payable at clinic check-in.
              </div>
            </div>

            {/* What to bring card */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 space-y-2 text-xs">
              <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                What to bring to your consultation
              </h4>
              <p className="text-blue-800 leading-relaxed text-[11px]">
                Please arrive 15 minutes before your scheduled slot with photo ID, your insurance membership card, and any relevant prior lab work or medications.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
