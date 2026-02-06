"use client";

import { FC, useState } from "react";
import { LightSwitch } from "./LightSwitch";
import { ROUTES } from "../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/Firebase/firebase";
import { signOut } from "firebase/auth";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@heroui/react";
import { ReadmeLogo } from "./ReadmeLogo";
import {
  Bars,
  Xmark,
  Magnifier,
  ArrowRightFromSquare,
  ArrowUpRightFromSquare,
  PersonGear,
} from "@gravity-ui/icons";

export const NavBar: FC = () => {
  const [user, loading] = useAuthState(auth);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-5 px-5 md:px-10 flex justify-between items-center bg-background">
      <Link href={ROUTES.HOME}>
        <ReadmeLogo maxWidth={"190px"} />
      </Link>
      <div className="flex gap-2">
        <Button
          color="primary"
          radius="full"
          className="text-xs hidden md:flex"
          as={Link}
          href={ROUTES.SEARCH}
          endContent={<Magnifier />}
        >
          SØK
        </Button>
        <LightSwitch />
        <Dropdown
          onOpenChange={setIsOpen}
          isOpen={isOpen}
          className={"absolute right-0 translate-x-[20px]"}
        >
          <DropdownTrigger>
            <Button
              isIconOnly
              color="default"
              radius="full"
              className="text-xs"
              endContent={isOpen ? <Xmark /> : <Bars />}
            ></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="search"
              as={Link}
              className="text-foreground"
              href={ROUTES.SEARCH}
              startContent={<Magnifier />}
            >
              Artikkelsøk
            </DropdownItem>
            <DropdownItem
              showDivider={!loading && !!user}
              key="abakus"
              as={Link}
              className="text-foreground"
              href="https://abakus.no/"
              startContent={<ArrowUpRightFromSquare />}
            >
              Abakus.no
            </DropdownItem>
            {!loading && user ? (
              <>
                <DropdownItem
                  key="edition_list"
                  as={Link}
                  className="text-foreground"
                  href={ROUTES.ADMIN}
                  startContent={<PersonGear />}
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<ArrowRightFromSquare />}
                  onPress={() => signOut(auth)}
                >
                  Log ut
                </DropdownItem>
              </>
            ) : null}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};
