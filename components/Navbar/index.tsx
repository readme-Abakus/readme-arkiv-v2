import { FC, useState } from "react";

import { LightSwitch } from "../LightSwitch";
import { ROUTES } from "../../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import {
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

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent justify="start" className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        {leftItems.map(
          (item, index) =>
            !item.hidden && (
              <NavbarItem isActive={router.pathname === item.route} key={index}>
                <Link
                  color="foreground"
                  href={item.route}
                  onPress={item.onPress}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            )
        )}
      </NavbarContent>

      <NavbarBrand className="justify-center">
        <ReadmeLogo maxWidth={"150px"} />
      </NavbarBrand>

      <NavbarContent justify="end">
        <LightSwitch />
        <div className="hidden sm:flex gap-4">
          {rightItems.map(
            (item, index) =>
              !item.hidden && (
                <NavbarItem
                  isActive={router.pathname === item.route}
                  key={index}
                >
                  <Link
                    color="foreground"
                    href={item.route}
                    onPress={item.onPress}
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              )
          )}
        </div>
      </NavbarContent>

      <NavbarMenu>
        {leftItems.map(
          (item, index) =>
            !item.hidden && (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color="foreground"
                  href={item.route}
                  onPress={item.onPress}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            )
        )}
        {rightItems.map(
          (item, index) =>
            !item.hidden && (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={item.name == "Log out" ? "danger" : "foreground"}
                  href={item.route}
                  onPress={item.onPress}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            )
        )}
      </NavbarMenu>
    </Navbar>
  );
};
