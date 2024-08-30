import React from "react";

const BasicProfileStepper = () => {
  return (
    <main>
      <Header />
      {/* <Stepper /> */}
      <BasicInfoForm />
    </main>
  );
};

const Header = () => (
  <section>
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="text-yellow-300">
            <i className="font-bold text-lg">#1</i> Matrimony
          </div>
          <h1 className="text-4xl font-bold text-white">Basic Information</h1>
          <p className="text-white mt-4">
            Enter your basic information to proceed
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Stepper = () => {
  const steps = [
    { number: 1, label: "Basic", href: "/profile-data/basic", active: true },
    {
      number: 2,
      label: "Personal",
      href: "/profile-data/personal",
      active: false,
    },
    { number: 3, label: "Edu", href: "/profile-data/edu", active: false },
    { number: 4, label: "Family", href: "/profile-data/family", active: false },
    {
      number: 5,
      label: "Horoscope",
      href: "/profile-data/horoscope",
      active: false,
    },
    {
      number: 6,
      label: "Expectation",
      href: "/profile-data/expectation",
      active: false,
    },
    {
      number: 7,
      label: "Contact",
      href: "/profile-data/contact",
      active: false,
    },
  ];

  return (
    <div className="bg-white text-center space-x-10 container-md mx-auto">
      <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
        {steps.map((step) => (
          <li
            key={step.number}
            className={`form-stepper-list text-center ${
              step.active ? "form-stepper-active" : "form-stepper-unfinished"
            }`}
          >
            <a className="mx-2" href={step.href}>
              <span className="form-stepper-circle" style={{ color: "white" }}>
                <span>{step.number}</span>
              </span>
              <div className="label">{step.label}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BasicInfoForm = () => {
  return (
    <section className="bg-white p-4 sm:p-10 border rounded container-md mt-10">
      <div className="form-tit mb-6 text-center">
        <h4 className="text-lg font-semibold">Step 1 of 7</h4>
        <h1 className="text-2xl font-bold">Basic Information</h1>
        <p className="text-sm">Hello Kio, Enter your details</p>
      </div>
      <div className="form-login">
        <form autoComplete="off">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-gray-700">
                  Full Name (முழு பெயர்):{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  defaultValue="Kio"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="block text-gray-700">
                  Gender (பாலினம்): <span className="text-red-500">*</span>
                </label>
                <div className="flex mt-2">
                  <div className="form-check me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      required
                      value="male"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="dob" className="block text-gray-700">
                  D.O.B (பிறந்த நாள்): <span className="text-red-500">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  placeholder="D.O.B"
                  required
                  type="datetime-local"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  defaultValue="1997-08-17T21:59:00"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="profile_created_by"
                  className="block text-gray-700"
                >
                  Profile created by (பதிவு செய்பவர்):{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  id="profile_created_by"
                  name="profile_created_by"
                >
                  <option value="">Select Created by</option>
                  <option value="parent">Parent - (பெற்றோர்)</option>
                  <option value="sibling">Sibling - (உடன்பிறப்பு)</option>
                  <option value="guardian">Guardian - (பாதுகாவலர்)</option>
                  <option value="myself">Myself - (நானே)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="marital_status" className="block text-gray-700">
                Marital Status (திருமண நிலை):{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="marital_status"
                name="marital_status"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single - (திருமணம் ஆகாதவர்)</option>
                <option value="married">Married - (திருமணமானவர்)</option>
                <option value="divorced">Divorced - (விவாகரத்து ஆனவர்)</option>
                <option value="widowed">Widowed - (துணையை இழந்தவர்)</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="children" className="block text-gray-700">
                  No. of. Children (குழந்தைகள்):{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="form-select mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  id="children"
                  name="children"
                  required
                >
                  <option value="none">none</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="children_living_status"
                  className="block text-gray-700"
                >
                  Children Living Status (குழந்தைகள் வசிப்பது):{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex mt-2">
                  <div className="form-check me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="children_living_status"
                      id="living"
                      required
                      value="living"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="living">
                      Living with me
                    </label>
                  </div>
                  <div className="form-check me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="children_living_status"
                      id="not-living"
                      required
                      value="not-living"
                    />
                    <label className="form-check-label" htmlFor="not-living">
                      Not living with me
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="children_living_status"
                      id="not-applicable"
                      required
                      value="not-applicable"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="not-applicable"
                    >
                      Not applicable
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="profile_bio" className="block text-gray-700">
                Profile Bio (சுயவிவர தகவல்):{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                id="profile_bio"
                name="profile_bio"
                placeholder="Profile biography"
                required
              >
                jksjkdjlklsdklskldkslkd
              </textarea>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Note: This information will be displayed publicly so be careful with
            your information.
          </p>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-yellow-600"
            >
              Save & Proceed
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="ms-4 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BasicProfileStepper;
