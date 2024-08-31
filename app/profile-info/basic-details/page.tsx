import BasicInfoForm from "@/app/components/organism/BasicInfoForm/BasicInfoForm";
import Header from "@/app/components/organism/Header/Header";

export default function Page() {
  return (
    <main>
      <Header
        profileUpdateMode
        title="Step 1 of 7"
        highlightedText="Basic Information"
      />
      <BasicInfoForm />
    </main>
  );
}
