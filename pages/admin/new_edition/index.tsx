import { NextPage } from "next";
import Head from "next/head";
import { WithAuthentication } from "../../../components/WithAuthentication";
import NewEditionForm from "../../../components/Admin/Editions/NewEditionForm";

const NewEdition: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme – Legg til utgave</title>
      </Head>
      <WithAuthentication>
        <h1 className="text-2xl font-bold text-default-foreground">
          Ny utgave
        </h1>
        <NewEditionForm />
      </WithAuthentication>
    </>
  );
};

export default NewEdition;
