import { useRouter } from "next/navigation";
import { onBasicInfoFormSubmit } from "@/app/lib/actions/basicInfo.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import toast from "react-hot-toast";

export const useBasicInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(onBasicInfoFormSubmit);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/profile-info/personal-details");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return {
    onSubmit,
    isRunning,
  };
};
