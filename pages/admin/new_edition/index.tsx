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
        <NewEditionForm />
      </WithAuthentication>
    </>
  );
};

export default NewEdition;
