import { FC } from "react";
import useDarkMode from "use-dark-mode";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

import { LightSwitch } from "../LightSwitch";
import * as ROUTES from "../../utils/routes";

import styles from "./Navbar.module.css";

export const AppNavbar: FC = () => {
  const isDark = useDarkMode();
  return (
    <Navbar
      className={styles.navbar}
      collapseOnSelect
      expand="sm"
      variant={isDark.value ? "dark" : "light"}
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
