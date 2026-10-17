import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  X, 
  ShieldCheck, 
  Calendar, 
  Home, 
  User, 
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { figmaLabReports } from '../data/figmaData';

export default function LabsScreen() {
  const [reports, setReports] = useState(figmaLabReports);
  const [searchId, setSearchId] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [testCode, setTestCode] = useState('');
  
  // Selected report for PDF viewer / modal
  const [selectedReport, setSelectedReport] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId && !phone && !testCode) {
      setReports(figmaLabReports);
      return;
    }

    const filtered = figmaLabReports.filter(r => 
      (searchId && (r.patientId.toLowerCase().includes(searchId.toLowerCase()) || r.orderId.toLowerCase().includes(searchId.toLowerCase()))) ||
      (testCode && r.orderId.toLowerCase().includes(testCode.toLowerCase()))
    );
    setReports(filtered);
  };

  const handleReset = () => {
    setSearchId('');
    setDob('');
    setPhone('');
    setTestCode('');
    setReports(figmaLabReports);
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Header */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          Diagnostics & Pathology
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Your lab results, easy to access.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Track laboratory tests, review clinical pathology and radiology findings, and download digitally signed lab reports directly to your device.
        </p>

        {/* Blue Info Notice Strip */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Clock className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Specimen processing notice:</strong> Most routine blood tests, biochemistry panels, and urinalysis results are available within 4 to 12 hours of collection.
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Search Form + Table */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search Box Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Find your lab report</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your patient identifier or test order number to retrieve verified medical findings
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Patient Reference ID or Order ID *
                  </label>
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. PAT-1001 or LAB-98412"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Registered Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Order / Specimen Code
                  </label>
                  <input
                    type="text"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                    placeholder="e.g. LAB-98412"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Access Lab Results</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Reset / Clear
                </button>
              </div>
            </form>
          </div>

          {/* Results Table Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Verified Diagnostic Reports</h3>
                <p className="text-xs text-slate-400">Validated by certified pathologists & radiologists</p>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                {reports.length} Tests Available
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Order ID</th>
                    <th className="px-4 py-3.5">Test Details & Category</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Signed PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr key={report.orderId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-blue-700">
                        {report.orderId}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{report.testName}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                            {report.category}
                          </span>
                          <span>•</span>
                          <span>{report.patientName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-medium">
                        {report.date}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          report.status === 'Ready'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {report.status === 'Ready' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {report.status === 'Ready' ? (
                          <button
                            onClick={() => setSelectedReport(report)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Processing...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Helpful Instructions & Lab Hours */}
        <div className="space-y-5">
          {/* Card 1: Before your lab test */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 space-y-3">
            <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-700" />
              Before your laboratory test
            </h3>
            <ul className="text-xs text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Fasting Guidelines:</strong> Fast for 8-12 hours prior for Lipid and Fasting Glucose assays. Water is permitted.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Routine Medications:</strong> Continue blood pressure medications unless instructed otherwise by your doctor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                <span><strong>Valid Photo Identification:</strong> Please present your national ID or passport along with your doctor's requisition.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Laboratory Operating Hours
            </h3>
            <div className="text-xs space-y-2 divide-y divide-slate-100">
              <div className="pt-1 flex justify-between">
                <span className="text-slate-500">Inpatient & Emergency Pathology:</span>
                <span className="font-bold text-emerald-600">Open 24/7</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Outpatient Blood Draw (OPD):</span>
                <span className="font-semibold text-slate-800">07:00 AM - 07:00 PM</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Radiology (X-Ray & MRI):</span>
                <span className="font-semibold text-slate-800">08:00 AM - 08:00 PM</span>
              </div>
            </div>
          </div>

          {/* Card 3: Home Collection CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-3xl shadow-md space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
              <Home className="w-4 h-4" />
              <span>Home Phlebotomy Service</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unable to travel to the hospital? A certified clinical phlebotomist will arrive at your home with sterilized sample collection kits.
            </p>
            <button
              onClick={() => alert('Home Phlebotomy booking request received! Dispatch will contact you.')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Book Home Sample Collection
            </button>
          </div>
        </div>

      </div>

      {/* PDF Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Laboratory Diagnostic Report</h3>
                  <div className="text-xs text-slate-400 font-mono">
                    Order Ref: {selectedReport.orderId} • Date: {selectedReport.date}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Patient & Doctor metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Patient Name:</span>
                <strong className="text-slate-800 text-sm">{selectedReport.patientName}</strong>
                <span className="text-slate-500 block mt-0.5">ID: {selectedReport.patientId}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Ordering Physician:</span>
                <strong className="text-slate-800 text-sm">{selectedReport.physician}</strong>
                <span className="text-slate-500 block mt-0.5">Analyst: {selectedReport.labTech}</span>
              </div>
            </div>

            {/* Test Findings */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Clinical Test: {selectedReport.testName}
              </h4>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-semibold text-slate-800">Diagnostic Findings & Interpretation:</div>
                <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedReport.summary}
                </p>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Electronically reviewed & certified by Department Pathologist.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Copy</span>
              </button>

              <button
                onClick={() => {
                  alert(`Downloading ${selectedReport.orderId}.pdf (${selectedReport.pdfSize})`);
                  setSelectedReport(null);
                }}
                className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save PDF ({selectedReport.pdfSize})</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
