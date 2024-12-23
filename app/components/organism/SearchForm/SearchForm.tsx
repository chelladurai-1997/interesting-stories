import {
  ageOptions,
  districtOptions,
  educationOptions,
  genderOptions,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";

const SearchForm: React.FC = () => {
  return (
    <div className="bg-white p-6 my-10 mx-4 rounded-lg shadow-lg md:max-w-[98%] md:mx-auto">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField
          label="I'm looking for"
          id="gender"
          options={genderOptions}
          placeholder="I'm looking for"
          type="select"
          name="gender"
          searchable={false}
        />
        <FormField
          label="Age"
          id="age"
          options={ageOptions}
          placeholder="Age"
          type="select"
          name="age"
          searchable={false}
        />
        <FormField
          label="Education"
          id="education"
          options={educationOptions}
          placeholder="Education"
          type="select"
          name="education"
          searchable={false}
        />
        <FormField
          label="District"
          id="district"
          options={districtOptions}
          placeholder="District"
          type="select"
          name="district"
        />
        <div className="">
          <Button text="Search" />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
