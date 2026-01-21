import Head from "next/head";
import { PasswordForgetForm } from "../components/Admin/PwForgetForm";

const PasswordForgetPage = () => (
  <>
    <Head>
      <title>readme - tilbakestill passord</title>
    </Head>
    <div className="w-[300px] flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold text-default-foreground">
        Glemt passord
      </h1>
      <PasswordForgetForm />
    </div>
  </>
);

export default PasswordForgetPage;
