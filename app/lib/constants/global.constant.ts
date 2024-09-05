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
