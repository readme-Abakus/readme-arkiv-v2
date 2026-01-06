"use client";

import { ROUTES } from "../../utils/routes";
import { ShowListingToggle } from "../../components/Admin/ShowListingToggle";
import { Button, Link } from "@heroui/react";

export default function Admin() {
  return (
    <>
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
    </>
  );
}
