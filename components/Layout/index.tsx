import { ReactNode } from "react";
import { Footer } from "../Footer";
import { AppNavbar } from "../Navbar";
import { ReadmeLogo } from "../ReadmeLogo";

import styles from "./Layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`text-foreground bg-background ${styles.app}`}>
      <AppNavbar />
      <div className="pt-[40px] px-[20px] md:px-[40px] pb-[100px] gap-[20px] flex flex-col items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
