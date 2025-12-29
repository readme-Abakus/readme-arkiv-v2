import { NextPage } from "next";
import Head from "next/head";
import { ROUTES } from "../../utils/routes";
import { ShowListingToggle } from "../../components/Admin/ShowListingToggle";
import { WithAuthentication } from "../../components/WithAuthentication";
import { Button, Link } from "@heroui/react";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme - admin</title>
      </Head>
      <WithAuthentication>
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="text-2xl font-bold text-default-foreground">Admin</h1>
          <Button
            as={Link}
            href={ROUTES.NEW_EDITION}
            className="w-full"
            color="primary"
          >
            Legg til ny utgave
          </Button>
          <Button
            as={Link}
            href={ROUTES.EDITION_LIST}
            className="w-full"
            color="primary"
          >
            Vis utgavelisten
          </Button>
          <Button
            as={Link}
            href={ROUTES.NEW_ARTICLE}
            className="w-full"
            color="primary"
          >
            Legg til ny artikkel
          </Button>
          <Button
            as={Link}
            href={ROUTES.ARTICLE_LIST}
            className="w-full"
            color="primary"
          >
            Vis artikkellisten
          </Button>
          <ShowListingToggle />
        </div>
      </WithAuthentication>
    </>
  );
};

export default Admin;
