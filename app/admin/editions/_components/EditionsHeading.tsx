"use client";

import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../../utils/routes";
import PageHeader from "@/components/PageHeader";

export default function EditionsHeading() {
  return (
    <PageHeader
      title="Utgaver"
      endContent={
        <Button
          color="primary"
          size="sm"
          radius="full"
          as={Link}
          href={ROUTES.NEW_EDITION}
          startContent={
            <span className="material-symbols-rounded md">add_2</span>
          }
        >
          Ny utgave
        </Button>
      }
    />
  );
}
