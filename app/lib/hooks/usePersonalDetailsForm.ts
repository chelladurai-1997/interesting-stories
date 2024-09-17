import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onPersonalInfoFormSubmit } from "@/app/lib/actions/personalInfo.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const usePersonalDetailsForm = () => {
  const [runAction, isRunning] = useServerAction(onPersonalInfoFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/profile-info/education-details");
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error("Something went wrong, please try again.");
    }
  };

  return { onSubmit, isRunning };
};
