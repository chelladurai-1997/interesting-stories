import toast from "react-hot-toast";
import { useUser } from "@/app/lib/contexts/UserContext";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onSignInFormSubmit } from "@/app/lib/actions/signin.action";
import { useRegistrationNavigation } from "@/app/lib/hooks/useRegistrationNavigation";

export const useLoginForm = () => {
  const { updateUserProfile } = useUser();
  const [runAction, isRunning] = useServerAction(onSignInFormSubmit);
  const { navigateToStep } = useRegistrationNavigation();

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
          refreshToken: response?.refreshToken,
        });
        toast.success(
          `Welcome, ${response?.userName}! We're glad to have you here. Enjoy exploring! 😊`
        );
        navigateToStep(response?.lastCompletedStep);
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return { onSubmit, isRunning };
};
