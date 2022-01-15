import { ref, listAll } from "firebase/storage";

import { IEdition, IEditionData } from "../types";
import { storage } from "./firebase";

export async function getEditions(): Promise<IEditionData[]> {
  const listRef = ref(storage, "pdf");

  const folderRefs = await listAll(listRef);

  const pdfRefs = (
    await Promise.all(
      folderRefs.prefixes.map(
        async (folderRef) => (await listAll(folderRef)).items
      )
    )
  ).flat();

  const yearEditionMap = new Map<string, IEdition[]>();

  pdfRefs.forEach(async (pdfRef) => {
    const [year, edition] = pdfRef.name.replace(".pdf", "").split("-");
    const imagePath = pdfRef.fullPath
      .replace(".pdf", ".png")
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
      editions: editions.sort((a, b) => a.edition.localeCompare(b.edition)),
    })
  );

  return finalData.sort((a, b) => b.year - a.year);
}

const getDownloadURL = (bucketName: string, fullPath: string) =>
  `${
    true ? "https://storage.googleapis.com" : "http://localhost:9199"
  }/${bucketName}/${fullPath}`;
