"use client";

import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../utils/routes";
import PageHeader from "@/components/PageHeader";

export default function ArticlesHeading() {
  return (
    <PageHeader
      title="Artikler"
      endContent={
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
      }
    />
  );
}
