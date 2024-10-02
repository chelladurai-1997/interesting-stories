import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleFamilyInfoSubmission } from "@/app/lib/actions/familyInfo.action";
import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const useFamilyInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleFamilyInfoSubmission);
  const { userProfile, updateUserProfile } = useUser();
  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response.message);
      } else {
        if (userProfile?.completedSections) {
          updateUserProfile({
            ...(userProfile ?? {}),
            completedSections: {
              ...userProfile?.completedSections,
              familyDetails: true,
            },
          });
        }
        router.push("/profile-info/horoscope-details");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return { onSubmit, isRunning };
};
