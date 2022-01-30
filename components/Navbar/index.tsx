import { FC, useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { useTheme } from "next-themes";

import { LightSwitch } from "../LightSwitch";

import styles from "./Navbar.module.css";
import { ROUTES } from "../../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { signOut } from "firebase/auth";

export const AppNavbar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [user, loading] = useAuthState(auth);

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
        {!loading && user && (
          <Nav>
            <Link href={ROUTES.ADMIN} passHref>
              <Nav.Link>Admin</Nav.Link>
            </Link>
            <Nav.Link type="button" onClick={() => signOut(auth)}>
              Logg ut
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
