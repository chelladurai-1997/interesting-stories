import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onContactInfoFormSubmit } from "@/app/lib/actions/contactInfo.action";
import toast from "react-hot-toast";

export const useContactInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(onContactInfoFormSubmit);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
