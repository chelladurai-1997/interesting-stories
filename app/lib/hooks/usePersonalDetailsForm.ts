import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handlePersonalInfoFormSubmit } from "@/app/lib/actions/personalInfo.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const usePersonalDetailsForm = () => {
  const [runAction, isRunning] = useServerAction(handlePersonalInfoFormSubmit);
  const router = useRouter();
  const { userProfile, updateUserProfile } = useUser();

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
              personalDetails: true,
            },
          });
        }
        router.push("/profile-info/education-details");
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error("Something went wrong, please try again.");
    }
  };

  return { onSubmit, isRunning };
};
