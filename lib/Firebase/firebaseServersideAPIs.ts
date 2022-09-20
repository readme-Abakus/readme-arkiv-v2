import { IEdition, IEditionData } from "../types";
import { db, storage } from "./firebaseAdmin";

// Edition list param allows us to opt out of filtering by listing
export async function getEditions(
  filterListingEditions: boolean = false
): Promise<IEditionData[]> {
  const pdfRefs = await storage.bucket().getFiles({ prefix: "pdf/" });
  const showListing = await (
    await db.collection("settings").get()
  ).docs[0].get("showListing");

  const yearEditionMap = new Map<string, IEdition[]>();

  await Promise.all(
    pdfRefs[0].map(async (pdfRef) => {
      const [metadata] = await pdfRef.getMetadata();
      const isListing = metadata.metadata?.listinglop.toLowerCase() === "true";
      const matches = pdfRef.name.match(/[0-9]{4}-[0-9]{2}/g);
      let [year, edition] = ["0000", "00"];

      if (matches) {
        [year, edition] = matches[0].split("-");
      }

      if (filterListingEditions && isListing && !showListing) {
        return;
      }

      const imagePath = pdfRef.name
        .replace(".pdf", ".jpg")
        .replace("pdf/", "images/");

      yearEditionMap.set(year, [
        ...(yearEditionMap.get(year) ?? []),
        {
          edition,
          pdfUrl: getDownloadURL(pdfRef.bucket.name, pdfRef.name),
          imageUrl: getDownloadURL(pdfRef.bucket.name, imagePath),
        },
      ]);
    })
  );

  const finalData: IEditionData[] = Array.from(yearEditionMap.entries()).map(
    ([year, editions]) => ({
      year: parseInt(year),
      editions: editions.sort((a, b) => b.edition.localeCompare(a.edition)),
    })
  );

  return finalData.sort((a, b) => b.year - a.year);
}

export async function getEditionIDs(
  filterListingEditions: boolean = false
): Promise<string[]> {
  const pdfRefs = await storage.bucket().getFiles({ prefix: "pdf/" });
  const showListing = await (
    await db.collection("settings").get()
  ).docs[0].get("showListing");

  const IDs: string[] = [];

  await Promise.all(
    pdfRefs[0].map(async (pdfRef) => {
      const [metadata] = await pdfRef.getMetadata();
      const isListing = metadata.metadata?.listinglop.toLowerCase() === "true";
      const matches = pdfRef.name.match(/[0-9]{4}-[0-9]{2}/g);
      let match: string | undefined;

      if (matches) {
        match = matches[0];
      } else {
        return;
      }

      if (filterListingEditions && isListing && !showListing) {
        return;
      }

      IDs.push(match);
    })
  );

  return IDs;
}

const getDownloadURL = (bucketName: string, fullPath: string) =>
  `${
    process.env.NODE_ENV === "production"
      ? "https://storage.googleapis.com"
      : "http://localhost:9199"
  }/${bucketName}/${fullPath}`;
