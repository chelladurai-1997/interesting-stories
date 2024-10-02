import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleExpectationsInfoSubmission } from "@/app/lib/actions/expectationInfo.action";
import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const useExpectationForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(
    handleExpectationsInfoSubmission
  );
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
              expectation: true,
            },
          });
        }
        router.push("/profile-info/contact-details");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
