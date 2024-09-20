"use client";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import {
  zodiacSigns,
  zodiacNakshatras,
  jathagamStatusOptions,
} from "@/app/lib/constants/global.constant";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import { useHoroscopeForm } from "@/app/lib/hooks/useHoroscope";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import LoadingIndicator from "../../molecules/LoadingIndicator/LoadingIndicator";

const HoroscopeForm = () => {
  const { isRunning, onSubmit } = useHoroscopeForm();
  return (
    <section className="bg-white p-6 sm:p-10 border rounded-xl max-w-[800px] mx-auto shadow-lg transition-transform transform  hover:shadow-2xl">
      <SectionHeader
        subtitle="Astrology, a guiding force from the stars!"
        step="Step 5 of 7"
        title="Horoscope Information"
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
              <FormField
                label="Upload Horoscope (ஜாதகம் பதிவேற்றம்)"
                id="upload"
                name="upload"
                type="file"
                placeholder="Select Horoscope file"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              text={"Save & Proceed"}
              type="submit"
              icon={<ArrowRightIcon />}
              isPending={isRunning}
            />
            {isRunning && <LoadingIndicator />}
          </div>
        </form>
      </div>
    </section>
  );
};

export default HoroscopeForm;
