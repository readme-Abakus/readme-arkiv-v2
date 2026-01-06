"use client";

import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../utils/routes";
import { ArticleOverview } from "../../../components/Admin/Articles";

export default function Articles() {
  return (
    <>
      <div className="flex flex-row place-content-between items-center w-full">
        <h1 className="text-3xl font-bold text-default-foreground">Artikler</h1>
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
    </>
  );
}
