import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Upload, 
  Truck, 
  Building, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  FileText,
  Clock
} from 'lucide-react';
import { figmaMedicines } from '../data/figmaData';

export default function PharmacyScreen({ cart, setCart, onOrderCompleted }) {
  const [medicines, setMedicines] = useState(figmaMedicines);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Delivery preference
  const [deliveryMethod, setDeliveryMethod] = useState('bedside'); // 'bedside' or 'home'
  const [patientRoom, setPatientRoom] = useState('Room CCU-04');
  const [homeAddress, setHomeAddress] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  // Prescription upload state
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['ALL', 'Antibiotics', 'Respiratory', 'Pain Relief', 'First Aid', 'Diagnostics & Monitoring'];

  const filteredMedicines = medicines.filter(m => {
    const matchesCat = selectedCategory === 'ALL' || m.category.includes(selectedCategory);
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (med) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === med.id);
      if (existing) {
        return prev.map(item => item.id === med.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...med, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = deliveryMethod === 'home' && cart.length > 0 ? 5.00 : 0.00;
  const orderTotal = cartSubtotal + deliveryFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }

    if (onOrderCompleted) {
      onOrderCompleted({
        orderId: `PHM-${Math.floor(1000 + Math.random() * 9000)}`,
        items: cart,
        total: orderTotal,
        deliveryMethod,
        destination: deliveryMethod === 'bedside' ? patientRoom : homeAddress
      });
    }
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="space-y-8">
      {/* Title & Intro */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-blue-700 tracking-wider uppercase">
          In-Hospital & Outpatient Pharmacy
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Pharmacy essentials, right now.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Order prescribed medications and healthcare supplies with rapid bedside inpatient delivery or refrigerated home courier.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <Clock className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Rapid Bedside Dispensing:</strong> Inpatients receive verified pharmaceuticals directly at their ward room within 30 minutes of order confirmation.
          </span>
        </div>
      </div>

      {orderPlaced ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Pharmacy Order Confirmed!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our licensed dispensary pharmacist has verified your medication order. Delivery is now being packed in sterile packaging.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div>Fulfillment Method: <strong>{deliveryMethod === 'bedside' ? `Bedside Delivery (${patientRoom})` : 'Express Courier'}</strong></div>
            <div>Order Total: <strong className="text-blue-700 font-mono text-sm">${orderTotal.toFixed(2)}</strong></div>
          </div>

          <button
            onClick={() => setOrderPlaced(false)}
            className="px-6 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Order More Medicines
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols): Search, Product Grid, Prescription Upload */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search medications, generics, or brand names (e.g. Amoxicillin, Ventolin)..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Medicines' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Medicines Grid (6 products from Figma) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMedicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-36 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                      <img 
                        src={med.image} 
                        alt={med.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>

                    <div className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">{med.category}</div>
                    <h3 className="font-bold text-slate-900 text-xs mt-0.5 group-hover:text-blue-700 transition-colors">
                      {med.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">{med.brand}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{med.dosage}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm font-mono">
                      ${med.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(med)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-700 hover:text-white text-blue-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Prescription Upload Box from Figma */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <FileText className="w-4 h-4 text-blue-700" />
                  Have a Doctor's Physical Prescription?
                </div>
                <p className="text-xs text-blue-800 leading-relaxed max-w-lg">
                  Upload a photo or scanned PDF of your prescription script. Our registered pharmacists will transcribe the items and prepare your order.
                </p>
              </div>

              <div>
                <label className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap">
                  <Upload className="w-4 h-4" />
                  <span>Upload Script (PDF/JPG)</span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPrescriptionFile(e.target.files[0].name);
                        alert(`Uploaded prescription: ${e.target.files[0].name}`);
                      }
                    }}
                  />
                </label>
                {prescriptionFile && (
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1 text-center">
                    ✓ Attached: {prescriptionFile}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Shopping Cart & Fulfillment Details */}
          <div className="space-y-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                  Pharmacy Order Summary
                </h3>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {cart.reduce((a, b) => a + b.qty, 0)} Items
                </span>
              </div>

              {/* Cart item list */}
              {cart.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 space-y-1">
                  <Pill className="w-8 h-8 text-slate-300 mx-auto" />
                  <div>Your pharmacy cart is empty</div>
                  <div className="text-[11px]">Select items from the catalog to order</div>
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="pr-2">
                        <div className="font-bold text-slate-900 truncate max-w-[140px]">{item.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">${item.price.toFixed(2)} each</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold font-mono text-slate-800">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fulfillment Format Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700 block">Delivery Location</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('bedside')}
                    className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center gap-1 transition-all ${
                      deliveryMethod === 'bedside'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4 text-blue-700" />
                    <span>Bedside Ward</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Free (30m)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('home')}
                    className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center gap-1 transition-all ${
                      deliveryMethod === 'home'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-blue-700" />
                    <span>Home Courier</span>
                    <span className="text-[10px] text-slate-500 font-mono">$5.00 Flat</span>
                  </button>
                </div>

                {deliveryMethod === 'bedside' ? (
                  <div className="pt-1">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Ward Room / Bed Number</label>
                    <input
                      type="text"
                      value={patientRoom}
                      onChange={(e) => setPatientRoom(e.target.value)}
                      placeholder="e.g. Room CCU-04"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                ) : (
                  <div className="pt-1">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Home Delivery Address</label>
                    <input
                      type="text"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                      placeholder="Street address, Apartment, City"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Medicines Subtotal:</span>
                  <span className="font-mono font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Dispatch / Delivery Fee:</span>
                  <span className="font-mono font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="font-mono text-blue-700">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Order Fulfillment</span>
              </button>
            </div>

            {/* Pharmacist Advisory box */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-blue-700" />
                Licensed Clinical Pharmacist On Duty
              </h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Have questions regarding medication contraindications, dosage adjustments, or drug interactions?
              </p>
              <div className="font-mono font-bold text-slate-800">Hospital Pharmacy Ext: 310</div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
