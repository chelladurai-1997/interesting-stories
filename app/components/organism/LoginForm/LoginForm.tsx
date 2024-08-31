import Button from "../../atoms/Button/Button";
import FormField from "../../molecules/FormField/FormField";
import FormTitle from "../../molecules/FormField/FormTitle/FormTitle";

const LoginForm: React.FC = () => (
  <section className="bg-white p-6  rounded-lg shadow-lg">
    <div className="container mx-auto">
      <form className="max-w-md mx-auto space-y-4">
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
        <Button text="Login" />
      </form>
    </div>
  </section>
);

export default LoginForm;
