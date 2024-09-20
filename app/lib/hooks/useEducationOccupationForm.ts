import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleEducationOccupationFormSubmit } from "@/app/lib/actions/educationOccupation.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useEducationOccupationForm = () => {
  const [runAction, isRunning] = useServerAction(
    handleEducationOccupationFormSubmit
  );
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        router.push("/profile-info/family-details");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return { onSubmit, isRunning };
};
