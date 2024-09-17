import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { onHoroscopeInfoFormSubmit } from "@/app/lib/actions/horoscopeInfo.action";
import toast from "react-hot-toast";

export const useHoroscopeForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(onHoroscopeInfoFormSubmit);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/profile-info/expectation-details");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
