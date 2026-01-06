import Head from "next/head";
import { WithAuthentication } from "../../../components/WithAuthentication";
import EditionsOverview from "../../../components/Admin/Editions";
import { getEditions } from "../../../lib/Firebase/firebaseServersideAPIs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - utgaver",
};

export default async function Page() {
  const editionData = await getEditions();

  return (
    <WithAuthentication>
      <EditionsOverview editionData={editionData} />
    </WithAuthentication>
  );
}
