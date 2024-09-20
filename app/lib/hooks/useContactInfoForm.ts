import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleContactInfoSubmission } from "@/app/lib/actions/contactInfo.action";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

export const useContactInfoForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleContactInfoSubmission);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        revalidatePath("/");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
