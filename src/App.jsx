import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Screens corresponding to the Figma design
import HomeScreen from './screens/HomeScreen';
import DoctorBookingScreen from './screens/DoctorBookingScreen';
import PreRegistrationScreen from './screens/PreRegistrationScreen';
import LabsScreen from './screens/LabsScreen';
import CarePlansScreen from './screens/CarePlansScreen';
import PharmacyScreen from './screens/PharmacyScreen';
import BillingScreen from './screens/BillingScreen';
import StaffPortalScreen from './screens/StaffPortalScreen';

// Base mock data
import { 
  initialPatients, 
  initialDoctors, 
  initialAppointments, 
  initialWards, 
  initialInvoices 
} from './data/initialData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);

  // Shared state for hospital operations & patient flow
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [wards, setWards] = useState(initialWards);
  const [invoices, setInvoices] = useState(initialInvoices);

  // Toast alert system
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handlers for interactive actions
  const handleRegisterPatient = (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);

    if (newPatient.admissionStatus === 'Admitted' && newPatient.bedNumber !== 'N/A') {
      setWards(prevWards => prevWards.map(ward => ({
        ...ward,
        beds: ward.beds.map(bed => 
          bed.id === newPatient.bedNumber 
            ? { ...bed, status: 'Occupied', patient: newPatient.name, condition: 'Observation' }
            : bed
        )
      })));
    }

    showToast(`Patient ${newPatient.name} (${newPatient.id}) registered into hospital records.`);
  };

  const handleDischargePatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    if (patient.bedNumber && patient.bedNumber !== 'N/A') {
      setWards(prevWards => prevWards.map(ward => ({
        ...ward,
        beds: ward.beds.map(bed => 
          bed.id === patient.bedNumber 
            ? { ...bed, status: 'Cleaning', patient: null, condition: null }
            : bed
        )
      })));
    }

    setPatients(prev => prev.map(p => 
      p.id === patientId 
        ? { 
            ...p, 
            admissionStatus: 'Discharged', 
            bedNumber: 'Discharged', 
            dischargeDate: new Date().toISOString().split('T')[0] 
          } 
        : p
    ));

    showToast(`Patient ${patient.name} discharged. Bed ${patient.bedNumber} queued for cleaning.`);
  };

  const handleAddNote = (patientId, noteObj) => {
    setPatients(prev => prev.map(p => 
      p.id === patientId ? { ...p, notes: [noteObj, ...(p.notes || [])] } : p
    ));
    showToast('Clinical physician note appended to EHR file.');
  };

  const handleAddPrescription = (patientId, medObj) => {
    setPatients(prev => prev.map(p => 
      p.id === patientId ? { ...p, medications: [...(p.medications || []), medObj] } : p
    ));
    showToast(`Prescription for ${medObj.name} added.`);
  };

  const handleUpdateVitals = (patientId, vitalsObj) => {
    setPatients(prev => prev.map(p => 
      p.id === patientId ? { ...p, vitals: vitalsObj } : p
    ));
    showToast('Patient vitals telemetry updated.');
  };

  const handleUpdateAppointmentStatus = (aptId, newStatus) => {
    setAppointments(prev => prev.map(a => 
      a.id === aptId ? { ...a, status: newStatus } : a
    ));
    showToast(`Appointment status updated to: ${newStatus}`);
  };

  const handleAddAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
    showToast(`Consultation confirmed for ${newApt.patientName} with ${newApt.doctorName}.`);
  };

  const handleUpdateBedStatus = (wardId, bedId, status, patientName) => {
    setWards(prev => prev.map(ward => {
      if (ward.id === wardId) {
        return {
          ...ward,
          beds: ward.beds.map(bed => 
            bed.id === bedId 
              ? { 
                  ...bed, 
                  status, 
                  patient: patientName, 
                  condition: status === 'Occupied' ? 'Observation' : null 
                } 
              : bed
          )
        };
      }
      return ward;
    }));
    showToast(`Bed ${bedId} updated to ${status}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      <div>
        {/* Navigation Bar matching Figma */}
        <Navbar 
          activePage={activePage} 
          setActivePage={(page) => {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        />

        {/* Dynamic Page Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-10">
          {activePage === 'home' && (
            <HomeScreen setActivePage={setActivePage} />
          )}

          {activePage === 'doctors' && (
            <DoctorBookingScreen 
              onBookSuccess={(apt) => {
                handleAddAppointment(apt);
                showToast(`Appointment confirmed with ${apt.doctorName}!`);
              }}
            />
          )}

          {activePage === 'consultation' && (
            <DoctorBookingScreen 
              onBookSuccess={(apt) => {
                handleAddAppointment(apt);
                showToast(`Appointment confirmed with ${apt.doctorName}!`);
              }}
            />
          )}

          {activePage === 'preregistration' && (
            <PreRegistrationScreen 
              onRegisterSuccess={(patient) => {
                handleRegisterPatient(patient);
              }}
            />
          )}

          {activePage === 'labs' && (
            <LabsScreen />
          )}

          {activePage === 'careplans' && (
            <CarePlansScreen 
              onReservePackage={(reservation) => {
                showToast(`Inpatient package reserved for ${reservation.patientName}.`);
              }}
            />
          )}

          {activePage === 'pharmacy' && (
            <PharmacyScreen 
              cart={cart}
              setCart={setCart}
              onOrderCompleted={(order) => {
                showToast(`Pharmacy order ${order.orderId} dispatched!`);
              }}
            />
          )}

          {activePage === 'billing' && (
            <BillingScreen />
          )}

          {activePage === 'staff' && (
            <StaffPortalScreen 
              patients={patients}
              doctors={doctors}
              appointments={appointments}
              wards={wards}
              onRegisterPatient={handleRegisterPatient}
              onDischargePatient={handleDischargePatient}
              onAddNote={handleAddNote}
              onAddPrescription={handleAddPrescription}
              onUpdateVitals={handleUpdateVitals}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onAddAppointment={handleAddAppointment}
              onUpdateBedStatus={handleUpdateBedStatus}
              onReturnHome={() => setActivePage('home')}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Real-time System Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-slate-400 hover:text-white ml-2 text-sm cursor-pointer"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
