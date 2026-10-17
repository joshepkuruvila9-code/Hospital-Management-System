import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Download, 
  Lock, 
  Clock, 
  HelpCircle,
  Building,
  ArrowRight
} from 'lucide-react';
import { figmaHospitalBills } from '../data/figmaData';

export default function BillingScreen() {
  const [bills, setBills] = useState(figmaHospitalBills);
  const [activeBill, setActiveBill] = useState(figmaHospitalBills[0]);
  
  // Search state
  const [searchPatientId, setSearchPatientId] = useState('');
  const [searchBillId, setSearchBillId] = useState('');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'insurance', 'bank'
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Paid receipt view
  const [paidReceipt, setPaidReceipt] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchPatientId && !searchBillId) return;

    const found = bills.find(b => 
      (searchPatientId && b.patientId.toLowerCase() === searchPatientId.toLowerCase()) ||
      (searchBillId && b.id.toLowerCase() === searchBillId.toLowerCase())
    );

    if (found) {
      setActiveBill(found);
    } else {
      alert('No invoice found matching those identifiers.');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card' && (!cardName || !cardNumber)) {
      alert('Please fill out cardholder name and card number.');
      return;
    }

    const updatedBills = bills.map(b => b.id === activeBill.id ? { ...b, status: 'Paid' } : b);
    setBills(updatedBills);
    setActiveBill(prev => ({ ...prev, status: 'Paid' }));
    
    setPaidReceipt({
      receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
      billId: activeBill.id,
      patientName: activeBill.patientName,
      patientId: activeBill.patientId,
      amountPaid: activeBill.copayAmount,
      date: new Date().toLocaleString(),
      paymentMethod: paymentMethod === 'card' ? `Credit Card (ending in ${cardNumber.slice(-4) || '8842'})` : 'Electronic Direct Deposit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Intro */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          Patient Accounts & Settlement
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Review your bill. Pay with clarity.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Inspect itemized medical expenses, check automated insurance coverage adjustments, and complete balance settlements securely.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Lock className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Secure Healthcare Gateway:</strong> All financial transactions are encrypted with 256-bit SSL and comply with PCI-DSS Level 1 standards.
          </span>
        </div>
      </div>

      {paidReceipt ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Hospital Payment Complete!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Payment has been settled. A stamped official electronic receipt has been added to your patient record.
          </p>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">Receipt Ref:</span>
              <strong className="font-mono text-slate-900">{paidReceipt.receiptNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice Settled:</span>
              <strong className="font-mono text-slate-900">{paidReceipt.billId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Patient:</span>
              <strong className="text-slate-900">{paidReceipt.patientName} ({paidReceipt.patientId})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Settled:</span>
              <strong className="text-blue-700 font-mono text-base">${paidReceipt.amountPaid.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200 text-[11px] text-slate-500">
              <span>Date: {paidReceipt.date}</span>
              <span>{paidReceipt.paymentMethod}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={() => setPaidReceipt(null)}
              className="px-5 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols): Bill Lookup, Itemized Statement, Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Find Bill Box */}
            <form onSubmit={handleSearch} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <h2 className="text-sm font-bold text-slate-900">Search Outstanding Hospital Bill</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Patient Reference ID</label>
                  <input
                    type="text"
                    value={searchPatientId}
                    onChange={(e) => setSearchPatientId(e.target.value)}
                    placeholder="e.g. PAT-1001"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={searchBillId}
                    onChange={(e) => setSearchBillId(e.target.value)}
                    placeholder="e.g. INV-7821"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Search Bill
                </button>
              </div>
            </form>

            {/* Itemized Statement Card from Figma */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-700">{activeBill.id}</span>
                  <h3 className="text-base font-bold text-slate-900">
                    Itemized Clinical Statement
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Patient: <strong>{activeBill.patientName}</strong> ({activeBill.patientId}) • Ward: {activeBill.room}
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  activeBill.status === 'Paid'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {activeBill.status}
                </span>
              </div>

              {/* Items Table */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {activeBill.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white flex items-center justify-between text-xs hover:bg-slate-50/50">
                    <div>
                      <div className="font-semibold text-slate-900">{item.description}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Service Code: {item.code}</div>
                    </div>
                    <span className="font-bold text-slate-900 font-mono">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Gross Hospital Bill:</span>
                  <span className="font-mono font-bold text-slate-900">${activeBill.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Insurance Adjustment ({activeBill.insurance?.provider}):</span>
                  <span className="font-mono font-bold">-${activeBill.insuranceCovered.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Remaining Patient Balance:</span>
                  <span className="font-mono text-blue-700 text-base">${activeBill.copayAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Form from Figma */}
            {activeBill.status !== 'Paid' && (
              <form onSubmit={handlePay} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Select Payment Method
                </h3>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('insurance')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'insurance'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    HSA / FSA Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Direct Wire / ACH
                  </button>
                </div>

                {paymentMethod === 'card' || paymentMethod === 'insurance' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Cardholder Full Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as it appears on card"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Expiration MM/YY</label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Security Code (CVC)</label>
                        <input
                          type="password"
                          required
                          maxLength="4"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-800">Hospital Banking Direct Wire Routing:</span>
                    <div>Bank: JP Morgan Chase Healthcare Commercial</div>
                    <div>Account Name: CarePulse Hospital Network</div>
                    <div>Routing: 021000021 • Account: 881920194</div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay Patient Balance (${activeBill.copayAmount.toFixed(2)})</span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Sticky Summary & Support */}
          <div className="space-y-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
              <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Payment Summary
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bill ID:</span>
                  <span className="font-mono font-bold text-slate-900">{activeBill.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Due Date:</span>
                  <span className="font-semibold text-slate-800">{activeBill.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Insurance Payer:</span>
                  <span className="font-semibold text-slate-800">{activeBill.insurance?.provider}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Gross Hospital Fee:</span>
                  <span className="font-mono font-medium">${activeBill.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Insurance Settled:</span>
                  <span className="font-mono font-medium">-${activeBill.insuranceCovered.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Amount to Pay:</span>
                  <span className="font-mono text-blue-700 text-lg">
                    {activeBill.status === 'Paid' ? '$0.00' : `$${activeBill.copayAmount.toFixed(2)}`}
                  </span>
                </div>
              </div>

              {activeBill.status === 'Paid' ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                  ✓ This account is fully settled
                </div>
              ) : (
                <button
                  onClick={handlePay}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Pay Now ${activeBill.copayAmount.toFixed(2)}</span>
                </button>
              )}
            </div>

            {/* Flexible financing from Figma */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 space-y-2 text-xs">
              <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-700" />
                Need flexible medical financing?
              </h4>
              <p className="text-blue-800 leading-relaxed text-[11px]">
                CarePulse offers zero-interest 6 and 12-month installment payment plans for out-of-pocket medical balances over $500.
              </p>
              <div className="font-bold text-blue-900 font-mono text-[11px] pt-1">
                Billing Advocates: +1 (800) 456-BILL
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
