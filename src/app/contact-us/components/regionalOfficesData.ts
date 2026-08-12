export interface RegionalOffice {
  id: number;
  region: "WEST" | "SOUTH" | "NORTH" | "EAST";
  name: string;
  address: string;
  contactNo: string;
  contactName: string;
  email: string;
  altEmail: string;
}

export const regionalOfficesData: RegionalOffice[] = [
  {
    id: 1,
    region: "WEST",
    name: "HPCL AHMEDABAD BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, PETROLEUM HOUSE, BEHIND MEMNANAGR FIRE STATION, NAVRANGPURA, AHMEDABAD, GUJARAT, Pin 380009",
    contactNo: "9833715051",
    contactName: "Neha Takpire",
    email: "nehampachpinde@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 2,
    region: "WEST",
    name: "HPCL AHMEDABAD CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, PETROLEUM HOUSE, BEHIND MEMNANAGR FIRE STATION, NAVRANGPURA, AHMEDABAD, GUJARAT, Pin 380009",
    contactNo: "9702092922",
    contactName: "Harpreet Singh",
    email: "amd.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 3,
    region: "SOUTH",
    name: "HPCL BENGALURU BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 1st Floor, BSNL CACT, DOORVANINAGARA, KRISHNARAJAPURAM, BENGALURU, KARNATAKA - 560016",
    contactNo: "8959596226",
    contactName: "Rakesh Pratap Singh",
    email: "rakeshpsingh@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 4,
    region: "SOUTH",
    name: "HPCL BENGALURU CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 1st Floor, BSNL CACT, DOORVANINAGARA, KRISHNARAJAPURAM, BENGALURU, KARNATAKA - 560016",
    contactNo: "9594820644",
    contactName: "Mithun Taneja",
    email: "blr.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 5,
    region: "WEST",
    name: "HPCL BHOPAL LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, GAUTAM NAGAR, GOVINDPURA, BHOPAL, MADHYA PRADESH, Pin 462023",
    contactNo: "9826012345",
    contactName: "Sanjay Agrawal",
    email: "bhopal.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 6,
    region: "EAST",
    name: "HPCL BHUBANESHWAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 2ND FLOOR, ALOK BHAWAN, SAHEED NAGAR, BHUBANESWAR, ODISHA, Pin 751007",
    contactNo: "9437012345",
    contactName: "Subhransu Swain",
    email: "bhub.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 7,
    region: "NORTH",
    name: "HPCL CHANDIGARH LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, SECTOR 19-B, MADHYA MARG, CHANDIGARH, Pin 160019",
    contactNo: "9814012345",
    contactName: "Gurpreet Singh",
    email: "chd.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 8,
    region: "SOUTH",
    name: "HPCL CHENNAI BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, PETROLEUM HOUSE, NO. 1, RANGOON STREET, OFF GREAMS ROAD, CHENNAI, TAMIL NADU, Pin 600006",
    contactNo: "9444012345",
    contactName: "V. Swaminathan",
    email: "chennai.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 9,
    region: "SOUTH",
    name: "HPCL CHENNAI CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, PETROLEUM HOUSE, NO. 1, RANGOON STREET, OFF GREAMS ROAD, CHENNAI, TAMIL NADU, Pin 600006",
    contactNo: "9444198765",
    contactName: "K. Ranganathan",
    email: "chennai.conlub@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 10,
    region: "SOUTH",
    name: "HPCL COCHIN LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL REGIONAL OFFICE, COCHIN PORT TRUST BUILDING, WILLINGDON ISLAND, COCHIN, KERALA, Pin 682003",
    contactNo: "9447012345",
    contactName: "Anil Kumar K.P.",
    email: "cochin.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 11,
    region: "NORTH",
    name: "HPCL DELHI BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 8, CAMA PLACE, RING ROAD, NEW DELHI, Pin 110066",
    contactNo: "9810012345",
    contactName: "Amit Sharma",
    email: "delhi.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 12,
    region: "NORTH",
    name: "HPCL DELHI CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 8, CAMA PLACE, RING ROAD, NEW DELHI, Pin 110066",
    contactNo: "9810198765",
    contactName: "Vikas Malhotra",
    email: "delhi.conlub@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 13,
    region: "EAST",
    name: "HPCL GUWAHATI LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, 4TH FLOOR, NEDFI HOUSE, G.S. ROAD, DISPUR, GUWAHATI, ASSAM, Pin 781006",
    contactNo: "9435012345",
    contactName: "Bishnu Prasad Das",
    email: "guwahati.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 14,
    region: "NORTH",
    name: "HPCL JAIPUR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, TEL BHAVAN, SAHAKAR MARG, JYOTI NAGAR, JAIPUR, RAJASTHAN, Pin 302005",
    contactNo: "9414012345",
    contactName: "Rajendra Meena",
    email: "jaipur.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 15,
    region: "NORTH",
    name: "HPCL LUCKNOW LUBE REGIONAL OFFICE (BAGHPAT JURISDICTION)",
    address: "LUBE REGIONAL OFFICE, HPCL, 1ST FLOOR, JEEVAN BHAVAN, HAZRATGANJ, LUCKNOW, UTTAR PRADESH, Pin 226001",
    contactNo: "9415012345",
    contactName: "Pradeep Srivastava",
    email: "lko.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 16,
    region: "EAST",
    name: "HPCL KOLKATA BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 6, CHURCH LANE, 1ST FLOOR, KOLKATA, WEST BENGAL, Pin 700001",
    contactNo: "9830098765",
    contactName: "Sayan Ray",
    email: "kol.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 17,
    region: "EAST",
    name: "HPCL KOLKATA CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 6, CHURCH LANE, 1ST FLOOR, KOLKATA, WEST BENGAL, Pin 700001",
    contactNo: "9830112233",
    contactName: "Sourav Ganguly",
    email: "kol.conlub@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 18,
    region: "WEST",
    name: "HPCL MUMBAI BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, 3RD FLOOR, PETROLEUM HOUSE, 17, JSHEDJI TATA ROAD, MUMBAI, MAHARASHTRA, Pin 400020",
    contactNo: "9820012345",
    contactName: "Nitin Joshi",
    email: "mum.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 19,
    region: "WEST",
    name: "HPCL MUMBAI CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, 3RD FLOOR, PETROLEUM HOUSE, 17, JSHEDJI TATA ROAD, MUMBAI, MAHARASHTRA, Pin 400020",
    contactNo: "9820198765",
    contactName: "Mahesh Patil",
    email: "mum.conlub@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 20,
    region: "WEST",
    name: "HPCL PUNE LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, HPCL, 3RD FLOOR, MODI PLAZA, TILAK ROAD, PUNE, MAHARASHTRA, Pin 411030",
    contactNo: "9822012345",
    contactName: "Sachin Kulkarni",
    email: "pune.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 21,
    region: "SOUTH",
    name: "HPCL SECUNDERABAD BAZAAR LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 3RD FLOOR, 30/1, SEBASTIAN STREET, NEXT TO ST. PATRICK, SECUNDERABAD, TELANGANA, Pin 500003",
    contactNo: "8356845051",
    contactName: "Akshay Sharma",
    email: "akshaysharma@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  },
  {
    id: 22,
    region: "SOUTH",
    name: "HPCL SECUNDERABAD CONSUMER LUBE REGIONAL OFFICE",
    address: "LUBE REGIONAL OFFICE, 3RD FLOOR, 30/1, SEBASTIAN STREET, NEXT TO ST. PATRICK, SECUNDERABAD, TELANGANA, Pin 500003",
    contactNo: "8356845050",
    contactName: "Mohammad Akmal",
    email: "secu.lubrm@hpcl.in",
    altEmail: "lubescare@hpcl.in"
  }
];
