import { useRouter } from "next/navigation";
import { handleBasicInfoSubmission } from "@/app/lib/actions/basicInfo.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { SelectOption } from "@/app/components/atoms/Select/Select";

export const useBasicInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleBasicInfoSubmission);
  const { userProfile, updateUserProfile } = useUser();
  const [maritalStatus, setMaritalStatus] = useState<string>("");

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response.message || "An error occurred.");
      } else {
        if (userProfile) {
          updateUserProfile({
            ...(userProfile ?? {}),
            completedSections: {
              ...(userProfile?.completedSections ?? {}),
              basicInfo: true,
            },
          });
        }

        router.push("/profile-info/personal-details");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleMaritalStatusChange = (selectedOption: SelectOption) => {
    setMaritalStatus(selectedOption.value);
  };

  const isMaritalStatusSingle = maritalStatus === "Single - (திருமணம் ஆகாதவர்)";

  return {
    onSubmit,
    isRunning,
    handleMaritalStatusChange,
    isMaritalStatusSingle,
    maritalStatus,
  };
};
