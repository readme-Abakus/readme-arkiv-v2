import { ref, listAll, list } from "firebase/storage";

import { IEdition, IEditionData } from "../types";
import { storage } from "./firebase";

export async function getEditions(): Promise<IEditionData[]> {
  const listRef = ref(storage, "pdf");

  const yearRefs = (await listAll(listRef)).prefixes;

  const yearEditionMap = new Map<string, IEdition[]>();

  const pdfRefs = await Promise.all(
    yearRefs.map(
      async (folderRef) =>
        // We recreate the ref here since there is a bug in the emulator that
        // crashes it if we use folderRef directly
        (
          await listAll(ref(storage, folderRef.fullPath))
        ).items
    )
  );

  pdfRefs.flat().forEach((pdfRef) => {
    const [year, edition] = pdfRef.name.replace(".pdf", "").split("-");
    const imagePath = pdfRef.fullPath
      .replace(".pdf", ".jpg")
      .replace("pdf/", "images/");

    yearEditionMap.set(year, [
      ...(yearEditionMap.get(year) ?? []),
      {
        edition,
        pdfUrl: getDownloadURL(pdfRef.bucket, pdfRef.fullPath),
        imageUrl: getDownloadURL(pdfRef.bucket, imagePath),
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
