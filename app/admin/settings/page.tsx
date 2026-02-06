import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { ShowListingToggle } from "./_components/ShowListingToggle";

export const metadata: Metadata = {
  title: "readme - instillinger",
};

export default function Page() {
  return (
    <div className="flex flex-col items-left gap-5 w-full">
      <PageHeader title="Instillinger" />
      <ShowListingToggle />
    </div>
  );
}
