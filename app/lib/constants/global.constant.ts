import { SelectOption } from "@/app/components/atoms/Select/Select";

export const genderOptions: SelectOption[] = [
  { value: "Men - (ஆண்)", label: "Men - (ஆண்)" },
  { value: "Women - (பெண்)", label: "Women - (பெண்)" },
];

export const ageOptions: SelectOption[] = [
  { value: "20-25", label: "20 - 25" },
  { value: "26-30", label: "26 - 30" },
  { value: "31-35", label: "31 - 35" },
  { value: "36-40", label: "36 - 40" },
  { value: "40+", label: "40+" },
];
export const educationOptions: { label: string; value: string }[] = [
  {
    label: "Studying - படித்துக்கொண்டு இருக்கிறார்",
    value: "Studying - படித்துக்கொண்டு இருக்கிறார்",
  },
  {
    label: "Below 10th standard - உயர்நிலைக்கு கீழ்",
    value: "Below 10th standard - உயர்நிலைக்கு கீழ்",
  },
  {
    label: "10th standard - உயர்நிலைப்படிப்பு",
    value: "10th standard - உயர்நிலைப்படிப்பு",
  },
  {
    label: "12th standard - மேல்நிலைப்படிப்பு",
    value: "12th standard - மேல்நிலைப்படிப்பு",
  },
  {
    label: "Bachelor's degree - இளங்கலைப்படிப்பு",
    value: "Bachelor's degree - இளங்கலைப்படிப்பு",
  },
  {
    label: "Master's degree - முதுகலைப்படிப்பு",
    value: "Master's degree - முதுகலைப்படிப்பு",
  },
  { label: "Doctor - மருத்துவப்படிப்பு", value: "Doctor - மருத்துவப்படிப்பு" },
  {
    label: "Engineering - பொறியியல் படிப்பு",
    value: "Engineering - பொறியியல் படிப்பு",
  },
  {
    label: "Degree course/ diploma - பட்டயப்படிப்பு/தொழில் முறை படிப்பு",
    value: "Degree course/ diploma - பட்டயப்படிப்பு/தொழில் முறை படிப்பு",
  },
  { label: "Others - மற்றவை", value: "Others - மற்றவை" },
  { label: "No study - படிப்பு இல்லை", value: "No study - படிப்பு இல்லை" },
];

export const districtOptions: { label: string; value: string }[] = [
  { label: "Ariyalur - அரியலூர்", value: "Ariyalur - அரியலூர்" },
  {
    label: "Chengalpattu - செங்கல்பட்டு",
    value: "Chengalpattu - செங்கல்பட்டு",
  },
  { label: "Chennai - சென்னை", value: "Chennai - சென்னை" },
  { label: "Coimbatore - கோயம்புத்தூர்", value: "Coimbatore - கோயம்புத்தூர்" },
  { label: "Cuddalore - கடலூர்", value: "Cuddalore - கடலூர்" },
  { label: "Dharmapuri - தர்மபுரி", value: "Dharmapuri - தர்மபுரி" },
  { label: "Dindigul - திண்டுக்கல்", value: "Dindigul - திண்டுக்கல்" },
  { label: "Erode - ஈரோடு", value: "Erode - ஈரோடு" },
  {
    label: "Kallakurichi - கள்ளக்குறிச்சி",
    value: "Kallakurichi - கள்ளக்குறிச்சி",
  },
  { label: "Kanchipuram - காஞ்சிபுரம்", value: "Kanchipuram - காஞ்சிபுரம்" },
  { label: "Kanyakumari - கன்னியாகுமரி", value: "Kanyakumari - கன்னியாகுமரி" },
  { label: "Karur - கரூர்", value: "Karur - கரூர்" },
  { label: "Krishnagiri - கிருஷ்ணகிரி", value: "Krishnagiri - கிருஷ்ணகிரி" },
  { label: "Madurai - மதுரை", value: "Madurai - மதுரை" },
  {
    label: "Mayiladuthurai - மயிலாடுதுறை",
    value: "Mayiladuthurai - மயிலாடுதுறை",
  },
  {
    label: "Nagapattinam - நாகப்பட்டினம்",
    value: "Nagapattinam - நாகப்பட்டினம்",
  },
  { label: "Namakkal - நாமக்கல்", value: "Namakkal - நாமக்கல்" },
  { label: "Nilgiris - நீலகிரி", value: "Nilgiris - நீலகிரி" },
  { label: "Perambalur - பெரம்பலூர்", value: "Perambalur - பெரம்பலூர்" },
  { label: "Pudukkottai - புதுக்கோட்டை", value: "Pudukkottai - புதுக்கோட்டை" },
  {
    label: "Ramanathapuram - இராமநாதபுரம்",
    value: "Ramanathapuram - இராமநாதபுரம்",
  },
  { label: "Ranipet - இராணிப்பேட்டை", value: "Ranipet - இராணிப்பேட்டை" },
  { label: "Salem - சேலம்", value: "Salem - சேலம்" },
  { label: "Sivagangai - சிவகங்கை", value: "Sivagangai - சிவகங்கை" },
  { label: "Tenkasi - தென்காசி", value: "Tenkasi - தென்காசி" },
  { label: "Thanjavur - தஞ்சாவூர்", value: "Thanjavur - தஞ்சாவூர்" },
  { label: "Theni - தேனி", value: "Theni - தேனி" },
  { label: "Thoothukudi - தூத்துக்குடி", value: "Thoothukudi - தூத்துக்குடி" },
  {
    label: "Tiruchirappalli - திருச்சிராப்பள்ளி",
    value: "Tiruchirappalli - திருச்சிராப்பள்ளி",
  },
  { label: "Tirunelveli - திருநெல்வேலி", value: "Tirunelveli - திருநெல்வேலி" },
  { label: "Tirupathur - திருப்பத்தூர்", value: "Tirupathur - திருப்பத்தூர்" },
  { label: "Tiruppur - திருப்பூர்", value: "Tiruppur - திருப்பூர்" },
  { label: "Tiruvallur - திருவள்ளூர்", value: "Tiruvallur - திருவள்ளூர்" },
  {
    label: "Tiruvannamalai - திருவண்ணாமலை",
    value: "Tiruvannamalai - திருவண்ணாமலை",
  },
  { label: "Tiruvarur - திருவாரூர்", value: "Tiruvarur - திருவாரூர்" },
  { label: "Vellore - வேலூர்", value: "Vellore - வேலூர்" },
  { label: "Viluppuram - விழுப்புரம்", value: "Viluppuram - விழுப்புரம்" },
  { label: "Virudhunagar - விருதுநகர்", value: "Virudhunagar - விருதுநகர்" },
];

export const stateOptions = [
  { label: "Kerala - கேரளா", value: "Kerala - கேரளா" },
  { label: "Karnataka - கர்நாடகா", value: "Karnataka - கர்நாடகா" },
  { label: "Andhra - ஆந்திரா", value: "Andhra - ஆந்திரா" },
  { label: "Tamil Nadu - தமிழ்நாடு", value: "Tamil Nadu - தமிழ்நாடு" },
  { label: "Others - மற்றவர்கள்", value: "Others - மற்றவர்கள்" },
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
  { value: "0", label: "0" },
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
export const EDUCATION_OPTIONS: { label: string; value: string }[] = [
  { label: "High School", value: "High School" },
  { label: "Associate Degree", value: "Associate Degree" },
  { label: "Bachelor's Degree", value: "Bachelor's Degree" },
  { label: "Master's Degree", value: "Master's Degree" },
  { label: "PhD", value: "PhD" },
];

export const OCCUPATION_OPTIONS: { label: string; value: string }[] = [
  { label: "Engineer", value: "Engineer" },
  { label: "Doctor", value: "Doctor" },
  { label: "Teacher", value: "Teacher" },
  { label: "Manager", value: "Manager" },
  { label: "Others", value: "Others" },
];

export const MONTHLY_INCOME_OPTIONS: { label: string; value: string }[] = [
  { label: "Below 10,000", value: "Below 10,000" },
  { label: "10,000 - 25,000", value: "10,000 - 25,000" },
  { label: "25,000 - 50,000", value: "25,000 - 50,000" },
  { label: "50,000 - 1,00,000", value: "50,000 - 1,00,000" },
  { label: "Above 1,00,000", value: "Above 1,00,000" },
];

export const workingPlaceOptions = [
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

export const zodiacNakshatras = [
  { label: "Aswini - அஸ்வினி", value: "Aswini - அஸ்வினி" },
  { label: "Bharani - பரணி", value: "Bharani - பரணி" },
  { label: "Karthigai - கார்த்திகை", value: "Karthigai - கார்த்திகை" },
  { label: "Rohini - ரோகிணி", value: "Rohini - ரோகிணி" },
  {
    label: "Mirigasirisam - மிருகசீரிடம்",
    value: "Mirigasirisam - மிருகசீரிடம்",
  },
  { label: "Thiruvathirai - திருவாதிரை", value: "Thiruvathirai - திருவாதிரை" },
  { label: "Punarpusam - புனர்பூசம்", value: "Punarpusam - புனர்பூசம்" },
  { label: "Poosam - பூசம்", value: "Poosam - பூசம்" },
  { label: "Ayilyam - ஆயில்யம்", value: "Ayilyam - ஆயில்யம்" },
  { label: "Magam - மகம்", value: "Magam - மகம்" },
  { label: "Pooram - பூர்ணம்", value: "Pooram - பூர்ணம்" },
  { label: "Utthiram - உத்திரம்", value: "Utthiram - உத்திரம்" },
  { label: "Astham - அஸ்தம்", value: "Astham - அஸ்தம்" },
  { label: "Chittirai - சித்திரை", value: "Chittirai - சித்திரை" },
  { label: "Swati - சுவாதி", value: "Swati - சுவாதி" },
  { label: "Visakam - விசாகம்", value: "Visakam - விசாகம்" },
  { label: "Anusham - அனுஷம்", value: "Anusham - அனுஷம்" },
  { label: "Kettai - கேட்டை", value: "Kettai - கேட்டை" },
  { label: "Moolam - மூலம்", value: "Moolam - மூலம்" },
  { label: "Pooradam - பூராடம்", value: "Pooradam - பூராடம்" },
  { label: "Utthiradam - உத்திராடம்", value: "Utthiradam - உத்திராடம்" },
  { label: "Thiruvonam - திருவோணம்", value: "Thiruvonam - திருவோணம்" },
  { label: "Avittam - அவிட்டம்", value: "Avittam - அவிட்டம்" },
  { label: "Sathayam - சதயம்", value: "Sathayam - சதயம்" },
  { label: "Pooratadhi - பூரட்டாதி", value: "Pooratadhi - பூரட்டாதி" },
  {
    label: "Utthiratadhi - உத்திரட்டாதி",
    value: "Utthiratadhi - உத்திரட்டாதி",
  },
  { label: "Revathi - ரேவதி", value: "Revathi - ரேவதி" },
];

export const countriesOptions = [
  {
    label: "GREAT BRITAIN - இங்கிலாந்து",
    value: "GREAT BRITAIN - இங்கிலாந்து",
  },
  { label: "U.S.A - அமெரிக்கா", value: "U.S.A - அமெரிக்கா" },
  { label: "DUBAI - துபாய்", value: "DUBAI - துபாய்" },
  { label: "INDIA - இந்தியா", value: "INDIA - இந்தியா" },
  { label: "GERMANY - ஜெர்மனி", value: "GERMANY - ஜெர்மனி" },
  { label: "CANADA - கனடா", value: "CANADA - கனடா" },
  { label: "Others - மற்றவைகள்", value: "Others - மற்றவைகள்" },
];

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

export const kulaDheivamOptions = [
  {
    label: "Ponnallagu nachiamman  - பொன்னழகு நாச்சியம்மன்",
    value: "Ponnallagu nachiamman  - பொன்னழகு நாச்சியம்மன்",
  },
  {
    label: "Periyanayakiamman - பெரியநாயகி அம்மன்",
    value: "Periyanayakiamman - பெரியநாயகி அம்மன்",
  },
  {
    label: "Sellandiamman - செல்லாண்டியம்மன்",
    value: "Sellandiamman - செல்லாண்டியம்மன்",
  },
  {
    label: "Kariyakaliamman - கரிய காளியம்மன்",
    value: "Kariyakaliamman - கரிய காளியம்மன்",
  },
  {
    label: "Selvanayakiamman - செல்வநாயகி அம்மன்",
    value: "Selvanayakiamman - செல்வநாயகி அம்மன்",
  },
  {
    label: "Goundachiamman - கவுண்டிச்சி அம்மன்",
    value: "Goundachiamman - கவுண்டிச்சி அம்மன்",
  },
  {
    label: "Ponkaliamman - பொன் காளியம்மன்",
    value: "Ponkaliamman - பொன் காளியம்மன்",
  },
  {
    label: "Seliamman - செல்லியம்மன்",
    value: "Seliamman - செல்லியம்மன்",
  },
  {
    label: "Angalaparmeswari amman - அங்காள பரமேஸ்வரி அம்மன்",
    value: "Angalaparmeswari amman - அங்காள பரமேஸ்வரி அம்மன்",
  },
  {
    label: "Thanganayakiamman - தங்கநாயகி அம்மன்",
    value: "Thanganayakiamman - தங்கநாயகி அம்மன்",
  },
  {
    label: "Nallpulliamman - நல்லபுள்ளி அம்மன்",
    value: "Nallpulliamman - நல்லபுள்ளி அம்மன்",
  },
  {
    label: "Sivaselvanayakiamman - சிவசெல்வநாயகி அம்மன்",
    value: "Sivaselvanayakiamman - சிவசெல்வநாயகி அம்மன்",
  },
  {
    label: "Kammachiamman - காமாட்சி அம்மன்",
    value: "Kammachiamman - காமாட்சி அம்மன்",
  },
  {
    label: "Aathanoor amman - ஆதனூர் அம்மன்",
    value: "Aathanoor amman - ஆதனூர் அம்மன்",
  },
  {
    label: "Aanooramman - ஆனூர் அம்மன்",
    value: "Aanooramman - ஆனூர் அம்மன்",
  },
  {
    label: "Nalliamman - நல்லி அம்மன்",
    value: "Nalliamman - நல்லி அம்மன்",
  },
  {
    label: "Athanur amman - அத்தனூர் அம்மன்",
    value: "Athanur amman - அத்தனூர் அம்மன்",
  },
  {
    label: "Velliamman - வெள்ளை அம்மன்",
    value: "Velliamman - வெள்ளை அம்மன்",
  },
  {
    label: "Kandiamman - கண்டியம்மன்",
    value: "Kandiamman - கண்டியம்மன்",
  },
  {
    label: "Thangamman - தங்கம்மன்",
    value: "Thangamman - தங்கம்மன்",
  },
  {
    label: "Arungariamman - அருங்கரை அம்மன்",
    value: "Arungariamman - அருங்கரை அம்மன்",
  },
  {
    label: "Parvathi sadiyappasamy - பார்வதி சடையப்ப சுவாமி",
    value: "Parvathi sadiyappasamy - பார்வதி சடையப்ப சுவாமி",
  },
  {
    label: "Powliamman - பவுளியம்மன்",
    value: "Powliamman - பவுளியம்மன்",
  },
  {
    label: "Vangalamman - வாங்கலம்மன்",
    value: "Vangalamman - வாங்கலம்மன்",
  },
  {
    label: "Ponnaiamman - பொன்னையம்மன்",
    value: "Ponnaiamman - பொன்னையம்மன்",
  },
  {
    label: "Murungaiamman - முருங்கையம்மன்",
    value: "Murungaiamman - முருங்கையம்மன்",
  },
  {
    label: "Thiruperatiamman - திருப்பிராட்டி அம்மன்",
    value: "Thiruperatiamman - திருப்பிராட்டி அம்மன்",
  },
  {
    label: "Chinnaponnachiamman - சின்ன பொன்னாச்சி அம்மன்",
    value: "Chinnaponnachiamman - சின்ன பொன்னாச்சி அம்மன்",
  },
  {
    label: "Pudhu vekkariamman - புது வெங்கரையம்மன்",
    value: "Pudhu vekkariamman - புது வெங்கரையம்மன்",
  },
  {
    label: "Ponachiamman - பொன்னாட்சி அம்மன்",
    value: "Ponachiamman - பொன்னாட்சி அம்மன்",
  },
  {
    label: "Pachinayakiamman - பச்சைநாயகி அம்மன்",
    value: "Pachinayakiamman - பச்சைநாயகி அம்மன்",
  },
  {
    label: "Aayiamman - ஆயி அம்மன்",
    value: "Aayiamman - ஆயி அம்மன்",
  },
  {
    label: "Kaliamman - காளியம்மன்",
    value: "Kaliamman - காளியம்மன்",
  },
  {
    label: "Chinnamman - சின்னம்மன்",
    value: "Chinnamman - சின்னம்மன்",
  },
  {
    label: "Periyamman - பெரியம்மன்",
    value: "Periyamman - பெரியம்மன்",
  },
  {
    label: "Puthu vangallamman - புது வாங்கலம்மன்",
    value: "Puthu vangallamman - புது வாங்கலம்மன்",
  },
  {
    label: "Nallathal udhthami devi - நல்லாத்தாள் உத்தமி தேவி",
    value: "Nallathal udhthami devi - நல்லாத்தாள் உத்தமி தேவி",
  },
  {
    label: "Pathrakaliamman - பத்ரகாளியம்மன்",
    value: "Pathrakaliamman - பத்ரகாளியம்மன்",
  },
  {
    label: "Madhurakaliamman - மதுரகாளியம்மன்",
    value: "Madhurakaliamman - மதுரகாளியம்மன்",
  },
  {
    label: "Kariyaperumal - கரியபெருமாள்",
    value: "Kariyaperumal - கரியபெருமாள்",
  },
  {
    label: "Ponachiamman - பொன்னாச்சி அம்மன்",
    value: "Ponachiamman - பொன்னாச்சி அம்மன்",
  },
  {
    label: "Periyanaiyakiamman - பெரியநாயகி அம்மன்",
    value: "Periyanaiyakiamman - பெரியநாயகி அம்மன்",
  },
  {
    label: "Malayamulunkiyamman - மலையா முழுங்கியம்மன்",
    value: "Malayamulunkiyamman - மலையா முழுங்கியம்மன்",
  },
  {
    label: "Peratiyamman - பிராட்டியம்மன்",
    value: "Peratiyamman - பிராட்டியம்மன்",
  },
  {
    label: "Thiruneellakandiyamman - திருநீல கண்டியம்மன்",
    value: "Thiruneellakandiyamman - திருநீல கண்டியம்மன்",
  },
  {
    label: "Soliyamman - சோழியம்மன்",
    value: "Soliyamman - சோழியம்மன்",
  },
  {
    label: "Sawmundieswari - சாமுண்டீஸ்வரி",
    value: "Sawmundieswari - சாமுண்டீஸ்வரி",
  },
  {
    label: "Thampuratiamman - தம்புராட்டியம்மன்",
    value: "Thampuratiamman - தம்புராட்டியம்மன்",
  },
  {
    label: "Kaliamman - காளியம்மன்",
    value: "Kaliamman - காளியம்மன்",
  },
  {
    label: "Kagathaliamman - காகத்தலையம்மன்",
    value: "Kagathaliamman - காகத்தலையம்மன்",
  },
  {
    label: "Angalaamman - அங்காளம்ம",
    value: "Angalaamman - அங்காளம்ம",
  },
  {
    label: "Masiriamman - மசிரியம்மன்",
    value: "Masiriamman - மசிரியம்மன்",
  },
  {
    label: "Kullaliyamman - குழலியம்மன்",
    value: "Kullaliyamman - குழலியம்மன்",
  },
  {
    label: "Sokkanayakiamman - சொக்கநாயகியம்மன்",
    value: "Sokkanayakiamman - சொக்கநாயகியம்மன்",
  },
  {
    label: "Kullavillaguamman - குலவிளக்கம்மன்",
    value: "Kullavillaguamman - குலவிளக்கம்மன்",
  },
  {
    label: "Appathall - அப்பத்தாள்",
    value: "Appathall - அப்பத்தாள்",
  },
  {
    label: "Srideviamman - ஸ்ரீதேவியம்மன்",
    value: "Srideviamman - ஸ்ரீதேவியம்மன்",
  },
  {
    label: "Ponkaliamman - பொன் காளியம்மன்",
    value: "Ponkaliamman - பொன் காளியம்மன்",
  },
  {
    label: "Sawmuniyamman - சாமுண்டியம்மன்",
    value: "Sawmuniyamman - சாமுண்டியம்மன்",
  },
  {
    label: "Rajanayakiamman - இராஜநாயகியம்மன்",
    value: "Rajanayakiamman - இராஜநாயகியம்மன்",
  },
  {
    label: "Ukkirandiyamman - உக்கிராண்டியம்மன்",
    value: "Ukkirandiyamman - உக்கிராண்டியம்மன்",
  },
  {
    label: "Chinnathal - சின்னாத்தாள்",
    value: "Chinnathal - சின்னாத்தாள்",
  },
  {
    label: "Poovathal - பூவாத்தாள்",
    value: "Poovathal - பூவாத்தாள்",
  },
  {
    label: "Thaliyamman - தல்லியம்மன்",
    value: "Thaliyamman - தல்லியம்மன்",
  },
  {
    label: "Maruthakaliyamman - மருதகாளியம்மன்",
    value: "Maruthakaliyamman - மருதகாளியம்மன்",
  },
  {
    label: "Malaiyamman - மலையம்மன்",
    value: "Malaiyamman - மலையம்மன்",
  },
  {
    label: "Padaivediyamman - படைவெட்டியம்மன்",
    value: "Padaivediyamman - படைவெட்டியம்மன்",
  },
  {
    label: "Kongaalamman - கொங்காளம்மன்",
    value: "Kongaalamman - கொங்காளம்மன்",
  },
  {
    label: "Pachanachayamman - பச்சநாச்சயம்மன்",
    value: "Pachanachayamman - பச்சநாச்சயம்மன்",
  },
  {
    label: "Nallamangai - நல்லமங்கை",
    value: "Nallamangai - நல்லமங்கை",
  },
  {
    label: "Vagaithulluvuamman - வாகைதொழுவு அம்மன்",
    value: "Vagaithulluvuamman - வாகைதொழுவு அம்மன்",
  },
  {
    label: "Muchiliyamman - முச்சிலியம்மன்",
    value: "Muchiliyamman - முச்சிலியம்மன்",
  },
  {
    label: "Vellathal - வேலாத்தாள்",
    value: "Vellathal - வேலாத்தாள்",
  },
  {
    label: "Nallammal,periyammai - நல்லம்மாள்,பெரியம்மை",
    value: "Nallammal,periyammai - நல்லம்மாள்,பெரியம்மை",
  },
  {
    label: "Vanniyamman - வன்னியம்மன்",
    value: "Vanniyamman - வன்னியம்மன்",
  },
  {
    label: "Goniyamman - கோனியம்மன்",
    value: "Goniyamman - கோனியம்மன்",
  },
  {
    label: "Veeramathiyamman - வீரமாத்தியம்மன்",
    value: "Veeramathiyamman - வீரமாத்தியம்மன்",
  },
  {
    label: "Kothanooramman - கொத்தனூர் அம்மன்",
    value: "Kothanooramman - கொத்தனூர் அம்மன்",
  },
  {
    label: "Kapiliyamman - காம்பிலியம்மன்",
    value: "Kapiliyamman - காம்பிலியம்மன்",
  },
  {
    label: "Periyanachiyamman - பெரியநாச்சியம்மன்",
    value: "Periyanachiyamman - பெரியநாச்சியம்மன்",
  },
  {
    label: "Nalliyamman - நல்லியம்மாள்",
    value: "Nalliyamman - நல்லியம்மாள்",
  },
  {
    label: "Pagavathiyamman - பகவதியம்மன்",
    value: "Pagavathiyamman - பகவதியம்மன்",
  },
  {
    label: "Eddukkaiyamman - எட்டுக்கை அம்மன்",
    value: "Eddukkaiyamman - எட்டுக்கை அம்மன்",
  },
  {
    label: "Neeliyamman - நீலியம்மன்",
    value: "Neeliyamman - நீலியம்மன்",
  },
  {
    label: "Veeranachiyamman - வீரநாச்சியம்மன்",
    value: "Veeranachiyamman - வீரநாச்சியம்மன்",
  },
  {
    label: "Veeramachiyamman - வீரமாட்சியம்மன்",
    value: "Veeramachiyamman - வீரமாட்சியம்மன்",
  },
  {
    label: "Vanchiyamman - வஞ்சியம்மன்",
    value: "Vanchiyamman - வஞ்சியம்மன்",
  },
  {
    label: "Pachiyamman - பச்சையம்மன்",
    value: "Pachiyamman - பச்சையம்மன்",
  },
  {
    label: "Patharakaliyamman - பத்ரகாளியம்மன்",
    value: "Patharakaliyamman - பத்ரகாளியம்மன்",
  },
  {
    label: "Ponkaliyamman - பொன் காளியம்மன்",
    value: "Ponkaliyamman - பொன் காளியம்மன்",
  },
  {
    label: "Others - இதர கோயிலினர்",
    value: "Others - இதர கோயிலினர்",
  },
];

export const religionOptions = [
  { value: "hinduism", label: "Hinduism" },
  { value: "islam", label: "Islam" },
  { value: "christianity", label: "Christianity" },
  { value: "sikhism", label: "Sikhism" },
  { value: "buddhism", label: "Buddhism" },
  { value: "jainism", label: "Jainism" },
  { value: "other", label: "Other" },
];

export const zodiacSigns = [
  { label: "Aries - மேஷம்", value: "Aries" },
  { label: "Taurus - ரிஷபம்", value: "Taurus" },
  { label: "Gemini - மிதுனம்", value: "Gemini" },
  { label: "Cancer - கடகம்", value: "Cancer" },
  { label: "Leo - சிம்மம்", value: "Leo" },
  { label: "Virgo - கன்னி", value: "Virgo" },
  { label: "Libra - துலாம்", value: "Libra" },
  { label: "Scorpio - விருச்சிகம்", value: "Scorpio" },
  { label: "Sagittarius - தனுசு", value: "Sagittarius" },
  { label: "Capricorn - மகரம்", value: "Capricorn" },
  { label: "Aquarius - கும்பம்", value: "Aquarius" },
  { label: "Pisces - மீனம்", value: "Pisces" },
];

export const jathagamStatusOptions = [
  {
    label: "Sutha Jathagam - சுத்த ஜாதகம்",
    value: "Sutha Jathagam - சுத்த ஜாதகம்",
  },
  { label: "Sevvai - செவ்வாய்", value: "Sevvai - செவ்வாய்" },
  { label: "Ragu Kedhu - இராகு கேது", value: "Ragu Kedhu - இராகு கேது" },
  {
    label: "Ragu Kedhu Sevvai - இராகு கேது செவ்வாய்",
    value: "Ragu Kedhu Sevvai - இராகு கேது செவ்வாய்",
  },
  { label: "Others - மற்றவைகள்", value: "Others - மற்றவைகள்" },
];

export const carouselImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1682092597591-81f59c80d9ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "a white cat is holding a gray cat in its arms and they are standing next to each other.",
  },
  {
    url: "https://media.istockphoto.com/id/937786912/photo/south-indian-wedding.webp?a=1&b=1&s=612x612&w=0&k=20&c=0zX1op-lQgT3tdT-NADmfGzue9V0KXAemgpEN9zxEVM=",
    alt: "a dog wearing sunglasses at the beach.",
  },
  {
    url: "https://media.istockphoto.com/id/2152779035/photo/handmade-clay-lord-ganesha-idol-for-pooja-in-a-south-indian-hindu-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=OellI3r9tJu13yJI2DLQ6d6r0kR9Q7LMBdiHf9qpMnM=",
    alt: "a sunset over a city skyline.",
  },
  {
    url: "https://media.istockphoto.com/id/937786916/photo/south-indian-wedding.webp?a=1&b=1&s=612x612&w=0&k=20&c=3jpKf2QovAWA-3C3GQmiLAwipjta1LvNSLBa3vzPiGI=",
    alt: "a sunset over a city skyline.",
  },
  {
    url: "https://media.istockphoto.com/id/2168707868/photo/indian-couple-holding-hand-close-up-in-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=YohVKdmbHl85l5Iy_retZo7uMDh53b7B-TEx5EmxF5c=",
    alt: "a sunset over a city skyline.",
  },
  {
    url: "https://media.istockphoto.com/id/1179299016/photo/indian-wedding-ceremony-decorations-for-traditional-ethnic-rituals-for-marriage-fire-burning.webp?a=1&b=1&s=612x612&w=0&k=20&c=_lijzUlDcRXhGzJ9fssYd6nI7_FzdrIo78YxvAZp9sE=",
    alt: "a sunset over a city skyline.",
  },
];

export const formSectionDefaultState = {
  basicInfo: false,
  personalDetails: false,
  educationOccupation: false,
  horoscope: false,
  expectation: false,
  familyDetails: false,
  contactDetails: false,
};
export const movingImages = [
  "https://i.pinimg.com/236x/39/01/8c/39018c6032e27478d58caf8c2106c1b8.jpg",
  "https://i.pinimg.com/236x/bf/26/96/bf26969479445c129329ceccaabecc52.jpg",
  "https://i.pinimg.com/236x/c8/a5/25/c8a5259da00409ee393e77b093660436.jpg",

  "https://i.pinimg.com/236x/2b/3a/36/2b3a36b6a63832ac10081c62d7842a95.jpg",
  "https://i.pinimg.com/236x/dc/c5/87/dcc5876fd0a1efa8ccdf07b47c1d0463.jpg",

  "https://i.pinimg.com/236x/28/2f/9d/282f9de8bf803207bc96b1d8cd4058ac.jpg",
  "https://i.pinimg.com/236x/c4/c6/1d/c4c61d14eca632476766d3448a485d18.jpg",
  "https://i.pinimg.com/236x/70/33/92/703392772705e01d8eaf831209befcf8.jpg",
  "https://i.pinimg.com/236x/40/8b/9b/408b9b074ef454dd62505490e88c21f3.jpg",
  "https://i.pinimg.com/236x/82/0b/08/820b0863009ef80348e8374cb291a15d.jpg",
  "https://i.pinimg.com/736x/dc/07/df/dc07df1afc22e0992ec50396a617ef95.jpg",
  "https://i.pinimg.com/236x/f3/9d/6a/f39d6aaafc43ec466e7f24a4f0651954.jpg",
  "https://i.pinimg.com/236x/cd/73/9f/cd739f9fa9934608d59ec67d481adabf.jpg",
  "https://i.pinimg.com/236x/ae/2a/40/ae2a40e4637973997a8266b1f822f3b4.jpg",
  "https://i.pinimg.com/236x/04/c8/53/04c853e88a245b7c816d7b2e6dc7f705.jpg",
  "https://i.pinimg.com/236x/f1/f1/12/f1f1120ccad8bd5335db501e26e37f66.jpg",
  "https://i.pinimg.com/236x/25/96/1f/25961fb841be57813db043d9615f98e8.jpg",
  "https://i.pinimg.com/236x/98/6b/2e/986b2ea951b1a17ddcfd75925a7328c0.jpg",
  "https://i.pinimg.com/236x/66/54/f9/6654f9ef616a81f3181207d58c2a775e.jpg",
  "https://i.pinimg.com/236x/88/60/e4/8860e472512df77466bed9c699bf1f88.jpg",
  "https://i.pinimg.com/236x/f9/38/99/f938999a2a026027c0ed4b6c10262ca3.jpg",
  "https://i.pinimg.com/236x/5e/bb/4e/5ebb4edca1743188272bb0f6d5310715.jpg",
  "https://i.pinimg.com/236x/c8/12/00/c81200fee949536054cebeb1885a962f.jpg",
  "https://i.pinimg.com/236x/b0/93/0c/b0930c0a57e861c1187e1150befe3b5d.jpg",
  "https://i.pinimg.com/236x/5f/db/f4/5fdbf4965534da85854d7bef1162bd23.jpg",
  "https://i.pinimg.com/236x/ab/c3/d9/abc3d9fdff65cd8956600ca004046875.jpg",
  "https://i.pinimg.com/736x/56/7b/8b/567b8b053d0d3d83915c90c3485032ce.jpg",
];
