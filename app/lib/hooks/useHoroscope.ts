import { useRouter } from "next/navigation";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import { handleHoroscopeInfoSubmission } from "@/app/lib/actions/horoscopeInfo.action";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import { useEffect } from "react";

export const useHoroscopeForm = () => {
  const router = useRouter();
  const [runAction, isRunning] = useServerAction(handleHoroscopeInfoSubmission);
  const { userProfile, updateUserProfile } = useUser();

  useEffect(() => {
    if (isRunning) {
      window.scrollTo({
        top: window.innerHeight / 2,
        behavior: "instant",
      });
    }
  }, [isRunning]);

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        if (userProfile?.completedSections) {
          updateUserProfile({
            ...(userProfile ?? {}),
            completedSections: {
              ...userProfile?.completedSections,
              horoscope: true,
            },
          });
        }
        router.push("/profile-info/expectation-details");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return { onSubmit, isRunning };
};
