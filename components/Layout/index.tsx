import { ReactNode } from "react";
import { Footer } from "../Footer";
import { AppNavbar } from "../Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AppNavbar />
      <div className="pt-[40px] px-[20px] md:px-[40px] pb-[100px] gap-[20px] flex flex-col items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
