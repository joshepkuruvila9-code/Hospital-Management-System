import React, { useState } from 'react';
import { 
  BedDouble, 
  CheckCircle, 
  Sparkles, 
  Wrench, 
  User, 
  ArrowRightLeft, 
  ShieldAlert,
  Plus
} from 'lucide-react';

export default function BedManagement({ 
  wards, 
  patients, 
  onUpdateBedStatus,
  onAssignPatientToBed 
}) {
  const [selectedWardId, setSelectedWardId] = useState('ALL');
  const [activeBedModal, setActiveBedModal] = useState(null); // for assigning/editing bed

  const filteredWards = selectedWardId === 'ALL' 
    ? wards 
    : wards.filter(w => w.id === selectedWardId);

  // Compute aggregate statistics
  const totalBeds = wards.reduce((acc, w) => acc + w.beds.length, 0);
  const occupiedCount = wards.reduce((acc, w) => acc + w.beds.filter(b => b.status === 'Occupied').length, 0);
  const availableCount = wards.reduce((acc, w) => acc + w.beds.filter(b => b.status === 'Available').length, 0);
  const cleaningCount = wards.reduce((acc, w) => acc + w.beds.filter(b => b.status === 'Cleaning').length, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-blue-50 border-blue-200 text-blue-900 ring-blue-500/10';
      case 'Available': return 'bg-emerald-50 border-emerald-200 text-emerald-900 ring-emerald-500/10';
      case 'Cleaning': return 'bg-amber-50 border-amber-200 text-amber-900 ring-amber-500/10';
      case 'Maintenance': return 'bg-slate-100 border-slate-300 text-slate-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-cyan-600" />
            Hospital Inpatient Ward & Bed Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time bed telemetry, sanitary turnaround tracking, and bed allocation
          </p>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            {occupiedCount} Occupied
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            {availableCount} Available
          </span>
          <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
            {cleaningCount} Cleaning
          </span>
        </div>
      </div>

      {/* Ward Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setSelectedWardId('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedWardId === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Wards ({totalBeds} Beds)
        </button>
        {wards.map(ward => (
          <button
            key={ward.id}
            onClick={() => setSelectedWardId(ward.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedWardId === ward.id
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {ward.name}
          </button>
        ))}
      </div>

      {/* Ward Bed Sections */}
      <div className="space-y-6">
        {filteredWards.map(ward => {
          const wardOccupied = ward.beds.filter(b => b.status === 'Occupied').length;
          const rate = Math.round((wardOccupied / ward.totalBeds) * 100);

          return (
            <div key={ward.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>{ward.name}</span>
                    <span className="text-xs font-normal text-slate-400">({ward.floor})</span>
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Capacity: <strong>{wardOccupied} of {ward.totalBeds}</strong> beds occupied ({rate}%)
                  </div>
                </div>

                <div className="w-48 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${
                      rate > 80 ? 'bg-rose-500' : rate > 50 ? 'bg-cyan-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>

              {/* Bed Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ward.beds.map(bed => (
                  <div
                    key={bed.id}
                    onClick={() => setActiveBedModal({ wardId: ward.id, bed })}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between min-h-[115px] ${getStatusColor(bed.status)}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono font-bold text-xs">{bed.id}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          bed.status === 'Occupied' ? 'bg-blue-600' :
                          bed.status === 'Available' ? 'bg-emerald-500' :
                          bed.status === 'Cleaning' ? 'bg-amber-500' : 'bg-slate-400'
                        }`} />
                      </div>

                      {bed.status === 'Occupied' ? (
                        <div>
                          <div className="font-bold text-xs truncate" title={bed.patient}>
                            {bed.patient}
                          </div>
                          {bed.condition && (
                            <span className={`inline-block text-[10px] font-semibold mt-1 px-1.5 py-0.2 rounded ${
                              bed.condition === 'Critical' ? 'bg-rose-200 text-rose-900' :
                              bed.condition === 'Recovery' ? 'bg-emerald-200 text-emerald-900' :
                              'bg-blue-200 text-blue-900'
                            }`}>
                              {bed.condition}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs font-semibold opacity-75">
                          {bed.status}
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] opacity-60 text-right mt-2">
                      Click to edit
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bed Status Management Modal */}
      {activeBedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Manage Bed <span className="font-mono text-cyan-600">{activeBedModal.bed.id}</span>
            </h3>
            
            <p className="text-xs text-slate-500">
              Currently: <strong>{activeBedModal.bed.status}</strong> 
              {activeBedModal.bed.patient && ` (${activeBedModal.bed.patient})`}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-700 block">Change Status:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    onUpdateBedStatus(activeBedModal.wardId, activeBedModal.bed.id, 'Available', null);
                    setActiveBedModal(null);
                  }}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100"
                >
                  Mark Available
                </button>
                <button
                  onClick={() => {
                    onUpdateBedStatus(activeBedModal.wardId, activeBedModal.bed.id, 'Cleaning', null);
                    setActiveBedModal(null);
                  }}
                  className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 font-semibold hover:bg-amber-100"
                >
                  Mark Cleaning
                </button>
                <button
                  onClick={() => {
                    onUpdateBedStatus(activeBedModal.wardId, activeBedModal.bed.id, 'Maintenance', null);
                    setActiveBedModal(null);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200"
                >
                  Maintenance
                </button>
                <button
                  onClick={() => {
                    const name = prompt('Enter Patient Name to Assign:', 'New Inpatient');
                    if (name) {
                      onUpdateBedStatus(activeBedModal.wardId, activeBedModal.bed.id, 'Occupied', name);
                    }
                    setActiveBedModal(null);
                  }}
                  className="p-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100"
                >
                  Assign Inpatient
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveBedModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
