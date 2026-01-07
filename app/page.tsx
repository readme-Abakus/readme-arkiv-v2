import { EditionYear } from "@/components/EditionYear";
import { getEditions } from "../lib/Firebase/firebaseServersideAPIs";

// Never revalidated, similair to getStaticProps
export const revalidate = false;

export default async function Page() {
  const editionData = await getEditions(true);

  return (
    <>
      {editionData.map((data) => (
        <EditionYear key={data.year} data={data} />
      ))}
    </>
  );
}
