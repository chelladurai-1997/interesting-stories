import Title from "@/app/components/atoms/Title/Title";
import Link from "next/link";

type FormTitleProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

const FormTitle: React.FC<FormTitleProps> = ({
  title,
  subtitle,
  description,
}) => (
  <div className="form-tit text-center mb-6 space-y-3">
    <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
    <p className="text-sm text-gray-600">
      Don't have an account?{" "}
      <Link href={"/signup"} className="text-yellow-500 hover:underline">
        Register
      </Link>
    </p>
  </div>
);

export default FormTitle;
