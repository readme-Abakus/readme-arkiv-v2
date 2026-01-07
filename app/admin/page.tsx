import Head from "next/head";
import { WithAuthentication } from "@/components/WithAuthentication";
import Admin from "./Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - admin",
};

export default function Page() {
  return (
    <WithAuthentication>
      <div className="flex flex-col items-center gap-[10px]">
        <h1 className="text-2xl font-bold text-default-foreground">Admin</h1>
        <Admin />
      </div>
    </WithAuthentication>
  );
}
