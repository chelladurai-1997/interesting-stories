import { SelectOption } from "@/app/components/atoms/Select/Select";

export const genderOptions: SelectOption[] = [
  { value: "male", label: "Men - (ஆண்)" },
  { value: "female", label: "Women - (பெண்)" },
];

export const ageOptions: SelectOption[] = [
  { value: "20-25", label: "20 - 25" },
  { value: "26-30", label: "26 - 30" },
  { value: "31-35", label: "31 - 35" },
  { value: "36-40", label: "36 - 40" },
  { value: "40+", label: "40+" },
];

export const educationOptions: string[] = [
  "Studying - படித்துக்கொண்டு இருக்கிறார்",
  "Below 10th standard - உயர்நிலைக்கு கீழ்",
  "10th standard - உயர்நிலைப்படிப்பு",
  "12th standard - மேல்நிலைப்படிப்பு",
  "Bachelor's degree - இளங்கலைப்படிப்பு",
  "Master's degree - முதுகலைப்படிப்பு",
  "Doctor - மருத்துவப்படிப்பு",
  "Engineering - பொறியியல் படிப்பு",
  "Degree course/ diploma - பட்டயப்படிப்பு/தொழில் முறை படிப்பு",
  "Others - மற்றவை",
  "No study - படிப்பு இல்லை",
];

export const districtOptions: string[] = [
  "Ariyalur - அரியலூர்",
  "Chengalpattu - செங்கல்பட்டு",
  "Chennai - சென்னை",
  "Coimbatore - கோயம்புத்தூர்",
  "Cuddalore - கடலூர்",
  "Dharmapuri - தர்மபுரி",
  "Dindigul - திண்டுக்கல்",
  "Erode - ஈரோடு",
  "Kallakurichi - கள்ளக்குறிச்சி",
  "Kanchipuram - காஞ்சிபுரம்",
  "Kanyakumari - கன்னியாகுமரி",
  "Karur - கரூர்",
  "Krishnagiri - கிருஷ்ணகிரி",
  "Madurai - மதுரை",
  "Mayiladuthurai - மயிலாடுதுறை",
  "Nagapattinam - நாகப்பட்டினம்",
  "Namakkal - நாமக்கல்",
  "Nilgiris - நீலகிரி",
  "Perambalur - பெரம்பலூர்",
  "Pudukkottai - புதுக்கோட்டை",
  "Ramanathapuram - இராமநாதபுரம்",
  "Ranipet - இராணிப்பேட்டை",
  "Salem - சேலம்",
  "Sivagangai - சிவகங்கை",
  "Tenkasi - தென்காசி",
  "Thanjavur - தஞ்சாவூர்",
  "Theni - தேனி",
  "Thoothukudi - தூத்துக்குடி",
  "Tiruchirappalli - திருச்சிராப்பள்ளி",
  "Tirunelveli - திருநெல்வேலி",
  "Tirupathur - திருப்பத்தூர்",
  "Tiruppur - திருப்பூர்",
  "Tiruvallur - திருவள்ளூர்",
  "Tiruvannamalai - திருவண்ணாமலை",
  "Tiruvarur - திருவாரூர்",
  "Vellore - வேலூர்",
  "Viluppuram - விழுப்புரம்",
  "Virudhunagar - விருதுநகர்",
];

export const profileCreatedByOptions = [
  { value: "Parent - (பெற்றோர்)", label: "Parent - (பெற்றோர்)" },
  { value: "Sibling - (உடன்பிறப்பு)", label: "Sibling - (உடன்பிறப்பு)" },
  { value: "Guardian - (பாதுகாவலர்)", label: "Guardian - (பாதுகாவலர்)" },
  { value: "Myself - (நானே)", label: "Myself - (நானே)" },
];

export const maritalStatusOptions = [
  {
    value: "Single - (திருமணம் ஆகாதவர்)",
    label: "Single - (திருமணம் ஆகாதவர்)",
  },
  { value: "Married - (திருமணமானவர்)", label: "Married - (திருமணமானவர்)" },
  {
    value: "Divorced - (விவாகரத்து ஆனவர்)",
    label: "Divorced - (விவாகரத்து ஆனவர்)",
  },
  {
    value: "Widowed - (துணையை இழந்தவர்)",
    label: "Widowed - (துணையை இழந்தவர்)",
  },
];

export const noOfChildrensOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" },
];

export const childrenLivingStatusOptions = [
  "Living with me",
  "Not living with me",
  "Not applicable",
];
export const genderLabelOptions = ["Male", "Female"];

// Dropdown options
export const EDUCATION_OPTIONS = [
  "Select Education",
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

export const OCCUPATION_OPTIONS = [
  "Select Occupation",
  "Engineer",
  "Doctor",
  "Teacher",
  "Manager",
  "Others",
];

export const MONTHLY_INCOME_OPTIONS = [
  "Select Monthly Income",
  "Below 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 1,00,000",
  "Above 1,00,000",
];

export const jaadhagamOptions = {
  jaadhagamOptions: ["Option 1", "Option 2", "Option 3"],
  expectingStarsOptions: ["Option 1", "Option 2", "Option 3"],
};

export const workingPlaceOptions = [
  { value: "", label: "Select Working Place", disabled: true },
  { value: "Tamil nadu - தமிழ்நாடு", label: "Tamil Nadu - தமிழ்நாடு" },
  { value: "Other state - வெளிமாநிலம்", label: "Other State - வெளிமாநிலம்" },
  { value: "Other country - வெளிநாடு", label: "Other Country - வெளிநாடு" },
  {
    value: "Tamil nadu agreed - தமிழ்நாடு சம்மதம்",
    label: "Tamil Nadu Agreed - தமிழ்நாடு சம்மதம்",
  },
  {
    value: "Other state agreed - வெளிமாநிலம் சம்மதம்",
    label: "Other State Agreed - வெளிமாநிலம் சம்மதம்",
  },
  {
    value: "Other country agreed - வெளிநாடு சம்மதம்",
    label: "Other Country Agreed - வெளிநாடு சம்மதம்",
  },
  {
    value: "No expectations - எதுவும் சம்மதம்",
    label: "No Expectations - எதுவும் சம்மதம்",
  },
];

export const raasiOptions = ["Option 1", "Option 2", "Option 3"];
export const nachathiramOptions = ["Option 1", "Option 2", "Option 3"];
export const lagnamOptions = ["Option 1", "Option 2", "Option 3"];
export const dhosamOptions = ["Option 1", "Option 2", "Option 3"];
export const countriesOptions = ["Option 1", "Option 2", "Option 3"];
export const statesOptions = ["Option 1", "Option 2", "Option 3"];
export const physicallyChallengedOptions = ["Yes", "No"];

export const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];

export const complexionOptions = [
  { value: "fair", label: "Fair - (சிவப்பு)" },
  { value: "moderate", label: "Moderate - (மாநிறம்)" },
  { value: "dark", label: "Dark - (கருப்பு)" },
];

export const weightOptions = [
  { value: "30", label: "30 kg" },
  { value: "31", label: "31 kg" },
  { value: "32", label: "32 kg" },
  { value: "33", label: "33 kg" },
  { value: "34", label: "34 kg" },
  { value: "35", label: "35 kg" },
  { value: "36", label: "36 kg" },
  { value: "37", label: "37 kg" },
  { value: "38", label: "38 kg" },
  { value: "39", label: "39 kg" },
  { value: "40", label: "40 kg" },
  { value: "41", label: "41 kg" },
  { value: "42", label: "42 kg" },
  { value: "43", label: "43 kg" },
  { value: "44", label: "44 kg" },
  { value: "45", label: "45 kg" },
  { value: "46", label: "46 kg" },
  { value: "47", label: "47 kg" },
  { value: "48", label: "48 kg" },
  { value: "49", label: "49 kg" },
  { value: "50", label: "50 kg" },
  { value: "51", label: "51 kg" },
  { value: "52", label: "52 kg" },
  { value: "53", label: "53 kg" },
  { value: "54", label: "54 kg" },
  { value: "55", label: "55 kg" },
  { value: "56", label: "56 kg" },
  { value: "57", label: "57 kg" },
  { value: "58", label: "58 kg" },
  { value: "59", label: "59 kg" },
  { value: "60", label: "60 kg" },
  { value: "61", label: "61 kg" },
  { value: "62", label: "62 kg" },
  { value: "63", label: "63 kg" },
  { value: "64", label: "64 kg" },
  { value: "65", label: "65 kg" },
  { value: "66", label: "66 kg" },
  { value: "67", label: "67 kg" },
  { value: "68", label: "68 kg" },
  { value: "69", label: "69 kg" },
  { value: "70", label: "70 kg" },
  { value: "71", label: "71 kg" },
  { value: "72", label: "72 kg" },
  { value: "73", label: "73 kg" },
  { value: "74", label: "74 kg" },
  { value: "75", label: "75 kg" },
  { value: "76", label: "76 kg" },
  { value: "77", label: "77 kg" },
  { value: "78", label: "78 kg" },
  { value: "79", label: "79 kg" },
  { value: "80", label: "80 kg" },
  { value: "81", label: "81 kg" },
  { value: "82", label: "82 kg" },
  { value: "83", label: "83 kg" },
  { value: "84", label: "84 kg" },
  { value: "85", label: "85 kg" },
  { value: "86", label: "86 kg" },
  { value: "87", label: "87 kg" },
  { value: "88", label: "88 kg" },
  { value: "89", label: "89 kg" },
  { value: "90", label: "90 kg" },
  { value: "91", label: "91 kg" },
  { value: "92", label: "92 kg" },
  { value: "93", label: "93 kg" },
  { value: "94", label: "94 kg" },
  { value: "95", label: "95 kg" },
  { value: "96", label: "96 kg" },
  { value: "97", label: "97 kg" },
  { value: "98", label: "98 kg" },
  { value: "99", label: "99 kg" },
  { value: "100", label: "100 kg" },
  { value: "000", label: "Don't want to specify" },
];

export const heightOptions = [
  { value: "", label: "Select Height" },
  { value: "4ft 6in / 137 cms", label: "4ft 6in / 137 cms" },
  { value: "4ft 7in / 139 cms", label: "4ft 7in / 139 cms" },
  { value: "4ft 8in / 142 cms", label: "4ft 8in / 142 cms" },
  { value: "4ft 9in / 144 cms", label: "4ft 9in / 144 cms" },
  { value: "4ft 10in / 147 cms", label: "4ft 10in / 147 cms" },
  { value: "4ft 11in / 149 cms", label: "4ft 11in / 149 cms" },
  { value: "5ft / 152 cms", label: "5ft / 152 cms" },
  { value: "5ft 1in / 154 cms", label: "5ft 1in / 154 cms" },
  { value: "5ft 2in / 157 cms", label: "5ft 2in / 157 cms" },
  { value: "5ft 3in / 160 cms", label: "5ft 3in / 160 cms" },
  { value: "5ft 4in / 162 cms", label: "5ft 4in / 162 cms" },
  { value: "5ft 5in / 165 cms", label: "5ft 5in / 165 cms" },
  { value: "5ft 6in / 167 cms", label: "5ft 6in / 167 cms" },
  { value: "5ft 7in / 170 cms", label: "5ft 7in / 170 cms" },
  { value: "5ft 8in / 172 cms", label: "5ft 8in / 172 cms" },
  { value: "5ft 9in / 175 cms", label: "5ft 9in / 175 cms" },
  { value: "5ft 10in / 177 cms", label: "5ft 10in / 177 cms" },
  { value: "5ft 11in / 180 cms", label: "5ft 11in / 180 cms" },
  { value: "6ft / 182 cms", label: "6ft / 182 cms" },
  { value: "6ft 1in / 185 cms", label: "6ft 1in / 185 cms" },
  { value: "6ft 2in / 187 cms", label: "6ft 2in / 187 cms" },
  { value: "6ft 3in / 190 cms", label: "6ft 3in / 190 cms" },
  { value: "6ft 4in / 193 cms", label: "6ft 4in / 193 cms" },
  { value: "6ft 5in / 195 cms", label: "6ft 5in / 195 cms" },
  { value: "6ft 6in / 198 cms", label: "6ft 6in / 198 cms" },
  { value: "6ft 7in / 200 cms", label: "6ft 7in / 200 cms" },
  { value: "6ft 8in / 203 cms", label: "6ft 8in / 203 cms" },
  { value: "6ft 9in / 205 cms", label: "6ft 9in / 205 cms" },
  { value: "6ft 10in / 208 cms", label: "6ft 10in / 208 cms" },
  { value: "6ft 11in / 210 cms", label: "6ft 11in / 210 cms" },
  { value: "7ft / 213 cms", label: "7ft / 213 cms" },
  { value: "7ft 2in / 214 cms", label: "7ft 2in / 214 cms" },
  { value: "000", label: "Don't want to specify" },
];

export const casteOptions = [
  { value: "", label: "Select Caste" },
  { value: "Kongu Vellalar Gounder", label: "Kongu Vellalar Gounder" },
  { value: "Other", label: "Other" },
];

export const kulamOptions = [
  {
    label: "Aanthuvan Kulam - அந்துவன் குலம்",
    value: "Aanthuvan Kulam - அந்துவன் குலம்",
  },
  {
    label: "Azhagu Kulam - அழகு குலம்",
    value: "Azhagu Kulam - அழகு குலம்",
  },
  {
    label: "Aathe Kulam - ஆதி குலம்",
    value: "Aathe Kulam - ஆதி குலம்",
  },
  {
    label: "Aanthai Kulam - ஆந்தை குலம்",
    value: "Aanthai Kulam - ஆந்தை குலம்",
  },
  {
    label: "Aadar Kulam - ஆடர் குலம்",
    value: "Aadar Kulam - ஆடர் குலம்",
  },
  {
    label: "Aavan Kulam - ஆவன் குலம்",
    value: "Aavan Kulam - ஆவன் குலம்",
  },
  {
    label: "Eenjan Kulam - ஈஞ்சன் குலம்",
    value: "Eenjan Kulam - ஈஞ்சன் குலம்",
  },
  {
    label: "Ozukkar Kulam - ஒழுக்கர் குலம்",
    value: "Ozukkar Kulam - ஒழுக்கர் குலம்",
  },
  {
    label: "Oothaalar Kulam - ஓதாளர் குலம்",
    value: "Oothaalar Kulam - ஓதாளர் குலம்",
  },
  {
    label: "Kannakkan Kulam - கணக்கன் குலம்",
    value: "Kannakkan Kulam - கணக்கன் குலம்",
  },
  {
    label: "Kannan Kulam - கண்ணன் குலம்",
    value: "Kannan Kulam - கண்ணன் குலம்",
  },
  {
    label: "Kannanthai -  கண்ணந்தை குலம்",
    value: "Kannanthai -  கண்ணந்தை குலம்",
  },
  {
    label: "Kaadai Kulam - காடை குலம்",
    value: "Kaadai Kulam - காடை குலம்",
  },
  {
    label: "Kaari Kulam - காரி குலம்",
    value: "Kaari Kulam - காரி குலம்",
  },
  {
    label: "Keeran Kulam - கீரன் குலம்",
    value: "Keeran Kulam - கீரன் குலம்",
  },
  {
    label: "Kuzhlaayan Kulam - குழையன் குலம்",
    value: "Kuzhlaayan Kulam - குழையன் குலம்",
  },
  {
    label: "Koorai Kulam - கூறை குலம்",
    value: "Koorai Kulam - கூறை குலம்",
  },
  {
    label: "Koovendhar Kulam - கோவேந்தர் குலம்",
    value: "Koovendhar Kulam - கோவேந்தர் குலம்",
  },
  {
    label: "Saathanthai Kulam - சாத்தந்தை குலம்",
    value: "Saathanthai Kulam - சாத்தந்தை குலம்",
  },
  {
    label: "Sellan Kulam - செல்லன் குலம்",
    value: "Sellan Kulam - செல்லன் குலம்",
  },
  {
    label: "Semban Kulam - செம்பன் குலம்",
    value: "Semban Kulam - செம்பன் குலம்",
  },
  {
    label: "Sengkannan Kulam - செங்கண்ணன் குலம்",
    value: "Sengkannan Kulam - செங்கண்ணன் குலம்",
  },
  {
    label: "Sembuthan Kulam - செம்பூத்தன் குலம்",
    value: "Sembuthan Kulam - செம்பூத்தன் குலம்",
  },
  {
    label: "Senkunnier - செங்குன்னியர் குலம்",
    value: "Senkunnier - செங்குன்னியர் குலம்",
  },
  {
    label: "Sevvaayar Kulam - செவ்வாயர் குலம்",
    value: "Sevvaayar Kulam - செவ்வாயர் குலம்",
  },
  {
    label: "Cheran Kulam - சேரன் குலம்",
    value: "Cheran Kulam - சேரன் குலம்",
  },
  {
    label: "Chedan Kulam - சேடன் குலம்",
    value: "Chedan Kulam - சேடன் குலம்",
  },
  {
    label: "Dananjayan Kulam - தனஞ்செயன் குலம்",
    value: "Dananjayan Kulam - தனஞ்செயன் குலம்",
  },
  {
    label: "Thazhinji Kulam - தழிஞ்சி குலம்",
    value: "Thazhinji Kulam - தழிஞ்சி குலம்",
  },
  {
    label: "Thooran Kulam - தூரன் குலம்",
    value: "Thooran Kulam - தூரன் குலம்",
  },
  {
    label: "Devendran Kulam - தேவேந்திரன் குலம்",
    value: "Devendran Kulam - தேவேந்திரன் குலம்",
  },
  {
    label: "Thooda Kulam - தோட குலம்",
    value: "Thooda Kulam - தோட குலம்",
  },
  {
    label: "Neerunniyar Kulam - நீருண்ணியர் குலம்",
    value: "Neerunniyar Kulam - நீருண்ணியர் குலம்",
  },
  {
    label: "Pavazhalar Kulam - பவழர்குலம்(பவளன்)",
    value: "Pavazhalar Kulam - பவழர்குலம்(பவளன்)",
  },
  {
    label: "Panayan Kulam - பனையன் குலம்",
    value: "Panayan Kulam - பனையன் குலம்",
  },
  {
    label: "Pathuman Kulam - பதுமன் குலம்",
    value: "Pathuman Kulam - பதுமன் குலம்",
  },
  {
    label: "Payiran Kulam - பயிரன் குலம்",
    value: "Payiran Kulam - பயிரன் குலம்",
  },
  {
    label: "Panagkaadar Kulam - பனங்காடர் குலம்",
    value: "Panagkaadar Kulam - பனங்காடர் குலம்",
  },
  {
    label: "Pathariar Kulam - பதறியர் குலம்",
    value: "Pathariar Kulam - பதறியர் குலம்",
  },
  {
    label: "Pandiyan Kulam - பாண்டியன் குலம்",
    value: "Pandiyan Kulam - பாண்டியன் குலம்",
  },
  {
    label: "Pillan Kulam - பில்லன் குலம்",
    value: "Pillan Kulam - பில்லன் குலம்",
  },
  {
    label: "Poosan Kulam - பூசன் குலம்",
    value: "Poosan Kulam - பூசன் குலம்",
  },
  {
    label: "Poochanthai Kulam - பூச்சந்தை குலம்",
    value: "Poochanthai Kulam - பூச்சந்தை குலம்",
  },
  {
    label: "Periyan Kulam - பெரியன் குலம்",
    value: "Periyan Kulam - பெரியன் குலம்",
  },
  {
    label: "Perunkudiyaan - பெருங்குடியான் குலம்",
    value: "Perunkudiyaan - பெருங்குடியான் குலம்",
  },
  {
    label: "Porul thantha - பொருள் தந்த குலம்",
    value: "Porul thantha - பொருள் தந்த குலம்",
  },
  {
    label: "Ponnar Kulam - பொன்னர் குலம்",
    value: "Ponnar Kulam - பொன்னர் குலம்",
  },
  {
    label: "Maniyan Kulam - மணியன் குலம்",
    value: "Maniyan Kulam - மணியன் குலம்",
  },
  {
    label: "Mayilar Kulam - மயிலர் குலம்",
    value: "Mayilar Kulam - மயிலர் குலம்",
  },
  {
    label: "Maadar Kulam - மாடர் குலம்",
    value: "Maadar Kulam - மாடர் குலம்",
  },
  {
    label: "Mutthan Kulam - முத்தன் குலம்",
    value: "Mutthan Kulam - முத்தன் குலம்",
  },
  {
    label: "Muzhukathan - முழுக்காதன் குலம்",
    value: "Muzhukathan - முழுக்காதன் குலம்",
  },
  {
    label: "Medhi Kulam - மேதி குலம்",
    value: "Medhi Kulam - மேதி குலம்",
  },
  {
    label: "Vannakkan Kulam - வண்ணக்கன் குலம்",
    value: "Vannakkan Kulam - வண்ணக்கன் குலம்",
  },
  {
    label: "Villiyar Kulam - வில்லியர் குலம்",
    value: "Villiyar Kulam - வில்லியர் குலம்",
  },
  {
    label: "Vilayan Kulam - விளையன் குலம்",
    value: "Vilayan Kulam - விளையன் குலம்",
  },
  {
    label: "Vizhiyar Kulam - விழியர் குலம்",
    value: "Vizhiyar Kulam - விழியர் குலம்",
  },
  {
    label: "Venduvan Kulam - வெண்டுவன் குலம்",
    value: "Venduvan Kulam - வெண்டுவன் குலம்",
  },
  {
    label: "Vennag Kulam - வெண்ணங் குலம்",
    value: "Vennag Kulam - வெண்ணங் குலம்",
  },
  {
    label: "Vellampar Kulam - வெள்ளம்பர் குலம்",
    value: "Vellampar Kulam - வெள்ளம்பர் குலம்",
  },
  {
    label: "Vendhan Kulam - வேந்தன் குலம்",
    value: "Vendhan Kulam - வேந்தன் குலம்",
  },
  {
    label: "Ilankambur - இளங்கம்பன் குலம்",
    value: "Ilankambur - இளங்கம்பன் குலம்",
  },
  {
    label: "Yennan - ஏனன் குலம்",
    value: "Yennan - ஏனன் குலம்",
  },
  {
    label: "Karee - காரி குலம்",
    value: "Karee - காரி குலம்",
  },
  {
    label: "Yennai - எண்ண குலம்",
    value: "Yennai - எண்ண குலம்",
  },
  {
    label: "Kanavalan - கணவாளன் குலம்",
    value: "Kanavalan - கணவாளன் குலம்",
  },
  {
    label: "Keerai - கீரை குலம்",
    value: "Keerai - கீரை குலம்",
  },
  {
    label: "Kovar - கோவர் குலம்",
    value: "Kovar - கோவர் குலம்",
  },
  {
    label: "Silamban - சிலம்பன் குலம்",
    value: "Silamban - சிலம்பன் குலம்",
  },
  {
    label: "Senganni - செங்கண்ணி குலம்",
    value: "Senganni - செங்கண்ணி குலம்",
  },
  {
    label: "Sevanthi - செவ்வந்தி குலம்",
    value: "Sevanthi - செவ்வந்தி குலம்",
  },
  {
    label: "Serar - சேரர் (அ) சேரலன் குலம்",
    value: "Serar - சேரர் (அ) சேரலன் குலம்",
  },
  {
    label: "Nachanthai - நச்சந்தை குலம்",
    value: "Nachanthai - நச்சந்தை குலம்",
  },
  {
    label: "Pannai - பண்ணை குலம்",
    value: "Pannai - பண்ணை குலம்",
  },
  {
    label: "poonthai - பூந்தை குலம்",
    value: "poonthai - பூந்தை குலம்",
  },
  {
    label: "Paithali - பைதலி குலம்",
    value: "Paithali - பைதலி குலம்",
  },
  {
    label: "Parilanthan - பேரிழந்தான் குலம்",
    value: "Parilanthan - பேரிழந்தான் குலம்",
  },
  {
    label: "Podiyan - பொடியன் குலம்",
    value: "Podiyan - பொடியன் குலம்",
  },
  {
    label: "Malu azhar - மழு அழகர் குலம்",
    value: "Malu azhar - மழு அழகர் குலம்",
  },
  {
    label: "Maluvan - மழுவன் குலம்",
    value: "Maluvan - மழுவன் குலம்",
  },
  {
    label: "Mayavar - மாயவர் குலம்",
    value: "Mayavar - மாயவர் குலம்",
  },
  {
    label: "Moolan - மூலன் குலம்",
    value: "Moolan - மூலன் குலம்",
  },
  {
    label: "Vaanan - வாணன் குலம்",
    value: "Vaanan - வாணன் குலம்",
  },
  {
    label: "Vennai - வெண்னை குலம்",
    value: "Vennai - வெண்னை குலம்",
  },
  {
    label: "Venduzhavar - வெண்டுழவர் குலம்",
    value: "Venduzhavar - வெண்டுழவர் குலம்",
  },
  {
    label: "Vizliyan - விளியன் குலம்",
    value: "Vizliyan - விளியன் குலம்",
  },
  {
    label: "Thambataai - தம்பட்டை குலம்",
    value: "Thambataai - தம்பட்டை குலம்",
  },
  {
    label: "Mullai - முல்லை குலம்",
    value: "Mullai - முல்லை குலம்",
  },
  {
    label: "Pillai - பிள்ளை குலம்",
    value: "Pillai - பிள்ளை குலம்",
  },
  {
    label: "Others - மற்றவைகள்",
    value: "Others - மற்றவைகள்",
  },
];

export const religionOptions = [
  { value: "", label: "Select Religion" },
  { value: "hinduism", label: "Hinduism" },
  { value: "islam", label: "Islam" },
  { value: "christianity", label: "Christianity" },
  { value: "sikhism", label: "Sikhism" },
  { value: "buddhism", label: "Buddhism" },
  { value: "jainism", label: "Jainism" },
  { value: "other", label: "Other" },
];
