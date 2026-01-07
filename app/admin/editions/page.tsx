import { WithAuthentication } from "@/components/WithAuthentication";
import EditionsOverview from "app/admin/editions/EditionsOverview";
import { getEditions } from "../../../lib/Firebase/firebaseServersideAPIs";
import { Metadata } from "next";
import EditionsHeading from "./EditionsHeading";

export const metadata: Metadata = {
  title: "readme - utgaver",
};

export default async function Page() {
  const editionData = await getEditions();

  return (
    <WithAuthentication>
      <div className="flex flex-col items-left gap-5 max-w-[1200px] w-full">
        <EditionsHeading />
        <EditionsOverview editionData={editionData} />
      </div>
    </WithAuthentication>
  );
}
