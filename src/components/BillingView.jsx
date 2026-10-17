import React, { useState } from 'react';
import { 
  Receipt, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Printer, 
  Download, 
  Plus,
  ShieldCheck,
  CreditCard,
  X
} from 'lucide-react';

export default function BillingView({ 
  invoices, 
  patients, 
  onMarkInvoicePaid, 
  onGenerateInvoice 
}) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showNewBillModal, setShowNewBillModal] = useState(false);

  // New invoice state
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [consultFee, setConsultFee] = useState(250);
  const [roomFee, setRoomFee] = useState(600);
  const [labFee, setLabFee] = useState(400);

  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.status === 'Paid' ? inv.totalAmount : 0), 0);
  const pendingInsurance = invoices.reduce((acc, inv) => acc + (inv.status !== 'Paid' ? inv.insuranceCovered : 0), 0);
  const patientReceivable = invoices.reduce((acc, inv) => acc + (inv.status !== 'Paid' ? inv.patientPayable : 0), 0);

  const handleCreateBill = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    const total = parseFloat(consultFee) + parseFloat(roomFee) + parseFloat(labFee);
    const coverage = (total * (patient.insurance?.coveragePercent || 80)) / 100;
    const payable = total - coverage;

    const newInvoice = {
      id: `INV-${Math.floor(5000 + Math.random() * 9000)}`,
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString().split('T')[0],
      department: patient.department,
      totalAmount: total,
      insuranceCovered: coverage,
      patientPayable: payable,
      status: 'Pending Insurance Approval',
      items: [
        { description: 'Physician Consultation & Ward Care', amount: parseFloat(consultFee) },
        { description: 'Inpatient Room & Nursing Facilities', amount: parseFloat(roomFee) },
        { description: 'Clinical Pathology & Diagnostic Labs', amount: parseFloat(labFee) },
      ]
    };

    onGenerateInvoice(newInvoice);
    setShowNewBillModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-600" />
            Hospital Patient Billing & Insurance Claims
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent fee breakdowns, third-party insurance adjudication, and settlement
          </p>
        </div>

        <button
          onClick={() => setShowNewBillModal(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm shadow-cyan-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Patient Bill</span>
        </button>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settled Payments</div>
          <div className="text-2xl font-black text-slate-900 mt-1">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fully received
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Insurance TPA Claims in Process</div>
          <div className="text-2xl font-black text-cyan-700 mt-1">${pendingInsurance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-slate-500 mt-1">Direct insurance clearinghouse</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Co-Pay Outstanding</div>
          <div className="text-2xl font-black text-amber-700 mt-1">${patientReceivable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">Pending at discharge desk</div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Patient Invoices</h3>
          <span className="text-xs text-slate-400">{invoices.length} total records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-4 py-3.5">Patient Details</th>
                <th className="px-4 py-3.5">Date & Dept</th>
                <th className="px-4 py-3.5">Gross Total</th>
                <th className="px-4 py-3.5">Insurance / Patient Split</th>
                <th className="px-4 py-3.5">Claim Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-cyan-700">
                    {inv.id}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{inv.patientName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{inv.patientId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-800">{inv.department}</div>
                    <div className="text-[11px] text-slate-400">{inv.date}</div>
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-900">
                    ${inv.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-emerald-700 font-medium">Ins: ${inv.insuranceCovered.toFixed(2)}</div>
                    <div className="text-amber-800 font-semibold text-[11px]">Payable: ${inv.patientPayable.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Breakdown</span>
                      </button>

                      {inv.status !== 'Paid' && (
                        <button
                          onClick={() => onMarkInvoicePaid(inv.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Collect</span>
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

      {/* Invoice Breakdown Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-600">{selectedInvoice.id}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Itemized Hospital Statement</h3>
                <p className="text-xs text-slate-400">Patient: {selectedInvoice.patientName} ({selectedInvoice.patientId})</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-600 block mb-1">Services & Hospital Stay</span>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {selectedInvoice.items?.map((item, i) => (
                  <div key={i} className="p-3 bg-white flex justify-between text-slate-700">
                    <span>{item.description}</span>
                    <span className="font-bold text-slate-900 font-mono">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Gross):</span>
                <span className="font-mono font-bold">${selectedInvoice.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Insurance Paid:</span>
                <span className="font-mono font-bold">-${selectedInvoice.insuranceCovered.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Due from Patient:</span>
                <span className="font-mono text-cyan-700">${selectedInvoice.patientPayable.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate New Bill Modal */}
      {showNewBillModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Create Patient Bill</h3>
            <form onSubmit={handleCreateBill} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Patient</label>
                <select
                  value={patientId}
                  onChange={e => setPatientId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id}) - {p.department}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor Consultation Fee ($)</label>
                <input
                  type="number"
                  value={consultFee}
                  onChange={e => setConsultFee(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bed & Ward Charges ($)</label>
                <input
                  type="number"
                  value={roomFee}
                  onChange={e => setRoomFee(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Diagnostics & Pathology Labs ($)</label>
                <input
                  type="number"
                  value={labFee}
                  onChange={e => setLabFee(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewBillModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold"
                >
                  Generate Statement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
