// Data tailored to the Figma Healthcare & Patient Management System

export const figmaDoctors = [
  {
    id: "DOC-CHEN",
    name: "Dr. Robert Chen",
    title: "Senior Consultant Cardiologist",
    department: "Cardiology",
    experience: "16+ years experience",
    rating: 4.9,
    reviews: 142,
    room: "Cardiology Wing, Suite 302",
    fee: 95.00,
    insuranceCopay: 15.00,
    nextAvailable: "Today, 02:30 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    education: "MD, Harvard Medical School • Fellow, American College of Cardiology",
    languages: ["English", "Mandarin"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["09:30 AM", "11:00 AM", "02:30 PM", "04:15 PM"]
  },
  {
    id: "DOC-JENKINS",
    name: "Dr. Sarah Jenkins",
    title: "Chief of Pediatrics & Family Health",
    department: "Pediatrics",
    experience: "12+ years experience",
    rating: 4.8,
    reviews: 198,
    room: "Pediatric Pavilion, Room 105",
    fee: 80.00,
    insuranceCopay: 10.00,
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1594824813629-673111b7d566?auto=format&fit=crop&w=400&q=80",
    education: "MD, Johns Hopkins University • Board Certified Pediatrician",
    languages: ["English", "Spanish"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM", "11:30 AM", "01:30 PM", "03:45 PM"]
  },
  {
    id: "DOC-ROSTOVA",
    name: "Dr. Elena Rostova",
    title: "Consultant Neurologist & Neurophysiologist",
    department: "Neurology",
    experience: "14+ years experience",
    rating: 5.0,
    reviews: 86,
    room: "Neuroscience Center, Room 410",
    fee: 110.00,
    insuranceCopay: 20.00,
    nextAvailable: "Thursday, 11:15 AM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    education: "MD, PhD, Stanford University • Oxford Clinical Neurosciences",
    languages: ["English", "Russian", "French"],
    availableDays: ["Monday", "Thursday"],
    timeSlots: ["09:00 AM", "11:15 AM", "02:00 PM"]
  },
  {
    id: "DOC-KIM",
    name: "Dr. David Kim",
    title: "Director of Orthopedic & Joint Reconstruction",
    department: "Orthopedics",
    experience: "18+ years experience",
    rating: 4.9,
    reviews: 215,
    room: "Orthopedic Clinic, Room 204",
    fee: 105.00,
    insuranceCopay: 20.00,
    nextAvailable: "Wednesday, 03:00 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    education: "MD, Columbia University • Mayo Clinic Surgical Fellow",
    languages: ["English", "Korean"],
    availableDays: ["Wednesday", "Friday"],
    timeSlots: ["10:30 AM", "01:15 PM", "03:00 PM"]
  }
];

export const figmaLabReports = [
  {
    orderId: "LAB-98412",
    patientName: "Eleanor Vance",
    patientId: "PAT-1001",
    testName: "Comprehensive Metabolic Panel (CMP) + Lipid Profile",
    category: "Biochemistry",
    date: "2026-10-16",
    status: "Ready",
    physician: "Dr. Robert Chen",
    labTech: "C. Thorne, MLS (ASCP)",
    summary: "Cholesterol: 198 mg/dL, HDL: 52 mg/dL, LDL: 124 mg/dL. Fasting Glucose: 94 mg/dL. Normal renal and hepatic parameters.",
    pdfSize: "248 KB"
  },
  {
    orderId: "LAB-98411",
    patientName: "Jameson Miller",
    patientId: "PAT-1002",
    testName: "Complete Blood Count (CBC) with Differential",
    category: "Hematology",
    date: "2026-10-15",
    status: "Ready",
    physician: "Dr. David Kim",
    labTech: "A. Patel, MLS",
    summary: "WBC: 7.2 x10^3/uL, RBC: 4.8 x10^6/uL, Hemoglobin: 14.1 g/dL, Platelets: 245 x10^3/uL. Normal indices.",
    pdfSize: "185 KB"
  },
  {
    orderId: "LAB-98409",
    patientName: "Amina Al-Mansoor",
    patientId: "PAT-1003",
    testName: "Rapid Respiratory PCR Panel & Strep A Culture",
    category: "Microbiology",
    date: "2026-10-17",
    status: "Ready",
    physician: "Dr. Sarah Jenkins",
    labTech: "M. Gomez, Microbiologist",
    summary: "Negative for Influenza A/B, RSV, SARS-CoV-2. Group A Streptococcus: Negative by rapid antigen.",
    pdfSize: "210 KB"
  },
  {
    orderId: "LAB-98402",
    patientName: "Liam O'Connor",
    patientId: "PAT-1004",
    testName: "Digital Radiography - Chest 2 Views & Rib Series",
    category: "Radiology",
    date: "2026-10-17",
    status: "Ready",
    physician: "Dr. Anthony Rossi",
    labTech: "Dr. H. Vance, Radiologist",
    summary: "Non-displaced hairline fracture of left 7th rib. Lung fields clear, no pneumothorax or pleural effusion.",
    pdfSize: "1.4 MB"
  },
  {
    orderId: "LAB-98395",
    patientName: "Sofia Rodriguez",
    patientId: "PAT-1005",
    testName: "Brain MRI with Diffusion & Contrast MRA",
    category: "Neuro-Imaging",
    date: "2026-10-14",
    status: "Ready",
    physician: "Dr. Elena Rostova",
    labTech: "Dr. K. Lind, Neuroradiology",
    summary: "Small punctate ischemic focus in left internal capsule. Left ICA bifurcation with ~65% luminal stenosis.",
    pdfSize: "3.2 MB"
  },
  {
    orderId: "LAB-98420",
    patientName: "Michael Chang",
    patientId: "PAT-1011",
    testName: "Thyroid Stimulating Hormone (TSH) + Free T4",
    category: "Endocrinology",
    date: "2026-10-17",
    status: "Processing",
    physician: "Dr. Sarah Jenkins",
    labTech: "In Analyzer",
    summary: "Specimen received at 09:15 AM. Assay in progress. Estimated turnaround: 3 hours.",
    pdfSize: "Pending"
  }
];

export const figmaMedicines = [
  {
    id: "MED-01",
    name: "Amoxicillin & Clavulanate",
    brand: "Augmentin XR",
    category: "Antibiotics",
    dosage: "875mg / 125mg • 14 Tablets",
    price: 18.50,
    prescriptionRequired: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
    description: "Broad-spectrum antibacterial for respiratory, ear, and sinus infections."
  },
  {
    id: "MED-02",
    name: "Salbutamol Inhaler (CFC-Free)",
    brand: "Ventolin HFA",
    category: "Respiratory",
    dosage: "100mcg • 200 Metered Doses",
    price: 24.00,
    prescriptionRequired: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80",
    description: "Fast-acting bronchodilator for rapid relief of asthma and bronchospasm."
  },
  {
    id: "MED-03",
    name: "Digital Infrared Thermometer",
    brand: "ThermoScan Medical",
    category: "First Aid & Equipment",
    dosage: "Non-contact Instant Sensor",
    price: 32.00,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80",
    description: "Clinical-grade temperature measurement with fever alert display."
  },
  {
    id: "MED-04",
    name: "Paracetamol & Codeine Phosphate",
    brand: "Panadol Extra",
    category: "Pain Relief",
    dosage: "500mg / 65mg • 24 Caplets",
    price: 8.75,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1550572017-ed265c19736c?auto=format&fit=crop&w=400&q=80",
    description: "Dual-action analgesic for fever, acute headache, dental, and joint discomfort."
  },
  {
    id: "MED-05",
    name: "Antiseptic Wound Cleanser Spray",
    brand: "Betasept Care",
    category: "First Aid",
    dosage: "150ml Aqueous Spray",
    price: 11.20,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b4?auto=format&fit=crop&w=400&q=80",
    description: "Pain-free antimicrobial solution for minor abrasions, cuts, and post-suture cleansing."
  },
  {
    id: "MED-06",
    name: "Blood Glucose Test Strips + Lancets",
    brand: "AccuCheck Active",
    category: "Diagnostics & Monitoring",
    dosage: "50 Strips + 50 Lancets",
    price: 28.50,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=400&q=80",
    description: "High-accuracy capillary blood glucose test strips for diabetic monitoring."
  }
];

export const figmaCarePackages = [
  {
    id: "PKG-STANDARD",
    name: "Standard Medical Ward",
    subtitle: "Essential 24/7 care in a shared clinical recovery bay",
    pricePerDay: 250,
    recommended: false,
    features: [
      { text: "Shared air-conditioned ward (4 beds)", included: true },
      { text: "24/7 Professional nursing care & vitals telemetry", included: true },
      { text: "Daily primary physician rounds", included: true },
      { text: "Standard therapeutic meal plan", included: true },
      { text: "Basic bedside attendant chair", included: true },
      { text: "Private ensuite bathroom", included: false },
      { text: "Dedicated in-room patient entertainment / smart TV", included: false },
      { text: "Private companion sleeper sofa", included: false }
    ]
  },
  {
    id: "PKG-SEMIPRIVATE",
    name: "Semi-Private Room",
    subtitle: "Balanced comfort with dual-occupancy and enhanced privacy",
    pricePerDay: 450,
    recommended: true,
    badge: "Most Popular",
    features: [
      { text: "Dual-bed semi-private recovery suite", included: true },
      { text: "24/7 Dedicated nurse ratio (1:2)", included: true },
      { text: "Twice-daily senior consultant evaluations", included: true },
      { text: "Customized clinical dietary menu with dietary choices", included: true },
      { text: "Separated partition curtains & privacy sound dampening", included: true },
      { text: "Semi-private shared ensuite washroom", included: true },
      { text: "Individual high-speed Wi-Fi & bedside tablet", included: true },
      { text: "Executive VIP companion sleeper couch", included: false }
    ]
  },
  {
    id: "PKG-VIP",
    name: "Executive VIP Suite",
    subtitle: "Complete clinical luxury with dedicated medical concierges",
    pricePerDay: 850,
    recommended: false,
    features: [
      { text: "Spacious private executive suite with city view", included: true },
      { text: "Dedicated 1:1 round-the-clock nursing officer", included: true },
      { text: "Direct daily rounds with Head of Department / Chief Medical Officer", included: true },
      { text: "Full gourmet room service & guest meal allowances", included: true },
      { text: "Private modern ensuite with walk-in shower & toiletries", included: true },
      { text: "Separate patient lounge with companion sleeper sofa", included: true },
      { text: "Complimentary valet parking & priority discharge desk", included: true },
      { text: "In-suite smart entertainment & telehealth station", included: true }
    ]
  }
];

export const figmaHospitalBills = [
  {
    id: "INV-7821",
    patientName: "Eleanor Vance",
    patientId: "PAT-1001",
    accountNumber: "ACC-89102",
    date: "2026-10-17",
    department: "Cardiology",
    room: "CCU-04",
    status: "Unpaid",
    dueDate: "2026-10-31",
    insurance: {
      provider: "BlueCross MedShield",
      policyNumber: "BC-9823441",
      coverageRate: 80
    },
    items: [
      { description: "Emergency Room Triage & Stabilization", code: "ER-99285", amount: 150.00 },
      { description: "12-Lead ECG & Troponin Blood Panel", code: "LAB-80053", amount: 220.00 },
      { description: "Inpatient Telemetry Care (2 Days)", code: "CCU-1020", amount: 480.00 },
      { description: "Inpatient Pharmacy & Cardiovascular Infusions", code: "PHM-3012", amount: 80.00 }
    ],
    subtotal: 930.00,
    insuranceCovered: 744.00,
    copayAmount: 186.00
  },
  {
    id: "INV-7820",
    patientName: "Jameson Miller",
    patientId: "PAT-1002",
    accountNumber: "ACC-54128",
    date: "2026-10-16",
    department: "Orthopedic Surgery",
    room: "SW-12",
    status: "Paid",
    dueDate: "2026-10-25",
    insurance: {
      provider: "Aetna Health Care",
      policyNumber: "AET-541289",
      coverageRate: 90
    },
    items: [
      { description: "Total Knee Arthroplasty Surgical Fee", code: "SURG-27447", amount: 4500.00 },
      { description: "Surgical Suite Operating Facilities", code: "OR-003", amount: 2200.00 },
      { description: "Anesthesia Administration (General)", code: "ANE-01402", amount: 1100.00 },
      { description: "Post-op Physical Therapy (Day 1)", code: "PT-97110", amount: 200.00 }
    ],
    subtotal: 8000.00,
    insuranceCovered: 7200.00,
    copayAmount: 800.00
  }
];
