// 5 Distinct User Accounts & Roles
export const PRESET_ACCOUNTS = [
  {
    id: "fpo-1",
    name: "Nashik Agri Farmer Producer Co.",
    role: "fpo",
    roleLabel: "Farmer Producer Org (FPO)",
    email: "director@nashikagrifpo.org",
    phone: "+91 94222-77889",
    location: "Niphad, Nashik",
    avatar: "N",
    badgeColor: "#166534",
    fpoRegNo: "FPO-MH-2021-0089",
    farmersConnected: 112,
    pooledCapacityTonnes: 15.6,
    activeContracts: 4
  },
  {
    id: "farmer-1",
    name: "Balasaheb Jadhav",
    role: "farmer",
    roleLabel: "Individual Farmer",
    email: "balasaheb.jadhav@krishimail.in",
    phone: "+91 94230-88192",
    location: "Niphad Village, Nashik",
    avatar: "B",
    badgeColor: "#ca8a04",
    landAcres: 4.5,
    primaryCrop: "Tomatoes & Onions",
    currentHarvestKg: 4500,
    fpoAffiliation: "Nashik Agri FPO Co-op"
  },
  {
    id: "company-1",
    name: "FreshFoods Pvt. Ltd.",
    role: "company",
    roleLabel: "Enterprise Bulk Buyer / Company",
    email: "procurement@freshfoods.in",
    phone: "+91 98200-11223",
    location: "Mumbai MMR, Maharashtra",
    avatar: "F",
    badgeColor: "#0d2f1b",
    gstin: "27AAACF1234F1Z8",
    activeRequirement: "100t Grade-A Tomatoes",
    monthlyVolumeTonnes: 450
  },
  {
    id: "consumer-1",
    name: "Priya Sharma",
    role: "consumer",
    roleLabel: "Retail Consumer / Household",
    email: "priya.sharma@gmail.com",
    phone: "+91 98199-44556",
    location: "Andheri West, Mumbai",
    avatar: "P",
    badgeColor: "#0284c7",
    householdMembers: 4,
    monthlyVegBasketKg: 35,
    activeOrdersCount: 2
  },
  {
    id: "admin-1",
    name: "Dr. Arvind Kulkarni",
    role: "admin",
    roleLabel: "Platform Master Administrator",
    email: "admin@krishisetu.gov.in",
    phone: "+91 99000-11000",
    location: "Agri-Tech Central Command, Pune",
    avatar: "A",
    badgeColor: "#7c2d12",
    adminLevel: "Super Admin (Level 1)",
    totalManagedFPOs: 14,
    totalManagedCompanies: 38,
    totalManagedFarmers: 1420,
    totalManagedConsumers: 8950
  }
];

// Master Admin Data Registries with Rich State & District Hierarchy
export const MASTER_ADMIN_DATA = {
  stats: {
    totalFPOs: 20,
    totalCompanies: 38,
    totalFarmers: 1420,
    totalConsumers: 8950,
    platformGMV: "₹4.82 Cr",
    activeEscrowLocked: "₹68.4 L",
    completedDispatches: 324,
    qualityPassRate: "98.4%"
  },
  allFPOs: [
    // Maharashtra - Nashik District (3 FPOs)
    {
      id: "FPO-MH-01",
      name: "Nashik Agri Farmer Producer Co-op",
      state: "Maharashtra",
      district: "Nashik",
      taluka: "Niphad",
      pincode: "422303",
      regNo: "FPO-MH-2021-0089",
      farmers: 112,
      pooledVolume: "45.0 Tonnes",
      pooledVolumeKg: 45000,
      primaryCrops: "Roma Tomatoes, Hybrid Tomatoes, Bell Peppers",
      verifiedGrade: "Grade-A Export Certified",
      directorName: "Rameshwar Patil",
      phone: "+91 94222-77889",
      email: "director@nashikagrifpo.org",
      address: "Survey No. 45, Niphad Agri Mandi Bypass, Nashik - 422303",
      weighbridgeCalibrated: true,
      activeRequests: 4,
      status: "Active Verified"
    },
    {
      id: "FPO-MH-02",
      name: "Panchavati Organic Producers Co.",
      state: "Maharashtra",
      district: "Nashik",
      taluka: "Trimbak",
      pincode: "422212",
      regNo: "FPO-MH-2022-0142",
      farmers: 94,
      pooledVolume: "28.5 Tonnes",
      pooledVolumeKg: 28500,
      primaryCrops: "Organic Roma Tomatoes, Leafy Spinach, Coriander",
      verifiedGrade: "Jaivik Bharat Certified",
      directorName: "Anand Deshmukh",
      phone: "+91 97631-44552",
      email: "contact@panchavatiorganic.in",
      address: "Panchavati Agro Cluster, Trimbak Road, Nashik - 422212",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },
    {
      id: "FPO-MH-03",
      name: "Godavari Valley Agro Producer Co.",
      state: "Maharashtra",
      district: "Nashik",
      taluka: "Nashik Rural",
      pincode: "422003",
      regNo: "FPO-MH-2023-0211",
      farmers: 78,
      pooledVolume: "35.0 Tonnes",
      pooledVolumeKg: 35000,
      primaryCrops: "Export Grapes, Red Onions, Tomatoes",
      verifiedGrade: "GlobalGAP Certified",
      directorName: "Sunita Gade",
      phone: "+91 94222-33441",
      email: "info@godavarivalleyagro.com",
      address: "Ghatkopar Phata, Godavari Agro Hub, Nashik - 422003",
      weighbridgeCalibrated: true,
      activeRequests: 3,
      status: "Active Verified"
    },

    // Maharashtra - Dindori District (2 FPOs)
    {
      id: "FPO-MH-04",
      name: "Sahyadri Farmers Producer Co.",
      state: "Maharashtra",
      district: "Dindori",
      taluka: "Dindori",
      pincode: "422202",
      regNo: "FPO-MH-2019-0012",
      farmers: 280,
      pooledVolume: "120.0 Tonnes",
      pooledVolumeKg: 120000,
      primaryCrops: "Seedless Table Grapes, Processing Tomatoes, Pomegranate",
      verifiedGrade: "GlobalGAP & BRCGS Grade A+",
      directorName: "Vilas Shinde",
      phone: "+91 98220-55441",
      email: "vilas.shinde@sahyadrifarms.com",
      address: "Sahyadri Mega Food Park, Mohadi, Dindori - 422202",
      weighbridgeCalibrated: true,
      activeRequests: 6,
      status: "Active Verified"
    },
    {
      id: "FPO-MH-05",
      name: "Dindori Bio-Growers Federation",
      state: "Maharashtra",
      district: "Dindori",
      taluka: "Vani Road",
      pincode: "422209",
      regNo: "FPO-MH-2023-0189",
      farmers: 82,
      pooledVolume: "24.0 Tonnes",
      pooledVolumeKg: 24000,
      primaryCrops: "Zero-Residue Spinach, Bell Peppers, Coriander",
      verifiedGrade: "100% Pesticide-Residue Free",
      directorName: "Kavita Gaikwad",
      phone: "+91 98605-33445",
      email: "info@dindoribiogrowers.org",
      address: "Vani Cross Road, Dindori Rural, Dindori - 422209",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },

    // Maharashtra - Sinnar District (2 FPOs)
    {
      id: "FPO-MH-06",
      name: "Godavari Krishak Producer Co.",
      state: "Maharashtra",
      district: "Sinnar",
      taluka: "Sinnar",
      pincode: "422103",
      regNo: "FPO-MH-2021-0078",
      farmers: 85,
      pooledVolume: "32.0 Tonnes",
      pooledVolumeKg: 32000,
      primaryCrops: "GI Nashik Red Onions (55mm+), Garlic",
      verifiedGrade: "GI Tag Certified & Grade-1",
      directorName: "Kishore Bhalerao",
      phone: "+91 99750-88192",
      email: "kishore@godavarikrishak.in",
      address: "MIDC Industrial Phase 2, Sinnar - 422103",
      weighbridgeCalibrated: true,
      activeRequests: 3,
      status: "Active Verified"
    },
    {
      id: "FPO-MH-07",
      name: "Sinnar Red Onion Producers Co.",
      state: "Maharashtra",
      district: "Sinnar",
      taluka: "Panchale",
      pincode: "422106",
      regNo: "FPO-MH-2022-0199",
      farmers: 68,
      pooledVolume: "29.0 Tonnes",
      pooledVolumeKg: 29000,
      primaryCrops: "Cured Storage Red Onions, Garlic",
      verifiedGrade: "Grade-A APMC Standard",
      directorName: "Pandurang Pawar",
      phone: "+91 97654-77889",
      email: "contact@sinnaronionfpo.in",
      address: "Panchale Agro Storage Yard, Sinnar - 422106",
      weighbridgeCalibrated: true,
      activeRequests: 1,
      status: "Active Verified"
    },

    // Maharashtra - Pune District (2 FPOs)
    {
      id: "FPO-MH-08",
      name: "Pune Organic Kisan Cluster",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Haveli",
      pincode: "411028",
      regNo: "FPO-MH-2020-0044",
      farmers: 140,
      pooledVolume: "68.0 Tonnes",
      pooledVolumeKg: 68000,
      primaryCrops: "Polyhouse Capsicum, Exotic Vegetables, Tomatoes",
      verifiedGrade: "Jaivik Bharat & NPOP Organic",
      directorName: "Dr. Sanjay Deshpande",
      phone: "+91 98221-88990",
      email: "sanjay@puneorganickisan.org",
      address: "Manjri Green Cluster, Pune-Solapur Highway, Pune - 411028",
      weighbridgeCalibrated: true,
      activeRequests: 5,
      status: "Active Verified"
    },
    {
      id: "FPO-MH-09",
      name: "Khed Shivapur Farmer Agro Co.",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Khed",
      pincode: "410501",
      regNo: "FPO-MH-2023-0301",
      farmers: 110,
      pooledVolume: "42.0 Tonnes",
      pooledVolumeKg: 42000,
      primaryCrops: "Potatoes, Onions, Field Tomatoes",
      verifiedGrade: "FSSAI Grade-1",
      directorName: "Mahadev Jagtap",
      phone: "+91 98901-44332",
      email: "contact@khedagro.in",
      address: "Chakan-Khed Industrial Bypass, Pune - 410501",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },

    // Maharashtra - Ahmednagar District (2 FPOs)
    {
      id: "FPO-MH-10",
      name: "Ahmednagar Agro Consortium",
      state: "Maharashtra",
      district: "Ahmednagar",
      taluka: "Rahata",
      pincode: "423107",
      regNo: "FPO-MH-2021-0112",
      farmers: 96,
      pooledVolume: "38.5 Tonnes",
      pooledVolumeKg: 38500,
      primaryCrops: "Pomegranate, Guava, Processing Tomatoes",
      verifiedGrade: "APEDA Export Standard",
      directorName: "Nitin Vikhe",
      phone: "+91 94231-55667",
      email: "nitin@nagaragroconsortium.org",
      address: "Shirdi-Rahata Road, Ahmednagar - 423107",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Review Pending"
    },
    {
      id: "FPO-MH-11",
      name: "Shirdi Krishak Producer Co.",
      state: "Maharashtra",
      district: "Ahmednagar",
      taluka: "Kopargaon",
      pincode: "423601",
      regNo: "FPO-MH-2022-0245",
      farmers: 74,
      pooledVolume: "26.0 Tonnes",
      pooledVolumeKg: 26000,
      primaryCrops: "Sugarcane Byproducts, Millets, Tomatoes",
      verifiedGrade: "Grade-A Quality",
      directorName: "Ganesh Tambe",
      phone: "+91 98223-77112",
      email: "shirdikrishak@agrifpo.in",
      address: "Kopargaon APMC Yard Gate 3, Ahmednagar - 423601",
      weighbridgeCalibrated: true,
      activeRequests: 1,
      status: "Active Verified"
    },

    // Maharashtra - Satara District (1 FPO)
    {
      id: "FPO-MH-12",
      name: "Mahabaleshwar Strawberry & Fruit Producer Co.",
      state: "Maharashtra",
      district: "Satara",
      taluka: "Mahabaleshwar",
      pincode: "412806",
      regNo: "FPO-MH-2020-0081",
      farmers: 135,
      pooledVolume: "48.0 Tonnes",
      pooledVolumeKg: 48000,
      primaryCrops: "GI Mahabaleshwar Strawberries, Fresh Ginger, Raspberries",
      verifiedGrade: "GI Tag Certified & Cold Chain Graded",
      directorName: "Balwantrao Bhilare",
      phone: "+91 98220-11998",
      email: "contact@mahabaleshwarberry.in",
      address: "Panchgani-Mahabaleshwar Road, Satara - 412806",
      weighbridgeCalibrated: true,
      activeRequests: 3,
      status: "Active Verified"
    },

    // Karnataka - Belagavi District (2 FPOs)
    {
      id: "FPO-KA-01",
      name: "Belagavi Horticulture Farmer Co.",
      state: "Karnataka",
      district: "Belagavi",
      taluka: "Chikkodi",
      pincode: "591201",
      regNo: "FPO-KA-2021-0034",
      farmers: 120,
      pooledVolume: "54.0 Tonnes",
      pooledVolumeKg: 54000,
      primaryCrops: "Fresh Green Chillies, Tomatoes, Bell Peppers",
      verifiedGrade: "GlobalGAP Export Grade",
      directorName: "Basavaraj Patil",
      phone: "+91 98450-11223",
      email: "basavaraj@belagavihorti.org",
      address: "APMC Yard Road, Chikkodi, Belagavi - 591201",
      weighbridgeCalibrated: true,
      activeRequests: 3,
      status: "Active Verified"
    },
    {
      id: "FPO-KA-02",
      name: "Gokak Agro Producer Union",
      state: "Karnataka",
      district: "Belagavi",
      taluka: "Gokak",
      pincode: "591307",
      regNo: "FPO-KA-2022-0118",
      farmers: 88,
      pooledVolume: "31.5 Tonnes",
      pooledVolumeKg: 31500,
      primaryCrops: "Hybrid Maize, Red Tomatoes, Onions",
      verifiedGrade: "Grade-A Commercial",
      directorName: "Mallikarjun Hiremath",
      phone: "+91 98801-77884",
      email: "info@gokakagro.in",
      address: "Falls Road, Gokak Rural, Belagavi - 591307",
      weighbridgeCalibrated: true,
      activeRequests: 1,
      status: "Active Verified"
    },

    // Karnataka - Kolar District (2 FPOs)
    {
      id: "FPO-KA-03",
      name: "Kolar Tomato Growers Producer Co.",
      state: "Karnataka",
      district: "Kolar",
      taluka: "Kolar",
      pincode: "563101",
      regNo: "FPO-KA-2020-0019",
      farmers: 165,
      pooledVolume: "85.0 Tonnes",
      pooledVolumeKg: 85000,
      primaryCrops: "Kolar Mandi Grade-A Hybrid Tomatoes, Cabbage",
      verifiedGrade: "APEDA & FSSAI Certified",
      directorName: "Venkata Reddy",
      phone: "+91 98440-33221",
      email: "venkat@kolartomatofpo.in",
      address: "Kolar APMC Mega Yard Gate 1, Kolar - 563101",
      weighbridgeCalibrated: true,
      activeRequests: 4,
      status: "Active Verified"
    },
    {
      id: "FPO-KA-04",
      name: "Malur Farm Fresh Agro Federation",
      state: "Karnataka",
      district: "Kolar",
      taluka: "Malur",
      pincode: "563130",
      regNo: "FPO-KA-2023-0190",
      farmers: 92,
      pooledVolume: "36.0 Tonnes",
      pooledVolumeKg: 36000,
      primaryCrops: "Capsicum, Carrot, Green Peas, Tomatoes",
      verifiedGrade: "Zero Residue Clean Green",
      directorName: "Channappa Gowda",
      phone: "+91 99002-88771",
      email: "contact@malurfarmfresh.org",
      address: "Industrial Area Phase 1, Malur, Kolar - 563130",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },

    // Madhya Pradesh - Indore District (2 FPOs)
    {
      id: "FPO-MP-01",
      name: "Malwa Krishi Producer Co.",
      state: "Madhya Pradesh",
      district: "Indore",
      taluka: "Sanwer",
      pincode: "453551",
      regNo: "FPO-MP-2021-0056",
      farmers: 130,
      pooledVolume: "58.0 Tonnes",
      pooledVolumeKg: 58000,
      primaryCrops: "Processing Potatoes (Chip-Grade), Garlic, Wheat",
      verifiedGrade: "ISO 22000 Grade-A",
      directorName: "Devendra Patel",
      phone: "+91 98260-11229",
      email: "devendra@malwakrishifpo.org",
      address: "Sanwer Agri Corridor, Ujjain-Indore Road, Indore - 453551",
      weighbridgeCalibrated: true,
      activeRequests: 3,
      status: "Active Verified"
    },
    {
      id: "FPO-MP-02",
      name: "Indore Organic Agro Federation",
      state: "Madhya Pradesh",
      district: "Indore",
      taluka: "Depalpur",
      pincode: "453115",
      regNo: "FPO-MP-2022-0140",
      farmers: 76,
      pooledVolume: "27.5 Tonnes",
      pooledVolumeKg: 27500,
      primaryCrops: "Organic Soyabean, Onions, Green Vegetables",
      verifiedGrade: "NPOP Organic Certified",
      directorName: "Radheshyam Sharma",
      phone: "+91 98930-44558",
      email: "contact@indoreorganic.in",
      address: "Depalpur Mandi Complex, Indore - 453115",
      weighbridgeCalibrated: true,
      activeRequests: 1,
      status: "Active Verified"
    },

    // Madhya Pradesh - Ratlam District (1 FPO)
    {
      id: "FPO-MP-03",
      name: "Ratlam Garlic & Onion Producer Co.",
      state: "Madhya Pradesh",
      district: "Ratlam",
      taluka: "Jaora",
      pincode: "457226",
      regNo: "FPO-MP-2021-0099",
      farmers: 105,
      pooledVolume: "46.0 Tonnes",
      pooledVolumeKg: 46000,
      primaryCrops: "GI Ratlami Garlic, Storage Red Onions",
      verifiedGrade: "GI Tag Certified & Grade-1",
      directorName: "Mukesh Patidar",
      phone: "+91 98270-33441",
      email: "mukesh@ratlamgarlicfpo.in",
      address: "Jaora Mandi Gate, Ratlam - 457226",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },

    // Gujarat - Anand District (2 FPOs)
    {
      id: "FPO-GJ-01",
      name: "Amul Charotar Vegetable Producer Co.",
      state: "Gujarat",
      district: "Anand",
      taluka: "Anand",
      pincode: "388001",
      regNo: "FPO-GJ-2020-0028",
      farmers: 155,
      pooledVolume: "72.0 Tonnes",
      pooledVolumeKg: 72000,
      primaryCrops: "Processing Tomatoes, Sweet Corn, Okra",
      verifiedGrade: "BRCGS Food Safety Certified",
      directorName: "Kiritbhai Patel",
      phone: "+91 98250-99881",
      email: "kirit@charotarveg.coop",
      address: "Amul Dairy Road, Anand - 388001",
      weighbridgeCalibrated: true,
      activeRequests: 4,
      status: "Active Verified"
    },
    {
      id: "FPO-GJ-02",
      name: "Kheda Agro Farmer Co.",
      state: "Gujarat",
      district: "Anand",
      taluka: "Nadiad Border",
      pincode: "388120",
      regNo: "FPO-GJ-2022-0177",
      farmers: 84,
      pooledVolume: "33.0 Tonnes",
      pooledVolumeKg: 33000,
      primaryCrops: "Cauliflower, Cabbage, Farm Tomatoes",
      verifiedGrade: "Grade-A Quality",
      directorName: "Hitesh Prajapati",
      phone: "+91 98790-22114",
      email: "info@khedaagro.in",
      address: "NH-48 Express Highway Junction, Anand - 388120",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    },

    // Gujarat - Surat District (1 FPO)
    {
      id: "FPO-GJ-03",
      name: "Tapi Valley Fruit & Farm Co-op",
      state: "Gujarat",
      district: "Surat",
      taluka: "Kamrej",
      pincode: "394180",
      regNo: "FPO-GJ-2021-0082",
      farmers: 98,
      pooledVolume: "41.0 Tonnes",
      pooledVolumeKg: 41000,
      primaryCrops: "Papaya, Export Bananas, Farm Green Vegetables",
      verifiedGrade: "APEDA Export Certified",
      directorName: "Jignesh Desai",
      phone: "+91 98241-66775",
      email: "jignesh@tapivalleyagro.com",
      address: "Kamrej Char Rasta, Surat - 394180",
      weighbridgeCalibrated: true,
      activeRequests: 2,
      status: "Active Verified"
    }
  ],

  allCompanies: [
    {
      id: "COMP-01",
      name: "FreshFoods Pvt. Ltd.",
      type: "Food Processor & Retail Chain",
      gstin: "27AAACF1234F1Z8",
      cin: "U15400MH2016PTC284920",
      city: "Mumbai",
      headquarters: "Bhiwandi Central Logistics Park, Thane / Mumbai - 421302",
      procurementHead: "Vikram Malhotra",
      phone: "+91 98200-11223",
      email: "procurement@freshfoods.in",
      activeDemand: "100 Tonnes Grade-A Roma Tomatoes",
      activeDemandsCount: 2,
      monthlyProcurementVolumeTonnes: 450,
      escrowDeposited: "₹23.8 L",
      escrowStatus: "Secured in Multi-Sig Vault",
      telemetryTracking: "Live GPS + Reefer (<12°C)",
      contractDuration: "Annual Forward Contract (2026-27)",
      matchedFPOs: ["Nashik Agri FPO (Niphad)", "Godavari Krishak FPO (Sinnar)"],
      status: "Approved & Active"
    },
    {
      id: "COMP-02",
      name: "BigBasket Direct Agri",
      type: "Quick-Commerce / E-Grocery Supply",
      gstin: "29AABCB5566G1Z2",
      cin: "U51909KA2011PTC058229",
      city: "Bengaluru & Mumbai Hubs",
      headquarters: "Whitefield Agro Tech Park, Bengaluru - 560066",
      procurementHead: "Ananya Sengupta",
      phone: "+91 98450-77661",
      email: "ananya.sengupta@bigbasket.com",
      activeDemand: "150 Tonnes Mixed Veggies (Spinach, Capsicum, Grapes)",
      activeDemandsCount: 4,
      monthlyProcurementVolumeTonnes: 820,
      escrowDeposited: "₹38.5 L",
      escrowStatus: "Secured in Multi-Sig Vault",
      telemetryTracking: "Live Returnable Plastic Crates (RPC) RFID",
      contractDuration: "Quarterly Fixed Delivery Schedule",
      matchedFPOs: ["Sahyadri Farmers Producer Co.", "Pune Organic Kisan Cluster", "Malur Farm Fresh Agro"],
      status: "Approved & Active"
    },
    {
      id: "COMP-03",
      name: "ITC Agri-Business Division",
      type: "Institutional Food Processing",
      gstin: "19AAACI1122H1Z1",
      cin: "L16005WB1910PLC001985",
      city: "Pune & Kolkata",
      headquarters: "Ranjangaon Industrial Processing Center, Pune - 412209",
      procurementHead: "Suresh Nambiar",
      phone: "+91 98230-99881",
      email: "suresh.nambiar@itc.in",
      activeDemand: "300 Tonnes Processing Potatoes (Chip-Grade)",
      activeDemandsCount: 1,
      monthlyProcurementVolumeTonnes: 1200,
      escrowDeposited: "₹52.0 L",
      escrowStatus: "Secured in Multi-Sig Vault",
      telemetryTracking: "Specific Gravity & Sugar Sensor Logs",
      contractDuration: "Direct Buyback Agreement",
      matchedFPOs: ["Malwa Krishi Producer Co. (Indore)", "Ahmednagar Agro Consortium"],
      status: "Approved & Active"
    },
    {
      id: "COMP-04",
      name: "Reliance Fresh Sourcing Hub",
      type: "Supermarket Retail Hypermarket",
      gstin: "27AABCR9988P1Z4",
      cin: "U52100MH2006PLC162985",
      city: "Thane & Navi Mumbai",
      headquarters: "Ghansoli Central Distribution Hub, Navi Mumbai - 400701",
      procurementHead: "Mahesh Rathi",
      phone: "+91 98110-33445",
      email: "mahesh.rathi@ril.com",
      activeDemand: "80 Tonnes Nashik Red Onions (55mm+)",
      activeDemandsCount: 3,
      monthlyProcurementVolumeTonnes: 600,
      escrowDeposited: "₹18.2 L",
      escrowStatus: "Secured in Multi-Sig Vault",
      telemetryTracking: "Direct APEDA Mesh Bag QR Code",
      contractDuration: "Bi-Weekly Rolling Delivery",
      matchedFPOs: ["Godavari Krishak FPO (Sinnar)", "Sinnar Red Onion Producers"],
      status: "Approved & Active"
    },
    {
      id: "COMP-05",
      name: "Zomato Hyperpure Agri",
      type: "HORECA (Hotel / Restaurant) Sourcing",
      gstin: "07AAACZ3322D1Z9",
      cin: "U74999DL2018PTC333420",
      city: "Mumbai & Pune MMR",
      headquarters: "Bhiwandi Hub 4, Thane - 421302",
      procurementHead: "Deepak Chawla",
      phone: "+91 98101-55443",
      email: "deepak.chawla@hyperpure.com",
      activeDemand: "60 Tonnes Daily Kitchen Vegetables",
      activeDemandsCount: 2,
      monthlyProcurementVolumeTonnes: 320,
      escrowDeposited: "₹14.6 L",
      escrowStatus: "Secured in Multi-Sig Vault",
      telemetryTracking: "Daily Morning 5 AM Delivery Window",
      contractDuration: "Monthly Flexible Reorder",
      matchedFPOs: ["Panchavati Organic Producers", "Khed Shivapur Farmer Agro"],
      status: "Approved & Active"
    }
  ],

  allFarmers: [
    {
      id: "F-101",
      name: "Dnyaneshwar Shinde",
      village: "Dindori",
      district: "Nashik",
      state: "Maharashtra",
      landAcres: 3.8,
      crop: "Roma Tomatoes (Export Grade)",
      harvestKg: 3200,
      readyDate: "Ready in 2 days",
      fpoAffiliation: "Sahyadri Farmers Producer Co.",
      phone: "+91 98221-11223",
      bankPayout: "₹76,160",
      bankAccount: "SBI A/C •••• 4921 (UPI: dnyaneshwar@sbi)",
      mandiRate: "₹18.00 / kg",
      platformRate: "₹23.80 / kg",
      rateRealizationBonus: "+₹5.80 / kg (+32.2% higher)",
      techStatus: "Smartphone (KisanSetu App)",
      pickupStatus: "Logistics Van Scheduled (Route #4)",
      status: "Harvest Ready"
    },
    {
      id: "F-102",
      name: "Balasaheb Jadhav",
      village: "Niphad",
      district: "Nashik",
      state: "Maharashtra",
      landAcres: 4.5,
      crop: "Hybrid Roma Tomatoes",
      harvestKg: 4500,
      readyDate: "Harvested Today",
      fpoAffiliation: "Nashik Agri FPO Co-op",
      phone: "+91 94230-88192",
      bankPayout: "₹1,07,100",
      bankAccount: "Bank of Maharashtra •••• 8812 (NEFT)",
      mandiRate: "₹17.60 / kg",
      platformRate: "₹23.80 / kg",
      rateRealizationBonus: "+₹6.20 / kg (+35.2% higher)",
      techStatus: "Offline GSM (SMS #88192)",
      pickupStatus: "Dispatched to Niphad Collection Hub",
      status: "In Transit to Hub"
    },
    {
      id: "F-103",
      name: "Kavita Gaikwad",
      village: "Chandwad",
      district: "Nashik",
      state: "Maharashtra",
      landAcres: 2.5,
      crop: "Organic Crisp Spinach & Coriander",
      harvestKg: 2800,
      readyDate: "Tomorrow 6:00 AM",
      fpoAffiliation: "Sahyadri Bio-Growers Federation",
      phone: "+91 98605-33445",
      bankPayout: "₹66,640",
      bankAccount: "HDFC Bank •••• 3341 (UPI: kavita@okhdfc)",
      mandiRate: "₹16.30 / kg",
      platformRate: "₹23.80 / kg",
      rateRealizationBonus: "+₹7.50 / kg (+46.0% higher)",
      techStatus: "Offline / FPO Field Lead Assisted",
      pickupStatus: "Reefer Van Allocated",
      status: "Inspection Scheduled"
    },
    {
      id: "F-104",
      name: "Pandurang Pawar",
      village: "Sinnar",
      district: "Nashik",
      state: "Maharashtra",
      landAcres: 6.0,
      crop: "Nashik Red Onions (GI Tagged)",
      harvestKg: 5100,
      readyDate: "Cured in Storage Shed",
      fpoAffiliation: "Godavari Krishak Producer Co.",
      phone: "+91 97654-77889",
      bankPayout: "₹1,21,380",
      bankAccount: "Union Bank •••• 9920 (NEFT)",
      mandiRate: "₹18.90 / kg",
      platformRate: "₹23.80 / kg",
      rateRealizationBonus: "+₹4.90 / kg (+25.9% higher)",
      techStatus: "Smartphone (KisanSetu App)",
      pickupStatus: "Payout Released via Direct Bank Transfer",
      status: "Payout Settled"
    },
    {
      id: "F-105",
      name: "Santosh Deshmukh",
      village: "Trimbak",
      district: "Nashik",
      state: "Maharashtra",
      landAcres: 5.2,
      crop: "Naturally Cured Red Onions",
      harvestKg: 6200,
      readyDate: "Harvested & Graded",
      fpoAffiliation: "Panchavati Organic Producers",
      phone: "+91 98233-66554",
      bankPayout: "₹1,48,800",
      bankAccount: "ICICI Bank •••• 7710 (UPI: santosh@icici)",
      mandiRate: "₹18.00 / kg",
      platformRate: "₹24.00 / kg",
      rateRealizationBonus: "+₹6.00 / kg (+33.3% higher)",
      techStatus: "Offline GSM (IVR Automated Voice)",
      pickupStatus: "Direct Bulk Truck Assigned",
      status: "Pickup in Progress"
    },
    {
      id: "F-106",
      name: "Basavaraj Patil",
      village: "Chikkodi",
      district: "Belagavi",
      state: "Karnataka",
      landAcres: 4.0,
      crop: "Green Chillies & Tomatoes",
      harvestKg: 3800,
      readyDate: "Ready in 3 days",
      fpoAffiliation: "Belagavi Horticulture Farmer Co.",
      phone: "+91 98450-11223",
      bankPayout: "₹90,440",
      bankAccount: "Canara Bank •••• 1184 (NEFT)",
      mandiRate: "₹17.50 / kg",
      platformRate: "₹23.80 / kg",
      rateRealizationBonus: "+₹6.30 / kg (+36.0% higher)",
      techStatus: "Smartphone (KisanSetu App)",
      pickupStatus: "Quality Pass Verified",
      status: "Harvest Ready"
    }
  ],

  allConsumers: [
    {
      id: "CONS-01",
      name: "Priya Sharma",
      phone: "+91 97654-32100",
      email: "priya.sharma@gmail.com",
      city: "Mumbai",
      area: "Andheri West",
      address: "Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053",
      thisMonthRequestsCount: 3,
      thisMonthKg: 42,
      thisMonthCrates: 11,
      lifetimeOrdersCount: 14,
      lifetimeKg: 196,
      registrationDate: "14 Jan 2026",
      verificationStatus: "Verified Household",
      favoriteProduce: "Roma Tomatoes & Baby Spinach",
      lastRequestTime: "12 mins ago",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C01",
          date: "Today, 10:45 AM",
          items: [
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" },
            { name: "Crisp Farm Baby Spinach & Coriander", quantityCrates: 1, totalKg: 2, grade: "Residue Free" }
          ],
          totalCrates: 3,
          totalKg: 12,
          deliveryAddress: "Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053",
          specialRequest: "Please ensure morning delivery before 10 AM. Organic certified produce preferred for elderly family members.",
          assignedFPO: "Nashik Agri FPO (Niphad Hub)",
          status: "Pending Admin Approval"
        },
        {
          orderId: "REQ-C05",
          date: "28 Aug 2026",
          items: [
            { name: "Nashik GI-Tagged Red Onions", quantityCrates: 2, totalKg: 20, grade: "GI 55mm+ Medium" }
          ],
          totalCrates: 2,
          totalKg: 20,
          deliveryAddress: "Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053",
          specialRequest: "Looking for medium-sized clean onions with zero sprouting. Direct doorstep drop-off.",
          assignedFPO: "Godavari Krishak FPO (Sinnar)",
          status: "Delivered & Verified"
        },
        {
          orderId: "REQ-C09",
          date: "14 Aug 2026",
          items: [
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" }
          ],
          totalCrates: 2,
          totalKg: 10,
          deliveryAddress: "Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053",
          specialRequest: "Packed in ventilated returnable crates. Keep in shade at security desk if away.",
          assignedFPO: "Nashik Agri FPO",
          status: "Delivered & Verified"
        }
      ]
    },
    {
      id: "CONS-02",
      name: "Amitabh Banerjee",
      phone: "+91 98220-44551",
      email: "amitabh.banerjee@techcorp.in",
      city: "Pune",
      area: "Kothrud",
      address: "Row House #12, Sahakar Nagar, Kothrud, Pune - 411038",
      thisMonthRequestsCount: 2,
      thisMonthKg: 28,
      thisMonthCrates: 7,
      lifetimeOrdersCount: 8,
      lifetimeKg: 112,
      registrationDate: "03 Feb 2026",
      verificationStatus: "Verified Household",
      favoriteProduce: "Premium Dindori Seedless Grapes",
      lastRequestTime: "1 hour ago",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C02",
          date: "Today, 09:30 AM",
          items: [
            { name: "Premium Dindori Seedless Grapes", quantityCrates: 3, totalKg: 12, grade: "GlobalGAP Export (Brix 18°+)" }
          ],
          totalCrates: 3,
          totalKg: 12,
          deliveryAddress: "Row House #12, Sahakar Nagar, Kothrud, Pune - 411038",
          specialRequest: "Need sweet table grapes (high brix) for a weekend family gathering. Cold-packed crates required.",
          assignedFPO: "Sahyadri Farmers Producer Co. (Dindori)",
          status: "FPO Assigned & Processing"
        },
        {
          orderId: "REQ-C07",
          date: "19 Aug 2026",
          items: [
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" },
            { name: "Crisp Farm Baby Spinach", quantityCrates: 2, totalKg: 6, grade: "Residue Free" }
          ],
          totalCrates: 4,
          totalKg: 16,
          deliveryAddress: "Row House #12, Sahakar Nagar, Kothrud, Pune - 411038",
          specialRequest: "Deliver fresh morning lot harvested same day.",
          assignedFPO: "Pune Organic Kisan Cluster",
          status: "Delivered & Verified"
        }
      ]
    },
    {
      id: "CONS-03",
      name: "Sunita Kulkarni",
      phone: "+91 94231-77889",
      email: "sunita.kulkarni@yahoo.co.in",
      city: "Thane",
      area: "Thane West (Manpada)",
      address: "B-801, Neelkanth Woods, Manpada, Thane West - 400607",
      thisMonthRequestsCount: 4,
      thisMonthKg: 65,
      thisMonthCrates: 16,
      lifetimeOrdersCount: 21,
      lifetimeKg: 294,
      registrationDate: "18 Dec 2025",
      verificationStatus: "Verified Resident Lead",
      favoriteProduce: "Weekly Mixed Veggie Basket & Red Onions",
      lastRequestTime: "3 hours ago",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C03",
          date: "Today, 07:15 AM",
          items: [
            { name: "Nashik GI-Tagged Red Onions", quantityCrates: 2, totalKg: 20, grade: "GI 55mm+ Medium" },
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" }
          ],
          totalCrates: 4,
          totalKg: 30,
          deliveryAddress: "B-801, Neelkanth Woods, Manpada, Thane West - 400607",
          specialRequest: "Looking for medium-sized 55mm+ onions without sprouting. Doorstep delivery requested.",
          assignedFPO: "Godavari Krishak FPO (Sinnar)",
          status: "Dispatched from Hub"
        },
        {
          orderId: "REQ-C08",
          date: "22 Aug 2026",
          items: [
            { name: "Premium Dindori Seedless Grapes", quantityCrates: 2, totalKg: 8, grade: "GlobalGAP Export" },
            { name: "Crisp Farm Baby Spinach & Coriander", quantityCrates: 2, totalKg: 4, grade: "Residue Free" }
          ],
          totalCrates: 4,
          totalKg: 12,
          deliveryAddress: "B-801, Neelkanth Woods, Manpada, Thane West - 400607",
          specialRequest: "Society bulk request for building B-wing residents.",
          assignedFPO: "Sahyadri Bio-Growers Federation",
          status: "Delivered & Verified"
        },
        {
          orderId: "REQ-C11",
          date: "12 Aug 2026",
          items: [
            { name: "Nashik GI-Tagged Red Onions", quantityCrates: 1, totalKg: 10, grade: "GI Tagged" },
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" }
          ],
          totalCrates: 3,
          totalKg: 20,
          deliveryAddress: "B-801, Neelkanth Woods, Manpada, Thane West - 400607",
          specialRequest: "Standard doorstep delivery.",
          assignedFPO: "Nashik Agri FPO",
          status: "Delivered & Verified"
        }
      ]
    },
    {
      id: "CONS-04",
      name: "Rajesh Varma",
      phone: "+91 98901-22334",
      email: "rajesh.varma@vashiagro.in",
      city: "Navi Mumbai",
      area: "Vashi (Palm Beach)",
      address: "Sector 17, Palm Beach Road, Vashi, Navi Mumbai - 400703",
      thisMonthRequestsCount: 1,
      thisMonthKg: 20,
      thisMonthCrates: 4,
      lifetimeOrdersCount: 5,
      lifetimeKg: 70,
      registrationDate: "10 Mar 2026",
      verificationStatus: "Verified Society Coordinator",
      favoriteProduce: "Fresh Roma Farm Tomatoes",
      lastRequestTime: "Yesterday",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C04",
          date: "Yesterday, 04:20 PM",
          items: [
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 4, totalKg: 20, grade: "Grade-A Export" }
          ],
          totalCrates: 4,
          totalKg: 20,
          deliveryAddress: "Sector 17, Palm Beach Road, Vashi, Navi Mumbai - 400703",
          specialRequest: "Direct delivery for society group purchase. Coordinate with security gate upon arrival.",
          assignedFPO: "Nashik Agri FPO (Niphad Hub)",
          status: "Delivered & Verified"
        }
      ]
    },
    {
      id: "CONS-05",
      name: "Dr. Anita Desai",
      phone: "+91 98200-99441",
      email: "dr.anita@desaiklinik.org",
      city: "Mumbai",
      area: "Bandra Kurla Complex",
      address: "1202, Crescent Heights, BKC Road, Bandra East, Mumbai - 400051",
      thisMonthRequestsCount: 2,
      thisMonthKg: 35,
      thisMonthCrates: 8,
      lifetimeOrdersCount: 9,
      lifetimeKg: 126,
      registrationDate: "24 Jan 2026",
      verificationStatus: "Verified Household",
      favoriteProduce: "Residue-Free Spinach & Seedless Grapes",
      lastRequestTime: "2 days ago",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C12",
          date: "02 Sep 2026",
          items: [
            { name: "Crisp Farm Baby Spinach & Coriander", quantityCrates: 2, totalKg: 4, grade: "Residue Free" },
            { name: "Premium Dindori Seedless Grapes", quantityCrates: 2, totalKg: 8, grade: "GlobalGAP Export" },
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" }
          ],
          totalCrates: 6,
          totalKg: 22,
          deliveryAddress: "1202, Crescent Heights, BKC Road, Bandra East, Mumbai - 400051",
          specialRequest: "Strictly 100% chemical residue-free batch verification certificate required with delivery slip.",
          assignedFPO: "Sahyadri Bio-Growers Federation",
          status: "Dispatched from Hub"
        }
      ]
    },
    {
      id: "CONS-06",
      name: "Rohan Mehra",
      phone: "+91 98811-66552",
      email: "rohan.mehra@fintechhub.com",
      city: "Pune",
      area: "Hinjewadi Phase 1",
      address: "Flat 1004, Megapolis Splendour, Phase 3, Hinjewadi, Pune - 411057",
      thisMonthRequestsCount: 3,
      thisMonthKg: 48,
      thisMonthCrates: 12,
      lifetimeOrdersCount: 11,
      lifetimeKg: 154,
      registrationDate: "15 Jan 2026",
      verificationStatus: "Verified Tech Hub Lead",
      favoriteProduce: "Nashik Red Onions & Roma Tomatoes",
      lastRequestTime: "3 days ago",
      monthlyOrdersBreakdown: [
        {
          orderId: "REQ-C14",
          date: "01 Sep 2026",
          items: [
            { name: "Nashik GI-Tagged Red Onions", quantityCrates: 2, totalKg: 20, grade: "GI Tagged" },
            { name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10, grade: "Grade-A Export" }
          ],
          totalCrates: 4,
          totalKg: 30,
          deliveryAddress: "Flat 1004, Megapolis Splendour, Phase 3, Hinjewadi, Pune - 411057",
          specialRequest: "Weekend batch delivery to Hinjewadi Tech Park society club house.",
          assignedFPO: "Pune Organic Kisan Cluster",
          status: "Delivered & Verified"
        }
      ]
    }
  ]
};

// Consumer Retail Catalog (Direct from FPOs)
// Consumer Retail Catalog (Available Farm Produce from FPOs) - No Retail Prices
export const CONSUMER_CATALOG = [
  {
    id: "CAT-01",
    name: "Fresh Farm-Gate Roma Tomatoes",
    category: "Fresh Vegetables",
    fpoSource: "Nashik Agri FPO (Niphad)",
    farmerName: "Balasaheb Jadhav",
    crateWeightKg: 5,
    harvestTime: "Harvested 18 hrs ago",
    grade: "Grade-A Export Quality",
    imageEmoji: "🍅",
    inStockCrates: 45,
    totalAvailableKg: 225,
    specifications: "Firm red, uniform size (55-60mm), zero chemical wash, packed in ventilated crates"
  },
  {
    id: "CAT-02",
    name: "Nashik GI-Tagged Red Onions",
    category: "Roots & Tubers",
    fpoSource: "Godavari Krishak FPO (Sinnar)",
    farmerName: "Santosh Deshmukh",
    crateWeightKg: 10,
    harvestTime: "Naturally Cured & Graded",
    grade: "Grade-A Medium (55mm+)",
    imageEmoji: "🧅",
    inStockCrates: 80,
    totalAvailableKg: 800,
    specifications: "Long shelf life, 3-layer skin cured, GI certified Nashik origin"
  },
  {
    id: "CAT-03",
    name: "Crisp Farm Baby Spinach & Coriander",
    category: "Leafy Greens",
    fpoSource: "Sahyadri Bio-Growers (Dindori)",
    farmerName: "Kavita Gaikwad",
    crateWeightKg: 2,
    harvestTime: "Harvested this morning",
    grade: "100% Pesticide Residue Free",
    imageEmoji: "🥬",
    inStockCrates: 25,
    totalAvailableKg: 50,
    specifications: "Hydro-cooled roots, crisp tender leaves, chemical-free certified"
  },
  {
    id: "CAT-04",
    name: "Premium Dindori Seedless Grapes",
    category: "Fresh Fruits",
    fpoSource: "Sahyadri Farmers Producer Co.",
    farmerName: "Vilas Shinde",
    crateWeightKg: 4,
    harvestTime: "Cold-chain transported",
    grade: "GlobalGAP Export Grade",
    imageEmoji: "🍇",
    inStockCrates: 30,
    totalAvailableKg: 120,
    specifications: "Brix 18°+ sweetness, uniform bunches, pre-cooled to 2°C"
  }
];

// Initial Consumer Produce Quantity Orders & Requests to Admin
export const INITIAL_CONSUMER_REQUESTS = [
  {
    id: "REQ-C01",
    consumerId: "CONS-01",
    consumerName: "Priya Sharma",
    phone: "+91 97654-32100",
    city: "Mumbai (Andheri West)",
    address: "Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053",
    items: [
      { id: "CAT-01", name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10 },
      { id: "CAT-03", name: "Crisp Farm Baby Spinach & Coriander", quantityCrates: 1, totalKg: 2 }
    ],
    totalCrates: 3,
    totalKg: 12,
    specialRequest: "Please ensure morning delivery before 10 AM. Organic certified produce preferred for elderly family members.",
    status: "Pending Admin Approval",
    timestamp: "12 mins ago",
    assignedFPO: "Nashik Agri FPO (Niphad Hub)"
  },
  {
    id: "REQ-C02",
    consumerId: "CONS-02",
    consumerName: "Amitabh Banerjee",
    phone: "+91 98220-44551",
    city: "Pune (Kothrud)",
    address: "Row House #12, Sahakar Nagar, Kothrud, Pune - 411038",
    items: [
      { id: "CAT-04", name: "Premium Dindori Seedless Grapes", quantityCrates: 3, totalKg: 12 }
    ],
    totalCrates: 3,
    totalKg: 12,
    specialRequest: "Need sweet table grapes (high brix) for a weekend family gathering. Cold-packed crates required.",
    status: "FPO Assigned (Sahyadri)",
    timestamp: "1 hour ago",
    assignedFPO: "Sahyadri Farmers Producer Co."
  },
  {
    id: "REQ-C03",
    consumerId: "CONS-03",
    consumerName: "Sunita Kulkarni",
    phone: "+91 94231-77889",
    city: "Thane West",
    address: "B-801, Neelkanth Woods, Manpada, Thane West - 400607",
    items: [
      { id: "CAT-02", name: "Nashik GI-Tagged Red Onions", quantityCrates: 2, totalKg: 20 },
      { id: "CAT-01", name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 2, totalKg: 10 }
    ],
    totalCrates: 4,
    totalKg: 30,
    specialRequest: "Looking for medium sized 55mm+ onions without sprouting. Doorstep delivery requested.",
    status: "Dispatched from Hub",
    timestamp: "3 hours ago",
    assignedFPO: "Godavari Krishak FPO"
  },
  {
    id: "REQ-C04",
    consumerId: "CONS-04",
    consumerName: "Rajesh Varma",
    phone: "+91 98901-22334",
    city: "Navi Mumbai (Vashi)",
    address: "Sector 17, Palm Beach Road, Vashi, Navi Mumbai - 400703",
    items: [
      { id: "CAT-01", name: "Fresh Farm-Gate Roma Tomatoes", quantityCrates: 4, totalKg: 20 }
    ],
    totalCrates: 4,
    totalKg: 20,
    specialRequest: "Direct delivery for society group purchase. Coordinate with security gate upon arrival.",
    status: "Delivered",
    timestamp: "Yesterday",
    assignedFPO: "Nashik Agri FPO"
  }
];

// Initial Bulk Buyer (Company) Procurement Requests to Admin
export const INITIAL_COMPANY_REQUESTS = [
  {
    id: "REQ-B01",
    companyId: "COMP-01",
    companyName: "FreshFoods Pvt. Ltd.",
    contactPerson: "Vikram Malhotra (Head of Sourcing)",
    phone: "+91 98900-44332",
    city: "Mumbai / Bhiwandi Central Hub",
    crop: "Grade-A Tomatoes (Processing)",
    requestedQuantity: "100 Tonnes",
    deliveryDeadline: "Within 5 Days",
    specialRequest: "Requires continuous GPS + Reefer cold-chain temperature telemetry (<12°C). Batch laboratory test reports required before offloading.",
    escrowStatus: "₹23.8 L Locked",
    status: "Pending Admin Approval",
    timestamp: "25 mins ago",
    matchedFPOs: ["Nashik Agri FPO", "Godavari Krishak FPO"]
  },
  {
    id: "REQ-B02",
    companyId: "COMP-02",
    companyName: "BigBasket Direct Agri",
    contactPerson: "Ananya Sengupta (Category Manager)",
    phone: "+91 98450-77661",
    city: "Bengaluru & Mumbai Hubs",
    crop: "Mixed Vegetables (Spinach, Capsicum, Tomatoes)",
    requestedQuantity: "150 Tonnes",
    deliveryDeadline: "Within 7 Days",
    specialRequest: "Pesticide residue-free certification mandatory. Deliver in 20kg food-grade plastic returnable crates (RPCs).",
    escrowStatus: "₹38.5 L Locked",
    status: "In-Transit (Dispatched)",
    timestamp: "2 hours ago",
    matchedFPOs: ["Sahyadri Bio-Growers", "Pune Organic Kisan Cluster"]
  },
  {
    id: "REQ-B03",
    companyId: "COMP-03",
    companyName: "ITC Agri-Business Division",
    contactPerson: "Suresh Nambiar (Supply Chain Director)",
    phone: "+91 98230-99881",
    city: "Pune Processing Plant",
    crop: "Processing Potatoes (Chip-Grade)",
    requestedQuantity: "300 Tonnes",
    deliveryDeadline: "Within 12 Days",
    specialRequest: "Specific gravity >1.080 and low sugar content (<0.1%) for crispy snack processing. Quality inspection at farm-gate.",
    escrowStatus: "₹52.0 L Locked",
    status: "FPO Allocation In-Progress",
    timestamp: "5 hours ago",
    matchedFPOs: ["Ahmednagar Agro Consortium", "Pune Organic Cluster"]
  },
  {
    id: "REQ-B04",
    companyId: "COMP-04",
    companyName: "Reliance Fresh Sourcing Hub",
    contactPerson: "Mahesh Rathi (National Procurement)",
    phone: "+91 98110-33445",
    city: "Thane Distribution Center",
    crop: "Nashik Red Onions (55mm+ Medium)",
    requestedQuantity: "80 Tonnes",
    deliveryDeadline: "Within 3 Days",
    specialRequest: "Pre-graded in 25kg mesh bags directly from farm curing sheds. Direct dock delivery.",
    escrowStatus: "₹18.2 L Locked",
    status: "Fulfilled & Escrow Released",
    timestamp: "1 day ago",
    matchedFPOs: ["Godavari Krishak FPO"]
  }
];

// Initial Farmer Direct Harvest Supply & Payout Requests to Admin
export const INITIAL_FARMER_REQUESTS = [
  {
    id: "REQ-F01",
    farmerId: "F-101",
    farmerName: "Dnyaneshwar Shinde",
    village: "Dindori, Nashik",
    crop: "Roma Tomatoes (Export Grade)",
    harvestQuantity: "3,200 kg (3.2 t)",
    expectedHarvestDate: "Ready in 2 days",
    specialRequest: "Requesting farm-gate logistics pickup van. Direct UPI transfer preferred upon verified electronic weighbridge slip.",
    rateRealization: "+₹5.80/kg over APMC Mandi",
    status: "Approved & Scheduled for Pickup",
    timestamp: "30 mins ago",
    assignedFPO: "Sahyadri Farmers Producer Co."
  },
  {
    id: "REQ-F02",
    farmerId: "F-102",
    farmerName: "Balasaheb Jadhav",
    village: "Niphad, Nashik",
    crop: "Hybrid Tomatoes",
    harvestQuantity: "4,500 kg (4.5 t)",
    expectedHarvestDate: "Ready today",
    specialRequest: "Submitted via GSM Offline SMS (#88192). Immediate crate drop-off required at Niphad collection center.",
    rateRealization: "+₹6.20/kg over APMC Mandi",
    status: "Dispatched to Aggregation Hub",
    timestamp: "1 hour ago",
    assignedFPO: "Nashik Agri FPO"
  },
  {
    id: "REQ-F03",
    farmerId: "F-103",
    farmerName: "Kavita Gaikwad",
    village: "Chandwad, Nashik",
    crop: "Organic Crisp Spinach",
    harvestQuantity: "2,800 kg (2.8 t)",
    expectedHarvestDate: "Ready tomorrow 6 AM",
    specialRequest: "100% residue-free certified lot. Requires refrigerated transport within 4 hours of morning harvest.",
    rateRealization: "+₹7.50/kg over APMC Mandi",
    status: "Pending Quality Inspection",
    timestamp: "4 hours ago",
    assignedFPO: "Sahyadri Bio-Growers"
  },
  {
    id: "REQ-F04",
    farmerId: "F-104",
    farmerName: "Pandurang Pawar",
    village: "Sinnar, Nashik",
    crop: "Nashik Red Onions",
    harvestQuantity: "5,100 kg (5.1 t)",
    expectedHarvestDate: "Harvested & Cured in shed",
    specialRequest: "Lot stored in farm storage structure. Requesting bulk truck allocation for direct transport.",
    rateRealization: "+₹4.90/kg over APMC Mandi",
    status: "Payout Released (NEFT: ₹1,21,380)",
    timestamp: "Yesterday",
    assignedFPO: "Godavari Krishak FPO"
  }
];

// Initial FPO Aggregation & Cluster Requests to Admin
export const INITIAL_FPO_REQUESTS = [
  {
    id: "REQ-FPO01",
    fpoId: "FPO-01",
    fpoName: "Nashik Agri FPO Co-op",
    district: "Niphad, Nashik",
    memberFarmers: 112,
    pooledOffer: "45.0 Tonnes Roma Tomatoes",
    specialRequest: "Requesting Admin authorization to allocate 30 Tonnes to FreshFoods Pvt. Ltd. demand #REQ-B01. Weighbridge calibrated.",
    escrowAllocation: "₹7.2 L Allocation",
    status: "Pending Admin Approval",
    timestamp: "15 mins ago"
  },
  {
    id: "REQ-FPO02",
    fpoId: "FPO-02",
    fpoName: "Sahyadri Farmers Producer Co.",
    district: "Dindori, Maharashtra",
    memberFarmers: 280,
    pooledOffer: "120.0 Tonnes Mixed Crops & Grapes",
    specialRequest: "Cold-storage pre-cooling slots active at Dindori center. Ready for multi-truck dispatch to BigBasket hubs.",
    escrowAllocation: "₹28.5 L Allocation",
    status: "Approved & Active",
    timestamp: "2 hours ago"
  },
  {
    id: "REQ-FPO03",
    fpoId: "FPO-03",
    fpoName: "Godavari Krishak Producer Co.",
    district: "Sinnar, Maharashtra",
    memberFarmers: 85,
    pooledOffer: "32.0 Tonnes Red Onions",
    specialRequest: "Requesting platform quality inspector visit for Sinnar aggregation yard lot verification.",
    escrowAllocation: "₹8.1 L Allocation",
    status: "In-Review",
    timestamp: "6 hours ago"
  }
];

// Initial Company Procurement Demand
export const INITIAL_DEMAND = {
  id: "REQ-FF-001",
  buyerName: "FreshFoods Pvt. Ltd.",
  buyerType: "Company / Bulk Buyer · Mumbai",
  buyerAvatar: "F",
  crop: "Grade-A Tomatoes",
  cropCategory: "Vegetables",
  targetQuantity: 100, // tonnes
  targetPricePerKg: 25,
  location: "Nashik, Maharashtra",
  destination: "FreshFoods Central Warehouse, Bhiwandi, Mumbai",
  deliveryWindowDays: 10,
  postedDate: "2026-08-30",
  status: "Matching",
  verifiedSupply: 70.7,
  currentGap: 29.3,
  farmerRealizationBonus: 5.80,
  traditionalPrice: 18.00,
  platformPrice: 23.80,
  logisticsFee: 3.20,
  totalEndPrice: 27.00
};

export const INITIAL_SUPPLY_MATCHES = [
  {
    id: "MAT-001",
    fpoName: "FPO Nashik Cluster",
    rank: 1,
    matchScore: 94,
    quantityTonnes: 8.7,
    grade: "Grade A",
    location: "Nashik (Dindori Road)",
    distanceKm: 24,
    daysToHarvest: 5,
    supplyConfidence: 87,
    keyMatchFactors: "Grade + confidence + delivery window",
    farmerCount: 32,
    proposedRate: 23.50,
    qualityCert: "ISO 22000 & Organic Verified",
    status: "Verified",
    leadContact: "Rameshwar Patil (+91 98234-XXXXX)"
  },
  {
    id: "MAT-002",
    fpoName: "Nashik Agri FPO",
    rank: 2,
    matchScore: 87,
    quantityTonnes: 35.0,
    grade: "Grade A",
    location: "Niphad Hub",
    distanceKm: 38,
    daysToHarvest: 5,
    supplyConfidence: 95,
    keyMatchFactors: "Distance + quantity + harvest window",
    farmerCount: 110,
    proposedRate: 23.80,
    qualityCert: "APEDA Certified Packhouse",
    status: "Verified",
    leadContact: "Sunita Gade (+91 94222-XXXXX)"
  },
  {
    id: "MAT-003",
    fpoName: "Sahyadri Cluster",
    rank: 3,
    matchScore: 81,
    quantityTonnes: 27.0,
    grade: "Grade A",
    location: "Dindori Valley",
    distanceKm: 46,
    daysToHarvest: 7,
    supplyConfidence: 89,
    keyMatchFactors: "Distance + quantity + harvest window",
    farmerCount: 78,
    proposedRate: 24.00,
    qualityCert: "GlobalGAP Verified",
    status: "Verified",
    leadContact: "Vilas Shinde (+91 98220-XXXXX)"
  },
  {
    id: "MAT-004",
    fpoName: "Godavari Krishak Producer Co.",
    rank: 4,
    matchScore: 78,
    quantityTonnes: 18.5,
    grade: "Grade A",
    location: "Sinnar",
    distanceKm: 52,
    daysToHarvest: 6,
    supplyConfidence: 84,
    keyMatchFactors: "High volume + Cold store ready",
    farmerCount: 54,
    proposedRate: 24.20,
    qualityCert: "FSSAI Grade-1",
    status: "Available",
    leadContact: "Kishore Bhalerao (+91 99750-XXXXX)"
  },
  {
    id: "MAT-005",
    fpoName: "Panchavati Organic Producers",
    rank: 5,
    matchScore: 74,
    quantityTonnes: 12.0,
    grade: "Grade A",
    location: "Trimbak",
    distanceKm: 31,
    daysToHarvest: 8,
    supplyConfidence: 82,
    keyMatchFactors: "100% Pesticide residue free",
    farmerCount: 41,
    proposedRate: 24.50,
    qualityCert: "Jaivik Bharat Certified",
    status: "Available",
    leadContact: "Anand Deshmukh (+91 97631-XXXXX)"
  }
];

export const SUPPLY_HEALTH_STATS = {
  expectedTonnes: 116,
  verifiedTonnes: 88.7,
  availableTonnes: 88.7,
  qualityPassRate: 98.2,
  activeFPOsCount: 14,
  connectedFarmersCount: 385
};

export const RECENT_ACTIVITY_SIGNALS = [
  {
    id: "SIG-01",
    type: "success",
    title: "Supply verification completed for SUP-002 (Niphad Hub)",
    timeAgo: "12 min ago",
    details: "35.0 tonnes Grade-A verified by Agri-Quality Assessor Anil More."
  },
  {
    id: "SIG-02",
    type: "info",
    title: "FreshFoods posted a 100t tomato requirement",
    timeAgo: "38 min ago",
    details: "Automated broadcast sent to 8 regional FPO clusters within 80km radius."
  },
  {
    id: "SIG-03",
    type: "warning",
    title: "Quality rejection opened replacement search",
    timeAgo: "1 hr ago",
    details: "Lot #049 (4.2t) rejected due to color variance; AI re-routed request to Sahyadri Cluster."
  },
  {
    id: "SIG-04",
    type: "success",
    title: "Payment Escrow milestone released for LOT-TOM-NK-2026-00123",
    timeAgo: "2 hrs ago",
    details: "₹1,95,000 credited directly to 18 member farmers via UPI/NEFT."
  }
];

export const TRACEABILITY_ORDER = {
  lotNumber: "LOT-TOM-NK-2026-00124",
  crop: "Grade-A Roma Tomatoes",
  buyer: "FreshFoods Pvt. Ltd.",
  destination: "Mumbai Distribution Center",
  status: "IN TRANSIT",
  transitProgressPercent: 75,
  currentTemperature: "11.4 °C (Target: 10-12 °C)",
  humidity: "86% RH",
  driverName: "Santosh Yadav",
  driverPhone: "+91 98210-44921",
  vehicleNo: "MH-15-EG-4920 (Reefer Truck 14T)",
  currentLocationName: "Igatpuri Tollway (NH-160)",
  speedKmH: 58,
  eta: "Today, 6:30 PM (2 hrs remaining)",
  milestones: [
    { id: 1, title: "Demand posted", date: "12 Aug 2026", status: "verified", note: "100t bulk requirement locked at ₹25/kg ceiling" },
    { id: 2, title: "Supply verified", date: "10 Aug 2026", status: "verified", note: "Lab quality assessment: Brix 4.8, firmness grade 1" },
    { id: 3, title: "FPO aggregation", date: "8 Aug 2026", status: "verified", note: "Aggregated from 32 smallholder farmers in Dindori" },
    { id: 4, title: "Collection scheduled", date: "6 Aug 2026", status: "verified", note: "Batched at Niphad Central Packhouse" },
    { id: 5, title: "Quality checked", date: "4 Aug 2026", status: "verified", note: "QR batch tags applied to crates & sealed" },
    { id: 6, title: "Picked up", date: "2 Aug 2026", status: "verified", note: "Driver verified manifest with digital e-way bill" },
    { id: 7, title: "Delivered", date: "Pending", status: "upcoming", note: "Buyer warehouse receiving bay scheduled" },
    { id: 8, title: "Payment completed", date: "Pending", status: "upcoming", note: "Escrow auto-release upon digital OTP verification" }
  ],
  routeNodes: [
    {
      id: "node-1",
      title: "Farm cluster · Nashik",
      subtitle: "32 farmers · 8.2 tonnes",
      type: "farm"
    },
    {
      id: "node-2",
      title: "Niphad collection center",
      subtitle: "Capacity 40 tonnes · 4.8 km average",
      type: "hub"
    },
    {
      id: "node-3",
      title: "FreshFoods · Mumbai",
      subtitle: "178 km · delivery ETA 2 days",
      type: "destination"
    }
  ]
};

export const REGIONAL_ANALYTICS = {
  clusters: [
    {
      name: "Nashik",
      demandTonnes: 500,
      verifiedSupplyTonnes: 420,
      gapTonnes: 80,
      type: "gap",
      statusColor: "orange",
      topCrops: ["Tomatoes", "Onions", "Grapes"],
      fposActive: 28,
      avgPricePerKg: 24.50
    },
    {
      name: "Pune",
      demandTonnes: 300,
      verifiedSupplyTonnes: 380,
      gapTonnes: 80,
      type: "surplus",
      statusColor: "green",
      topCrops: ["Tomatoes", "Pomegranate", "Capsicum"],
      fposActive: 19,
      avgPricePerKg: 21.80
    },
    {
      name: "Ahmednagar",
      demandTonnes: 240,
      verifiedSupplyTonnes: 196,
      gapTonnes: 44,
      type: "gap",
      statusColor: "orange",
      topCrops: ["Sugarcane", "Tomatoes", "Millets"],
      fposActive: 14,
      avgPricePerKg: 25.20
    },
    {
      name: "Satara",
      demandTonnes: 180,
      verifiedSupplyTonnes: 215,
      gapTonnes: 35,
      type: "surplus",
      statusColor: "green",
      topCrops: ["Strawberries", "Ginger", "Tomatoes"],
      fposActive: 11,
      avgPricePerKg: 22.10
    }
  ],
  intelligenceForecast: {
    badge: "UPCOMING DEMAND INTELLIGENCE",
    title: "Tomato demand expected to rise 18% in 30 days",
    recommendation: "AI Recommendation: source 60 tonnes from Pune surplus into the Nashik collection network. High Confidence (88%) · inputs: active forward contracts, harvest maturity windows, and logistics freight corridors.",
    keyDrivers: [
      "Festive season spike across western urban hubs (Mumbai / Pune MMR)",
      "Unseasonal rainfall in Karnataka reducing southern tomato inflow",
      "Cold-chain availability index in Nashik cluster currently at 92%"
    ]
  }
};

export const LOGISTICS_MODELS = [
  {
    id: "model_a",
    name: "Model A: Farmer / FPO Self-Delivery",
    badge: "Seller-Managed",
    desc: "The FPO or farmer uses their own tractor/local vehicle fleet to transport the produce directly to the buyer's gate.",
    pros: ["Zero platform logistics fee", "Direct control over transit timings", "Extra earning for FPO transport wing"],
    costEst: "₹1.80 - ₹2.20 / kg",
    transitTime: "Within 24-36 hours",
    trackingMode: "Manual OTP + Driver Phone Dispatch"
  },
  {
    id: "model_b",
    name: "Model B: Bulk Buyer Pickup",
    badge: "Buyer-Managed",
    desc: "The bulk buyer dispatches their own trucks to the FPO packhouse/farm gate with a digital gate pass.",
    pros: ["Buyer inspects crop at farm gate", "Buyer controls cold chain logistics", "Immediate handover & risk transfer"],
    costEst: "₹0.00 platform charge",
    transitTime: "Same-day collection",
    trackingMode: "Digital QR Gate Pass & Weighbridge OTP"
  },
  {
    id: "model_c",
    name: "Model C: Platform Smart 3PL & AI Route",
    badge: "Recommended AI Logistics",
    desc: "KisanSetu automatically clusters multi-farm pickups, dispatches temperature-controlled trucks, and optimizes the routing.",
    pros: ["AI-optimized route cuts fuel cost by 22%", "Live real-time GPS & Cold-chain sensor telemetry", "Guaranteed transit insurance & damage replacement"],
    costEst: "₹3.20 / kg (All-inclusive with insurance)",
    transitTime: "Same-day or next-morning guaranteed",
    trackingMode: "Live GPS Map + IoT Sensor Stream"
  }
];

export const MOCK_FARMERS = [
  { id: "F-101", name: "Dnyaneshwar Shinde", village: "Dindori", crop: "Tomatoes", harvestKg: 3200, phone: "+91 98221-XXXXX", rating: 4.9, payoutDue: "₹76,160", techLevel: "Smartphone User" },
  { id: "F-102", name: "Balasaheb Jadhav", village: "Niphad", crop: "Tomatoes", harvestKg: 4500, phone: "+91 94230-XXXXX", rating: 4.8, payoutDue: "₹1,07,100", techLevel: "Offline / Basic Phone (SMS)" },
  { id: "F-103", name: "Kavita Gaikwad", village: "Chandwad", crop: "Tomatoes", harvestKg: 2800, phone: "+91 98605-XXXXX", rating: 5.0, payoutDue: "₹66,640", techLevel: "Offline / FPO Field Agent" },
  { id: "F-104", name: "Pandurang Pawar", village: "Sinnar", crop: "Tomatoes", harvestKg: 5100, phone: "+91 97654-XXXXX", rating: 4.7, payoutDue: "₹1,21,380", techLevel: "Smartphone User" }
];

export const I18N_STRINGS = {
  en: {
    appTitle: "KisanSetu",
    procurementOs: "PROCUREMENT OS",
    tagline: "Demand-driven procurement infrastructure",
    controlRoom: "Control room",
    supplyMatching: "Supply matching",
    traceability: "Traceability",
    regionalAnalytics: "Regional analytics",
    logisticsHub: "Logistics Hub",
    farmerFpoPortal: "Farmer & FPO Portal",
    postNewDemand: "Post new demand",
    demandPosted: "Demand posted",
    verifiedSupply: "Verified supply",
    currentGap: "Current gap",
    farmerRealization: "Farmer realization improvement",
    explainableMatches: "Explainable supply matches",
    priceTransparency: "PRICE TRANSPARENCY",
    wherePriceGoes: "Where ₹27/kg goes",
    farmerRealizationSub: "Farmer realization",
    collectionLogistics: "Collection · logistics · grading",
    traditionalChannel: "Traditional channel",
    openSimulator: "Open farmer earnings calculator",
    supplyHealth: "SUPPLY HEALTH",
    expectedVerifiedAvailable: "Expected ≠ verified ≠ available",
    recentActivity: "RECENT ACTIVITY",
    signalsAttention: "Signals that need attention",
    inTransit: "IN TRANSIT",
    fromFarmTo: "From farm to FreshFoods",
    switchPersona: "Switch Workspace Role",
    smsSimulator: "SMS / WhatsApp Gateway",
    goodMorning: "Good morning",
    adminConsole: "Master Admin Command",
    consumerStore: "Consumer Fresh Market",
    farmerPortal: "My Farmer Portal"
  },
  hi: {
    appTitle: "कृषिसेतु",
    procurementOs: "प्रोक्योरमेंट ओएस",
    tagline: "मांग-आधारित कृषि खरीद और वितरण प्रणाली",
    controlRoom: "कंट्रोल रूम",
    supplyMatching: "आपूर्ति मिलान",
    traceability: "ट्रेसेबिलिटी (खेत से गोदाम)",
    regionalAnalytics: "क्षेत्रीय विश्लेषण",
    logisticsHub: "लॉजिस्टिक्स हब",
    farmerFpoPortal: "किसान व एफपीओ पोर्टल",
    postNewDemand: "नई मांग दर्ज करें",
    demandPosted: "कुल मांग",
    verifiedSupply: "सत्यापित आपूर्ति",
    currentGap: "आपूर्ति की कमी",
    farmerRealization: "किसान आय में वास्तविक वृद्धि",
    explainableMatches: "स्मार्ट आपूर्ति मिलान",
    priceTransparency: "मूल्य पारदर्शिता",
    wherePriceGoes: "प्रति किलो ₹27 का विभाजन",
    farmerRealizationSub: "किसान को सीधे भुगतान",
    collectionLogistics: "पैकिंग · परिवहन · गुणवत्ता जांच",
    traditionalChannel: "पारंपरिक मंडी बिचौलिए",
    openSimulator: "किसान आय कैलकुलेटर खोलें",
    supplyHealth: "आपूर्ति स्वास्थ्य",
    expectedVerifiedAvailable: "अपेक्षित ≠ सत्यापित ≠ उपलब्ध",
    recentActivity: "ताज़ा गतिविधियाँ",
    signalsAttention: "ध्यान देने योग्य सूचनाएं",
    inTransit: "मार्ग में है (In Transit)",
    fromFarmTo: "खेत से फ्रेशफूड्स तक",
    switchPersona: "भूमिका बदलें",
    smsSimulator: "एसएमएस व व्हाट्सएप गेटवे",
    goodMorning: "शुभ प्रभात",
    adminConsole: "मास्टर एडमिन कंट्रोल",
    consumerStore: "उपभोक्ता बाज़ार",
    farmerPortal: "मेरा किसान पोर्टल"
  },
  mr: {
    appTitle: "कृषीसेतू",
    procurementOs: "प्रोक्युअरमेंट ओएस",
    tagline: "मागणी-आधारित शेती खरेदी प्रणाली",
    controlRoom: "कंट्रोल रूम",
    supplyMatching: "पुरवठा जुळणी",
    traceability: "ट्रेसेबिलिटी (शेत ते ग्राहक)",
    regionalAnalytics: "प्रादेशिक विश्लेषण",
    logisticsHub: "वाहतूक व्यवस्था",
    farmerFpoPortal: "शेतकरी व FPO पोर्टल",
    postNewDemand: "नवीन मागणी नोंदवा",
    demandPosted: "एकूण मागणी",
    verifiedSupply: "तपासलेला पुरवठा",
    currentGap: "पुरवठा तूट",
    farmerRealization: "शेतकऱ्यांच्या नफ्यात वाढ",
    explainableMatches: "स्मार्ट पुरवठा पर्याय",
    priceTransparency: "दर पारदर्शकता",
    wherePriceGoes: "प्रति किलो ₹27 ची विभागणी",
    farmerRealizationSub: "शेतकऱ्यास थेट मोबदला",
    collectionLogistics: "गोळा करणे · वाहतूक · ग्रेडिंग",
    traditionalChannel: "पारंपारिक दलाल/मध्यस्थ",
    openSimulator: "शेतकरी नफा कॅल्क्युलेटर उघडा",
    supplyHealth: "पुरवठा आरोग्य",
    expectedVerifiedAvailable: "अपेक्षित ≠ तपासलेले ≠ उपलब्ध",
    recentActivity: "नुकत्याच घडलेल्या घडामोडी",
    signalsAttention: "महत्त्वाच्या सूचना",
    inTransit: "प्रवासात आहे (In Transit)",
    fromFarmTo: "शेतातून थेट फ्रेशफूड्सकडे",
    switchPersona: "भूमिका बदला",
    smsSimulator: "एसएमएस / व्हॉट्सॲप गेटवे",
    goodMorning: "शुभ सकाळ",
    adminConsole: "मास्टर ॲडमिन नियंत्रण",
    consumerStore: "थेट ग्राहक बाजार",
    farmerPortal: "माझे शेतकरी पोर्टल",
    appTitle: "KisanSetu",
    procurementOs: "PROCUREMENT OS"
  }
};

// Live Admin-FPO-Farmer Demand Broadcast, Quotation & Logistics Inquiries
export const INITIAL_PLATFORM_INQUIRIES = [
  {
    id: "INQ-001",
    requestId: "REQ-C01",
    requestType: "consumer", // "consumer" or "company"
    requesterName: "Priya Sharma (Consumer)",
    requesterLocation: "Mumbai (Andheri West)",
    crop: "Fresh Roma Tomatoes & Baby Spinach",
    quantity: "12 kg (3 Crates)",
    quantityKg: 12,
    targetState: "Maharashtra",
    targetDistrict: "Nashik",
    targetFpoId: "FPO-MH-01",
    targetFpoName: "Nashik Agri Farmer Producer Co-op",
    inquiryDate: "Today, 10:50 AM",
    specialInstruction: "Please deliver before 10 AM. Organic certified preferred.",
    status: "Quote Received", // "Broadcasted (Pending)", "Quote Received", "Admin Approved", "Logistics Assigned", "Dispatched"
    fpoQuote: {
      available: true,
      pricePerKg: 22.50,
      totalAmount: 270,
      availableStockKg: 225,
      packhouseNotes: "Grade-A Export stock pre-cooled at Niphad packhouse. Ready for immediate handover.",
      quoteTimestamp: "10 mins ago"
    },
    adminApproved: false,
    selectedLogistics: null // "fpo_direct", "buyer_pickup", "platform_3pl"
  },
  {
    id: "INQ-002",
    requestId: "REQ-B01",
    requestType: "company",
    requesterName: "FreshFoods Pvt. Ltd. (Corporate Buyer)",
    requesterLocation: "Mumbai / Bhiwandi Central Hub",
    crop: "Processing Roma Tomatoes (Grade-A)",
    quantity: "100 Tonnes",
    quantityKg: 100000,
    targetState: "Maharashtra",
    targetDistrict: "Nashik",
    targetFpoId: "FPO-MH-01",
    targetFpoName: "Nashik Agri Farmer Producer Co-op",
    inquiryDate: "Today, 09:15 AM",
    specialInstruction: "Reefer cold-chain temperature telemetry (<12°C) mandatory.",
    status: "Broadcasted (Pending)",
    fpoQuote: null,
    adminApproved: false,
    selectedLogistics: null
  },
  {
    id: "INQ-003",
    requestId: "REQ-C03",
    requestType: "consumer",
    requesterName: "Sunita Kulkarni (Consumer)",
    requesterLocation: "Thane West (Manpada)",
    crop: "Nashik GI-Tagged Red Onions",
    quantity: "30 kg (4 Crates)",
    quantityKg: 30,
    targetState: "Maharashtra",
    targetDistrict: "Sinnar",
    targetFpoId: "FPO-MH-06",
    targetFpoName: "Godavari Krishak Producer Co.",
    inquiryDate: "Today, 08:30 AM",
    specialInstruction: "Medium sized 55mm+ onions without sprouting.",
    status: "Dispatched",
    fpoQuote: {
      available: true,
      pricePerKg: 28.00,
      totalAmount: 840,
      availableStockKg: 800,
      packhouseNotes: "Cured 55mm+ medium GI tagged onions packed in mesh bags.",
      quoteTimestamp: "2 hours ago"
    },
    adminApproved: true,
    selectedLogistics: "platform_3pl",
    logisticsDetails: {
      provider: "KisanSetu AI Smart 3PL Fleet",
      vehicleNo: "MH-15-EG-4920 (Reefer Van)",
      driverName: "Santosh Yadav (+91 98210-44921)",
      estimatedTransitHours: "3 hrs",
      costPerKg: "₹3.20/kg",
      trackingStatus: "In-Transit to Thane Hub (GPS Active)"
    }
  }
];

// 7-Day AI Short-Term Price Trend Predictive Graph Dataset
export const PREDICTIVE_PRICE_FORECAST_7DAYS = [
  {
    crop: "Roma Tomatoes",
    currentPrice: 23.80,
    unit: "₹/kg",
    historicalTrend: [
      { day: "Day -3", price: 21.50 },
      { day: "Day -2", price: 22.80 },
      { day: "Day -1", price: 23.20 },
      { day: "Today", price: 23.80 }
    ],
    predicted7Days: [
      { day: "Tomorrow (+1d)", price: 23.50, confidence: "96%" },
      { day: "+2 Days", price: 22.80, confidence: "94%" },
      { day: "+3 Days", price: 21.00, confidence: "92%" },
      { day: "+4 Days", price: 19.50, confidence: "89%" },
      { day: "+5 Days", price: 18.20, confidence: "87%" },
      { day: "+6 Days", price: 17.50, confidence: "85%" },
      { day: "+7 Days", price: 16.80, confidence: "82%" }
    ],
    alertType: "warning_drop",
    percentageChange: -29.4,
    trendDirection: "Down (-29.4% in 7 Days)",
    marketIntelligenceSignal: "⚠️ CRITICAL MARKET SIGNAL: Gujarat & Karnataka mandi arrivals surging by +45% starting Wednesday. Severe price glut expected next week. Advise FPOs in Nashik & Pune to liquidate ready stock within 48-72 hours."
  },
  {
    crop: "Nashik Red Onions (55mm)",
    currentPrice: 32.00,
    unit: "₹/kg",
    historicalTrend: [
      { day: "Day -3", price: 29.00 },
      { day: "Day -2", price: 30.50 },
      { day: "Day -1", price: 31.20 },
      { day: "Today", price: 32.00 }
    ],
    predicted7Days: [
      { day: "Tomorrow (+1d)", price: 32.80, confidence: "95%" },
      { day: "+2 Days", price: 33.50, confidence: "93%" },
      { day: "+3 Days", price: 34.80, confidence: "91%" },
      { day: "+4 Days", price: 35.50, confidence: "89%" },
      { day: "+5 Days", price: 36.20, confidence: "86%" },
      { day: "+6 Days", price: 37.00, confidence: "84%" },
      { day: "+7 Days", price: 38.50, confidence: "81%" }
    ],
    alertType: "opportunity_surge",
    percentageChange: +20.3,
    trendDirection: "Up (+20.3% in 7 Days)",
    marketIntelligenceSignal: "🚀 HIGH DEMAND SURGE: Southern export terminals in Chennai & Cochin reporting inventory deficit. Onions holding premium quality should be staggered for higher realization."
  },
  {
    crop: "Process-Grade Potatoes",
    currentPrice: 18.50,
    unit: "₹/kg",
    historicalTrend: [
      { day: "Day -3", price: 18.00 },
      { day: "Day -2", price: 18.20 },
      { day: "Day -1", price: 18.40 },
      { day: "Today", price: 18.50 }
    ],
    predicted7Days: [
      { day: "Tomorrow (+1d)", price: 18.50, confidence: "97%" },
      { day: "+2 Days", price: 18.40, confidence: "95%" },
      { day: "+3 Days", price: 18.30, confidence: "93%" },
      { day: "+4 Days", price: 18.20, confidence: "90%" },
      { day: "+5 Days", price: 18.10, confidence: "88%" },
      { day: "+6 Days", price: 18.00, confidence: "86%" },
      { day: "+7 Days", price: 17.90, confidence: "83%" }
    ],
    alertType: "stable",
    percentageChange: -3.2,
    trendDirection: "Stable (±3% Variance)",
    marketIntelligenceSignal: "⚖️ STABLE TRADING: Cold storage release in Agra & Indore matching current processing demand. Standard contract pricing recommended."
  },
  {
    crop: "Dindori Seedless Grapes",
    currentPrice: 72.00,
    unit: "₹/kg",
    historicalTrend: [
      { day: "Day -3", price: 68.00 },
      { day: "Day -2", price: 69.50 },
      { day: "Day -1", price: 71.00 },
      { day: "Today", price: 72.00 }
    ],
    predicted7Days: [
      { day: "Tomorrow (+1d)", price: 73.50, confidence: "94%" },
      { day: "+2 Days", price: 75.00, confidence: "92%" },
      { day: "+3 Days", price: 77.00, confidence: "89%" },
      { day: "+4 Days", price: 79.50, confidence: "86%" },
      { day: "+5 Days", price: 82.00, confidence: "83%" },
      { day: "+6 Days", price: 84.50, confidence: "80%" },
      { day: "+7 Days", price: 88.00, confidence: "78%" }
    ],
    alertType: "opportunity_surge",
    percentageChange: +22.2,
    trendDirection: "Up (+22.2% in 7 Days)",
    marketIntelligenceSignal: "🍇 EXPORT BOOM: European & GCC buyer demand opening up for 18° Brix certified batches. Pre-cooling storage reservations advised."
  }
];

// UN Sustainable Development Goals (SDGs) Alignment & Platform Impact Matrix
export const SDG_IMPACT_GOALS = [
  {
    sdgNumber: 1,
    title: "No Poverty (SDG 1)",
    icon: "ShieldAlert",
    color: "#e5243b",
    badge: "Direct Payouts",
    headline: "Eliminating predatory dalal commissions & boosting smallholder realization",
    impactMetric: "+32.4% Net Income Uplift",
    description: "By bypassing multi-tiered APMC commission agents, KisanSetu delivers direct bank escrow transfers, increasing farm-gate realization by ₹5.80/kg on average."
  },
  {
    sdgNumber: 2,
    title: "Zero Hunger & Food Security (SDG 2)",
    icon: "Leaf",
    color: "#dda63a",
    badge: "Cold-Chain Preservation",
    headline: "Reducing 25-30% transit post-harvest loss through smart IoT telematics",
    impactMetric: "< 2.8% Perishability Loss",
    description: "Demand-driven harvesting ensures crops are picked only when demand is verified, eliminating spoilage in transit via temperature-controlled reefer logistics."
  },
  {
    sdgNumber: 8,
    title: "Decent Work & Economic Growth (SDG 8)",
    icon: "TrendingUp",
    color: "#a21942",
    badge: "FPO Empowerment",
    headline: "Transforming smallholders into organized rural agri-enterprises",
    impactMetric: "22 FPOs & 2,467 Farmers Pooled",
    description: "FPOs gain institutional collective bargaining power, verifiable MCA audit compliance, and access to formal enterprise contracts."
  },
  {
    sdgNumber: 12,
    title: "Responsible Consumption & Production (SDG 12)",
    icon: "Layers",
    color: "#bf8b2e",
    badge: "100% Farm-to-Fork Trace",
    headline: "Digital traceability, chemical residue testing & transparent grading",
    impactMetric: "100% Batch QR Verification",
    description: "Every crop batch is logged with GPS origin, harvest date, and quality parameters, enabling urban consumers to verify pesticide-free produce."
  },
  {
    sdgNumber: 13,
    title: "Climate Action (SDG 13)",
    icon: "Globe",
    color: "#3f7e44",
    badge: "Optimized Food Miles",
    headline: "Route-optimized reverse supply chain reducing transport carbon emissions",
    impactMetric: "-38% Transit Food Miles",
    description: "Reverse matching algorithms source produce from the closest verified regional cluster, drastically cutting diesel fuel consumption."
  }
];

// Role-Aware AI Chatbot Knowledge Base & Advisory Rules
export const KISAN_AI_CHATBOT_KNOWLEDGE = {
  helpline: {
    name: "Kisan Call Centre (Government of India)",
    tollFreeNumber: "1800-180-1551",
    timings: "6:00 AM to 10:00 PM (All 7 Days)",
    regionalExtension: "Krishi Vigyan Kendra (KVK) Nashik: +91 253-2415891",
    emailSupport: "support@kisansetu.gov.in"
  },
  pesticideRecommendations: [
    {
      crop: "Tomato",
      problem: "Early Blight / Late Blight (फफूंद / करपा रोग)",
      symptoms: "Dark brown spots with yellow halos on leaves, rotting stems.",
      organicSolution: "Spray Neem Oil (Azadirachtin 10000 PPM) @ 3ml/liter or Trichoderma viride bio-fungicide @ 5g/liter.",
      chemicalSolution: "Mancozeb 75% WP @ 2.5g/liter or Copper Oxychloride 50% WP @ 3g/liter during early infection.",
      prevention: "Avoid sprinkler irrigation wetting leaves; ensure 60cm plant spacing for air circulation."
    },
    {
      crop: "Tomato",
      problem: "Fruit Borer / Leaf Curl Virus (फल छेदक / मरोड़िया रोग)",
      symptoms: "Caterpillars boring holes into tomatoes; leaves curling upwards.",
      organicSolution: "Install Yellow Sticky Traps (10/acre) + Pheromone Traps (5/acre) + Spray Bacillus thuringiensis (Bt) @ 2g/liter.",
      chemicalSolution: "For leaf curl (whiteflies): Imidacloprid 17.8% SL @ 0.5ml/liter. For fruit borer: Emamectin Benzoate 5% SG @ 0.5g/liter.",
      prevention: "Remove infected plants immediately to prevent whitefly transmission."
    },
    {
      crop: "Onion",
      problem: "Purple Blotch & Thrips (जांभळा करपा आणि थ्रिप्स)",
      symptoms: "Silver-white streaks on leaves with purple lesions, curling leaf tips.",
      organicSolution: "Spray Dashparni Ark @ 25ml/liter with soap nut (Reetha) sticker or Karanj oil @ 4ml/liter.",
      chemicalSolution: "Fipronil 5% SC @ 2ml/liter + Hexaconazole 5% EC @ 1ml/liter with sticker.",
      prevention: "Maintain field drainage; avoid excessive nitrogen fertilizer."
    }
  ]
};

// Government Minimum Support Price (MSP) & Fair Benchmark Registry
export const GOVERNMENT_BENCHMARK_PRICES = {
  tomatoes: {
    cropName: "Roma Tomatoes",
    mspBenchmarkRate: 18.50,
    fairConsumerCeilingRate: 26.00,
    mandiBaselineRate: 16.00,
    unit: "₹/kg",
    routingRule: "1st Preference: Individual Smallholder Farmers (1-25 kg) -> 2nd Preference: FPO Packhouse Clusters (25kg+)"
  },
  onions: {
    cropName: "Nashik Red Onions (55mm)",
    mspBenchmarkRate: 24.00,
    fairConsumerCeilingRate: 34.00,
    mandiBaselineRate: 21.50,
    unit: "₹/kg",
    routingRule: "1st Preference: Individual Smallholder Farmers (1-30 kg) -> 2nd Preference: FPO Packhouse Clusters (30kg+)"
  },
  spinach: {
    cropName: "Baby Spinach & Coriander",
    mspBenchmarkRate: 15.00,
    fairConsumerCeilingRate: 22.00,
    mandiBaselineRate: 12.50,
    unit: "₹/kg",
    routingRule: "1st Preference: Smallholder Hydro-Cool Growers -> 2nd Preference: FPO"
  },
  grapes: {
    cropName: "Dindori Seedless Grapes",
    mspBenchmarkRate: 55.00,
    fairConsumerCeilingRate: 78.00,
    mandiBaselineRate: 48.00,
    unit: "₹/kg",
    routingRule: "1st Preference: Certified Smallholder Vineyards -> 2nd Preference: Sahyadri FPO"
  }
};


