import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleEducationOccupationFormSubmit } from "@/app/lib/actions/educationOccupation.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserContext";

export const useEducationOccupationForm = () => {
  const [runAction, isRunning] = useServerAction(
    handleEducationOccupationFormSubmit
  );
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
              educationOccupation: true,
            },
          });
        }
        router.push("/profile-info/family-details");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return { onSubmit, isRunning };
};
