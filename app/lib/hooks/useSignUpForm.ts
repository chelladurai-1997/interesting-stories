import { useRouter } from "next/navigation";
import { onSignUpFormSubmit } from "@/app/lib/actions/signup.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import toast from "react-hot-toast";
import { formSectionDefaultState } from "../constants/global.constant";
import { useUser } from "./useUser";
import { useState } from "react";

export const useSignUpForm = () => {
  const router = useRouter();
  const { updateUserProfile } = useUser();
  const [runAction, isRunning] = useServerAction(onSignUpFormSubmit);
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        updateUserProfile({
          userId: response?.userId,
          userName: response?.userName,
          accessToken: response?.accessToken,
          completedSections: formSectionDefaultState,
        });
        router.push("/profile-info/basic-details");
      }
    } catch (error) {
      toast.error("An error occurred while creating the account.");
    }
  };

  return {
    onSubmit,
    isRunning,
    isTermsPopupOpen,
    setIsTermsPopupOpen,
    setIsTermsAccepted,
    isTermsAccepted,
  };
};
