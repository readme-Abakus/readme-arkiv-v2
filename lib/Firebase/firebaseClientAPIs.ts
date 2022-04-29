import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { IArticle, IEditArticle } from "../types";

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

export const addNewArticle = async (
  valuesToPost: IEditArticle,
  onSuccess: () => void,
  onError: () => void
) => {
  // Making a true copy to avoid pass-by-reference issues
  const article: IArticle = {
    ...valuesToPost,
    pages: valuesToPost.pages.split(",").map((v) => parseInt(v)),
    tags: valuesToPost.tags.split(",").map((v) => v.trim()),
    edition: `${valuesToPost.editionYear}-0${valuesToPost.editionNumber}`,
  };

  try {
    const url = getArticlePDFURL(article);
    article.url = url;
    await addDoc(collection(db, "articles"), article);
    console.log("Article added to DB");
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error(
      "Something when wrong during edition upload, failed with error: ",
      error
    );
    if (onError) {
      onError();
    }
  }
};

const getArticlePDFURL = (article: IArticle) => {
  const year = article.edition.split("-")[0];
  let pdfURL = getPDFDownloadURL(year, article.edition);
  if (article.pages) {
    pdfURL = `${pdfURL}#page=${getPageNumber(article)}`;
  }
  return pdfURL;
};

const getPageNumber = (article: IArticle) => {
  const [editionYear, editionNumber] = article.edition.split("-");
  if (
    parseInt(editionYear) > 2013 ||
    (parseInt(editionYear) === 2013 && parseInt(editionNumber) === 6)
  ) {
    return Math.floor(article.pages[0] / 2) + 1;
  } else {
    return article.pages[0];
  }
};

const getPDFDownloadURL = (year: string, name: string) => {
  const root =
    process.env.NODE_ENV === "development"
      ? "localhost:9199"
      : "https://storage.googleapis.com";
  let url = `${root}/${ref(storage).bucket}/pdf/${year}/${name}`;
  if (!url.endsWith(".pdf")) {
    url += ".pdf";
  }
  return url;
};
