import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Footer } from "../Footer";
import { AppNavbar } from "../Navbar";
import { ReadmeLogo } from "../ReadmeLogo";

import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  console.log(router);

  if (router.route.startsWith("/edition")) {
    return <>{children}</>;
  }
  return (
    <div className={styles.app}>
      <AppNavbar />
      <header className={styles.header}>
        <ReadmeLogo maxWidth={"750px"} />
      </header>
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
