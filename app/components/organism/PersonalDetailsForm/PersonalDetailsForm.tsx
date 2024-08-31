import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";

const PersonalDetailsForm = () => {
  // Define the options for gender in a variable
  const genderOptions = [
    { value: "", label: "Select Gender", disabled: true },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <section className="bg-white p-6 mt-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl max-w-xl mx-auto">
      <div className="container mx-auto">
        <form className="max-w-md mx-auto space-y-6">
          <div className="form-details">
            <div className="space-y-6">
              <FormField
                label="Full Name:"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Date of Birth:"
                id="dob"
                name="dob"
                type="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Gender:"
                id="gender"
                name="gender"
                type="select"
                options={genderOptions}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <FormField
                label="Address:"
                id="address"
                name="address"
                type="textarea"
                placeholder="Address"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />

              <Button text="Save Details" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalDetailsForm;
