import { Metadata } from "next";
import { PasswordForgetForm } from "../../components/Admin/PwForgetForm";

export const metadata: Metadata = {
  title: "readme - tilbakestill passord",
};

const PasswordForgetPage = () => (
  <div className="w-[300px] flex flex-col gap-4 items-center">
    <h1 className="text-3xl font-bold text-default-foreground">
      Glemt passord
    </h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForgetPage;
