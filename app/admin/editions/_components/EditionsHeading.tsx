"use client";

import { Button, Link } from "@heroui/react";
import { ROUTES } from "../../../../utils/routes";
import PageHeader from "@/components/PageHeader";
import { Plus } from "@gravity-ui/icons";

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
          startContent={<Plus />}
        >
          Ny utgave
        </Button>
      }
    />
  );
}
