import { NextPage } from "next";
import Head from "next/head";
import { WithAuthentication } from "../../../components/WithAuthentication";
import NewEditionForm from "../../../components/Admin/Editions/NewEditionForm";
import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../utils/routes";

const NewEdition: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme – Legg til utgave</title>
      </Head>
      <WithAuthentication>
        <div className="flex items-center gap-2 max-w-[350px] w-full justify-start">
          <Button
            isIconOnly
            variant="light"
            as={Link}
            href={ROUTES.EDITION_LIST}
          >
            <span className="material-symbols-rounded xl">arrow_back</span>
          </Button>
          <h1 className="text-3xl font-bold text-default-foreground">
            Ny utgave
          </h1>
        </div>
        <NewEditionForm />
      </WithAuthentication>
    </>
  );
};

export default NewEdition;
