import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "./firebase";

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
