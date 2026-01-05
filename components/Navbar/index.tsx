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
              <DropdownSection
                title="Admin"
                classNames={{ heading: "text-default-foreground" }}
              >
                <DropdownItem
                  key="edition_list"
                  as={Link}
                  className="text-foreground"
                  href={ROUTES.EDITION_LIST}
                  startContent={
                    <span className="material-symbols-rounded md">book_5</span>
                  }
                >
                  Utgaveliste
                </DropdownItem>
                <DropdownItem
                  key="article_list"
                  as={Link}
                  className="text-foreground"
                  href={ROUTES.ARTICLE_LIST}
                  startContent={
                    <span className="material-symbols-rounded md">
                      text_snippet
                    </span>
                  }
                >
                  Artikkelliste
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
              </DropdownSection>
            ) : null}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
    // <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
    //   <NavbarContent justify="start" className="sm:hidden">
    //     <NavbarMenuToggle
    //       aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    //     />
    //   </NavbarContent>

    //   <NavbarContent className="hidden sm:flex" justify="start">
    //     {leftItems.map(
    //       (item, index) =>
    //         !item.hidden && (
    //           <NavbarItem isActive={router.pathname === item.route} key={index}>
    //             <Link
    //               color="foreground"
    //               href={item.route}
    //               onPress={item.onPress}
    //             >
    //               {item.name}
    //             </Link>
    //           </NavbarItem>
    //         )
    //     )}
    //   </NavbarContent>

    //   <NavbarBrand className="justify-center">
    //     <ReadmeLogo maxWidth={"150px"} />
    //   </NavbarBrand>

    //   <NavbarContent justify="end">
    //     <LightSwitch />
    //     <div className="hidden sm:flex gap-4">
    //       {rightItems.map(
    //         (item, index) =>
    //           !item.hidden && (
    //             <NavbarItem
    //               isActive={router.pathname === item.route}
    //               key={index}
    //             >
    //               <Link
    //                 color="foreground"
    //                 href={item.route}
    //                 onPress={item.onPress}
    //               >
    //                 {item.name}
    //               </Link>
    //             </NavbarItem>
    //           )
    //       )}
    //     </div>
    //   </NavbarContent>

    //   <NavbarMenu>
    //     {leftItems.map(
    //       (item, index) =>
    //         !item.hidden && (
    //           <NavbarMenuItem key={`${item}-${index}`}>
    //             <Link
    //               color="foreground"
    //               href={item.route}
    //               onPress={item.onPress}
    //               size="lg"
    //             >
    //               {item.name}
    //             </Link>
    //           </NavbarMenuItem>
    //         )
    //     )}
    //     {rightItems.map(
    //       (item, index) =>
    //         !item.hidden && (
    //           <NavbarMenuItem key={`${item}-${index}`}>
    //             <Link
    //               color={item.name == "Log out" ? "danger" : "foreground"}
    //               href={item.route}
    //               onPress={item.onPress}
    //               size="lg"
    //             >
    //               {item.name}
    //             </Link>
    //           </NavbarMenuItem>
    //         )
    //     )}
    //   </NavbarMenu>
    // </Navbar>
  );
};
