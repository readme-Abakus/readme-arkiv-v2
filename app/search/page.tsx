import { Metadata } from "next";
import Search from "./search";

export const metadata: Metadata = {
  title: "readme - søk",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-[20px] w-full">
      <h1 className="text-2xl font-bold text-default-foreground">
        Artikkelsøk
      </h1>
      <Search />
    </div>
  );
}
