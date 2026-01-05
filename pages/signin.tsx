import Head from "next/head";
import { SignInForm } from "../components/Admin/SignInForm";
import { ROUTES } from "../utils/routes";
import { Link } from "@heroui/react";

const SignInPage = () => (
  <>
    <Head>
      <title>readme - logg inn</title>
    </Head>
    <div className="w-[300px] flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold text-default-foreground">Logg inn</h1>
      <SignInForm />
      <Link color="foreground" size="sm" href={ROUTES.PASSWORD_FORGET}>
        Glemt passord?
      </Link>
    </div>
  </>
);

export default SignInPage;
