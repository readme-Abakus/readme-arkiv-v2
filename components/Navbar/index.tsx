import { FC, useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { useTheme } from "next-themes";

import { LightSwitch } from "../LightSwitch";

import styles from "./Navbar.module.css";
import { ROUTES } from "../../utils/routes";

export const AppNavbar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Navbar
      className={styles.navbar}
      collapseOnSelect
      expand="sm"
      variant={theme as "dark" | "light"}
    >
      <Link href={ROUTES.HOME} passHref>
        <Navbar.Brand>Arkiv</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link href={ROUTES.SEARCH} passHref>
            <Nav.Link>Søk</Nav.Link>
          </Link>
          <Nav.Link href="https://abakus.no/">Abakus.no</Nav.Link>
        </Nav>
        <Nav className={styles.lightSwitch}>
          <LightSwitch />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
