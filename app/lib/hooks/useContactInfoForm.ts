import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleContactInfoSubmission } from "@/app/lib/actions/contactInfo.action";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUser } from "./useUser";

export const useContactInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleContactInfoSubmission);
  const { userProfile, updateUserProfile } = useUser();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const handleSuccessPopupClose = () => {
    setIsSuccessPopupOpen(false);
    router.push("/");
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        if (userProfile?.completedSections) {
          updateUserProfile({
            ...(userProfile ?? {}),
            completedSections: {
              ...userProfile?.completedSections,
              contactDetails: true,
            },
          });
        }
        setIsSuccessPopupOpen(true);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning, isSuccessPopupOpen, handleSuccessPopupClose };
};
