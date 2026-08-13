export interface PhysicoChemicalProperty {
  property: string;
  value: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  categorySlug: string;
  categoryName: string;
  subCategoryTitle?: string;
  containerImage: string;
  applicationAreas: string;
  performanceBenefits: string[];
  specialFeatures?: string[];
  specsText?: string;
  propertiesTable: PhysicoChemicalProperty[];
  pdfUrl: string;
  msdsUrl: string;
}

export interface SubCategoryGroup {
  title: string;
  coverImage: string;
  products: ProductItem[];
}

export interface ProductCategory {
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  coverImage: string;
  subCategoryGroups: SubCategoryGroup[];
  products: ProductItem[];
}

const OFFICIAL_BARREL_IMG = "https://www.hplubricants.in/sites/default/files/15-W-40-Final-Graphic.jpg";
const OFFICIAL_COMPRESSOR_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Compressor-Oils.png";
const OFFICIAL_HYDRAULIC_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Hydraulic-Oils.png";
const OFFICIAL_TRANSFORMER_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Transformer-Oils.png";
const OFFICIAL_TURBINE_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Turbine-Oils.png";
const OFFICIAL_GREASE_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Industrial-Greases.png";
const OFFICIAL_AGRICULTURE_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Agriculture-Oils.png";
const OFFICIAL_AUTOMOTIVE_IMG = "https://www.hplubricants.in/sites/default/files/styles/product_category_thumb/public/Automotive-Oils.png";

// ----------------------------------------------------
// 1. COMPRESSOR OILS
// ----------------------------------------------------
const compGroup: SubCategoryGroup = {
  title: "COMPRESSOR OILS",
  coverImage: OFFICIAL_COMPRESSOR_IMG,
  products: [
    {
      id: "hycom-150-p",
      slug: "hycom-150-p",
      name: "HYCOM 150 P",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Specially developed for railway compressors.",
      performanceBenefits: [
        "This oil has good demulsibility property, low deposits and sludge foaming tendency at a wide range of working temperature and in any gaseous atmosphere.",
        "Meets DIN 51506 VDL specifications, IS 13256:1992 DAB"
      ],
      specialFeatures: [
        "It is blended out of highly refined turbine base stocks and special types of anti-oxidants, anti-rust, anti-foam and demulsifier which do not react to any of the types of gases."
      ],
      specsText: "Meets DIN 51506 VDL specifications, IS 13256:1992 DAB",
      propertiesTable: [
        { property: "Appearance", value: "Clear" },
        { property: "Acidity, Total mg KOH / g", value: "0.20" },
        { property: "Density @ 29.5°C, g/cc", value: "0.8770" },
        { property: "Flash Point, COC, °C", value: ">210" },
        { property: "Pour Point, °C", value: "<-15" },
        { property: "OXIDATION STABILITY @ 135°C, 168 Hrs", value: "Pass" },
        { property: "FZG Rig Test, Pass Load Stage", value: ">8" },
        { property: "Rusting Test, Syn Sea Water, 24 Hrs", value: "Pass" },
        { property: "Kin. Viscosity @ 40°C, cSt", value: "135-165" },
        { property: "Kin. Viscosity @ 100°C, cSt", value: "15.0" },
        { property: "Viscosity Index", value: "100" }
      ],
      pdfUrl: "/docs/HYCOM_150_P_TDS.pdf",
      msdsUrl: "/docs/HYCOM_150_P_MSDS.pdf"
    },
    {
      id: "hycom-c-series",
      slug: "hycom-c-series",
      name: "HYCOM C 100, 150, 220, 320, 460",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Reciprocating air compressor lubrication.",
      performanceBenefits: ["High thermal stability", "Low carbon residue"],
      propertiesTable: [{ property: "ISO VG", value: "100 - 460" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hycom-ls-expo",
      slug: "hycom-ls-expo",
      name: "HYCOM LS EXPO SERIES",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Long service life screw compressor oil.",
      performanceBenefits: ["Anti-wear", "Oxidation resistance"],
      propertiesTable: [{ property: "Type", value: "Synthetic Blend" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hycom-ls-series",
      slug: "hycom-ls-series",
      name: "HYCOM LS SERIES",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Rotary screw air compressors.",
      performanceBenefits: ["Extended drain interval"],
      propertiesTable: [{ property: "Type", value: "Rotary Screw Oil" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hycom-pge",
      slug: "hycom-pge",
      name: "HYCOM PGE",
      subtitle: "COMPRESSOR OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Polyglycol synthetic compressor lubricant.",
      performanceBenefits: ["Gas compressor compatibility"],
      propertiesTable: [{ property: "Base", value: "PAG Synthetic" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 2. CYLINDER OIL
// ----------------------------------------------------
const cylinderGroup: SubCategoryGroup = {
  title: "CYLINDER OIL",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "cyndol-grades",
      slug: "cyndol-grades",
      name: "CYNDOL GRADES",
      subtitle: "CYLINDER OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "CYLINDER OIL",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Steam engine cylinders and worm gear drives.",
      performanceBenefits: ["Compounded with fatty oils", "Resists water washing"],
      propertiesTable: [{ property: "Viscosity @ 100°C", value: "30 - 45 cSt" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 3. FILM OIL
// ----------------------------------------------------
const filmGroup: SubCategoryGroup = {
  title: "FILM OIL",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "hp-film-oil",
      slug: "hp-film-oil",
      name: "HP FILM OIL",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Steel rolling mill Morgoil sleeve bearings.",
      performanceBenefits: ["High demulsibility", "Heavy load carrying capacity"],
      propertiesTable: [{ property: "ISO VG", value: "220 / 320 / 460" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hp-steel-320",
      slug: "hp-steel-320",
      name: "HP STEEL 320",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Heavy duty steel mill roll neck bearings.",
      performanceBenefits: ["Water separation"],
      propertiesTable: [{ property: "ISO VG", value: "320" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hp-steel-ep-100",
      slug: "hp-steel-ep-100",
      name: "HP STEEL EP 100",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Steel wire rod mill high speed bearings.",
      performanceBenefits: ["Extreme pressure EP protection"],
      propertiesTable: [{ property: "ISO VG", value: "100" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hp-steel-grades",
      slug: "hp-steel-grades",
      name: "HP STEEL GRADES",
      subtitle: "FILM OIL",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "FILM OIL",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Rolling mill Morgoil lubrication systems.",
      performanceBenefits: ["Oxidation resistance"],
      propertiesTable: [{ property: "Series", value: "Steel Grades" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 4. GENERAL PURPOSE MACHINERY OILS
// ----------------------------------------------------
const genMachineryGroup: SubCategoryGroup = {
  title: "GENERAL PURPOSE MACHINERY OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "hp-flushing-oil",
      slug: "hp-flushing-oil",
      name: "HP FLUSHING OIL",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "GENERAL PURPOSE MACHINERY OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Flushing out old oil, sludge, and contaminants.",
      performanceBenefits: ["High solvency", "Viscosity light"],
      propertiesTable: [{ property: "Viscosity @ 40°C", value: "15 - 22 cSt" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "yantrol-series",
      slug: "yantrol-series",
      name: "YANTROL / YANTROL N SERIES",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "GENERAL PURPOSE MACHINERY OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Textile looms and plain bearings.",
      performanceBenefits: ["Non-drip tacky property"],
      propertiesTable: [{ property: "Viscosity Grades", value: "32 to 460" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 5. HYDRAULIC OILS
// ----------------------------------------------------
const hydraulicGroup: SubCategoryGroup = {
  title: "HYDRAULIC OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "enklo-32-super",
      slug: "enklo-32-super",
      name: "ENKLO 32 SUPER",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Precision CNC machine tools.",
      performanceBenefits: ["Anti-wear protection"],
      propertiesTable: [{ property: "ISO VG", value: "32" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "enklo-46-premium",
      slug: "enklo-46-premium",
      name: "ENKLO 46 PREMIUM",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Industrial hydraulic presses.",
      performanceBenefits: ["Demulsibility"],
      propertiesTable: [{ property: "ISO VG", value: "46" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "enklo-46-super",
      slug: "enklo-46-super",
      name: "ENKLO 46 SUPER",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Mobile earthmoving machinery.",
      performanceBenefits: ["Anti-foam"],
      propertiesTable: [{ property: "ISO VG", value: "46" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "enklo-68-premium",
      slug: "enklo-68-premium",
      name: "ENKLO 68 PREMIUM",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Heavy duty hydraulic systems.",
      performanceBenefits: ["Shear stability"],
      propertiesTable: [{ property: "ISO VG", value: "68" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "enklo-68-super",
      slug: "enklo-68-super",
      name: "ENKLO 68 SUPER",
      subtitle: "HYDRAULIC OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "HYDRAULIC OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "High-pressure hydraulic pumps.",
      performanceBenefits: ["Pump anti-wear"],
      propertiesTable: [{ property: "Kin. Viscosity @ 40°C", value: "64.0 - 72.0 cSt" }],
      pdfUrl: "/docs/ENKLO_68_TDS.pdf",
      msdsUrl: "/docs/ENKLO_68_MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 6. MACHINERY OILS
// ----------------------------------------------------
const machineryGroup: SubCategoryGroup = {
  title: "MACHINERY OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "waylube-grades",
      slug: "waylube-grades",
      name: "WAYLUBE",
      subtitle: "MACHINERY OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "MACHINERY OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Machine tool slideways and guides.",
      performanceBenefits: ["Prevents stick-slip chatter"],
      propertiesTable: [{ property: "ISO VG", value: "68 / 220" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 7. OPEN GEAR COMPOUNDS
// ----------------------------------------------------
const openGearGroup: SubCategoryGroup = {
  title: "OPEN GEAR COMPOUNDS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "hytak-base",
      slug: "hytak-base",
      name: "HYTAK",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Heavy open gears.",
      performanceBenefits: ["Bitumen free compound"],
      propertiesTable: [{ property: "Type", value: "Open Gear Compound" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hytak-500-nb",
      slug: "hytak-500-nb",
      name: "HYTAK 500 NB",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Cement kilns open gear lubricant.",
      performanceBenefits: ["Non-toxic"],
      propertiesTable: [{ property: "Grade", value: "500 NB" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "hytak-500-nb-1000",
      slug: "hytak-500-nb-1000",
      name: "HYTAK 500 NB-1000",
      subtitle: "OPEN GEAR COMPOUNDS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "OPEN GEAR COMPOUNDS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Ultra-heavy load open gear drives.",
      performanceBenefits: ["Synthetic film"],
      propertiesTable: [{ property: "Viscosity @ 100°C", value: "1000 cSt" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 8. PNEUMATIC TOOL OILS
// ----------------------------------------------------
const pneumaticGroup: SubCategoryGroup = {
  title: "PNEUMATIC TOOL OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "nu-matic-grades",
      slug: "nu-matic-grades",
      name: "NU-MATIC",
      subtitle: "PNEUMATIC TOOL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "PNEUMATIC TOOL OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Air hammers and rock drills.",
      performanceBenefits: ["Emulsifies with moisture"],
      propertiesTable: [{ property: "Viscosity", value: "ISO VG 46 / 100 / 320" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 9. REFRIGERATION COMPRESSOR OILS
// ----------------------------------------------------
const refrigGroup: SubCategoryGroup = {
  title: "REFRIGERATION COMPRESSOR OILS",
  coverImage: OFFICIAL_COMPRESSOR_IMG,
  products: [
    {
      id: "seetul-grades",
      slug: "seetul-grades",
      name: "SEETUL GRADES",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Ammonia refrigeration compressors.",
      performanceBenefits: ["Low pour point"],
      propertiesTable: [{ property: "Type", value: "Mineral Refrigeration Oil" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "seetul-n-68",
      slug: "seetul-n-68",
      name: "SEETUL N 68 (P)",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Cold storage refrigeration.",
      performanceBenefits: ["Ultra low floc point"],
      propertiesTable: [{ property: "ISO VG", value: "68" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "seetul-rfl",
      slug: "seetul-rfl",
      name: "SEETUL RFL GRADES",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Freon refrigerant systems.",
      performanceBenefits: ["Refrigerant compatibility"],
      propertiesTable: [{ property: "Series", value: "RFL" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "seetul-s-68",
      slug: "seetul-s-68",
      name: "SEETUL S 68",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Synthetic refrigeration compressor oil.",
      performanceBenefits: ["High thermal resistance"],
      propertiesTable: [{ property: "ISO VG", value: "68" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "seetul-se-68",
      slug: "seetul-se-68",
      name: "SEETUL SE 68",
      subtitle: "REFRIGERATION OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "REFRIGERATION COMPRESSOR OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Polyolester POE synthetic oil.",
      performanceBenefits: ["HFC compatible"],
      propertiesTable: [{ property: "Base", value: "POE Synthetic" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 10. SPINDLE OILS
// ----------------------------------------------------
const spindleGroup: SubCategoryGroup = {
  title: "SPINDLE OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "spintek-base",
      slug: "spintek-base",
      name: "SPINTEK",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Textile spinning spindles.",
      performanceBenefits: ["Ultra low viscosity"],
      propertiesTable: [{ property: "Viscosity @ 40°C", value: "2 to 22 cSt" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "spintek-3",
      slug: "spintek-3",
      name: "SPINTEK 3",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Ultra-high speed textile spindles.",
      performanceBenefits: ["Low power consumption"],
      propertiesTable: [{ property: "ISO VG", value: "3" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "spintek-ee-series",
      slug: "spintek-ee-series",
      name: "SPINTEK EE SERIES",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Energy efficient textile spindle lubricant.",
      performanceBenefits: ["Friction modifier technology"],
      propertiesTable: [{ property: "Series", value: "EE Series" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "spintek-syn-2",
      slug: "spintek-syn-2",
      name: "SPINTEK SYN 2",
      subtitle: "SPINDLE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SPINDLE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Synthetic textile spindle fluid.",
      performanceBenefits: ["Zero deposit formation"],
      propertiesTable: [{ property: "ISO VG", value: "2" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 11. STENTER OILS
// ----------------------------------------------------
const stenterGroup: SubCategoryGroup = {
  title: "STENTER OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "stantrol-1-3",
      slug: "stantrol-1-3",
      name: "STANTROL 1, 3",
      subtitle: "STENTER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "STENTER OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Textile stenter machine conveyor chains up to 240°C.",
      performanceBenefits: ["Non-carbonizing high temperature synthetic oil"],
      propertiesTable: [{ property: "Flash Point", value: "> 260°C" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 12. SUGAR MILL BEARING OILS
// ----------------------------------------------------
const sugarMillGroup: SubCategoryGroup = {
  title: "SUGAR MILL BEARING OILS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "crushfine-40-nb",
      slug: "crushfine-40-nb",
      name: "CRUSHFINE 40 NB",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Sugar mill crushing roller journal bearings.",
      performanceBenefits: ["Bitumen-free compounded oil"],
      propertiesTable: [{ property: "Grade", value: "40 NB" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "crushfine-45-nb-ii",
      slug: "crushfine-45-nb-ii",
      name: "CRUSHFINE 45 NB-II",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Heavy duty sugar mill roll bearings.",
      performanceBenefits: ["High film strength"],
      propertiesTable: [{ property: "Grade", value: "45 NB-II" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "crushfine-60-nb-i",
      slug: "crushfine-60-nb-i",
      name: "CRUSHFINE 60 NB-I",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Sugar cane crusher bearings under high shock load.",
      performanceBenefits: ["Anti-wear EP"],
      propertiesTable: [{ property: "Grade", value: "60 NB-I" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "crushfine-60-nb-ii",
      slug: "crushfine-60-nb-ii",
      name: "CRUSHFINE 60 NB-II",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "High capacity sugar mill rollers.",
      performanceBenefits: ["Water resistance"],
      propertiesTable: [{ property: "Grade", value: "60 NB-II" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "crushwell-series",
      slug: "crushwell-series",
      name: "CRUSHWELL 1, 2, 3, 4, 5",
      subtitle: "SUGAR MILL OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "SUGAR MILL BEARING OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "All grades of sugar mill crusher bearings.",
      performanceBenefits: ["High viscosity compounded oil"],
      propertiesTable: [{ property: "Grades", value: "1 to 5" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 13. TRANSFORMER OILS
// ----------------------------------------------------
const transformerGroup: SubCategoryGroup = {
  title: "TRANSFORMER OILS",
  coverImage: OFFICIAL_TRANSFORMER_IMG,
  products: [
    {
      id: "hp-transformer-oil-1",
      slug: "hp-transformer-oil-1",
      name: "HP TRANSFORMER OIL I",
      subtitle: "TRANSFORMER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TRANSFORMER OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Electrical insulation in power transformers.",
      performanceBenefits: ["High breakdown voltage >70 kV"],
      propertiesTable: [{ property: "IS Standard", value: "IS 335" }],
      pdfUrl: "/docs/POWERTRAN_TDS.pdf",
      msdsUrl: "/docs/POWERTRAN_MSDS.pdf"
    },
    {
      id: "hp-transformer-oils",
      slug: "hp-transformer-oils",
      name: "HP TRANSFORMER OILS",
      subtitle: "TRANSFORMER OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TRANSFORMER OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Distribution transformers and switchgear.",
      performanceBenefits: ["Low Tan Delta"],
      propertiesTable: [{ property: "Type", value: "Uninhibited" }],
      pdfUrl: "/docs/POWERTRAN_TDS.pdf",
      msdsUrl: "/docs/POWERTRAN_MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 14. TURBINE OILS
// ----------------------------------------------------
const turbineGroup: SubCategoryGroup = {
  title: "TURBINE OILS",
  coverImage: OFFICIAL_TURBINE_IMG,
  products: [
    {
      id: "turbinol-base",
      slug: "turbinol-base",
      name: "TURBINOL",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Steam, gas, and hydro turbines.",
      performanceBenefits: ["TOST life > 3500 hours", "Water demulsibility"],
      propertiesTable: [{ property: "ISO VG", value: "32 / 46 / 68" }],
      pdfUrl: "/docs/TURBINOL_TDS.pdf",
      msdsUrl: "/docs/TURBINOL_MSDS.pdf"
    },
    {
      id: "turbinol-lp",
      slug: "turbinol-lp",
      name: "TURBINOL LP",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Long life turbine oil.",
      performanceBenefits: ["High thermal stability"],
      propertiesTable: [{ property: "Series", value: "LP" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "turbinol-xt",
      slug: "turbinol-xt",
      name: "TURBINOL XT",
      subtitle: "TURBINE OILS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "TURBINE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Extreme temperature gas turbine bearings.",
      performanceBenefits: ["Synthetic turbine oil"],
      propertiesTable: [{ property: "Series", value: "XT" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// 15. WIRE ROPE LUBRICANTS
// ----------------------------------------------------
const wireRopeGroup: SubCategoryGroup = {
  title: "WIRE ROPE LUBRICANTS",
  coverImage: OFFICIAL_HYDRAULIC_IMG,
  products: [
    {
      id: "hp-metwire-nb",
      slug: "hp-metwire-nb",
      name: "HP METWIRE NB",
      subtitle: "WIRE ROPE LUBRICANTS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "WIRE ROPE LUBRICANTS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Steel wire ropes in cranes, hoists, and elevators.",
      performanceBenefits: ["Deep strand penetration"],
      propertiesTable: [{ property: "Type", value: "Non-bituminous" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    },
    {
      id: "rodec-120",
      slug: "rodec-120",
      name: "RODEC 120",
      subtitle: "WIRE ROPE LUBRICANTS",
      categorySlug: "industrial-oils",
      categoryName: "Industrial Oils",
      subCategoryTitle: "WIRE ROPE LUBRICANTS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Heavy duty crane wire ropes.",
      performanceBenefits: ["Tacky coating"],
      propertiesTable: [{ property: "Grade", value: "120" }],
      pdfUrl: "/docs/TDS.pdf",
      msdsUrl: "/docs/MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// INDUSTRIAL GREASES & AUTOMOTIVE GROUPS
// ----------------------------------------------------
const greaseGroup: SubCategoryGroup = {
  title: "INDUSTRIAL GREASES",
  coverImage: OFFICIAL_GREASE_IMG,
  products: [
    {
      id: "hp-alplex-2",
      slug: "hp-alplex-2",
      name: "HP ALPLEX 2",
      subtitle: "INDUSTRIAL GREASES",
      categorySlug: "industrial-greases",
      categoryName: "Industrial Greases",
      subCategoryTitle: "INDUSTRIAL GREASES",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Lithium complex extreme pressure grease for steel rolling mills and heavy bearings.",
      performanceBenefits: ["Drop point >260°C", "High load bearing capacity"],
      specsText: "IS 14847:2000 NLGI 2",
      propertiesTable: [{ property: "Drop Point", value: "> 260°C" }],
      pdfUrl: "/docs/ALPLEX_TDS.pdf",
      msdsUrl: "/docs/ALPLEX_MSDS.pdf"
    },
    {
      id: "hp-ap3-ll",
      slug: "hp-ap3-ll",
      name: "HP AP3 LL (B)",
      subtitle: "INDUSTRIAL GREASES",
      categorySlug: "industrial-greases",
      categoryName: "Industrial Greases",
      subCategoryTitle: "INDUSTRIAL GREASES",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "All-purpose grease for anti-friction bearings, chassis, and water pumps.",
      performanceBenefits: ["High structural shear stability"],
      propertiesTable: [{ property: "NLGI Grade", value: "3" }],
      pdfUrl: "/docs/AP3_TDS.pdf",
      msdsUrl: "/docs/AP3_MSDS.pdf"
    }
  ]
};

const agGroup: SubCategoryGroup = {
  title: "AGRICULTURE OILS",
  coverImage: OFFICIAL_AGRICULTURE_IMG,
  products: [
    {
      id: "hp-kisan-shakti",
      slug: "hp-kisan-shakti",
      name: "HP KISAN SHAKTI",
      subtitle: "AGRICULTURE OILS",
      categorySlug: "automotive-oils",
      categoryName: "Automotive Oils",
      subCategoryTitle: "AGRICULTURE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Formulated specifically for tractors and pump sets used in heavy agricultural operations.",
      performanceBenefits: ["High engine protection against dust", "Shear stability under continuous tilling"],
      specsText: "API CF/SF, IS 13656 E-DL2",
      propertiesTable: [{ property: "SAE Viscosity Grade", value: "20W-40" }],
      pdfUrl: "/docs/HP_KISAN_SHAKTI_TDS.pdf",
      msdsUrl: "/docs/HP_KISAN_SHAKTI_MSDS.pdf"
    }
  ]
};

const brakeGroup: SubCategoryGroup = {
  title: "BRAKE FLUIDS",
  coverImage: OFFICIAL_AUTOMOTIVE_IMG,
  products: [
    {
      id: "hp-super-duty-brake-fluid-dot-3",
      slug: "hp-super-duty-brake-fluid-dot-3",
      name: "HP SUPER DUTY BRAKE FLUID DOT 3",
      subtitle: "BRAKE FLUIDS",
      categorySlug: "automotive-oils",
      categoryName: "Automotive Oils",
      subCategoryTitle: "BRAKE FLUIDS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "Hydraulic brake and clutch systems in passenger cars, trucks, and buses.",
      performanceBenefits: ["High boiling point preventing vapor lock"],
      propertiesTable: [{ property: "ERBP, °C", value: "> 230" }],
      pdfUrl: "/docs/DOT3_TDS.pdf",
      msdsUrl: "/docs/DOT3_MSDS.pdf"
    }
  ]
};

const bikeGroup: SubCategoryGroup = {
  title: "SCOOTER & BIKE OILS",
  coverImage: OFFICIAL_AUTOMOTIVE_IMG,
  products: [
    {
      id: "hp-racer-4t-20w40",
      slug: "hp-racer-4t-20w40",
      name: "HP RACER 4T 20W-40",
      subtitle: "SCOOTER & BIKE OILS",
      categorySlug: "bike-oils",
      categoryName: "Bike Engine Oils",
      subCategoryTitle: "SCOOTER & BIKE OILS",
      containerImage: OFFICIAL_BARREL_IMG,
      applicationAreas: "4-stroke motorcycles from Hero, Honda, Bajaj, TVS, Yamaha, and Royal Enfield.",
      performanceBenefits: ["JASO MA2 wet clutch friction control", "Smooth gear shifting"],
      propertiesTable: [{ property: "SAE Grade", value: "20W-40" }],
      pdfUrl: "/docs/RACER_20W40_TDS.pdf",
      msdsUrl: "/docs/RACER_20W40_MSDS.pdf"
    }
  ]
};

// ----------------------------------------------------
// EXPORT DATA
// ----------------------------------------------------
const industrialGroups = [
  compGroup,
  cylinderGroup,
  filmGroup,
  genMachineryGroup,
  hydraulicGroup,
  machineryGroup,
  openGearGroup,
  pneumaticGroup,
  refrigGroup,
  spindleGroup,
  stenterGroup,
  sugarMillGroup,
  transformerGroup,
  turbineGroup,
  wireRopeGroup
];

export const productsData: ProductCategory[] = [
  {
    slug: "industrial-oils",
    name: "Industrial Oils",
    shortDesc: "High performance hydraulic, compressor, turbine, transformer, gear, film, and machinery lubricants.",
    fullDesc: "Discover HP Lubricants' industrial oils tailored for hydraulic systems, gearboxes, compressors, sugar mills, and more. Trusted for quality, innovation, and reliability.",
    coverImage: OFFICIAL_COMPRESSOR_IMG,
    subCategoryGroups: industrialGroups,
    products: industrialGroups.flatMap(g => g.products)
  },
  {
    slug: "industrial-greases",
    name: "Industrial Greases",
    shortDesc: "Extreme pressure lithium, complex, wheel bearing, and specialty temperature resistant greases.",
    fullDesc: "HP Lubricants produces premium industrial greases formulated for heavy machinery bearings, steel mills, and high temperature applications.",
    coverImage: OFFICIAL_GREASE_IMG,
    subCategoryGroups: [greaseGroup],
    products: greaseGroup.products
  },
  {
    slug: "automotive-oils",
    name: "Automotive Oils",
    shortDesc: "High-quality automotive, agricultural, passenger car, and engine oils.",
    fullDesc: "Explore HP Lubricants' range of automotive, agricultural, and commercial engine oils offering superior quality and performance for all your vehicles.",
    coverImage: OFFICIAL_AUTOMOTIVE_IMG,
    subCategoryGroups: [agGroup, brakeGroup],
    products: [...agGroup.products, ...brakeGroup.products]
  },
  {
    slug: "bike-oils",
    name: "Bike Engine Oils",
    shortDesc: "4-stroke motorcycle engine lubricants with JASO MA2 wet clutch specification.",
    fullDesc: "HP RACER 4T motorcycle oils provide 3-in-1 protection for motorcycle engine, wet clutch, and transmission gearbox.",
    coverImage: OFFICIAL_AUTOMOTIVE_IMG,
    subCategoryGroups: [bikeGroup],
    products: bikeGroup.products
  }
];

export function getAllProducts(): ProductItem[] {
  return productsData.flatMap((cat) => cat.products);
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productsData.find((c) => c.slug === slug);
}
