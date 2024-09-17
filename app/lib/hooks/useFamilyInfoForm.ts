import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onFamilyInfoFormSubmit } from "@/app/lib/actions/familyInfo.action";
import toast from "react-hot-toast";

export const useFamilyInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(onFamilyInfoFormSubmit);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response.message);
      } else {
        router.push("/profile-info/horoscope-details");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return { onSubmit, isRunning };
};
