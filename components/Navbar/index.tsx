import { FC, ReactNode, useState } from "react";
import Link from "next/link";

import { LightSwitch } from "../LightSwitch";

import styles from "./Navbar.module.scss";
import { ROUTES } from "../../utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export const AppNavbar: FC = () => {
  const [user, loading] = useAuthState(auth);

  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <LinkButton route={ROUTES.HOME} exactMatch onClick={() => setOpen(false)}>
        Arkiv
      </LinkButton>
      <ul className={open ? `${styles.links} ${styles.active}` : styles.links}>
        <li>
          <LinkButton route={ROUTES.SEARCH} onClick={() => setOpen(false)}>
            Søk
          </LinkButton>
        </li>
        <li>
          <a href="https://abakus.no/" onClick={() => setOpen(false)}>
            Abakus.no
          </a>
        </li>
        <li className={styles.lightSwitch}>
          <LightSwitch />
        </li>
        {!loading && user && (
          <>
            <li>
              <LinkButton route={ROUTES.ADMIN} onClick={() => setOpen(false)}>
                Admin
              </LinkButton>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  setOpen(false);
                  signOut(auth);
                }}
              >
                Logg ut
              </a>
            </li>
          </>
        )}
      </ul>
      <span
        className={`material-icons ${styles.icon}`}
        onClick={() => setOpen(!open)}
      >
        menu
      </span>
    </nav>
  );
};

const LinkButton = ({
  route,
  onClick,
  children,
  exactMatch = false,
}: {
  route: string;
  onClick?: () => void;
  exactMatch?: boolean;
  children: ReactNode;
}) => {
  const router = useRouter();
  let className;
  if (exactMatch) {
    className = router.pathname == route ? styles.active : "";
  } else {
    className = router.pathname.startsWith(route) ? styles.active : "";
  }
  return (
    <Link href={route} passHref>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};
