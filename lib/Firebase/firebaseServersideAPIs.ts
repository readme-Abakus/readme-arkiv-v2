import { IEdition, IEditionData } from "../types";
import { storage } from "./firebaseAdmin";

export async function getEditions(): Promise<IEditionData[]> {
  const pdfRefs = await storage.bucket().getFiles({ prefix: "pdf/" });

  const yearEditionMap = new Map<string, IEdition[]>();

  pdfRefs[0].forEach((pdfRef) => {
    const matches = pdfRef.name.match(/[0-9]{4}-[0-9]{2}/g);
    let [year, edition] = ["0000", "00"];

    if (matches) {
      [year, edition] = matches[0].split("-");
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
  });

  const finalData: IEditionData[] = Array.from(yearEditionMap.entries()).map(
    ([year, editions]) => ({
      year: parseInt(year),
      editions: editions.sort((a, b) => b.edition.localeCompare(a.edition)),
    })
  );

  return finalData.sort((a, b) => b.year - a.year);
}

const getDownloadURL = (bucketName: string, fullPath: string) =>
  `${
    process.env.NODE_ENV === "production"
      ? "https://storage.googleapis.com"
      : "http://localhost:9199"
  }/${bucketName}/${fullPath}`;
