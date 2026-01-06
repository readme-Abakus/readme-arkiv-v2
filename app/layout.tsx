import "../styles/globals.scss";
import { Metadata } from "next";
import Providers from "./providers";
import { AppNavbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Favicon } from "../components/Favicon";

export const metadata: Metadata = {
  title: "readme - arkiv",
  description: "Linjeforeningsmagasinet readme",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Favicon />
      </head>
      <body>
        <Providers>
          <div className="relative min-h-screen">
            <AppNavbar />
            <main className="pt-5 px-5 md:px-10 pb-[100px] gap-[20px] flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
