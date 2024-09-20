import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleContactInfoSubmission } from "@/app/lib/actions/contactInfo.action";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserContext";

export const useContactInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleContactInfoSubmission);
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
              contactDetails: true,
            },
          });
        }
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
