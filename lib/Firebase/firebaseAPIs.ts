import { ref, listAll, deleteObject, getMetadata } from "firebase/storage";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";

import { IEdition, IEditionData } from "../types";
import { db, storage } from "./firebase";

// Edition list param allows us to opt out of filtering by listing
export async function getEditions(
  editionList: boolean = false
): Promise<IEditionData[]> {
  const settings = await getDocs(collection(db, "settings"));

  const showListing: boolean = settings.docs[0].data().showListing;

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

  for (const pdfRef of pdfRefs.flat()) {
    const metaData = await getMetadata(pdfRef);
    const isListing =
      metaData.customMetadata?.listinglop?.toLowerCase() == "true";

    if (!editionList && isListing && !showListing) {
      continue;
    }

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
  }

  const finalData: IEditionData[] = Array.from(yearEditionMap.entries()).map(
    ([year, editions]) => ({
      year: parseInt(year),
      editions: editions.sort((a, b) => b.edition.localeCompare(a.edition)),
    })
  );

  return finalData.sort((a, b) => b.year - a.year);
}

export const deleteArticle = async (id: string) => {
  await deleteDoc(doc(db, `articles/${id}`));
};

export const deleteEdition = async (editionString: string) => {
  const [year, edition] = editionString.split("-");
  const path = `${year}/${year}-${edition}`;
  const pdfPath = `pdf/${path}.pdf`;
  const thumbPath = `images/${path}.jpg`;

  const pdfRef = ref(storage, pdfPath);
  const thumbRef = ref(storage, thumbPath);

  await deleteObject(thumbRef).catch((err) =>
    console.log("could not delete thumb: ", err)
  );
  await deleteObject(pdfRef).catch((err) =>
    console.log("could not delete pdf: ", err)
  );
};

const getDownloadURL = (bucketName: string, fullPath: string) =>
  `${
    process.env.NODE_ENV === "production"
      ? "https://storage.googleapis.com"
      : "http://localhost:9199"
  }/${bucketName}/${fullPath}`;
