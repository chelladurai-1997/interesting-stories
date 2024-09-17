import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onExpectationsInfoFormSubmit } from "@/app/lib/actions/expectationInfo.action";
import toast from "react-hot-toast";

export const useExpectationForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(onExpectationsInfoFormSubmit);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/profile-info/contact-details");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
