import toast from "react-hot-toast";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onSignInFormSubmit } from "@/app/lib/actions/signin.action";
import { useRegistrationNavigation } from "@/app/lib/hooks/useRegistrationNavigation";
import { formSectionDefaultState } from "../constants/global.constant";
import { useUser } from "./useUser";
import { getTimeOfDayGreeting } from "../utils/getTimeOfDayGreeting";

export const useLoginForm = () => {
  const { updateUserProfile } = useUser();
  const [runAction, isRunning] = useServerAction(onSignInFormSubmit);
  const { navigateToNextStep } = useRegistrationNavigation();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        const formStatus =
          response?.completedSections ?? formSectionDefaultState;
        updateUserProfile({
          userId: response?.userId,
          userName: response?.userName,
          accessToken: response?.accessToken,
          completedSections: formStatus,
        });

        navigateToNextStep(formStatus);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return { onSubmit, isRunning };
};
