"use client";
import React, { useState } from "react"; // Import useState
import {
  childrenLivingStatusOptions,
  genderLabelOptions,
  maritalStatusOptions,
  noOfChildrensOptions,
  profileCreatedByOptions,
} from "@/app/lib/constants/global.constant";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import SectionHeader from "../../molecules/SectionHeader/SectionHeader";
import ResponsiveGridContainer from "../../molecules/ResponsiveGridContainer/ResponsiveGridContainer";

import { getMaxDateForAge } from "@/app/lib/utils/dateUtils";
import Container from "../../molecules/Container/Container";
import FormContainer from "../../molecules/SectionContainer/SectionContainer";
import { useBasicInfoForm } from "@/app/lib/hooks/useBasicInfoForm";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

const BasicInfoForm = () => {
  const {
    onSubmit,
    isRunning,
    handleMaritalStatusChange,
    isMaritalStatusSingle,
    maritalStatus,
  } = useBasicInfoForm();

  return (
    <Container>
      <FormContainer>
        <SectionHeader
          subtitle="Let's begin! Please enter your details."
          step="Step 1 of 7"
          title="Basic Information"
        />
        <div className="form-login">
          <form autoComplete="off" action={onSubmit}>
            <div className="space-y-4">
              <ResponsiveGridContainer>
                <FormField
                  label="Display Name (முழு பெயர்):"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  type="text"
                />
                <FormField
                  label="Gender (பாலினம்):"
                  type="radio"
                  name="gender"
                  id="gender"
                  options={genderLabelOptions}
                  placeholder="Select Gender"
                  searchable={false}
                />
              </ResponsiveGridContainer>

              <ResponsiveGridContainer>
                <FormField
                  label="D.O.B (பிறந்த நாள்):"
                  id="dob"
                  name="dob"
                  placeholder="D.O.B"
                  type="date"
                  maxDate={getMaxDateForAge(18)}
                />

                <FormField
                  label="Profile created by (பதிவு செய்பவர்):"
                  id="profile_created_by"
                  name="profile_created_by"
                  type="select"
                  options={profileCreatedByOptions}
                  placeholder="Select Created by"
                  searchable={false}
                />
              </ResponsiveGridContainer>

              <FormField
                label="Marital Status (திருமண நிலை):"
                id="marital_status"
                name="marital_status"
                options={maritalStatusOptions}
                placeholder="Select Marital Status"
                type="select"
                searchable={false}
                onChange={handleMaritalStatusChange}
              />

              {maritalStatus && !isMaritalStatusSingle && (
                <ResponsiveGridContainer>
                  <FormField
                    label="No. of. Children (குழந்தைகள்):"
                    id="children"
                    name="children"
                    options={noOfChildrensOptions}
                    placeholder="Select No. of. Children"
                    type="select"
                    searchable={false}
                  />

                  <FormField
                    id="children_living_status"
                    label="Children Living Status (குழந்தைகள் வசிப்பது):"
                    type="radio"
                    name="children_living_status"
                    options={childrenLivingStatusOptions}
                    placeholder="Select Children Living Status"
                  />
                </ResponsiveGridContainer>
              )}

              <FormField
                label="Profile Bio (சுயவிவர தகவல்):"
                type="textarea"
                id="profile_bio"
                name="profile_bio"
                placeholder="Profile biography"
              />
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Note: This information will be displayed publicly, so be careful
              with your information.
            </p>

            <div className="flex justify-end mt-8">
              <Button
                text="Save & Proceed"
                type="submit"
                icon={<ArrowRightIcon />}
                isPending={isRunning}
              />
            </div>
          </form>
        </div>
      </FormContainer>
    </Container>
  );
};

export default BasicInfoForm;
