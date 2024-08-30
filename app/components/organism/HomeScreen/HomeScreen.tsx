import React from "react";

const HomeScreen = () => {
  return (
    <main>
      <Header />
      <Banner />
      <QuickAccess />
    </main>
  );
};

const Header = () => (
  <section>
    <div className="relative">
      <div className="bg-gray-800 py-10">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="text-yellow-300">
                <i className="font-bold text-lg">#1</i> Matrimony
              </div>
              <h1 className="text-4xl font-bold text-white">
                Find your
                <br />
                <b className="text-yellow-300">Soul Mate</b> here
              </h1>
              <p className="text-white mt-4">
                Most trusted Kongu Vellalar Gounder's Matrimony
              </p>
            </div>
          </div>
          <SearchForm />
        </div>
      </div>
    </div>
  </section>
);

const SearchForm = () => {
  const genderOptions = [
    { value: "male", label: "Men - (ஆண்)" },
    { value: "female", label: "Women - (பெண்)" },
  ];

  const ageOptions = [
    { value: "20-25", label: "20 - 25" },
    { value: "26-30", label: "26 - 30" },
    { value: "31-35", label: "31 - 35" },
    { value: "36-40", label: "36 - 40" },
    { value: "40+", label: "40+" },
  ];

  const educationOptions = [
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

  const districtOptions = [
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

  return (
    <div className="bg-white p-6 mt-10 rounded-lg shadow-lg">
      <form className="flex flex-wrap">
        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700">I'm looking for</label>
          <select className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="">I'm looking for</option>
            {genderOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700">
            Age <span className="font-nota">(வயது)</span>
          </label>
          <select className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="">Age</option>
            {ageOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700">Education</label>
          <select className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="">Education</option>
            {educationOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 p-2">
          <label className="block text-gray-700">District</label>
          <select className="w-full mt-2 p-2 border border-gray-300 rounded">
            <option value="">District</option>
            {districtOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 p-2 flex items-end">
          <input
            type="submit"
            value="Search"
            className="w-full bg-yellow-500 text-white p-2 rounded"
          />
        </div>
      </form>
    </div>
  );
};

const Banner = () => (
  <section className="mt-10">
    <div className="relative">
      <ul className="overflow-hidden">
        <li className="w-full">
          <img
            src="https://qph.cf2.quoracdn.net/main-qimg-a426fc6fb067ce5cfcc4fc060c2b756c-c"
            alt="Banner"
            className="w-full object-cover h-64"
          />
        </li>
      </ul>
    </div>
  </section>
);

const QuickAccess = () => (
  <section className="bg-gray-100 py-12">
    <div className="container mx-auto text-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-700">Our Services</h2>
        <p className="text-gray-500 mt-2">Quick Access</p>
      </div>
    </div>
  </section>
);

export default HomeScreen;
