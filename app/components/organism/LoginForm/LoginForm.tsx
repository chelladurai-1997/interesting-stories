"use client";
import { useRouter } from "next/navigation";
import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import FormTitle from "../../molecules/FormField/FormTitle/FormTitle";
import { onSignInFormSubmit } from "@/app/lib/actions/signin.action";
import { useServerAction } from "@/app/lib/hooks/useServerAction";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const [runAction, isRunning] = useServerAction(onSignInFormSubmit);
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await runAction(null, formData);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        toast.success(
          `Welcome, ${response?.userName}! We're glad to have you here. Enjoy exploring! 😊`,
          { duration: 5000 }
        );
        router.push("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <section className="bg-white p-6 ">
      <div className="container mx-auto">
        <form className="max-w-md mx-auto space-y-4" action={onSubmit}>
          <FormTitle
            title="Sign in to MeetYourSoul"
            subtitle="Never miss the update"
            description="Don't have an account?"
          />
          <FormField
            label="Mobile no:"
            id="mobileNo"
            name="mobileNo"
            placeholder="Mobile No"
            type="text"
          />
          <FormField
            label="Password:"
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
          />
          <FormField
            label="Remember me"
            id="agree"
            name="agree"
            type="checkbox"
          />
          <Button text={isRunning ? "Logging in ..." : "Login"} />
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
