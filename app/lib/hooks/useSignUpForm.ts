import { useState } from "react";
import { useRouter } from "next/navigation";
import { onSignUpFormSubmit } from "@/app/lib/actions/signup.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { useUser } from "@/app/lib/contexts/UserContext";
import toast from "react-hot-toast";

export const useSignUpForm = () => {
  const router = useRouter();
  const { updateUserProfile } = useUser();
  const [runAction, isRunning] = useServerAction(onSignUpFormSubmit);

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
          refreshToken: response?.refreshToken, // In case you need to store or log it
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
  };
};
