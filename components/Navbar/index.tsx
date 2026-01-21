import { FC, useState } from "react";

import { LightSwitch } from "../LightSwitch";
import { ROUTES } from "../../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  PressEvent,
} from "@heroui/react";
import { ReadmeLogo } from "../ReadmeLogo";

export const AppNavbar: FC = () => {
  const [user, loading] = useAuthState(auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  type NavbarPage = {
    name: string;
    route?: string;
    hidden?: boolean;
    onPress?: (e: PressEvent) => void;
  };

  const leftItems: NavbarPage[] = [
    { name: "Arkiv", route: ROUTES.HOME },
    { name: "Søk", route: ROUTES.SEARCH },
    { name: "Abakus.no", route: "https://abakus.no/" },
  ];

  const rightItems: NavbarPage[] = [
    { name: "Admin", route: ROUTES.ADMIN, hidden: loading || !user },
    {
      name: "Log out",
      onPress: () => {
        setIsMenuOpen(false);
        signOut(auth);
      },
      hidden: loading || !user,
    },
  ];

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
          endContent={
            <span className="material-symbols-rounded md">search</span>
          }
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
              endContent={
                isOpen ? (
                  <span className="material-symbols-rounded md">close</span>
                ) : (
                  <span className="material-symbols-rounded md">menu</span>
                )
              }
            ></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="search"
              as={Link}
              className="text-foreground"
              href={ROUTES.SEARCH}
              startContent={
                <span className="material-symbols-rounded md">search</span>
              }
            >
              Artikkelsøk
            </DropdownItem>
            <DropdownItem
              showDivider={!loading && !!user}
              key="abakus"
              as={Link}
              className="text-foreground"
              href="https://abakus.no/"
              startContent={
                <span className="material-symbols-rounded md">open_in_new</span>
              }
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
                  startContent={
                    <span className="material-symbols-rounded md">
                      shield_person
                    </span>
                  }
                >
                  Admin
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={
                    <span className="material-symbols-rounded md">logout</span>
                  }
                  onPress={() => {
                    setIsMenuOpen(false);
                    signOut(auth);
                  }}
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
