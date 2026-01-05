import { NextPage } from "next";
import { WithAuthentication } from "../../../components/WithAuthentication";

import Head from "next/head";
import { Button, Link } from "@heroui/react";
import React from "react";
import { ROUTES } from "../../../utils/routes";
import { ArticleOverview } from "../../../components/Admin/Articles";

const ArticleList: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme - artikler</title>
      </Head>
      <WithAuthentication>
        <div className="flex flex-row place-content-between items-center w-full">
          <h1 className="text-3xl font-bold text-default-foreground">
            Artikler
          </h1>
          <Button
            color="primary"
            size="sm"
            radius="full"
            as={Link}
            href={ROUTES.NEW_ARTICLE}
            startContent={
              <span className="material-symbols-rounded md">add_2</span>
            }
          >
            Ny artikkel
          </Button>
        </div>
        <ArticleOverview />
      </WithAuthentication>
    </>
  );
};

export default ArticleList;
