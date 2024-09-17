"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  zodiacSigns,
  zodiacNakshatras,
  jathagamStatusOptions,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { calculatePercentageCompleted } from "@/app/lib/utils/calculateCompletedPercent";
import { useHoroscopeForm } from "@/app/lib/hooks/useHoroscope";

const HoroscopeForm = () => {
  const { isRunning, onSubmit } = useHoroscopeForm();
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Astrology, a guiding force from the stars!"
        step="Step 5 of 7"
        title="Horoscope Information"
        registerPercentCompleted={calculatePercentageCompleted(4, 7)}
      />
      <div className="form-login">
        <form autoComplete="off" action={onSubmit}>
          <div className="space-y-6">
            {/* 2 columns on medium screens and up, 1 column on smaller screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Raasi */}
              <FormField
                label="Raasi (ராசி)"
                id="raasi"
                name="raasi"
                placeholder="Select Raasi"
                options={zodiacSigns}
                type="select"
              />

              {/* Star */}
              <FormField
                label="Star (நட்சத்திரம்)"
                id="nachathiram"
                name="nachathiram"
                placeholder="Select Nachathiram"
                options={zodiacNakshatras}
                type="select"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lagnam */}
              <FormField
                label="Lagnam (லக்னம்)"
                id="lagnam"
                name="lagnam"
                placeholder="Select Lagnam"
                options={zodiacSigns}
                type="select"
              />

              {/* Dhisai Irupu */}
              <FormField
                label="Dhisai Irupu (திசை இருப்பு)"
                id="dhisai_irupu"
                name="dhisai_irupu"
                placeholder="Dhisai Irupu"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jaadhagam Status */}
              <FormField
                label="Jaadhagam Status (ஜாதகத்தின் நிலை)"
                id="dhosam"
                name="dhosam"
                placeholder="Select Dhosam"
                options={jathagamStatusOptions}
                type="select"
              />
              {/* <FormField
                label="Upload Horoscope (ஜாதகம் பதிவேற்றம்)"
                id="upload"
                name="upload"
                type="file"
                placeholder="Select Horoscope file"
              /> */}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            {/* <Link href={"/profile-info/expectation-details"} className="w-full"> */}
            <Button
              text={isRunning ? "Saving..." : "Save & Proceed"}
              type="submit"
              icon={
                !isRunning && (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                  </svg>
                )
              }
            />
            {/* </Link> */}
          </div>
        </form>
      </div>
    </section>
  );
};

export default HoroscopeForm;
